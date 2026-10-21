import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Users2,
  Shield,
  UserCheck,
  UserX,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  Key,
  Edit2,
  Trash2,
  X,
  Check,
  Loader2,
  FileSpreadsheet,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminStatusBadge,
  AdminRoleBadge,
} from "@/components/admin/AdminComponents";
import { adminUsers, AdminUser } from "@/lib/admin-data";
import {
  useAdminUsers,
  useCreateAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from "@/hooks/use-admin-data";
import { toast } from "sonner";
import { meta } from "@/components/site/blocks";
import { exportToCsv, exportToPdf } from "@/lib/export-utils";

export const Route = createFileRoute("/admin/users")({
  head: () => meta("Users & Roles — Admin Dashboard", "Manage team access, permissions, and security roles."),
  component: AdminUsersPage,
});

export function AdminUsersPage() {
  const { data: liveProfiles } = useAdminUsers();
  const createProfileMutation = useCreateAdminUser();
  const updateProfileMutation = useUpdateAdminUser();
  const deleteProfileMutation = useDeleteAdminUser();

  const users: AdminUser[] = (liveProfiles && liveProfiles.length > 0)
    ? liveProfiles.map((p) => ({
        id: p.id,
        name: p.name || "Admin User",
        email: p.email || (p.name ? `${p.name.toLowerCase().replace(/\s+/g, ".")}@russelltechnologies.org` : "admin@russelltechnologies.org"),
        role: (p.role as AdminUser["role"]) || "Editor",
        status: (p.status as AdminUser["status"]) || "Active",
        title: p.title || "Team Member",
        lastLogin: p.last_login ? new Date(p.last_login).toLocaleString() : "Recently",
        avatar: p.avatar_url || adminUsers[0]?.avatar || "",
        initials: p.initials || (p.name ? p.name.slice(0, 2).toUpperCase() : "AU"),
      }))
    : adminUsers;

  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Add User Form state
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addRole, setAddRole] = useState<AdminUser["role"]>("Editor");
  const [addStatus, setAddStatus] = useState<AdminUser["status"]>("Active");
  const [addPassword, setAddPassword] = useState("");

  // Edit User Form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editRole, setEditRole] = useState<AdminUser["role"]>("Editor");
  const [editStatus, setEditStatus] = useState<AdminUser["status"]>("Active");

  const filteredUsers = users.filter((u) => {
    if (selectedRole !== "all" && u.role !== selectedRole) return false;
    if (selectedStatus !== "all" && u.status !== selectedStatus) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        (u.title && u.title.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOpenAdd = () => {
    setAddName("");
    setAddEmail("");
    setAddTitle("");
    setAddRole("Editor");
    setAddStatus("Active");
    setAddPassword("");
    setShowAddModal(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditTitle(user.title || "");
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addEmail.trim()) {
      toast.error("Please provide both name and email address");
      return;
    }
    try {
      await createProfileMutation.mutateAsync({
        name: addName.trim(),
        email: addEmail.trim(),
        role: addRole,
        status: addStatus,
        title: addTitle.trim() || "Team Member",
        password: addPassword.trim() || undefined,
      });
      toast.success(`User "${addName}" created successfully!`);
      setShowAddModal(false);
    } catch (err: unknown) {
      toast.error("Failed to create user: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim() || !editEmail.trim()) {
      toast.error("Name and email cannot be empty");
      return;
    }
    try {
      await updateProfileMutation.mutateAsync({
        id: editingUser.id,
        name: editName.trim(),
        email: editEmail.trim(),
        role: editRole,
        status: editStatus,
        title: editTitle.trim(),
      });
      toast.success(`User "${editName}" updated successfully!`);
      setEditingUser(null);
    } catch (err: unknown) {
      toast.error("Failed to update user: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${user.name}"?`)) {
      return;
    }
    try {
      await deleteProfileMutation.mutateAsync({ id: user.id, name: user.name });
      toast.success(`User "${user.name}" has been deleted.`);
      setSelectedIds((prev) => prev.filter((id) => id !== user.id));
    } catch (err: unknown) {
      toast.error("Failed to delete user: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    const nextStatus = user.status === "Active" ? "Inactive" : "Active";
    try {
      await updateProfileMutation.mutateAsync({
        id: user.id,
        status: nextStatus,
      });
      toast.success(`User "${user.name}" is now ${nextStatus}.`);
    } catch (err: unknown) {
      toast.error("Failed to update status: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete ${selectedIds.length} selected user(s)?`)) {
      return;
    }
    try {
      await Promise.all(
        selectedIds.map((id) => {
          const u = users.find((x) => x.id === id);
          return deleteProfileMutation.mutateAsync({ id, name: u?.name });
        })
      );
      toast.success(`Deleted ${selectedIds.length} user(s).`);
      setSelectedIds([]);
    } catch {
      toast.error("Failed to delete selected users.");
    }
  };

  const handleBulkStatus = async (status: "Active" | "Inactive") => {
    try {
      await Promise.all(
        selectedIds.map((id) => updateProfileMutation.mutateAsync({ id, status }))
      );
      toast.success(`Updated ${selectedIds.length} user(s) to ${status}.`);
      setSelectedIds([]);
    } catch {
      toast.error("Failed to update status for selected users.");
    }
  };

  const handleExportCsv = () => {
    exportToCsv(
      "users-and-roles",
      filteredUsers.map((u) => ({
        Name: u.name,
        Email: u.email,
        Title: u.title || "",
        Role: u.role,
        Status: u.status,
        "Last Login": u.lastLogin,
      }))
    );
    toast.success("Exported users list to CSV.");
  };

  const handleExportPdf = () => {
    exportToPdf(
      "Russell Technologies — Team Users & Roles",
      ["Name", "Email", "Role", "Status", "Last Login"],
      filteredUsers.map((u) => [u.name, u.email, u.role, u.status, u.lastLogin])
    );
    toast.success("Generated PDF export.");
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Users & Roles
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage team members, assign roles and permissions, and control access to your platform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0 cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard
          title="Total Users"
          value={users.length}
          change="+20%"
          note="+2 this month"
          icon={Users2}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="User Roles"
          value={5}
          change="0%"
          changeType="neutral"
          note="vs last month"
          icon={Shield}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
        <AdminStatCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length}
          change="+25%"
          note="vs last month"
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Inactive Users"
          value={users.filter((u) => u.status === "Inactive").length}
          change="0%"
          changeType="neutral"
          note="vs last month"
          icon={UserX}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* TABS */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-6 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "users" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users2 className="size-4" /> Users ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("roles")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "roles" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Shield className="size-4" /> Roles & Permissions
        </button>
      </div>

      {/* ROLES & PERMISSIONS TAB VIEW */}
      {activeTab === "roles" ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Role Permissions Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">Granular access rights configured for each system role.</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 w-fit">
              <ShieldCheck className="size-3.5" /> Enforced via Supabase RLS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-3">Content Management</th>
                  <th className="py-3 px-3">Media Library</th>
                  <th className="py-3 px-3">User Admin</th>
                  <th className="py-3 px-3">Site Settings</th>
                  <th className="py-3 px-3">Analytics & Reports</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { role: "Super Admin", content: "Full Control", media: "Full Control", users: "Full Control", settings: "Full Control", analytics: "Full Access" },
                  { role: "Administrator", content: "Full Control", media: "Full Control", users: "Edit / Invite", settings: "Standard", analytics: "Full Access" },
                  { role: "Editor", content: "Publish & Edit", media: "Upload & Edit", users: "View Only", settings: "No Access", analytics: "Content Only" },
                  { role: "Author", content: "Create & Edit Own", media: "Upload Own", users: "No Access", settings: "No Access", analytics: "Own Stats" },
                  { role: "Contributor", content: "Draft Only", media: "Upload Allowed", users: "No Access", settings: "No Access", analytics: "No Access" },
                ].map((row) => (
                  <tr key={row.role} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <AdminRoleBadge role={row.role as AdminUser["role"]} />
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{row.content}</td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{row.media}</td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{row.users}</td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{row.settings}</td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{row.analytics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* USERS TAB VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* USERS TABLE CONTAINER (75%) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* SEARCH & FILTERS */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Editor">Editor</option>
                  <option value="Author">Author</option>
                  <option value="Contributor">Contributor</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
                  title="Export to CSV"
                >
                  <FileSpreadsheet className="size-3.5 text-emerald-600" /> Export CSV
                </button>

                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
                  title="Export to PDF"
                >
                  <Printer className="size-3.5 text-blue-600" /> PDF
                </button>
              </div>
            </div>

            {/* BULK ACTIONS BAR */}
            {selectedIds.length > 0 && (
              <div className="flex items-center justify-between text-xs text-blue-900 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl">
                <span className="font-bold">{selectedIds.length} user(s) selected</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBulkStatus("Active")}
                    disabled={updateProfileMutation.isPending}
                    className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition cursor-pointer disabled:opacity-50"
                  >
                    Mark Active
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBulkStatus("Inactive")}
                    disabled={updateProfileMutation.isPending}
                    className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition cursor-pointer disabled:opacity-50"
                  >
                    Mark Inactive
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={deleteProfileMutation.isPending}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition cursor-pointer disabled:opacity-50"
                  >
                    {deleteProfileMutation.isPending ? "Deleting..." : "Delete Selected"}
                  </button>
                </div>
              </div>
            )}

            {/* USERS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={() =>
                            setSelectedIds(selectedIds.length === filteredUsers.length ? [] : filteredUsers.map((u) => u.id))
                          }
                          className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </th>
                      <th className="py-4 px-2">Name</th>
                      <th className="py-4 px-3">Email</th>
                      <th className="py-4 px-3">Role</th>
                      <th className="py-4 px-3">Status</th>
                      <th className="py-4 px-3">Last Login</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No users found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isChecked = selectedIds.includes(u.id);
                        return (
                          <tr key={u.id} className="hover:bg-slate-50/70 transition">
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelect(u.id)}
                                className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-3">
                                {u.avatar ? (
                                  <img src={u.avatar} alt={u.name} className="size-8 rounded-full object-cover shrink-0" />
                                ) : (
                                  <div className="size-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                                    {u.initials}
                                  </div>
                                )}
                                <div>
                                  <p className="font-bold text-slate-800">{u.name}</p>
                                  <p className="text-[11px] text-slate-400">{u.title || "Team Member"}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-slate-600 font-medium">{u.email}</td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <AdminRoleBadge role={u.role} />
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <AdminStatusBadge status={u.status} />
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap text-slate-500">{u.lastLogin}</td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(u)}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md transition cursor-pointer"
                                  title="Toggle status"
                                >
                                  {u.status === "Active" ? "Deactivate" : "Activate"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(u)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                                  title="Edit user"
                                >
                                  <Edit2 className="size-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title="Delete user"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION / FOOTER */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <p>Showing {filteredUsers.length} of {users.length} users</p>
                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-lg border border-slate-200 font-bold text-slate-700 bg-slate-50">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (25%) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* ROLE OVERVIEW */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Shield className="size-4 text-blue-600" /> Role Overview
              </h3>

              <div className="space-y-2.5 text-xs divide-y divide-slate-100">
                {[
                  { role: "Super Admin", count: users.filter((u) => u.role === "Super Admin").length, desc: "Full access to all features and settings", color: "bg-purple-500" },
                  { role: "Administrator", count: users.filter((u) => u.role === "Administrator").length, desc: "Manage content, users and settings", color: "bg-rose-500" },
                  { role: "Editor", count: users.filter((u) => u.role === "Editor").length, desc: "Create and edit content, manage media", color: "bg-blue-500" },
                  { role: "Author", count: users.filter((u) => u.role === "Author").length, desc: "Create and manage their own content", color: "bg-emerald-500" },
                  { role: "Contributor", count: users.filter((u) => u.role === "Contributor").length, desc: "Create content (requires review)", color: "bg-amber-500" },
                ].map((r, i) => (
                  <div key={r.role} className={`${i > 0 ? "pt-2.5" : ""} space-y-0.5`}>
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <span className={`size-2 rounded-full ${r.color}`} />
                        {r.role}
                      </span>
                      <span className="text-slate-500 font-normal">{r.count} {r.count === 1 ? "user" : "users"}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-3.5 leading-tight">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Clock className="size-4 text-blue-600" /> Recent Activity
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: "Super Admin", action: "Active session connected", time: "Just now" },
                  { name: "Chioma Okafor", action: "Published blog article", time: "3 hours ago" },
                  { name: "Tunde Adebayo", action: "Updated newsletter digest", time: "5 hours ago" },
                  { name: "Ibrahim Bello", action: "Reviewed comments", time: "1 day ago" },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="size-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {act.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800 leading-tight">{act.name}</p>
                      <p className="text-[11px] text-slate-500 leading-tight">{act.action}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-2 text-xs">
              <h3 className="font-bold text-sm text-slate-800 mb-3">Quick Actions</h3>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 cursor-pointer transition"
              >
                <span className="flex items-center gap-2 text-blue-600"><Plus className="size-3.5" /> Add New User</span>
                <span className="text-slate-400">›</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("roles")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 cursor-pointer transition"
              >
                <span className="flex items-center gap-2 text-blue-600"><Shield className="size-3.5" /> View Permissions</span>
                <span className="text-slate-400">›</span>
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 cursor-pointer transition"
              >
                <span className="flex items-center gap-2 text-blue-600"><Download className="size-3.5" /> Export Users CSV</span>
                <span className="text-slate-400">›</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ ADD USER MODAL ═══════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New User</h3>
                <p className="text-xs text-slate-500">Create a new team member with assigned role and access.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Johnson"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. grace.johnson@russelltechnologies.org"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title / Department</label>
                <input
                  type="text"
                  placeholder="e.g. Content Lead / Tech Editor"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={addRole}
                    onChange={(e) => setAddRole(e.target.value as AdminUser["role"])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 bg-white text-slate-800 cursor-pointer font-medium"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Editor">Editor</option>
                    <option value="Author">Author</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={addStatus}
                    onChange={(e) => setAddStatus(e.target.value as AdminUser["status"])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 bg-white text-slate-800 cursor-pointer font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Initial Password <span className="text-slate-400 font-normal">(optional, min 6 characters)</span>
                </label>
                <input
                  type="password"
                  placeholder="Leave blank or enter secure password"
                  value={addPassword}
                  onChange={(e) => setAddPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProfileMutation.isPending}
                  className="px-5 py-2 bg-[#0062ff] hover:bg-blue-600 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {createProfileMutation.isPending && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{createProfileMutation.isPending ? "Creating..." : "Create User"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════ EDIT USER MODAL ═══════════════ */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-base font-bold text-slate-900">Edit User Details</h3>
                <p className="text-xs text-slate-500">Update profile information and assign system role.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title / Department</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Tech Analyst"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as AdminUser["role"])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 bg-white text-slate-800 cursor-pointer font-medium"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Editor">Editor</option>
                    <option value="Author">Author</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as AdminUser["status"])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 bg-white text-slate-800 cursor-pointer font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="px-5 py-2 bg-[#0062ff] hover:bg-blue-600 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {updateProfileMutation.isPending && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{updateProfileMutation.isPending ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
