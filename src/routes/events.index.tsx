import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ArrowRight,
  Video,
  Building,
  CheckCircle2,
  Sparkles,
  Ticket,
  ChevronRight,
  Share2,
} from "lucide-react";
import { allAdminEvents, type AdminEvent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { meta } from "@/components/site/blocks";
import { toast } from "sonner";
import { useEvents, usePublicSubscribe } from "@/hooks/use-admin-data";

export const Route = createFileRoute("/events/")({
  head: () =>
    meta(
      "Events & Conferences — Russell Technologies",
      "Discover upcoming tech summits, educational webinars, and innovation workshops hosted by Russell Technologies across Africa and globally."
    ),
  component: PublicEventsPage,
});

export function PublicEventsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "Online" | "In-person">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const { data: liveEvents } = useEvents({ status: "Published" });
  const subscribeMutation = usePublicSubscribe();

  const eventsList: AdminEvent[] = useMemo(() => {
    if (!liveEvents?.length) return allAdminEvents;
    const mapped: AdminEvent[] = liveEvents.map((e) => {
      const d = new Date(e.date_time);
      const monthBadge = isNaN(d.getTime()) ? "OCT" : d.toLocaleString("en-US", { month: "short" }).toUpperCase();
      const dayBadge = isNaN(d.getTime()) ? "15" : String(d.getDate()).padStart(2, "0");
      const formattedDate = isNaN(d.getTime()) ? e.date_time : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const formattedTime = isNaN(d.getTime()) ? "" : d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

      return {
        id: e.id,
        title: e.title,
        slug: e.slug,
        type: (e.type as "Online" | "In-person") || "Online",
        dateTime: e.date_time,
        formattedDate,
        formattedTime,
        monthBadge,
        dayBadge,
        location: e.location || "Online",
        registeredCount: 45,
        maxAttendees: e.max_attendees || undefined,
        status: (e.status || "Published") as "Published" | "Draft" | "Past",
        image: e.image_url || allAdminEvents[0].image,
        isUpcoming: !isNaN(d.getTime()) ? d >= new Date() : true,
      };
    });
    const seen = new Set(mapped.map((e) => e.slug));
    const leftovers = allAdminEvents.filter((e) => !seen.has(e.slug));
    return [...mapped, ...leftovers];
  }, [liveEvents]);

  const filteredEvents = useMemo(() => {
    return eventsList.filter((evt) => {
      const matchesTab = activeTab === "all" ? true : evt.type === activeTab;
      const matchesQuery =
        searchQuery.trim() === "" ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [eventsList, activeTab, searchQuery]);

  // Featured event (first published upcoming event)
  const featuredEvent = eventsList.find((e) => e.isUpcoming && e.status === "Published") || eventsList[0];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border bg-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="container-x relative">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Events & Webinars</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-4">
              <Sparkles className="size-4" /> Global Community & Tech Summits
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Connect, Learn & Innovate With Industry Leaders
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Join our virtual webinars, executive roundtables, and hands-on workshops exploring education technology,
              digital music distribution, agricultural marketplaces, and legal practice automation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Event Showcase */}
      {featuredEvent && (
        <section className="container-x -mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-navy via-navy to-[#132247] p-6 text-white shadow-xl sm:p-10">
            <div className="absolute right-0 top-0 -mr-20 -mt-20 size-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  <Ticket className="size-3.5" /> Featured Spotlight Event
                </div>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="mt-3 text-sm text-slate-300 line-clamp-2 sm:text-base">
                  A high-impact gathering uniting innovators, creators, and technologists across the African ecosystem.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <Calendar className="size-4 text-blue-400" />
                    <span>{featuredEvent.formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <Clock className="size-4 text-blue-400" />
                    <span>{featuredEvent.formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <MapPin className="size-4 text-blue-400" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <Users className="size-4 text-blue-400" />
                    <span>{featuredEvent.registeredCount} Registered</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/events/$slug"
                    params={{ slug: featuredEvent.slug }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-600"
                  >
                    Register for Free <ArrowRight className="size-4" />
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.origin + `/events/${featuredEvent.slug}`);
                      toast.success("Event link copied to clipboard!");
                    }}
                    className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Share2 className="size-4" /> Share
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-xl bg-navy/80 px-3 py-2 text-xs font-semibold backdrop-blur">
                  {featuredEvent.type === "Online" ? "🎥 Live Interactive Stream" : "📍 In-Person Keynote"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="container-x mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-200/60 p-1">
            {[
              { id: "all", label: "All Events" },
              { id: "Online", label: "Online Only" },
              { id: "In-person", label: "In-Person" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as never)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-white text-navy shadow-sm"
                    : "text-slate-600 hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px] sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or location…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Thumbnail with Date Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                />
                {/* Date Badge */}
                <div className="absolute left-3 top-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-md backdrop-blur">
                  <div className="text-[10px] font-extrabold uppercase text-primary leading-none">
                    {event.monthBadge}
                  </div>
                  <div className="text-base font-extrabold text-navy leading-tight">
                    {event.dayBadge}
                  </div>
                </div>

                {/* Event Format Tag */}
                <div className="absolute right-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {event.type === "Online" ? "Online" : "In-Person"}
                </div>
              </div>

              {/* Event Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>{event.formattedDate} · {event.formattedTime}</span>
                </div>

                <h3 className="mt-2.5 text-lg font-bold text-navy group-hover:text-primary transition line-clamp-2">
                  <Link to="/events/$slug" params={{ slug: event.slug }}>
                    {event.title}
                  </Link>
                </h3>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="size-3.5 shrink-0 text-slate-400" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Users className="size-3.5 text-slate-400" />
                    <span>{event.registeredCount} attending</span>
                  </div>

                  <Link
                    to="/events/$slug"
                    params={{ slug: event.slug }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-blue-700"
                  >
                    RSVP <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Calendar className="mx-auto size-10 text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-navy">No events found</h3>
            <p className="mt-1 text-xs text-muted-foreground">Try clearing your search query or switching filters.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter / Notifications Banner */}
      <section className="container-x mt-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Calendar className="size-3.5" /> Stay Ahead of the Curve
          </div>
          <h2 className="mt-3 text-2xl font-bold text-navy">
            Never Miss an Upcoming Summit or Webinar
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs text-slate-600 sm:text-sm">
            Get early VIP invites, downloadable conference agendas, and replay recordings delivered directly to your inbox.
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
                toast.error("Please enter a valid email address.");
                return;
              }
              setNewsletterSubmitting(true);
              try {
                await subscribeMutation.mutateAsync({ email: newsletterEmail });
                toast.success("You're subscribed to Russell Technologies event alerts!");
                setNewsletterEmail("");
              } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : "Failed to subscribe.";
                toast.error(msg);
              } finally {
                setNewsletterSubmitting(false);
              }
            }}
            className="mx-auto mt-5 flex max-w-md gap-2"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your corporate email"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" disabled={newsletterSubmitting} className="font-semibold text-xs px-5 disabled:opacity-50">
              {newsletterSubmitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
