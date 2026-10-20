import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Video,
  Building,
  ShieldCheck,
  ChevronRight,
  Download,
  CalendarPlus,
  Mail,
  User,
  Sparkles,
} from "lucide-react";
import { allAdminEvents, type AdminEvent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import avatar1 from "@/assets/avatar-1.webp";
import avatar2 from "@/assets/avatar-2.webp";
import avatar3 from "@/assets/avatar-3.webp";

export const Route = createFileRoute("/events/$slug")({
  head: ({ params }) => {
    const event = allAdminEvents.find((e) => e.slug === params.slug);
    return {
      meta: [
        { title: `${event ? event.title : "Event Details"} | Russell Technologies` },
        {
          name: "description",
          content: event
            ? `Register for ${event.title} happening on ${event.formattedDate} at ${event.location}.`
            : "Register for Russell Technologies technology events and workshops.",
        },
      ],
    };
  },
  component: PublicEventDetailPage,
});

export function PublicEventDetailPage() {
  const { slug } = Route.useParams();
  const event = allAdminEvents.find((e) => e.slug === slug) || allAdminEvents[0];

  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", org: "", role: "" });

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-navy">Event Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The event you are looking for does not exist or has been archived.</p>
        <Link to="/events" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white">
          <ArrowLeft className="size-4" /> Back to Events
        </Link>
      </div>
    );
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setRegistered(true);
    toast.success("RSVP Confirmed! We sent a confirmation email to " + formData.email);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Breadcrumb Header */}
      <section className="border-b border-border bg-white py-10 lg:py-14">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/events" className="hover:text-primary transition">Events</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground line-clamp-1">{event.title}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {event.type === "Online" ? <Video className="size-3.5" /> : <Building className="size-3.5" />}
                  {event.type} Event
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Free Admission
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {event.registeredCount} Registered
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                {event.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2 rounded-xl bg-slate-100/80 px-3.5 py-2">
                  <Calendar className="size-4 text-primary" />
                  <span className="font-semibold text-navy">{event.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100/80 px-3.5 py-2">
                  <Clock className="size-4 text-primary" />
                  <span>{event.formattedTime}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100/80 px-3.5 py-2">
                  <MapPin className="size-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Event link copied to clipboard!");
              }}
              className="gap-2 shrink-0 self-start"
            >
              <Share2 className="size-3.5" /> Share Event
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-x mt-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left Column: Details & Agenda */}
          <div className="space-y-8">
            {/* Featured Image */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={event.image}
                alt={event.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            {/* Overview Block */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy">About This Event</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Join industry practitioners, institutional stakeholders, and the technical leadership of Russell Technologies
                for an immersive session. Discover modern paradigms in digital execution, scalable cloud architecture, and
                impact-driven software systems designed for the African context.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether you represent an educational institution evaluating modern management systems, a legal firm optimizing case records,
                or an agribusiness scaling supply chain logistics, this session provides actionable insights and live technology demonstrations.
              </p>

              <hr className="my-6 border-slate-100" />

              <h3 className="text-base font-bold text-navy">What You Will Learn</h3>
              <div className="grid gap-2.5 sm:grid-cols-2 mt-2">
                {[
                  "Architectural best practices for high-availability systems.",
                  "Real-world case studies from leading Nigerian enterprises.",
                  "Interactive product walkthroughs & roadmap reveals.",
                  "Direct Q&A with Russell Technologies product engineers.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Agenda Timeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-navy">Session Agenda</h2>
              <div className="relative border-l-2 border-slate-100 ml-3 pl-6 space-y-6">
                {[
                  { time: "10:00 AM – 10:15 AM", title: "Welcome & Opening Keynote", speaker: "Russell Technologies Executive Team" },
                  { time: "10:15 AM – 11:00 AM", title: "Product Innovations & Deep-Dive", speaker: "Principal Solutions Architect" },
                  { time: "11:00 AM – 11:30 AM", title: "Customer Success Panel & Q&A", speaker: "Guest Industry Partners" },
                  { time: "11:30 AM – 12:00 PM", title: "Networking & Interactive Workshops", speaker: "All Attendees" },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 size-3.5 rounded-full border-2 border-white bg-primary shadow-sm" />
                    <div className="text-xs font-bold text-primary">{item.time}</div>
                    <div className="font-bold text-navy text-sm mt-0.5">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.speaker}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Speakers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-navy">Featured Hosts & Speakers</h2>
              <div className="grid gap-4 sm:grid-cols-3 mt-3">
                {[
                  { name: "Russell Lead Architect", role: "VP of Engineering", img: avatar1 },
                  { name: "Adaeze Johnson", role: "Head of Product", img: avatar2 },
                  { name: "Tunde Williams", role: "Solutions Consultant", img: avatar3 },
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <img src={s.img} alt={s.name} className="size-14 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="font-bold text-navy text-xs mt-2.5">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: RSVP Registration Widget */}
          <div className="space-y-6">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg">
              {registered ? (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">You're Registered!</h3>
                  <p className="text-xs text-slate-600">
                    We've reserved your ticket for <strong>{event.title}</strong>. An email with calendar invites and access details has been sent to <strong>{formData.email}</strong>.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => {
                        const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:${event.title}\nDESCRIPTION:Hosted by Russell Technologies\nLOCATION:${event.location}\nEND:VCALENDAR`;
                        const blob = new Blob([icsContent], { type: "text/calendar" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${event.slug}.ics`;
                        a.click();
                        toast.success("Calendar invite downloaded!");
                      }}
                      className="w-full gap-2 text-xs font-semibold"
                    >
                      <CalendarPlus className="size-4" /> Add to Calendar (.ics)
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      ✓ Instant Confirmation
                    </span>
                    <h3 className="text-lg font-bold text-navy mt-2">Reserve Your Seat</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Complimentary registration sponsored by Russell Technologies.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-navy">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-navy">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-navy">Company / Institution</label>
                      <input
                        type="text"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        placeholder="Acme Corp"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-navy">Job Title</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="Director / Engineer / Founder"
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full text-xs font-bold py-2.5">
                    Confirm Free RSVP
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    <span>Zero spam. You can unsubscribe anytime.</span>
                  </div>
                </form>
              )}

              <hr className="my-5 border-slate-100" />

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Format:</span>
                  <span className="font-semibold text-navy">{event.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cost:</span>
                  <span className="font-semibold text-emerald-600">Free / Open</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Capacity:</span>
                  <span className="font-semibold text-navy">{event.maxAttendees || "500"} attendees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
