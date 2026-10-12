import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Users,
  Video,
  MapPin,
  Edit,
  Copy,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Tag,
  Settings,
  CalendarDays,
  Globe,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  AdminStatCard,
  AdminStatusBadge,
} from "@/components/admin/AdminComponents";
import { allAdminEvents, AdminEvent } from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/events/")({
  head: () => meta("Events — Admin Dashboard", "Create and manage online and in-person events."),
  component: AdminEventsPage,
});

function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent>(allAdminEvents[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredEvents = allAdminEvents.filter((evt) => {
    if (selectedType !== "all" && evt.type !== selectedType) return false;
    if (selectedStatus !== "all" && evt.status !== selectedStatus) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        evt.title.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q)
      );
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
              Events
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Create, manage and promote your events. Track registrations and engagement.
            </p>
          </div>
        </div>

        <Link
          to="/admin/events/create"
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="size-4" />
          <span>Create New Event</span>
        </Link>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard
          title="Total Events"
          value={8}
          change="+60%"
          note="+3 this month"
          icon={Calendar}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Total Registrations"
          value="1,240"
          change="+25%"
          note="+250 this month"
          icon={Users}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Online Events"
          value={5}
          note="62% of total"
          icon={Video}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="In-person Events"
          value={3}
          note="38% of total"
          icon={MapPin}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
      </div>

      {/* TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TABLE (75%) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* SEARCH & FILTERS */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events by title, location or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden"
              >
                <option value="all">All Types</option>
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
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
                <option>All Dates</option>
                <option>Upcoming</option>
                <option>Past Events</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-hidden">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
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
                        checked={selectedIds.length === filteredEvents.length && filteredEvents.length > 0}
                        onChange={() =>
                          setSelectedIds(
                            selectedIds.length === filteredEvents.length ? [] : filteredEvents.map((e) => e.id)
                          )
                        }
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-2">Event</th>
                    <th className="py-4 px-3">Type</th>
                    <th className="py-4 px-3">Date & Time</th>
                    <th className="py-4 px-3">Location</th>
                    <th className="py-4 px-3">Registrations</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.map((evt) => {
                    const isSelected = selectedEvent.id === evt.id;
                    const isChecked = selectedIds.includes(evt.id);
                    return (
                      <tr
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className={`hover:bg-slate-50/70 transition cursor-pointer ${
                          isSelected ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelect(evt.id)}
                            className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-2 max-w-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="size-11 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-800 truncate block">
                                {evt.title}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                Exploring African tech innovation & scaling.
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-medium text-slate-700">
                            {evt.type === "Online" ? (
                              <Video className="size-3.5 text-blue-600" />
                            ) : (
                              <MapPin className="size-3.5 text-emerald-600" />
                            )}
                            <span>{evt.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                          <div>
                            <p className="font-medium text-slate-800">{evt.formattedDate}</p>
                            <p className="text-[11px] text-slate-400">{evt.formattedTime}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-slate-600">
                            <Globe className="size-3.5 text-slate-400" />
                            <span>{evt.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div>
                            <span className="font-bold text-slate-800">{evt.registeredCount}</span>
                            <span className="text-[11px] text-slate-400 ml-1">registered</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <AdminStatusBadge status={evt.status} />
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to="/admin/events/create"
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
                            <button
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="View"
                            >
                              <Eye className="size-4" />
                            </button>
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
              <p>Showing 1 to {filteredEvents.length} of {allAdminEvents.length} events</p>
              <div className="flex items-center gap-1.5">
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (25%) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* UPCOMING EVENT CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Upcoming Event</h3>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All →</button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-100 relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-36 object-cover"
              />
            </div>

            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                {selectedEvent.title}
              </h4>
              <div className="mt-2 space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-blue-600" />
                  <span>{selectedEvent.formattedDate} • {selectedEvent.formattedTime}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Video className="size-3.5 text-blue-600" />
                  <span>{selectedEvent.type} Event</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="size-3.5 text-blue-600" />
                  <span>{selectedEvent.registeredCount} registered</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(`Opening event view for ${selectedEvent.title}`)}
              className="w-full bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition"
            >
              View Event
            </button>
          </div>

          {/* EVENT STATISTICS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Event Statistics</h3>
              <select className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1">
                <option>Last 30 days</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Eye className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">4,520</p>
                    <p className="text-[11px] text-slate-400">Page Views</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 32%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">640</p>
                    <p className="text-[11px] text-slate-400">Total Registrations</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 28%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">8</p>
                    <p className="text-[11px] text-slate-400">Total Events</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">↑ 60%</span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-sm text-slate-800 mb-3">Quick Actions</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/admin/events/create"
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Plus className="size-4 text-blue-600" /> Create New Event
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </Link>
              <button
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-blue-600" /> View Event Calendar
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Tag className="size-4 text-blue-600" /> Manage Event Categories
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 font-semibold text-slate-700 transition"
              >
                <span className="flex items-center gap-2">
                  <Settings className="size-4 text-blue-600" /> Event Registration Settings
                </span>
                <ChevronRight className="size-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
