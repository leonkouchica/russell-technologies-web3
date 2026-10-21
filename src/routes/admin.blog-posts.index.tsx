import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Edit,
  Copy,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FolderOpen,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatusBadge,
  AdminCategoryBadge,
} from "@/components/admin/AdminComponents";
import { adminBlogPosts, AdminBlogPost } from "@/lib/admin-data";
import { useBlogPosts, useDeleteBlogPost } from "@/hooks/use-admin-data";
import { toast } from "sonner";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/blog-posts/")({
  head: () => meta("Blog Posts — Admin Dashboard", "Manage, edit and publish blog posts."),
  component: AdminBlogPostsPage,
});

function AdminBlogPostsPage() {
  const { data: livePosts, isLoading } = useBlogPosts();
  const deleteMutation = useDeleteBlogPost();

  const allPosts: AdminBlogPost[] = (livePosts && livePosts.length > 0)
    ? livePosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        author: {
          name: p.author_name || "Admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        },
        date: p.created_at ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
        status: (p.status as AdminBlogPost["status"]) || "Draft",
        views: p.views ?? 0,
        commentsCount: 0,
        featured: p.featured ?? false,
        image: p.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        excerpt: p.excerpt ?? "",
      }))
    : adminBlogPosts;

  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft" | "scheduled" | "trash">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const statusCounts = {
    all: allPosts.length,
    published: allPosts.filter((p) => p.status === "Published").length,
    draft: allPosts.filter((p) => p.status === "Draft").length,
    scheduled: allPosts.filter((p) => p.status === "Scheduled").length,
    trash: 0,
  };

  const categories = [
    { name: "Education", count: 8 },
    { name: "Agriculture", count: 4 },
    { name: "Legal", count: 3 },
    { name: "Music", count: 3 },
    { name: "Technology", count: 4 },
    { name: "Business", count: 2 },
    { name: "Sustainability", count: 2 },
    { name: "Company News", count: 2 },
    { name: "Tips & Guides", count: 1 },
  ];

  const popularPosts = allPosts.slice(0, 3);

  const filteredPosts = allPosts.filter((post) => {
    if (activeTab === "published" && post.status !== "Published") return false;
    if (activeTab === "draft" && post.status !== "Draft") return false;
    if (activeTab === "scheduled" && post.status !== "Scheduled") return false;
    if (activeTab === "trash") return false;

    if (selectedCategory !== "all" && post.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && post.status !== selectedStatus) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectPost = (id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((p) => p.id));
    }
  };

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Blog Posts
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Create, edit, and manage your blog posts. Share insights, stories, and updates with your audience.
            </p>
          </div>
        </div>

        <Link
          to="/admin/blog-posts/create"
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="size-4" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* STATUS TABS */}
      <div className="flex items-center gap-2 sm:gap-6 border-b border-slate-200 mb-6 overflow-x-auto pb-1 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>All Posts</span>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
            {statusCounts.all}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("published")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "published"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Published</span>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
            {statusCounts.published}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "draft"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Drafts</span>
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold">
            {statusCounts.draft}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "scheduled"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Scheduled</span>
          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-bold">
            {statusCounts.scheduled}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("trash")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "trash"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Trash</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
            {statusCounts.trash}
          </span>
        </button>
      </div>

      {/* TWO-COLUMN LAYOUT: MAIN TABLE (75%) + SIDEBAR (25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* POSTS TABLE CONTAINER */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search blog posts by title, content or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden">
                <option>All Authors</option>
                <option>Admin</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Most Viewed</option>
              </select>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-2">Post</th>
                    <th className="py-4 px-3">Category</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Author</th>
                    <th className="py-4 px-3">Views</th>
                    <th className="py-4 px-3">Date</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((post) => {
                    const isSelected = selectedPosts.includes(post.id);
                    return (
                      <tr key={post.id} className={`hover:bg-slate-50/70 transition ${isSelected ? "bg-blue-50/30" : ""}`}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectPost(post.id)}
                            className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-2 max-w-sm">
                          <div className="flex items-start gap-3">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="size-12 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="min-w-0">
                              <Link
                                to="/admin/blog-posts/create"
                                className="font-bold text-slate-800 hover:text-blue-600 transition block truncate"
                              >
                                {post.title}
                              </Link>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <AdminCategoryBadge category={post.category} />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <AdminStatusBadge status={post.status} />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="size-6 rounded-full object-cover"
                            />
                            <span className="font-medium text-slate-700">{post.author.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-slate-600">
                            <Eye className="size-3.5 text-slate-400" />
                            <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}K` : post.views}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div>
                            <p className="text-slate-700 font-medium">{post.date}</p>
                            <p className="text-[10px] text-slate-400">{post.dateRelative}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to="/admin/blog-posts/create"
                              search={{ id: post.id }}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit post"
                            >
                              <Edit className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                  try {
                                    await deleteMutation.mutateAsync({ id: post.id });
                                    toast.success(`Deleted "${post.title}"`);
                                  } catch {
                                    toast.error("Failed to delete post");
                                  }
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete post"
                            >
                              <Trash2 className="size-4" />
                            </button>
                            <button
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              title="Duplicate"
                            >
                              <Copy className="size-4" />
                            </button>
                            <button
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              title="More options"
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

            {/* PAGINATION BAR */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <p>Showing 1 to {filteredPosts.length} of {adminBlogPosts.length} posts</p>
              <div className="flex items-center gap-1.5">
                <button
                  className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  2
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50">
                  6
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR WIDGETS */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* POST STATISTICS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-800">Post Statistics</h3>
              </div>
              <select className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 focus:outline-hidden">
                <option>Last 30 days</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Eye className="size-4" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-slate-900 leading-tight">28,450</p>
                    <p className="text-[11px] text-slate-400">Total Views</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 22%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <MessageSquare className="size-4" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-slate-900 leading-tight">320</p>
                    <p className="text-[11px] text-slate-400">Total Comments</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
              </div>
            </div>
          </div>

          {/* CATEGORIES CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-800">Categories</h3>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Manage</button>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {categories.map((c) => (
                <div key={c.name} className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">{c.name}</span>
                  <span className="text-xs font-bold text-slate-400">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* POPULAR POSTS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-800">Popular Posts</h3>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All <ArrowRight className="size-3" />
              </button>
            </div>
            <div className="space-y-3">
              {popularPosts.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="size-11 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs text-slate-800 truncate">{p.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
