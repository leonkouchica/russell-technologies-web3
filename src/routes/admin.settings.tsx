import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Building,
  Mail,
  MapPin,
  Globe,
  Share2,
  Search,
  Bell,
  Key,
  Shield,
  Wrench,
  Save,
  Check,
  Clock,
  Image as ImageIcon,
  Palette,
  AlertTriangle,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Upload,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { meta } from "@/components/site/blocks";
import { convertImageToWebP } from "@/lib/image-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () =>
    meta(
      "Settings — Admin Dashboard",
      "Configure system options, notifications and integrations.",
    ),
  component: AdminSettingsPage,
});

/* ── Shared Input Styles ─────────────────────────────────────────────── */
const inputCls =
  "w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition";
const labelCls = "text-xs font-bold text-slate-700 block mb-1";
const sectionTitleCls =
  "font-bold text-sm text-slate-800 flex items-center gap-2 mb-1";
const sectionDescCls = "text-xs text-slate-400";
const cardCls =
  "bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]";

/* ── Tab Config ──────────────────────────────────────────────────────── */
type SettingsTab =
  | "general"
  | "contact"
  | "social"
  | "seo"
  | "notifications"
  | "integrations"
  | "maintenance";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Building },
  { id: "contact", label: "Contact & Address", icon: MapPin },
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "seo", label: "SEO & Metadata", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Key },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
];

