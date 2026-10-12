import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Mail,
  Users,
  Send,
  MousePointerClick,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Copy,
  Code,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminStatusBadge,
} from "@/components/admin/AdminComponents";
import { adminSubscribers, AdminSubscriber } from "@/lib/admin-data";
import buildingImg from "@/assets/building.jpg";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/newsletter")({
  head: () => meta("Newsletter — Admin Dashboard", "Campaign analytics and subscriber audience management."),
  component: AdminNewsletterPage,
});

const subscriberGrowthData = [
  { month: "Jan", subscribers: 350 },
  { month: "Feb", subscribers: 480 },
  { month: "Mar", subscribers: 550 },
  { month: "Apr", subscribers: 680 },
  { month: "May", subscribers: 820 },
  { month: "Jun", subscribers: 940 },
  { month: "Jul", subscribers: 1050 },
  { month: "Aug", subscribers: 1120 },
  { month: "Sep", subscribers: 1240 },
];

const engagementRateData = [
  { month: "Jan", openRate: 36, clickRate: 6 },
  { month: "Feb", openRate: 32, clickRate: 5 },
  { month: "Mar", openRate: 44, clickRate: 8 },
  { month: "Apr", openRate: 38, clickRate: 7 },
  { month: "May", openRate: 34, clickRate: 5 },
  { month: "Jun", openRate: 41, clickRate: 7 },
  { month: "Jul", openRate: 43, clickRate: 6 },
  { month: "Aug", openRate: 48, clickRate: 8 },
  { month: "Sep", openRate: 52, clickRate: 8.5 },
];

function AdminNewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredSubs = adminSubscribers.filter((s) => {
    if (selectedStatus !== "all" && s.status !== selectedStatus) return false;
    if (selectedSource !== "all" && s.source !== selectedSource) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelectSub = (id: string) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText('<iframe src="https://russelltech.com/embed/newsletter" width="100%" height="220" frameborder="0"></iframe>');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Newsletter
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Grow your audience, create and send newsletters, and track engagement.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Opening campaign creator")}
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="size-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* METRIC STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard
          title="Total Subscribers"
          value="1,240"
          change="+12%"
          note="+132 this month"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Campaigns Sent"
          value={8}
          change="+60%"
          note="+3 this month"
          icon={Mail}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Average Open Rate"
          value="42.5%"
          change="+8%"
          note="vs last month"
          icon={Send}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Average Click Rate"
          value="6.8%"
          change="+2%"
          note="vs last month"
          icon={MousePointerClick}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* CHARTS ROW (SUBSCRIBER GROWTH + ENGAGEMENT RATE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* SUBSCRIBER GROWTH */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Subscriber Growth</h3>
            </div>
            <select className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1">
              <option>Last 9 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={subscriberGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0062ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0062ff" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="subscribers" stroke="#0062ff" strokeWidth={2.5} fill="url(#subGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ENGAGEMENT RATE */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MousePointerClick className="size-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Engagement Rate</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="size-2 rounded-full bg-[#0062ff]" />
                <span className="text-slate-500">Open Rate</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="size-2 rounded-full bg-[#10b981]" />
                <span className="text-slate-500">Click Rate</span>
              </div>
              <select className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1">
                <option>Last 9 Months</option>
              </select>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis unit="%" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="openRate" stroke="#0062ff" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="clickRate" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN GRID: SUBSCRIBERS TABLE (75%) + SIDEBAR (25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SUBSCRIBERS TABLE */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search subscribers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="Subscribed">Subscribed</option>
                <option value="Unsubscribed">Unsubscribed</option>
              </select>

              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
              >
                <option value="all">All Sources</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
                <option value="Manual">Manual</option>
                <option value="Social Media">Social Media</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>

              <button
                onClick={() => alert("Subscribers list exported as CSV")}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <Download className="size-3.5 text-slate-500" /> Export
              </button>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedSubs.length === filteredSubs.length && filteredSubs.length > 0}
                        onChange={() =>
                          setSelectedSubs(
                            selectedSubs.length === filteredSubs.length ? [] : filteredSubs.map((s) => s.id)
                          )
                        }
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-2">Name</th>
                    <th className="py-4 px-3">Email</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Source</th>
                    <th className="py-4 px-3">Date Subscribed</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubs.map((sub) => {
                    const isChecked = selectedSubs.includes(sub.id);
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectSub(sub.id)}
                            className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-2 font-bold text-slate-800">
                          <div className="flex items-center gap-2.5">
                            <div className="size-7 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[11px]">
                              {sub.initials}
                            </div>
                            <span>{sub.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-medium">{sub.email}</td>
                        <td className="py-3 px-3">
                          <AdminStatusBadge status={sub.status} />
                        </td>
                        <td className="py-3 px-3 text-slate-600">{sub.source}</td>
                        <td className="py-3 px-3 text-slate-500">{sub.dateSubscribed}</td>
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
              <p>Showing 1 to {filteredSubs.length} of 1,240 subscribers</p>
              <div className="flex items-center gap-1.5">
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">1</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">2</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">3</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">4</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">5</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">155</button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (25%) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-2 text-xs">
            <h3 className="font-bold text-sm text-slate-800 mb-3">Quick Actions</h3>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Send className="size-3.5" /> Create New Campaign</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Users className="size-3.5" /> Manage Subscribers</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Code className="size-3.5" /> Signup Form Settings</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700">
              <span className="flex items-center gap-2 text-blue-600"><Mail className="size-3.5" /> Email Templates</span>
              <span className="text-slate-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 font-medium text-slate-400 cursor-not-allowed">
              <span className="flex items-center gap-2"><Sparkles className="size-3.5" /> Automation (Coming Soon)</span>
              <span className="text-slate-300">›</span>
            </button>
          </div>

          {/* RECENT CAMPAIGN CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Recent Campaign</h3>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-100 relative">
              <img src={buildingImg} alt="Campaign preview" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-3">
                <p className="text-xs font-bold text-white leading-tight">Innovation for a Better Africa</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800">September Newsletter</h4>
                <p className="text-[11px] text-slate-400">Sep 5, 2026, 10:00 AM</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">Sent</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
              <div>
                <p className="text-sm font-extrabold text-slate-900">42.8%</p>
                <p className="text-[10px] text-slate-400">Open Rate</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">7.3%</p>
                <p className="text-[10px] text-slate-400">Click Rate</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">1,240</p>
                <p className="text-[10px] text-slate-400">Recipients</p>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 py-1">
              View Details →
            </button>
          </div>

          {/* NEWSLETTER SIGNUP FORM EMBED CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="font-bold text-sm text-slate-800">Newsletter Signup Form</h3>
            <p className="text-[11px] text-slate-400">Embed this form on your website to collect subscribers.</p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <p className="font-bold text-xs text-slate-800">Stay Updated</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Get the latest insights, events, and updates delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                disabled
                className="w-full text-[11px] bg-white border border-slate-200 rounded-lg px-2.5 py-1.5"
              />
              <button
                disabled
                className="w-full bg-[#0062ff] text-white text-[11px] font-bold py-1.5 rounded-lg"
              >
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value='<iframe src="https://russelltech.com..."'
                className="flex-1 bg-slate-50 text-[11px] font-mono border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-500"
              />
              <button
                onClick={handleCopyEmbed}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-700 transition"
              >
                {copiedCode ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
