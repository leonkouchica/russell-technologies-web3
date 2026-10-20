import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  Users,
  FileText,
  Megaphone,
  Mail,
  TrendingUp,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
} from "@/components/admin/AdminComponents";
import studentImg from "@/assets/student.webp";
import farmerImg from "@/assets/farmer.webp";
import meetingImg from "@/assets/meeting.webp";
import dataImg from "@/assets/data.webp";
import buildingImg from "@/assets/building.webp";
import africaMap from "@/assets/africa-map.webp";
import { meta } from "@/components/site/blocks";
import { exportToCsv, exportToPdf } from "@/lib/export-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/analytics")({
  head: () => meta("Analytics — Admin Dashboard", "Real-time metrics, audience data, and engagement trends."),
  component: AdminAnalyticsPage,
});

const trafficData = [
  { date: "Sep 1", pageViews: 650, visitors: 280 },
  { date: "Sep 4", pageViews: 780, visitors: 320 },
  { date: "Sep 7", pageViews: 700, visitors: 290 },
  { date: "Sep 10", pageViews: 1350, visitors: 580 },
  { date: "Sep 13", pageViews: 1050, visitors: 450 },
  { date: "Sep 16", pageViews: 1200, visitors: 510 },
  { date: "Sep 19", pageViews: 850, visitors: 370 },
  { date: "Sep 22", pageViews: 980, visitors: 410 },
  { date: "Sep 25", pageViews: 1650, visitors: 720 },
  { date: "Sep 28", pageViews: 1100, visitors: 480 },
  { date: "Sep 30", pageViews: 1300, visitors: 560 },
];

const trafficSourcesData = [
  { name: "Organic Search", value: 45, color: "#0062ff" },
  { name: "Direct", value: 25, color: "#10b981" },
  { name: "Social Media", value: 15, color: "#8b5cf6" },
  { name: "Referral", value: 10, color: "#f59e0b" },
  { name: "Email", value: 5, color: "#f43f5e" },
];

const deviceTypesData = [
  { name: "Desktop", value: 58, color: "#0062ff" },
  { name: "Mobile", value: 38, color: "#10b981" },
  { name: "Tablet", value: 4, color: "#8b5cf6" },
];

const dailySignupsData = [
  { day: "Sep 1", count: 15 },
  { day: "Sep 4", count: 22 },
  { day: "Sep 7", count: 18 },
  { day: "Sep 10", count: 35 },
  { day: "Sep 14", count: 28 },
  { day: "Sep 17", count: 32 },
  { day: "Sep 21", count: 45 },
  { day: "Sep 24", count: 40 },
  { day: "Sep 28", count: 52 },
  { day: "Sep 30", count: 60 },
];