/* ── Toggle Component ────────────────────────────────────────────────── */
function Toggle({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-xs font-bold text-slate-700">{label}</p>
        {description && (
          <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${enabled ? "bg-[#0062ff]" : "bg-slate-200"}`}
      >
        <span
          className={`inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  /* ── General ─────────────────────────────────────────── */
  const [siteName, setSiteName] = useState("Russell Technologies");
  const [tagline, setTagline] = useState(
    "Digital infrastructure for a smarter tomorrow",
  );
  const [timezone, setTimezone] = useState("Africa/Lagos (WAT, UTC+1)");
  const [language, setLanguage] = useState("en");
  const [primaryColor, setPrimaryColor] = useState("#0062ff");
  const [logoName, setLogoName] = useState("logo.webp");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isConvertingLogo, setIsConvertingLogo] = useState(false);
  const [isConvertingOg, setIsConvertingOg] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    try {
      setIsConvertingLogo(true);
      toast.loading(`Converting logo to High-Quality WebP...`, { id: "logo-upload" });
      const res = await convertImageToWebP(file, { quality: 0.95 });
      setLogoName(res.name);
      setLogoUrl(res.dataUrl);
      toast.success(
        `Logo converted to High-Quality WebP (${res.savedPercentage}% saved • ${res.width}×${res.height})`,
        { id: "logo-upload" }
      );
    } catch {
      toast.error("Failed to convert logo image");
    } finally {
      setIsConvertingLogo(false);
    }
  };

  const handleOgUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    try {
      setIsConvertingOg(true);
      toast.loading(`Converting Social Share (OG) image to High-Quality WebP...`, { id: "og-upload" });
      const res = await convertImageToWebP(file, { quality: 0.92 });
      setOgImageUrl(res.dataUrl);
      toast.success(
        `OG image converted to High-Quality WebP (${res.savedPercentage}% saved • ${res.width}×${res.height})`,
        { id: "og-upload" }
      );
    } catch {
      toast.error("Failed to convert OG image");
    } finally {
      setIsConvertingOg(false);
    }
  };

  /* ── Contact & Address ───────────────────────────────── */
  const [contactEmail, setContactEmail] = useState(
    "info@russelltechnologies.org",
  );
  const [supportEmail, setSupportEmail] = useState(
    "support@russelltechnologies.org",
  );
  const [phoneNumber, setPhoneNumber] = useState("+234 812 345 6789");
  const [address, setAddress] = useState(
    "Plot 12, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  );
  const [city, setCity] = useState("Lagos, Nigeria");
  const [businessHours, setBusinessHours] = useState(
    "Mon – Fri, 9:00 AM – 5:00 PM (WAT)",
  );

  /* ── Social Media ────────────────────────────────────── */
  const [socials, setSocials] = useState({
    twitter: "https://x.com/russelltech",
    linkedin: "https://linkedin.com/company/russell-technologies",
    facebook: "",
    instagram: "",
    youtube: "",
    github: "",
  });

  /* ── SEO & Metadata ──────────────────────────────────── */
  const [metaTitleTemplate, setMetaTitleTemplate] = useState(
    "%s — Russell Technologies",
  );
  const [metaDescription, setMetaDescription] = useState(
    "Russell Technologies builds digital infrastructure for education, agriculture, legal and creative industries across Africa.",
  );
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [gaTrackingId, setGaTrackingId] = useState("");
  const [canonicalDomain, setCanonicalDomain] = useState(
    "https://russelltechnologies.org",
  );
  const [robotsIndex, setRobotsIndex] = useState(true);

  /* ── Notifications ───────────────────────────────────── */
  const [notifyNewContact, setNotifyNewContact] = useState(true);
  const [notifyNewComment, setNotifyNewComment] = useState(true);
  const [notifyNewSubscriber, setNotifyNewSubscriber] = useState(false);
  const [notifyNewUser, setNotifyNewUser] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(false);

  /* ── Integrations ────────────────────────────────────── */
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [mailchimpKey, setMailchimpKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  /* ── Maintenance Mode ────────────────────────────────── */
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "We're performing scheduled maintenance. We'll be back shortly.",
  );
  const [maintenanceAllowAdmins, setMaintenanceAllowAdmins] = useState(true);

  /* ── Save handler ────────────────────────────────────── */
  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: `${tabs.find((t) => t.id === activeTab)?.label} preferences have been updated.`,
    });
  };

  /* ── Render ──────────────────────────────────────────── */
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Configurations
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage global site preferences, brand information, and
            communication channels.
          </p>
        </div>
      </div>

      {/* LAYOUT: SIDEBAR TABS + CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl">
        {/* TAB SIDEBAR */}
        <nav className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-2 lg:sticky lg:top-24 space-y-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    active
                      ? "bg-[#0062ff] text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`size-4 ${active ? "text-white" : "text-slate-400"}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* CONTENT PANEL */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* ───── GENERAL TAB ───── */}
          {activeTab === "general" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Building className="size-4 text-blue-600" /> General Site
                  Identity
                </h3>
                <p className={sectionDescCls}>
                  Public name, branding tagline, and main metadata.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Company / Site Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className={sectionTitleCls}>
                  <Globe className="size-4 text-blue-600" /> Locale & Regional
                </h3>
                <p className={`${sectionDescCls} mb-4`}>
                  Timezone, language and formatting preferences.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className={inputCls}
                    >
                      <option value="Africa/Lagos (WAT, UTC+1)">
                        Africa/Lagos (WAT, UTC+1)
                      </option>
                      <option value="Africa/Lusaka (CAT, UTC+2)">
                        Africa/Lusaka (CAT, UTC+2)
                      </option>
                      <option value="Europe/London (GMT, UTC+0)">
                        Europe/London (GMT, UTC+0)
                      </option>
                      <option value="America/New_York (EST, UTC-5)">
                        America/New_York (EST, UTC-5)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={inputCls}
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="pt">Portuguese</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className={sectionTitleCls}>
                  <Palette className="size-4 text-blue-600" /> Branding
                </h3>
                <p className={`${sectionDescCls} mb-4`}>
                  Primary brand colour and logo used across the site.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Primary Brand Colour</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="size-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className={`${inputCls} flex-1`}
                        placeholder="#0062ff"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Site Logo</label>
                    <input
                      type="file"
                      ref={logoInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleLogoUpload(e.target.files?.[0]);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="size-10 rounded-xl bg-[#0b1328] flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo preview" className="w-full h-full object-contain p-1" />
                        ) : (
                          "RT"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-medium text-slate-700 truncate">
                            {logoName}
                          </p>
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Sparkles className="size-2" /> WebP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Auto-converts uploaded logos to High-Quality WebP
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        disabled={isConvertingLogo}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                      >
                        <Upload className="size-3" /> {isConvertingLogo ? "Converting..." : "Change"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───── CONTACT & ADDRESS TAB ───── */}
          {activeTab === "contact" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Mail className="size-4 text-blue-600" /> Official Contact
                  Channels
                </h3>
                <p className={sectionDescCls}>
                  Emails and phone numbers displayed on footer and contact
                  pages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>General / Info Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Support Email</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Office Telephone</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Business Hours</label>
                  <input
                    type="text"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className={sectionTitleCls}>
                  <MapPin className="size-4 text-blue-600" /> Office Address
                </h3>
                <p className={`${sectionDescCls} mb-4`}>
                  Physical location displayed on the contact page and map
                  embed.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={labelCls}>Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>City & Country</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Timezone</label>
                      <input
                        type="text"
                        value="Africa/Lagos (WAT, UTC+1)"
                        disabled
                        className={`${inputCls} opacity-60 cursor-not-allowed`}
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Set from General tab
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───── SOCIAL MEDIA TAB ───── */}
          {activeTab === "social" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Share2 className="size-4 text-blue-600" /> Social Media
                  Profiles
                </h3>
                <p className={sectionDescCls}>
                  Links shown in the site footer and used for Open Graph
                  profiles. Leave blank to hide.
                </p>
              </div>

              <div className="space-y-4">
                {(
                  [
                    {
                      key: "twitter",
                      label: "Twitter / X",
                      placeholder: "https://x.com/yourhandle",
                    },
                    {
                      key: "linkedin",
                      label: "LinkedIn",
                      placeholder: "https://linkedin.com/company/…",
                    },
                    {
                      key: "facebook",
                      label: "Facebook",
                      placeholder: "https://facebook.com/…",
                    },
                    {
                      key: "instagram",
                      label: "Instagram",
                      placeholder: "https://instagram.com/…",
                    },
                    {
                      key: "youtube",
                      label: "YouTube",
                      placeholder: "https://youtube.com/@…",
                    },
                    {
                      key: "github",
                      label: "GitHub",
                      placeholder: "https://github.com/…",
                    },
                  ] as const
                ).map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center gap-3 p-3 bg-slate-50/50 border border-slate-100 rounded-xl"
                  >
                    <div className="w-24 shrink-0">
                      <span className="text-xs font-bold text-slate-700">
                        {s.label}
                      </span>
                    </div>
                    <input
                      type="url"
                      value={socials[s.key]}
                      onChange={(e) =>
                        setSocials({ ...socials, [s.key]: e.target.value })
                      }
                      placeholder={s.placeholder}
                      className={`${inputCls} flex-1`}
                    />
                    {socials[s.key] && (
                      <a
                        href={socials[s.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-500">Tip:</span>{" "}
                  Empty links are automatically hidden from the site footer.
                </p>
              </div>
            </div>
          )}

          {/* ───── SEO & METADATA TAB ───── */}
          {activeTab === "seo" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Search className="size-4 text-blue-600" /> SEO & Metadata
                </h3>
                <p className={sectionDescCls}>
                  Defaults used for search engine appearance and social
                  sharing.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>
                    Meta Title Template{" "}
                    <span className="font-normal text-slate-400 ml-1">
                      use %s for page title
                    </span>
                  </label>
                  <input
                    type="text"
                    value={metaTitleTemplate}
                    onChange={(e) => setMetaTitleTemplate(e.target.value)}
                    className={inputCls}
                    placeholder="%s — Russell Technologies"
                  />
                </div>
                <div>
                  <label className={labelCls}>Default Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                  <p className="text-[10px] text-slate-400 mt-1 text-right">
                    {metaDescription.length} / 160 characters
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Canonical Domain</label>
                    <input
                      type="url"
                      value={canonicalDomain}
                      onChange={(e) => setCanonicalDomain(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Google Analytics ID</label>
                    <input
                      type="text"
                      value={gaTrackingId}
                      onChange={(e) => setGaTrackingId(e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className={sectionTitleCls}>
                  <ImageIcon className="size-4 text-blue-600" /> Open Graph
                  Image
                </h3>
                <p className={`${sectionDescCls} mb-4`}>
                  Default preview image shown when pages are shared on social
                  media.
                </p>
                <input
                  type="file"
                  ref={ogInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleOgUpload(e.target.files?.[0]);
                      e.target.value = "";
                    }
                  }}
                />
                <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-32 h-20 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400 shrink-0 overflow-hidden">
                    {ogImageUrl ? (
                      <img
                        src={ogImageUrl}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="size-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-slate-700 truncate max-w-xs">
                        {ogImageUrl ? "Custom OG Image (WebP)" : "No image uploaded"}
                      </p>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                        <Sparkles className="size-2" /> WebP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Recommended: 1200×630px • Automatically optimized to high-quality WebP
                    </p>
                    <button
                      type="button"
                      onClick={() => ogInputRef.current?.click()}
                      disabled={isConvertingOg}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Upload className="size-3" /> {isConvertingOg ? "Converting..." : "Upload Image"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Toggle
                  enabled={robotsIndex}
                  onChange={setRobotsIndex}
                  label="Allow Search Engine Indexing"
                  description="When disabled, a noindex,nofollow meta tag is added to all pages."
                />
              </div>
            </div>
          )}

          {/* ───── NOTIFICATIONS TAB ───── */}
          {activeTab === "notifications" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Bell className="size-4 text-blue-600" /> Notification
                  Preferences
                </h3>
                <p className={sectionDescCls}>
                  Control which events trigger admin email alerts.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                <Toggle
                  enabled={notifyNewContact}
                  onChange={setNotifyNewContact}
                  label="New Contact Inquiry"
                  description="Receive an email when someone submits the contact form."
                />
                <Toggle
                  enabled={notifyNewComment}
                  onChange={setNotifyNewComment}
                  label="New Comment Pending"
                  description="Get notified when a blog comment requires moderation."
                />
                <Toggle
                  enabled={notifyNewSubscriber}
                  onChange={setNotifyNewSubscriber}
                  label="Newsletter Signup"
                  description="Alert when a new user subscribes to the newsletter."
                />
                <Toggle
                  enabled={notifyNewUser}
                  onChange={setNotifyNewUser}
                  label="New Admin User Created"
                  description="Notification when a new user is added to the admin panel."
                />
                <Toggle
                  enabled={notifyWeeklyDigest}
                  onChange={setNotifyWeeklyDigest}
                  label="Weekly Digest"
                  description="Receive a summary of site activity every Monday at 9 AM."
                />
              </div>
            </div>
          )}

          {/* ───── INTEGRATIONS TAB ───── */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              {/* SMTP / Email */}
              <div className={`${cardCls} space-y-6`}>
                <div>
                  <h3 className={sectionTitleCls}>
                    <Mail className="size-4 text-blue-600" /> SMTP / Email
                    Delivery
                  </h3>
                  <p className={sectionDescCls}>
                    Configure outgoing email for contact forms, notifications
                    and newsletters.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>SMTP Host</label>
                    <input
                      type="text"
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                      placeholder="smtp.example.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Port</label>
                    <input
                      type="text"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(e.target.value)}
                      placeholder="587"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Username</label>
                    <input
                      type="text"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      placeholder="noreply@russelltechnologies.org"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Password</label>
                    <div className="relative">
                      <input
                        type={showSmtpPass ? "text" : "password"}
                        value={smtpPass}
                        onChange={(e) => setSmtpPass(e.target.value)}
                        placeholder="••••••••••••"
                        className={`${inputCls} pr-10`}
                      />
                      <button
                        onClick={() => setShowSmtpPass(!showSmtpPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showSmtpPass ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 border border-blue-200 transition">
                    Send Test Email
                  </button>
                  <span className="text-[11px] text-slate-400">
                    Sends a test message to your admin email
                  </span>
                </div>
              </div>

              {/* Mailchimp */}
              <div className={`${cardCls} space-y-4`}>
                <div>
                  <h3 className={sectionTitleCls}>
                    <Key className="size-4 text-blue-600" /> Mailchimp
                    Integration
                  </h3>
                  <p className={sectionDescCls}>
                    Sync newsletter subscribers with your Mailchimp audience.
                  </p>
                </div>
                <div>
                  <label className={labelCls}>API Key</label>
                  <input
                    type="text"
                    value={mailchimpKey}
                    onChange={(e) => setMailchimpKey(e.target.value)}
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usXX"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Webhooks */}
              <div className={`${cardCls} space-y-4`}>
                <div>
                  <h3 className={sectionTitleCls}>
                    <Globe className="size-4 text-blue-600" /> Webhooks
                  </h3>
                  <p className={sectionDescCls}>
                    Send POST requests to an external URL on key site events.
                  </p>
                </div>
                <div>
                  <label className={labelCls}>Webhook URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://hooks.example.com/trigger"
                      className={`${inputCls} flex-1`}
                    />
                    {webhookUrl && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(webhookUrl);
                          toast.success("Webhook URL copied!");
                        }}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                      >
                        <Copy className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Events: new contact inquiry, newsletter signup, comment
                  posted.
                </p>
              </div>
            </div>
          )}

          {/* ───── MAINTENANCE MODE TAB ───── */}
          {activeTab === "maintenance" && (
            <div className={`${cardCls} space-y-6`}>
              <div>
                <h3 className={sectionTitleCls}>
                  <Wrench className="size-4 text-blue-600" /> Maintenance Mode
                </h3>
                <p className={sectionDescCls}>
                  Temporarily take the public site offline for updates or
                  scheduled work.
                </p>
              </div>

              {/* Status Banner */}
              <div
                className={`flex items-center gap-3 p-4 rounded-xl border ${maintenanceMode ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}
              >
                <div
                  className={`size-3 rounded-full ${maintenanceMode ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`}
                />
                <div className="flex-1">
                  <p
                    className={`text-xs font-bold ${maintenanceMode ? "text-amber-800" : "text-emerald-800"}`}
                  >
                    {maintenanceMode
                      ? "Maintenance Mode is ON"
                      : "Site is Live & Operational"}
                  </p>
                  <p
                    className={`text-[11px] ${maintenanceMode ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {maintenanceMode
                      ? "Public visitors see the maintenance page."
                      : "All pages are accessible to the public."}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    toast[maintenanceMode ? "success" : "warning"](
                      maintenanceMode
                        ? "Site is now live!"
                        : "Maintenance mode activated.",
                    );
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
                    maintenanceMode
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                  }`}
                >
                  {maintenanceMode ? (
                    <>
                      <ToggleRight className="size-4" /> Go Live
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="size-4" /> Enable
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className={labelCls}>Maintenance Message</label>
                <textarea
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Shown to public visitors while maintenance mode is active.
                </p>
              </div>

              <Toggle
                enabled={maintenanceAllowAdmins}
                onChange={setMaintenanceAllowAdmins}
                label="Allow Admin Access"
                description="Logged-in administrators can still view the public site during maintenance."
              />

              {maintenanceMode && (
                <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="size-4 text-amber-600" />
                    <p className="text-xs font-bold text-amber-800">
                      Important
                    </p>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    While maintenance mode is active, search engines cannot
                    crawl your site. This may temporarily affect SEO rankings
                    if left on for extended periods. Remember to switch back to
                    live when your work is complete.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── SAVE BUTTON (always visible) ── */}
          <div className="flex items-center justify-between pt-2 pb-6">
            <p className="text-[11px] text-slate-400 hidden sm:block">
              <Clock className="size-3 inline mr-1 align-text-top" />
              Last saved: Today at 9:00 AM (WAT)
            </p>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Save className="size-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
