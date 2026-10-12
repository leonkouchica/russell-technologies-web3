import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Eye,
  Send,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Edit2,
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Code,
  Maximize2,
  CheckCircle2,
  X,
  FileText,
  Users,
  Settings,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import artistImg from "@/assets/artist.jpg";
import meetingImg from "@/assets/meeting.jpg";
import studentImg from "@/assets/student.jpg";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/events/create")({
  head: () => meta("Create New Event — Admin Dashboard", "Configure and publish upcoming events."),
  component: AdminCreateEventPage,
});

export function AdminCreateEventPage() {
  const [eventTitle, setEventTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventFormat, setEventFormat] = useState<"Online" | "In-person" | "Hybrid">("Online");
  const [dateTime, setDateTime] = useState("Oct 10, 2026, 10:00 AM → Oct 10, 2026, 1:00 PM");
  const [timezone, setTimezone] = useState("(GMT+01:00) Lagos, Nigeria (WAT)");
  const [venue, setVenue] = useState("");
  const [showLocation, setShowLocation] = useState(true);
  const [enableReg, setEnableReg] = useState(true);
  const [regType, setRegType] = useState("Free Event");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [sendConfirmEmail, setSendConfirmEmail] = useState(true);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>(["conference", "technology"]);
  const [newTag, setNewTag] = useState("");
  const [published, setPublished] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim().toLowerCase())) {
        setTags([...tags, newTag.trim().toLowerCase()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  return (
    <AdminLayout>
      {/* BREADCRUMBS & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/admin/events" className="hover:text-blue-600 flex items-center gap-1 transition">
            <ChevronLeft className="size-4" /> Events
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">Create New Event</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Event draft saved")}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition"
          >
            Save Draft
          </button>
          <button
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
          >
            <Eye className="size-3.5 text-slate-500" /> Preview
          </button>
          <button
            onClick={() => setPublished(true)}
            className="px-5 py-2 rounded-xl bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <Send className="size-3.5" /> Publish Event
          </button>
        </div>
      </div>

      {/* HEADING */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create New Event
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Set up your event details, customize the experience, and publish it to your audience.
          </p>
        </div>
      </div>

      {published && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-600" />
            <span className="text-xs font-bold">Event published successfully!</span>
          </div>
          <button onClick={() => setPublished(false)}>
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: BASICS, EDITOR, IMAGES (65%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* BASIC INFORMATION CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <FileText className="size-4 text-blue-600" /> Basic Information
            </h3>

            {/* EVENT TITLE */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Event Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter event title..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  maxLength={120}
                  className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {eventTitle.length}/120
                </span>
              </div>
            </div>

            {/* SHORT DESCRIPTION */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  placeholder="Write a brief description for your event..."
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  maxLength={200}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-hidden"
                />
                <span className="absolute right-3.5 bottom-2.5 text-[11px] text-slate-400">
                  {shortDesc.length}/200
                </span>
              </div>
            </div>

            {/* FULL DESCRIPTION */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Description</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 p-2 border-b border-slate-200 flex flex-wrap items-center gap-1">
                  <select className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 mr-1">
                    <option>Paragraph</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                  </select>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md font-bold"><Bold className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md italic"><Italic className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md underline"><Underline className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><List className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><ListOrdered className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><AlignLeft className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><AlignCenter className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><LinkIcon className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><ImageIcon className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><Video className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md"><Code className="size-3.5" /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-md ml-auto"><Maximize2 className="size-3.5" /></button>
                </div>
                <textarea
                  placeholder="Write the full event details, agenda, speakers, and other information..."
                  rows={6}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full p-4 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden leading-relaxed"
                />
                <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 text-right text-[11px] text-slate-400">
                  {fullDesc.trim() ? fullDesc.trim().split(/\s+/).length : 0} words
                </div>
              </div>
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ImageIcon className="size-4 text-blue-600" /> Featured Image
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center transition flex flex-col items-center justify-center bg-slate-50/50">
                <Upload className="size-6 text-blue-600 mb-1" />
                <p className="text-xs font-bold text-slate-700">
                  Drag and drop an image here, or <span className="text-blue-600 cursor-pointer">click to upload</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                <button className="mt-3 px-4 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Upload Image
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-100">
                <img src={artistImg} alt="Event banner preview" className="w-full h-40 object-cover" />
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1">
                    <Edit2 className="size-3" /> Edit
                  </button>
                  <button className="p-1 rounded-lg bg-white/90 backdrop-blur-xs text-rose-600 shadow-sm">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ImageIcon className="size-4 text-blue-600" /> Gallery (Optional)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="sm:col-span-2 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center flex flex-col items-center justify-center bg-slate-50/50">
                <Upload className="size-5 text-blue-600 mb-1" />
                <p className="text-[11px] font-bold text-slate-700">Add more images for event gallery</p>
                <button className="mt-2 px-3 py-1 bg-white border border-slate-200 text-[11px] font-semibold rounded-lg">
                  Upload Images
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-100 h-24">
                <img src={meetingImg} alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-100 h-24">
                <img src={studentImg} alt="Gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="border border-dashed border-slate-200 rounded-xl h-24 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer">
                <Plus className="size-5" />
                <span className="text-[10px] font-bold mt-1">Add More</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS, REGISTRATION, ADDITIONAL SETTINGS (35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* EVENT DETAILS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Calendar className="size-4 text-blue-600" /> Event Details
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Event Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="">Select event type (e.g. Conference, Webinar, Workshop)</option>
                <option value="Conference">Conference</option>
                <option value="Webinar">Webinar</option>
                <option value="Workshop">Workshop</option>
                <option value="Summit">Summit</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Event Format <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Online", "In-person", "Hybrid"] as const).map((fmt) => (
                  <label
                    key={fmt}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      eventFormat === fmt
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="eventFormat"
                      checked={eventFormat === fmt}
                      onChange={() => setEventFormat(fmt)}
                      className="sr-only"
                    />
                    <span>{fmt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Date & Time <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <input
                  type="text"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-slate-800 font-medium"
                />
                <button
                  onClick={() => setDateTime("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Timezone <span className="text-rose-500">*</span>
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              >
                <option>(GMT+01:00) Lagos, Nigeria (WAT)</option>
                <option>(GMT+00:00) London (GMT)</option>
                <option>(GMT-05:00) New York (EST)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Location / Venue</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter event location or venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Show location on event page</p>
                <p className="text-[11px] text-slate-400">Display the event location to attendees</p>
              </div>
              <input
                type="checkbox"
                checked={showLocation}
                onChange={(e) => setShowLocation(e.target.checked)}
                className="size-5 text-blue-600 rounded-sm cursor-pointer"
              />
            </div>
          </div>

          {/* REGISTRATION SETTINGS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Users className="size-4 text-blue-600" /> Registration Settings
            </h3>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Enable Registration</p>
                <p className="text-[11px] text-slate-400">Allow users to register for this event</p>
              </div>
              <input
                type="checkbox"
                checked={enableReg}
                onChange={(e) => setEnableReg(e.target.checked)}
                className="size-5 text-blue-600 rounded-sm cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Registration Type</label>
              <select
                value={regType}
                onChange={(e) => setRegType(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="Free Event">Free Event</option>
                <option value="Paid Event">Paid Event</option>
                <option value="Invite Only">Invite Only</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Maximum Attendees (Optional)
              </label>
              <input
                type="number"
                placeholder="Leave empty for unlimited"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Send confirmation email</p>
                <p className="text-[11px] text-slate-400">Automatically send confirmation after registration</p>
              </div>
              <input
                type="checkbox"
                checked={sendConfirmEmail}
                onChange={(e) => setSendConfirmEmail(e.target.checked)}
                className="size-5 text-blue-600 rounded-sm cursor-pointer"
              />
            </div>
          </div>

          {/* ADDITIONAL SETTINGS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Settings className="size-4 text-blue-600" /> Additional Settings
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Event Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Legal">Legal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-md font-medium"
                  >
                    #{t}
                    <button onClick={() => removeTag(t)} className="hover:text-rose-600">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
              <p className="text-[10px] text-slate-400 mt-1">Press Enter to add a tag</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