function AdminAnalyticsPage() {
  const handleExportCsv = () => {
    try {
      exportToCsv("russell_analytics_traffic_report", trafficData, [
        { header: "Date", key: "date" },
        { header: "Page Views", key: "pageViews" },
        { header: "Unique Visitors", key: "visitors" },
      ]);
      toast.success("Analytics data exported to CSV!");
    } catch {
      toast.error("Failed to export analytics data");
    }
  };

  const handleExportPdf = () => {
    try {
      exportToPdf({
        title: "Traffic & Performance Executive Analytics",
        subtitle: "Monthly web traffic, engagement and visitor metrics for Russell Technologies",
        tableHeaders: ["Date Period", "Page Views", "Unique Visitors", "Estimated Bounce Rate"],
        tableRows: trafficData.map((d) => [
          d.date,
          d.pageViews.toLocaleString(),
          d.visitors.toLocaleString(),
          "38.4%",
        ]),
      });
      toast.success("Generating print-ready Analytics PDF preview...");
    } catch {
      toast.error("Failed to generate PDF");
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
              Analytics
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Track your website performance, content engagement, and audience growth.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <AdminDateFilter dateText="Sep 1, 2026 – Sep 30, 2026" />
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition"
            title="Download Traffic CSV"
          >
            <FileSpreadsheet className="size-3.5 text-emerald-600" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition"
            title="Print or Export PDF"
          >
            <Printer className="size-3.5 text-blue-600" />
            <span>PDF</span>
          </button>
          <select className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      {/* 5 STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <AdminStatCard
          title="Total Page Views"
          value="12,540"
          change="28%"
          note="vs previous 30 days"
          icon={Eye}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Unique Visitors"
          value="4,320"
          change="18%"
          note="vs previous 30 days"
          icon={Users}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Blog Post Views"
          value={24}
          change="42%"
          note="vs previous 30 days"
          icon={FileText}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Event Page Views"
          value={8}
          change="33%"
          note="vs previous 30 days"
          icon={Megaphone}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
        <AdminStatCard
          title="Newsletter Signups"
          value={640}
          change="25%"
          note="vs previous 30 days"
          icon={Mail}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* ROW 2: WEBSITE TRAFFIC CHART (65%) + TOP PAGES (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* WEBSITE TRAFFIC */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">Website Traffic</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#0062ff]" />
                <span className="text-slate-600">Page Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#10b981]" />
                <span className="text-slate-600">Unique Visitors</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="anPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0062ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0062ff" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="anVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="pageViews" stroke="#0062ff" strokeWidth={2.5} fill="url(#anPageViews)" />
                <Area type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2.5} fill="url(#anVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PAGES */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Top Pages</h3>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            {[
              { title: "Home", path: "/", views: "3,420", change: "+24%", img: studentImg },
              { title: "About Us", path: "/about-us", views: "2,180", change: "+18%", img: buildingImg },
              { title: "Blog", path: "/blog", views: "1,640", change: "+32%", img: meetingImg },
              { title: "Events", path: "/events", views: "980", change: "+28%", img: dataImg },
              { title: "Contact", path: "/contact", views: "720", change: "+16%", img: farmerImg },
            ].map((p, idx) => (
              <div key={idx} className="pt-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={p.img} alt={p.title} className="size-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{p.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{p.path}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-slate-900">{p.views}</p>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-sm">{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: TRAFFIC SOURCES + DEVICE TYPES + TOP LOCATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* TRAFFIC SOURCES DONUT */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-800">Traffic Sources</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-32 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trafficSourcesData} innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-slate-900">12,540</span>
                <span className="text-[9px] text-slate-400">Total Views</span>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 text-xs">
              {trafficSourcesData.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-slate-600 truncate">{s.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DEVICE TYPES DONUT */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2">
            <Monitor className="size-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-800">Device Types</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-32 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceTypesData} innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                    {deviceTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-extrabold text-slate-900">4,320</span>
                <span className="text-[9px] text-slate-400">Unique</span>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-xs">
              {deviceTypesData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP LOCATIONS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-800">Top Locations</h3>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { country: "Nigeria", pct: 42, color: "bg-blue-600" },
              { country: "United States", pct: 18, color: "bg-emerald-500" },
              { country: "United Kingdom", pct: 8, color: "bg-purple-500" },
              { country: "Ghana", pct: 6, color: "bg-amber-500" },
              { country: "Others", pct: 26, color: "bg-slate-400" },
            ].map((loc) => (
              <div key={loc.country} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{loc.country}</span>
                  <span className="font-bold text-slate-800">{loc.pct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${loc.color} rounded-full`} style={{ width: `${loc.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: TOP PERFORMING BLOG POSTS + TOP EVENTS + NEWSLETTER GROWTH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOP BLOG POSTS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Top Performing Blog Posts</h3>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
          </div>

          <div className="space-y-2.5 text-xs divide-y divide-slate-100">
            {[
              { id: 1, title: "The Future of Digital Innovation in Africa", views: "2,430", readTime: "4 min", img: studentImg },
              { id: 2, title: "10 Productivity Tools for Remote Teams", views: "1,820", readTime: "6 min", img: meetingImg },
              { id: 3, title: "Building Scalable Web Applications", views: "1,560", readTime: "5 min", img: dataImg },
              { id: 4, title: "Cybersecurity Best Practices for SMEs", views: "980", readTime: "4 min", img: farmerImg },
              { id: 5, title: "AI Trends to Watch in 2026", views: "760", readTime: "7 min", img: buildingImg },
            ].map((p) => (
              <div key={p.id} className="pt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-bold text-slate-400 text-[11px] w-3">{p.id}</span>
                  <img src={p.img} alt={p.title} className="size-7 rounded-lg object-cover" />
                  <p className="font-bold text-slate-800 truncate">{p.title}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-slate-900">{p.views}</p>
                  <p className="text-[10px] text-slate-400">{p.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP EVENTS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Top Events</h3>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
          </div>

          <div className="space-y-2.5 text-xs divide-y divide-slate-100">
            {[
              { title: "African Photo Week Conference 2026", views: "980", regs: "320" },
              { title: "Tech for Education Webinar", views: "640", regs: "120" },
              { title: "Innovation Summit", views: "520", regs: "200" },
              { title: "Creatives Networking Event", views: "420", regs: "85" },
              { title: "Website Management Workshop", views: "310", regs: "60" },
            ].map((e, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">{e.title}</p>
                  <p className="text-[10px] text-slate-400">{e.views} page views</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-slate-900">{e.regs}</span>
                  <span className="text-[10px] text-slate-400 block">registered</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER GROWTH */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-800">Newsletter Growth</h3>
          </div>

          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySignupsData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <Bar dataKey="count" fill="#0062ff" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span>↑ 25%</span>
              </div>
              <p className="text-lg font-extrabold text-slate-900">640</p>
              <p className="text-[10px] text-slate-400">New Signups</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span>↑ 18%</span>
              </div>
              <p className="text-lg font-extrabold text-slate-900">2,480</p>
              <p className="text-[10px] text-slate-400">Total Subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
