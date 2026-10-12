import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Globe,
  Clock,
  Archive,
  Edit,
  Copy,
  ExternalLink,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Home,
  Tag,
  Shield,
  Eye,
  CheckCircle2,
  Navigation,
  Settings,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminStatusBadge,
} from "@/components/admin/AdminComponents";
import { adminWebPages, AdminWebPage } from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/web-pages/")({
  head: () => meta("Web Pages — Admin Dashboard", "Manage all pages on your website."),
  component: AdminWebPagesPage,
});

function AdminWebPagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPage, setSelectedPage] = useState<AdminWebPage>(adminWebPages[0]);
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);

  const filteredPages = adminWebPages.filter((page) => {
    if (selectedStatus !== "all" && page.status !== selectedStatus) return false;
    if (selectedType !== "all" && page.type !== selectedType) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return page.title.toLowerCase().includes(q) || page.path.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelectPage = (id: string) => {
    setSelectedPageIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const getPageTypeIcon = (type: string) => {
    switch (type) {
      case "Homepage":
        return <Home className="size-3.5 text-blue-600" />;
      case "Product Page":
        return <Tag className="size-3.5 text-amber-600" />;
      case "Blog Index":
        return <FileText className="size-3.5 text-purple-600" />;
      case "Legal Page":
        return <Shield className="size-3.5 text-emerald-600" />;
      default:
        return <FileText className="size-3.5 text-slate-500" />;
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Web Pages
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage all the pages on your website. Create, edit, and organize your content.
            </p>
          </div>
        </div>

        <Link
          to="/admin/web-pages/edit"
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="size-4" />
          <span>Create New Page</span>
        </Link>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard
          title="Total Pages"
          value={12}
          change="+20%"
          note="+2 this month"
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Published"
          value={10}
          change="+25%"
          note="+2 this month"
          icon={Globe}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Drafts"
          value={1}
          change="0%"
          changeType="neutral"
          note="0 this month"
          icon={Clock}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Archived"
          value={1}
          change="0%"
          changeType="neutral"
          note="0 this month"
          icon={Archive}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: TABLE (75%) + DETAILS SIDEBAR (25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search pages by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden"
              >
                <option value="all">All Page Types</option>
                <option value="Homepage">Homepage</option>
                <option value="Standard">Standard</option>
                <option value="Product Page">Product Page</option>
                <option value="Blog Index">Blog Index</option>
                <option value="Legal Page">Legal Page</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button className="p-1 rounded-lg bg-blue-600 text-white shadow-2xs">
                  <List className="size-3.5" />
                </button>
                <button className="p-1 rounded-lg text-slate-500 hover:text-slate-800">
                  <LayoutGrid className="size-3.5" />
                </button>
              </div>
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
                        checked={selectedPageIds.length === filteredPages.length && filteredPages.length > 0}
                        onChange={() =>
                          setSelectedPageIds(
                            selectedPageIds.length === filteredPages.length
                              ? []
                              : filteredPages.map((p) => p.id)
                          )
                        }
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-2">Page</th>
                    <th className="py-4 px-3">Type</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Last Updated</th>
                    <th className="py-4 px-3">Views</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPages.map((page) => {
                    const isSelected = selectedPage.id === page.id;
                    const isChecked = selectedPageIds.includes(page.id);
                    return (
                      <tr
                        key={page.id}
                        onClick={() => setSelectedPage(page)}
                        className={`hover:bg-slate-50/70 transition cursor-pointer ${
                          isSelected ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectPage(page.id)}
                            className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-2 max-w-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={page.image}
                              alt={page.title}
                              className="size-11 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-800 truncate block">
                                {page.title}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {page.path}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            {getPageTypeIcon(page.type)}
                            <span>{page.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <AdminStatusBadge status={page.status} />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                          {page.lastUpdated}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-slate-600">
                            <Eye className="size-3.5 text-slate-400" />
                            <span>{page.views >= 1000 ? `${(page.views / 1000).toFixed(1)}K` : page.views}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to="/admin/web-pages/edit"
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <Edit className="size-4" />
                            </Link>
                            <button
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              title="Duplicate"
                            >
                              <Copy className="size-4" />
                            </button>
                            <Link
                              to={page.path}
                              target="_blank"
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View page"
                            >
                              <ExternalLink className="size-4" />
                            </Link>
                            <button
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              title="More"
                            >
                              <MoreVertical className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <p>Showing 1 to {filteredPages.length} of {adminWebPages.length} pages</p>
              <div className="flex items-center gap-1.5">
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  2
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT DETAILS SIDEBAR */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* PAGE DETAILS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Page Details</h3>
              <Link
                to={selectedPage.path}
                target="_blank"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View Page <ExternalLink className="size-3" />
              </Link>
            </div>

            {/* PREVIEW IMAGE */}
            <div className="rounded-xl overflow-hidden border border-slate-100 relative">
              <img
                src={selectedPage.image}
                alt={selectedPage.title}
                className="w-full h-32 object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-slate-900">{selectedPage.title}</h4>
                <AdminStatusBadge status={selectedPage.status} />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedPage.path}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Main page of the Russell Technologies website showcasing modern infrastructure, products and solutions.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Page Type</span>
                <span className="font-semibold text-slate-800">{selectedPage.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Author</span>
                <span className="font-semibold text-slate-800">{selectedPage.lastUpdatedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Last Updated</span>
                <span className="font-semibold text-slate-800">Sep 10, 2026, 10:30 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Views</span>
                <span className="font-semibold text-slate-800">{selectedPage.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">SEO Status</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  ✦ {selectedPage.seoStatus}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link
                to="/admin/web-pages/edit"
                className="flex-1 text-center bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition"
              >
                Edit Page
              </Link>
              <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500">
                <MoreVertical className="size-4" />
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-sm text-slate-800 mb-3">Quick Actions</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/admin/web-pages/edit"
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Plus className="size-4 text-blue-600" /> Create New Page
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </Link>
              <button
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Navigation className="size-4 text-blue-600" /> Manage Navigation
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Search className="size-4 text-blue-600" /> SEO Settings
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
              <Link
                to="/"
                target="_blank"
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="size-4 text-blue-600" /> View Live Site
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
