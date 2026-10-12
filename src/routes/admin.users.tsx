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
  ShieldAlert,
  Clock,
  Key,
  FileCheck,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminStatusBadge,
  AdminRoleBadge,
} from "@/components/admin/AdminComponents";
import { adminUsers, AdminUser } from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/users")({
  head: () => meta("Users & Roles — Admin Dashboard", "Manage team access, permissions, and security roles."),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredUsers = adminUsers.filter((u) => {
    if (selectedRole !== "all" && u.role !== selectedRole) return false;
    if (selectedStatus !== "all" && u.status !== selectedStatus) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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
          onClick={() => alert("Open Add New User modal")}
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="size-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard
          title="Total Users"
          value={12}
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
          value={10}
          change="+25%"
          note="vs last month"
          icon={UserCheck}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Inactive Users"
          value={2}
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
          onClick={() => setActiveTab("users")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === "users" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users2 className="size-4" /> Users
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === "roles" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Shield className="size-4" /> Roles & Permissions
        </button>
      </div>

      {/* TWO-COLUMN GRID */}
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
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
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
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>

              <button
                onClick={() => alert("Exported users list")}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <Download className="size-3.5 text-slate-500" /> Export
              </button>
            </div>
          </div>

          {/* TABLE */}
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
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
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
                  {filteredUsers.map((u) => {
                    const isChecked = selectedIds.includes(u.id);
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelect(u.id)}
                            className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
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
                              <p className="text-[11px] text-slate-400">{u.title}</p>
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
                        <td className="py-3 px-4 text-right">
                          <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <MoreVertical className="size-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <p>Showing 1 to {filteredUsers.length} of 12 users</p>
              <div className="flex items-center gap-1.5">
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">1</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">2</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">
                  <ChevronRight className="size-4" />
                </button>
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
                { role: "Super Admin", count: "1 user", desc: "Full access to all features and settings", color: "bg-purple-500" },
                { role: "Administrator", count: "2 users", desc: "Manage content, users and settings", color: "bg-rose-500" },
                { role: "Editor", count: "3 users", desc: "Create and edit content, manage media", color: "bg-blue-500" },
                { role: "Author", count: "3 users", desc: "Create and manage their own content", color: "bg-emerald-500" },
                { role: "Contributor", count: "2 users", desc: "Create content (requires review)", color: "bg-amber-500" },
                { role: "Subscriber", count: "1 user", desc: "Read-only access", color: "bg-slate-400" },
              ].map((r, i) => (
                <div key={r.role} className={`${i > 0 ? "pt-2.5" : ""} space-y-0.5`}>
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${r.color}`} />
                      {r.role}
                    </span>
                    <span className="text-slate-500 font-normal">{r.count}</span>
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
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: "Admin User", action: "Updated role for Grace Johnson", time: "2 hours ago" },
                { name: "Chioma Okafor", action: "Created new user account", time: "5 hours ago" },
                { name: "Tunde Adebayo", action: "Logged in", time: "Sep 29, 2026" },
                { name: "Ibrahim Bello", action: "Updated profile information", time: "Sep 28, 2026" },
                { name: "Nkechi Eze", action: "Changed password", time: "Sep 27, 2026" },
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
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Plus className="size-3.5" /> Add New User</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Shield className="size-3.5" /> Manage Roles</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Key className="size-3.5" /> Set Permissions</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Download className="size-3.5" /> Export Users</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Clock className="size-3.5" /> User Activity Log</span>
              <span className="text-slate-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
