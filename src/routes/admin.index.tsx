import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  LayoutGrid,
  Mail,
  Calendar,
  Activity,
  ArrowRight,
  Eye,
  MessageSquare,
  MoreVertical,
  Video,
  MapPin,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminDateFilter,
  AdminStatusBadge,
} from "@/components/admin/AdminComponents";
import {
  adminOverviewMetrics,
  websiteActivityChartData,
  upcomingAdminEvents,
  adminBlogPosts,
  adminSubscribers,
} from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/")({
  head: () => meta("Admin Dashboard — Russell Technologies", "Overview of performance, content, events, and subscribers."),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const recentPosts = adminBlogPosts.slice(0, 5);
  const recentSubscribers = adminSubscribers.slice(0, 3);

  return (
    <AdminLayout>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, Admin <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's happening with your website and content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AdminDateFilter dateText="Sep 1, 2026 – Sep 30, 2026" />
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <AdminStatCard
          title="Total Blog Posts"
          value={adminOverviewMetrics.totalBlogPosts.value}
          change={adminOverviewMetrics.totalBlogPosts.change}
          changeType={adminOverviewMetrics.totalBlogPosts.changeType}
          note={adminOverviewMetrics.totalBlogPosts.note}
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Web Pages"
          value={adminOverviewMetrics.webPages.value}
          change={adminOverviewMetrics.webPages.change}
          changeType={adminOverviewMetrics.webPages.changeType}
          note={adminOverviewMetrics.webPages.note}
          icon={LayoutGrid}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Newsletter Signups"
          value="1,250"
          change={adminOverviewMetrics.newsletterSignups.change}
          changeType={adminOverviewMetrics.newsletterSignups.changeType}
          note={adminOverviewMetrics.newsletterSignups.note}
          icon={Mail}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Events"
          value={adminOverviewMetrics.events.value}
          change={adminOverviewMetrics.events.change}
          changeType={adminOverviewMetrics.events.changeType}
          note={adminOverviewMetrics.events.note}
          icon={Calendar}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ACTIVITY & BLOG POSTS (~65% width) */}
        <div className="lg:col-span-8 space-y-6">
          {/* WEBSITE ACTIVITY CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Activity className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Website Activity</h3>
                  <p className="text-xs text-slate-500">Page views, visitors and engagement over time.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 focus:outline-hidden">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>

            {/* METRICS SUMMARY CALLOUT */}
            <div className="flex flex-wrap items-center gap-6 mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#0062ff]" />
                <span className="text-xs text-slate-500">Page Views</span>
                <span className="text-sm font-extrabold text-slate-900 ml-1">28,450</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">↑ 22%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#10b981]" />
                <span className="text-xs text-slate-500">Unique Visitors</span>
                <span className="text-sm font-extrabold text-slate-900 ml-1">12,380</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">↑ 18%</span>
              </div>
            </div>

            {/* RECHARTS ACTIVITY CHART */}
            <div className="h-64 sm:h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={websiteActivityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0062ff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0062ff" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    labelStyle={{ fontWeight: "bold", color: "#0f172a" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    name="Page Views"
                    stroke="#0062ff"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#pageViewsGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="uniqueVisitors"
                    name="Unique Visitors"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#visitorsGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT BLOG POSTS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Recent Blog Posts</h3>
              </div>
              <Link
                to="/admin/blog-posts"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 px-2 rounded-xl transition">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="size-11 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      <Link
                        to="/admin/blog-posts"
                        className="font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 truncate block transition"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-400">{post.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <AdminStatusBadge status={post.status} />
                    <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs">
                      <Eye className="size-3.5" />
                      <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}K` : post.views}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs">
                      <MessageSquare className="size-3.5" />
                      <span>{post.commentsCount}</span>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <MoreVertical className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVENTS & NEWSLETTER (~35% width) */}
        <div className="lg:col-span-4 space-y-6">
          {/* UPCOMING EVENTS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Calendar className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Upcoming Events</h3>
              </div>
              <Link
                to="/admin/events"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {upcomingAdminEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 flex items-start gap-3 transition"
                >
                  {/* DATE BADGE */}
                  <div className="shrink-0 flex flex-col items-center justify-center size-12 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-700">
                    <span className="text-[10px] font-bold uppercase leading-none tracking-wider">{evt.monthBadge}</span>
                    <span className="text-base font-extrabold leading-tight mt-0.5">{evt.dayBadge}</span>
                  </div>

                  {/* EVENT DETAILS */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">{evt.title}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        {evt.type === "Online" ? <Video className="size-3 text-blue-500" /> : <MapPin className="size-3 text-emerald-500" />}
                        {evt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3 text-slate-400" />
                        {evt.registeredCount} registered
                      </span>
                    </div>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER SUBSCRIBERS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <Mail className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Newsletter Subscribers</h3>
              </div>
              <Link
                to="/admin/newsletter"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* SUBSCRIBERS STAT & MINI BARS */}
            <div className="flex items-end justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">1,250</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 18%</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Total subscribers</p>
              </div>

              {/* MINI BAR CHART */}
              <div className="flex items-end gap-1 h-9">
                {[30, 45, 35, 60, 50, 75, 65, 80, 95].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-blue-500 rounded-xs transition-all hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* RECENT SIGNUPS */}
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">Recent Signups</p>
            <div className="space-y-3">
              {recentSubscribers.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {sub.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate">{sub.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{sub.email}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{sub.dateSubscribed.split(",")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
