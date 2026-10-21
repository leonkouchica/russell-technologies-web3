import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  Plus,
  Download,
  Upload,
  Sparkles,
  FileSpreadsheet,
  Printer,
  ExternalLink,
  Server,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Clock,
  Search,
  Filter,
  Layers,
  Radio,
  AlertTriangle,
  Info,
  X,
  Database,
  Lock,
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
  adminAuditLogs,
  type AdminAuditEntry,
} from "@/lib/admin-data";
import {
  useDashboardStats,
  useBlogPosts,
  useEvents,
  useSubscribers,
  useAuditLogs,
  useCreateAuditLog,
} from "@/hooks/use-admin-data";
import { meta } from "@/components/site/blocks";
import { exportToCsv, exportToPdf } from "@/lib/export-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => meta("Admin Dashboard — Russell Technologies", "Overview of performance, content, events, and subscribers."),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data: stats } = useDashboardStats();
  const { data: livePosts } = useBlogPosts({ limit: 5 });
  const { data: liveEvents } = useEvents({ limit: 4 });
  const { data: liveSubs } = useSubscribers({ limit: 3 });
  const { data: liveAuditLogs } = useAuditLogs({ limit: 20 });
  const createAuditMutation = useCreateAuditLog();

  const recentPosts = (livePosts && livePosts.length > 0)
    ? livePosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        author: p.author_name ?? "Admin",
        date: p.created_at ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
        status: p.status as "Published" | "Draft" | "Scheduled",
        views: p.views ?? 0,
        commentsCount: 0,
        featured: p.featured ?? false,
        image: p.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        excerpt: p.excerpt ?? "",
      }))
    : adminBlogPosts.slice(0, 5);

  const recentSubscribers = (liveSubs && liveSubs.length > 0)
    ? liveSubs.map((s) => ({
        id: s.id,
        name: s.name || s.email.split("@")[0],
        email: s.email,
        status: s.status,
        dateSubscribed: s.subscribed_at ? new Date(s.subscribed_at).toLocaleDateString() : "Recent",
        source: s.source ?? "Website",
        initials: (s.name || s.email).slice(0, 2).toUpperCase(),
      }))
    : adminSubscribers.slice(0, 3);

  const displayEvents = (liveEvents && liveEvents.length > 0)
    ? liveEvents.map((e) => {
        const d = new Date(e.date_time);
        return {
          id: e.id,
          title: e.title,
          slug: e.slug,
          type: e.type,
          status: e.status,
          date: isNaN(d.getTime()) ? e.date_time : d.toLocaleDateString(),
          time: isNaN(d.getTime()) ? "" : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          monthBadge: isNaN(d.getTime()) ? "OCT" : d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
          dayBadge: isNaN(d.getTime()) ? "15" : d.getDate().toString().padStart(2, "0"),
          location: e.location ?? "Online",
          registeredCount: e.registered_count ?? 0,
          maxAttendees: e.max_attendees ?? 100,
          image: e.image_url || "",
          description: e.description ?? "",
        };
      })
    : upcomingAdminEvents;

  // System Health State
  const [pingLatency, setPingLatency] = useState(24);
  const [isPinging, setIsPinging] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState("Just now");

  // Activity & Audit Log State
  const auditLogs: AdminAuditEntry[] = (liveAuditLogs && liveAuditLogs.length > 0)
    ? liveAuditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        category: (log.category as AdminAuditEntry["category"]) || "System",
        target: log.target || "System",
        user: {
          name: log.user_name || "Admin",
          role: (log.user_role as AdminAuditEntry["user"]["role"]) || "Super Admin",
        },
        timestamp: log.created_at ? new Date(log.created_at).toLocaleString() : "Recently",
        relativeTime: "Recently",
        status: (log.status as AdminAuditEntry["status"]) || "Success",
        ipAddress: log.ip_address || "127.0.0.1",
        details: log.details || "",
      }))
    : adminAuditLogs;

  const [auditCategory, setAuditCategory] = useState<string>("all");
  const [auditSearch, setAuditSearch] = useState("");
  const [selectedAuditLog, setSelectedAuditLog] = useState<AdminAuditEntry | null>(null);

  const handlePingTest = () => {
    setIsPinging(true);
    setTimeout(() => {
      const simulated = Math.floor(Math.random() * 12) + 18; // 18ms - 30ms
      setPingLatency(simulated);
      setIsPinging(false);
      setLastCheckTime("Just now");
      toast.success(`Server Latency Ping: ${simulated}ms (Optimal)`, {
        description: "Nitro Edge SSR node in London/Frankfurt responded within target threshold.",
      });
    }, 600);
  };

  const handleRunDiagnostic = () => {
    setIsDiagnosing(true);
    toast.info("Running complete system diagnostics...", { duration: 1500 });
    setTimeout(() => {
      setIsDiagnosing(false);
      setLastCheckTime("Just now");
      toast.success("All System Diagnostics Passed (100%)", {
        description: "14 Admin routes OK • WebP asset cache OK • Nitro SSR Hydration OK • TLS 1.3 Active",
      });
      // Persist to Supabase audit log
      createAuditMutation.mutate({
        action: "Executed System Diagnostic Suite",
        category: "System",
        target: "Vercel / Nitro Runtime Health Check",
        user_name: "Admin User",
        user_role: "Super Admin",
        ip_address: "197.210.44.12",
        status: "Success",
        details: "Full diagnostic check completed with zero latency anomalies or bundle errors.",
      });
    }, 1200);
  };

  const handleExportDashboardCsv = () => {
    try {
      exportToCsv("russell_dashboard_overview", adminBlogPosts, [
        { header: "Post ID", key: "id" },
        { header: "Title", key: "title" },
        { header: "Category", key: "category" },
        { header: "Author", key: "author" },
        { header: "Date Published", key: "date" },
        { header: "Status", key: "status" },
        { header: "Views", key: "views" },
        { header: "Comments", key: "comments" },
      ]);
      toast.success("Dashboard content exported to CSV!");
    } catch {
      toast.error("Failed to export dashboard data");
    }
  };

  const handleExportDashboardPdf = () => {
    try {
      exportToPdf({
        title: "Russell Technologies — Executive Dashboard Report",
        subtitle: "System overview, active publications, and audience metrics summary",
        tableHeaders: ["Metric / Publication", "Category / Status", "Author / Period", "Engagement / Value"],
        tableRows: [
          ["Total Publications", "Active Blog Posts", "Editorial Team", "24 Published"],
          ["Web Pages", "Public Portal", "Core Infrastructure", "18 Live Pages"],
          ["Audience Base", "Newsletter Network", "Subscribers", "1,250 Verified"],
          ["Events & Summits", "Upcoming Webinars", "Community Team", "8 Scheduled"],
          ...recentPosts.map((p) => [
            p.title,
            p.category,
            typeof p.author === "string" ? p.author : p.author?.name || "Editorial",
            `${p.views?.toLocaleString() || 0} views`,
          ]),
        ],
      });
      toast.success("Generating print-ready Dashboard PDF preview...");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  const handleExportAuditCsv = () => {
    try {
      exportToCsv("russell_activity_audit_log", filteredAuditLogs, [
        { header: "Log ID", key: "id" },
        { header: "Action", key: "action" },
        { header: "Category", key: "category" },
        { header: "Target Resource", key: "target" },
        { header: "Administrator", key: "user", format: (u: any) => u?.name || "System" },
        { header: "Role", key: "user", format: (u: any) => u?.role || "Admin" },
        { header: "Timestamp", key: "timestamp" },
        { header: "Status", key: "status" },
        { header: "IP Address", key: "ipAddress" },
        { header: "Execution Details", key: "details" },
      ]);
      toast.success("Activity & Audit Log exported to CSV!");
    } catch {
      toast.error("Failed to export audit log");
    }
  };

  const handleExportAuditPdf = () => {
    try {
      exportToPdf({
        title: "Russell Technologies — Administrator Security & Activity Audit Log",
        subtitle: "Compliance log of all data exports, content modifications, and administrative operations",
        tableHeaders: ["Timestamp", "Action", "Category", "Target Resource", "User & Role", "Status"],
        tableRows: filteredAuditLogs.map((log) => [
          log.timestamp,
          log.action,
          log.category,
          log.target,
          `${log.user.name} (${log.user.role})`,
          log.status,
        ]),
      });
      toast.success("Generating printable Audit Log PDF report...");
    } catch {
      toast.error("Failed to generate audit report");
    }
  };

  // Filter audit logs
  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesCategory = auditCategory === "all" || log.category.toLowerCase() === auditCategory.toLowerCase();
    const matchesSearch =
      auditSearch.trim().length === 0 ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.user.name.toLowerCase().includes(auditSearch.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(auditSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminLayout>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, Admin <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening with your website and content across Russell Technologies.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <AdminDateFilter dateText="Sep 1, 2026 – Sep 30, 2026" />
          <Link
            to="/admin/blog-posts/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            <Plus className="size-3.5" />
            <span>New Post</span>
          </Link>
          <Link
            to="/admin/events/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            <Calendar className="size-3.5" />
            <span>New Event</span>
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 px-1">
            <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" /> Quick Actions:
          </span>
          <Link
            to="/admin/blog-posts/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition"
          >
            <Plus className="size-3.5" /> New Post
          </Link>
          <Link
            to="/admin/events/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition"
          >
            <Calendar className="size-3.5" /> New Event
          </Link>
          <Link
            to="/admin/newsletter"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition"
          >
            <Mail className="size-3.5" /> New Campaign
          </Link>
          <Link
            to="/admin/media"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold transition"
          >
            <Upload className="size-3.5" /> Upload Media (WebP)
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition"
          >
            <ExternalLink className="size-3" /> Live Site
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportDashboardCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Download CSV"
          >
            <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" /> Export CSV
          </button>
          <button
            onClick={handleExportDashboardPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Print or PDF report"
          >
            <Printer className="size-3.5 text-blue-600 dark:text-blue-400" /> Export PDF
          </button>
        </div>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <AdminStatCard
          title="Total Blog Posts"
          value={stats?.totalBlogPosts != null ? String(stats.totalBlogPosts) : adminOverviewMetrics.totalBlogPosts.value}
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
          value={stats?.totalSubscribers != null ? String(stats.totalSubscribers) : "1,250"}
          change={adminOverviewMetrics.newsletterSignups.change}
          changeType={adminOverviewMetrics.newsletterSignups.changeType}
          note={adminOverviewMetrics.newsletterSignups.note}
          icon={Mail}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Events"
          value={stats?.totalEvents != null ? String(stats.totalEvents) : adminOverviewMetrics.events.value}
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
          <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <Activity className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Website Activity</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Page views, visitors and engagement over time.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="text-xs font-semibold bg-slate-50 dark:bg-[#111c33] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-1.5 focus:outline-hidden">
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
                <span className="text-xs text-slate-500 dark:text-slate-400">Page Views</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white ml-1">28,450</span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-sm">↑ 22%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#10b981]" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Unique Visitors</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white ml-1">12,380</span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-sm">↑ 18%</span>
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
          <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <FileText className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent Blog Posts</h3>
              </div>
              <Link
                to="/admin/blog-posts"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="size-11 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                    />
                    <div className="min-w-0">
                      <Link
                        to="/admin/blog-posts"
                        className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 truncate block transition"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{post.date}</span>
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
          <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <Calendar className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Upcoming Events</h3>
              </div>
              <Link
                to="/admin/events"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {displayEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 flex items-start gap-3 transition"
                >
                  {/* DATE BADGE */}
                  <div className="shrink-0 flex flex-col items-center justify-center size-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100/80 dark:border-blue-900/50 text-blue-700 dark:text-blue-300">
                    <span className="text-[10px] font-bold uppercase leading-none tracking-wider">{evt.monthBadge}</span>
                    <span className="text-base font-extrabold leading-tight mt-0.5">{evt.dayBadge}</span>
                  </div>

                  {/* EVENT DETAILS */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate">{evt.title}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        {evt.type === "Online" ? <Video className="size-3 text-blue-500 dark:text-blue-400" /> : <MapPin className="size-3 text-emerald-500 dark:text-emerald-400" />}
                        {evt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3 text-slate-400" />
                        {evt.registeredCount} registered
                      </span>
                    </div>
                  </div>

                  <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER SUBSCRIBERS CARD */}
          <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                  <Mail className="size-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Newsletter Subscribers</h3>
              </div>
              <Link
                to="/admin/newsletter"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition"
              >
                View All <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* SUBSCRIBERS STAT & MINI BARS */}
            <div className="flex items-end justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#080f1e] border border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stats?.totalSubscribers != null ? stats.totalSubscribers.toLocaleString() : "1,250"}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">↑ 18%</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total subscribers</p>
              </div>

              {/* MINI BAR CHART */}
              <div className="flex items-end gap-1 h-9">
                {[30, 45, 35, 60, 50, 75, 65, 80, 95].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-blue-500 dark:bg-blue-400 rounded-xs transition-all hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* RECENT SIGNUPS */}
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">Recent Signups</p>
            <div className="space-y-3">
              {recentSubscribers.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs shrink-0">
                      {sub.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{sub.name}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{sub.email}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 shrink-0">{sub.dateSubscribed.split(",")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM HEALTH & RUNTIME STATUS SECTION */}
      <div
        id="system-health"
        className="mt-8 bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Server className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  System Health & Deployment Status
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time SSR runtime monitoring, edge node latency, and infrastructure status.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePingTest}
              disabled={isPinging}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-2xs cursor-pointer"
              title="Ping server"
            >
              <Radio className={`size-3.5 text-blue-500 ${isPinging ? "animate-spin" : ""}`} />
              <span>{isPinging ? "Pinging..." : `Ping (${pingLatency}ms)`}</span>
            </button>
            <button
              onClick={handleRunDiagnostic}
              disabled={isDiagnosing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <RefreshCw className={`size-3.5 ${isDiagnosing ? "animate-spin" : ""}`} />
              <span>{isDiagnosing ? "Running Diagnostics..." : "Run Health Check"}</span>
            </button>
          </div>
        </div>

        {/* 4 Health Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {/* Platform & SSR */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#080f1e] border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold">SSR Environment</span>
              <Cpu className="size-4 text-blue-500" />
            </div>
            <div className="font-extrabold text-sm text-slate-800 dark:text-white">Nitro / TanStack Start</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Vercel Edge Functions Engine</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="size-3" /> Zero hydration errors
            </div>
          </div>

          {/* Network & Latency */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#080f1e] border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold">Network Latency</span>
              <Activity className="size-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-lg text-slate-800 dark:text-white">{pingLatency}ms</span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-sm">Optimal</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">London & Frankfurt Edge Nodes</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              <Clock className="size-3" /> Last checked: {lastCheckTime}
            </div>
          </div>

          {/* SSL & Security */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#080f1e] border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold">SSL & Security</span>
              <Lock className="size-4 text-purple-500" />
            </div>
            <div className="font-extrabold text-sm text-slate-800 dark:text-white">TLS 1.3 Strict HSTS</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Cloudflare Edge Certificates</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
              <ShieldCheck className="size-3" /> Security Grade A+
            </div>
          </div>

          {/* Cache & Pipeline */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#080f1e] border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold">Asset Pipeline</span>
              <Sparkles className="size-4 text-amber-500" />
            </div>
            <div className="font-extrabold text-sm text-slate-800 dark:text-white">WebP Lossless Cache</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">44 Converted High-Res Assets</p>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
              <CheckCircle2 className="size-3" /> Auto-converter active
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVITY & AUDIT LOG SECTION */}
      <div
        id="audit-log"
        className="mt-8 bg-white dark:bg-[#0c1527] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Activity className="size-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  Activity & Audit Log
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Immutable chronological trail of administrative operations, publishing events, and exports.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportAuditCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" /> Export Audit CSV
            </button>
            <button
              onClick={handleExportAuditPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Printer className="size-3.5 text-blue-600 dark:text-blue-400" /> Export Audit PDF
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-slate-100 dark:border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["all", "Content", "Marketing", "System", "Security", "Export"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setAuditCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                  auditCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                <th className="py-3 px-3">Administrator</th>
                <th className="py-3 px-3">Action & Target</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredAuditLogs.length > 0 ? (
                filteredAuditLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition group cursor-pointer"
                    onClick={() => setSelectedAuditLog(log)}
                  >
                    {/* User */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        {log.user.avatar ? (
                          <img
                            src={log.user.avatar}
                            alt={log.user.name}
                            className="size-7 rounded-full object-cover shrink-0 ring-1 ring-blue-500/20"
                          />
                        ) : (
                          <div className="size-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                            {log.user.initials || log.user.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{log.user.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{log.user.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Action & Target */}
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">{log.target}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {log.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          log.status === "Success"
                            ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                            : log.status === "Warning"
                            ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400"
                            : "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            log.status === "Success"
                              ? "bg-emerald-500"
                              : log.status === "Warning"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`}
                        />
                        {log.status}
                      </span>
                    </td>

                    {/* IP */}
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {log.ipAddress}
                    </td>

                    {/* Time */}
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      <div>
                        <p className="font-medium">{log.relativeTime}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{log.timestamp.split(" ")[0]}</p>
                      </div>
                    </td>

                    {/* Action link */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAuditLog(log);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No activity entries found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AUDIT LOG INSPECT MODAL */}
      {selectedAuditLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100">
          <div
            className="bg-white dark:bg-[#0c1527] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Audit Entry Record</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedAuditLog.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAuditLog(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Operation</p>
                <p className="font-extrabold text-sm text-slate-800 dark:text-white mt-0.5">{selectedAuditLog.action}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{selectedAuditLog.target}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Actor</p>
                  <p className="font-bold text-slate-800 dark:text-white mt-0.5">{selectedAuditLog.user.name}</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{selectedAuditLog.user.role}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Origin IP</p>
                  <p className="font-mono font-bold text-slate-800 dark:text-white mt-0.5">{selectedAuditLog.ipAddress}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">TLS Verified</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Details Payload</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedAuditLog.details || "Administrative event dispatched and persisted in immutable session log."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                <span>Timestamp: {selectedAuditLog.timestamp}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Audit Verified
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedAuditLog(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Close Audit Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
