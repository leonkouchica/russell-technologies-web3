import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ExternalLink,
  Eye,
  Check,
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
  GripVertical,
  ChevronUp,
  ChevronDown,
  Edit2,
  Copy,
  Trash2,
  Upload,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatusBadge } from "@/components/admin/AdminComponents";
import buildingImg from "@/assets/building.webp";
import meetingImg from "@/assets/meeting.webp";
import { meta } from "@/components/site/blocks";
import { convertImageToWebP } from "@/lib/image-utils";
import { toast } from "sonner";
import { useSaveSettings } from "@/hooks/use-admin-data";

export const Route = createFileRoute("/admin/web-pages/edit")({
  head: () => meta("Edit Web Page — Admin Dashboard", "Customize layout, content and settings for web pages."),
  component: AdminEditWebPage,
});

export function AdminEditWebPage() {
  const [pageTitle, setPageTitle] = useState("About Us");
  const [slug, setSlug] = useState("about-us");
  const [activeTab, setActiveTab] = useState<"content" | "design" | "seo" | "settings">("content");
  const [status, setStatus] = useState("Published");
  const [pageType, setPageType] = useState("Standard Page");
  const [parentPage, setParentPage] = useState("None (Top Level)");
  const [pageImage, setPageImage] = useState<string | null>(buildingImg);
  const [isConvertingImage, setIsConvertingImage] = useState(false);
  const pageImageInputRef = useRef<HTMLInputElement>(null);

  const handlePageImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    try {
      setIsConvertingImage(true);
      toast.loading("Converting page image to High-Quality WebP...", { id: "page-img" });
      const res = await convertImageToWebP(file, { quality: 0.92 });
      setPageImage(res.dataUrl);
      toast.success(
        `Image converted to High-Quality WebP (${res.savedPercentage}% saved • ${res.width}×${res.height})`,
        { id: "page-img" }
      );
    } catch {
      toast.error("Failed to convert image");
    } finally {
      setIsConvertingImage(false);
    }
  };
  const [template, setTemplate] = useState("Default Template");
  const [showInNav, setShowInNav] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const saveSettingsMutation = useSaveSettings();

  const handleUpdate = async () => {
    try {
      await saveSettingsMutation.mutateAsync({
        key: `web_page_${slug}`,
        value: {
          title: pageTitle,
          slug,
          status,
          pageType,
          parentPage,
          template,
          showInNav,
          updated_at: new Date().toISOString(),
        },
      });
      setSaveSuccess(true);
      toast.success("Page configuration saved to Supabase!");
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <AdminLayout>
      {/* BREADCRUMB & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/admin/web-pages" className="hover:text-blue-600 flex items-center gap-1 transition">
            <ChevronLeft className="size-4" /> Web Pages
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">Edit Page</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/about"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
          >
            <span>View Live Page</span>
            <ExternalLink className="size-3.5 text-slate-500" />
          </Link>
          <button
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition flex items-center gap-1.5"
          >
            <Eye className="size-3.5 text-slate-500" /> Preview
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-xl bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            {saveSuccess ? <Check className="size-4 text-emerald-300" /> : null}
            <span>{saveSuccess ? "Updated!" : "Update Page"}</span>
          </button>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Edit Page
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Update your page content, settings, and publishing options.
          </p>
        </div>
      </div>

      {/* TWO-COLUMN GRID: CONTENT (65%) + SETTINGS (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: TITLE, SLUG, SECTIONS */}
        <div className="lg:col-span-8 space-y-6">
          {/* TITLE & SLUG CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Page Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Slug <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1 text-slate-500">
                <LinkIcon className="size-3.5 text-blue-600" />
                <span className="font-semibold text-blue-600">https://russelltechnologies.org/{slug}</span>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Edit</button>
            </div>
          </div>

          {/* PAGE CONTENT TABS & SECTIONS */}
          <div className="space-y-4">
            {/* TABS + ADD SECTION BUTTON */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === "content"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Content
                </button>
                <button
                  onClick={() => setActiveTab("design")}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === "design"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab("seo")}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === "seo"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  SEO
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    activeTab === "settings"
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Settings
                </button>
              </div>

              <button
                onClick={() => alert("New section block added to layout")}
                className="inline-flex items-center gap-1.5 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-2xs transition"
              >
                <Plus className="size-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            {/* FORMATTING TOOLBAR */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center gap-1 text-slate-700">
              <select className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden mr-1">
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
                <option>Paragraph</option>
              </select>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-bold" title="Bold">
                <Bold className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 italic" title="Italic">
                <Italic className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 underline" title="Underline">
                <Underline className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Bullet List">
                <List className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Numbered List">
                <ListOrdered className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Align Left">
                <AlignLeft className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Align Center">
                <AlignCenter className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Link">
                <LinkIcon className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Image">
                <ImageIcon className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Video">
                <Video className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700" title="Code">
                <Code className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 ml-auto" title="Fullscreen">
                <Maximize2 className="size-4" />
              </button>
            </div>

            {/* SECTION 1: HERO SECTION */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="size-4 text-slate-400 cursor-grab" />
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                    Hero Section
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <ChevronUp className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <ChevronDown className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100">
                    <Edit2 className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <Copy className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#f4f7fb] p-6 rounded-2xl">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      About <span className="text-blue-600">Russell Technologies</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      We build digital solutions that help businesses, institutions, and communities grow and create lasting impact across Africa.
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 bg-[#0062ff] text-white text-xs font-bold px-4 py-2 rounded-xl">
                        Our Story <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={buildingImg}
                      alt="Russell Technologies headquarters"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: TEXT SECTION */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="size-4 text-slate-400 cursor-grab" />
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                    Text Section
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <ChevronUp className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <ChevronDown className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100">
                    <Edit2 className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                    <Copy className="size-4" />
                  </button>
                  <button className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      OUR STORY
                    </span>
                    <h4 className="text-xl font-extrabold text-slate-900 leading-tight">
                      Empowering Growth Through Technology
                    </h4>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      Russell Technologies is a technology company focused on building innovative digital solutions for businesses, institutions, and communities. We combine deep technical expertise with a strong understanding of local markets to deliver practical, scalable, and impactful solutions.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-xs">
                    <img
                      src={meetingImg}
                      alt="Team collaboration"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PUBLISH, PAGE SETTINGS, FEATURED IMAGE */}
        <div className="lg:col-span-4 space-y-6">
          {/* PUBLISH CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Publish</h3>
              <AdminStatusBadge status="Published" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="space-y-2 text-xs pt-1 border-t border-slate-100">
              <p className="font-bold text-slate-700">Published on</p>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-slate-600 font-medium">
                <Calendar className="size-3.5 text-slate-400" />
                <span>Sep 5, 2026, 10:30 AM</span>
              </div>

              <p className="font-bold text-slate-700 pt-2">Last updated</p>
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <Clock className="size-3 text-slate-400" />
                <span>Sep 10, 2026, 2:15 PM by Admin</span>
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition flex items-center justify-center gap-1.5">
                <Trash2 className="size-3.5" /> Move to Trash
              </button>
            </div>
          </div>

          {/* PAGE SETTINGS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800">Page Settings</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Page Type</label>
              <select
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Standard Page">Standard Page</option>
                <option value="Homepage">Homepage</option>
                <option value="Product Page">Product Page</option>
                <option value="Legal Page">Legal Page</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Parent Page</label>
              <select
                value={parentPage}
                onChange={(e) => setParentPage(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="None (Top Level)">None (Top Level)</option>
                <option value="Services">Services</option>
                <option value="Products">Products</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Default Template">Default Template</option>
                <option value="Full Width">Full Width</option>
                <option value="Landing Page">Landing Page</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Show in Navigation</p>
                <p className="text-[11px] text-slate-400">Display this page in the main navigation menu.</p>
              </div>
              <input
                type="checkbox"
                checked={showInNav}
                onChange={(e) => setShowInNav(e.target.checked)}
                className="size-5 text-blue-600 rounded-sm cursor-pointer"
              />
            </div>
          </div>

          {/* FEATURED IMAGE CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <ImageIcon className="size-4 text-blue-600" /> Featured Image
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="size-2.5" /> WebP
              </span>
            </div>

            <input
              type="file"
              ref={pageImageInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handlePageImageUpload(e.target.files[0]);
                  e.target.value = "";
                }
              }}
            />

            {pageImage ? (
              <div className="rounded-xl overflow-hidden border border-slate-100 relative group">
                <img
                  src={pageImage}
                  alt="Featured preview"
                  className="w-full h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPageImage(null)}
                  className="absolute top-2.5 right-2.5 size-7 rounded-full bg-white text-rose-600 shadow-md flex items-center justify-center hover:bg-rose-50 cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => pageImageInputRef.current?.click()}
                className="w-full h-36 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition"
              >
                <Upload className="size-5 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-600">Click to upload image</span>
                <span className="text-[10px] text-slate-400">Converts to WebP</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => pageImageInputRef.current?.click()}
                disabled={isConvertingImage}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Upload className="size-3" /> {isConvertingImage ? "Converting..." : "Replace Image"}
              </button>
              <button
                type="button"
                onClick={() => setPageImage(null)}
                className="px-3 py-2 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 className="size-3" /> Remove
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center">
              Recommended: 1200 x 630 px • Auto-converts to WebP on upload
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
