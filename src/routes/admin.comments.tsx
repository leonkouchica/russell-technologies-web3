import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatusBadge } from "@/components/admin/AdminComponents";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/comments")({
  head: () => meta("Comments — Admin Dashboard", "Moderate and respond to article comments."),
  component: AdminCommentsPage,
});

interface CommentItem {
  id: string;
  author: string;
  email: string;
  postTitle: string;
  comment: string;
  date: string;
  status: "Published" | "Pending" | "Trash";
}

const mockComments: CommentItem[] = [
  {
    id: "c-1",
    author: "Adeola Adebisi",
    email: "adeola@example.com",
    postTitle: "How Technology is Transforming Education in African Schools",
    comment: "EDUPRO has been transformative for our primary and secondary branches. Thank you for this breakdown!",
    date: "Sep 10, 2026, 11:20 AM",
    status: "Published",
  },
  {
    id: "c-2",
    author: "Emeka Obi",
    email: "emeka@example.com",
    postTitle: "Building Stronger Agricultural Value Chains in Africa",
    comment: "Can individual aggregators register directly with FARMSPOTS, or is it cooperative-only?",
    date: "Sep 9, 2026, 4:15 PM",
    status: "Pending",
  },
  {
    id: "c-3",
    author: "Fatima Bello",
    email: "fatima@example.com",
    postTitle: "Understanding Compliance for Growing Businesses in Africa",
    comment: "Great point on cross-border tax compliance across ECOWAS. Very helpful read.",
    date: "Sep 8, 2026, 2:40 PM",
    status: "Published",
  },
  {
    id: "c-4",
    author: "David Kalu",
    email: "david@example.com",
    postTitle: "The Role of Data in Building Smarter Businesses",
    comment: "Would love to see an article discussing local cloud data centers vs international cloud providers.",
    date: "Sep 6, 2026, 9:15 AM",
    status: "Pending",
  },
];

function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>(mockComments);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleApprove = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "Published" } : c)));
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const filtered = comments.filter((c) => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      return (
        c.author.toLowerCase().includes(q) ||
        c.comment.toLowerCase().includes(q) ||
        c.postTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comments Moderation
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review, approve, and respond to reader comments on your blog posts.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* FILTERS */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search comments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
            >
              <option value="all">All Comments</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* LIST */}
        <div className="divide-y divide-slate-100">
          {filtered.map((item) => (
            <div key={item.id} className="p-5 hover:bg-slate-50/50 transition flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{item.author}</span>
                  <span className="text-[11px] text-slate-400">({item.email})</span>
                  <span className="text-[11px] text-slate-400">• {item.date}</span>
                  <AdminStatusBadge status={item.status} />
                </div>
                <p className="text-xs font-semibold text-blue-600">On: {item.postTitle}</p>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status !== "Published" && (
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1"
                  >
                    <CheckCircle className="size-3.5" /> Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
