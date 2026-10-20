import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
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
  FileSpreadsheet,
  Printer,
  Trash2,
  Edit2,
  Eye,
  X,
  Calendar,
  Smartphone,
  Monitor,
  Check,
  RefreshCw,
  FileText,
  Clock,
  ArrowRight,
  Upload,
  UserCheck,
  Shield,
  Layers,
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
import buildingImg from "@/assets/building.webp";
import { meta } from "@/components/site/blocks";
import { exportToCsv, exportToPdf } from "@/lib/export-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/newsletter")({
  head: () =>
    meta(
      "Newsletter & Campaigns — Admin Dashboard",
      "Campaign management, subscriber audience, email templates and embed settings.",
    ),
  component: AdminNewsletterPage,
});

/* ── Tab Types ──────────────────────────────────────────────────────── */
type NewsletterTab = "campaigns" | "subscribers" | "templates" | "signup-form";

/* ── Campaign Data Structure ─────────────────────────────────────────── */
interface Campaign {
  id: string;
  title: string;
  subject: string;
  previewText: string;
  senderName: string;
  senderEmail: string;
  audience: string;
  sentDate: string;
  status: "Sent" | "Scheduled" | "Draft";
  recipientsCount: number;
  openRate?: number;
  clickRate?: number;
  templateId?: string;
  content: string;
}

const initialCampaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "September 2026 Monthly Dispatch",
    subject: "Scaling Digital Infrastructure: Africa's Next Frontier",
    previewText: "Discover our latest case studies on EduPro, Farmspots and Blueflame.",
    senderName: "Russell Technologies",
    senderEmail: "newsletter@russelltechnologies.org",
    audience: "All Subscribers",
    sentDate: "Sep 5, 2026, 10:00 AM",
    status: "Sent",
    recipientsCount: 1240,
    openRate: 42.8,
    clickRate: 7.3,
    templateId: "digest",
    content: "Welcome to the September edition of the Russell Technologies dispatch...",
  },
  {
    id: "camp-2",
    title: "Blueflame v3.2 Product Launch Announcement",
    subject: "Introducing Real-time Depot Fleet Tracking in Blueflame",
    previewText: "Automate fuel dispatch verification and reduce reconciliation cycles by 80%.",
    senderName: "Russell Technologies Product Team",
    senderEmail: "newsletter@russelltechnologies.org",
    audience: "Enterprise Leads",
    sentDate: "Aug 20, 2026, 2:30 PM",
    status: "Sent",
    recipientsCount: 420,
    openRate: 51.2,
    clickRate: 11.4,
    templateId: "product-launch",
    content: "We are thrilled to unveil Blueflame v3.2 with native offline depot syncing...",
  },
  {
    id: "camp-3",
    title: "Q4 African Tech Summit VIP Invitation",
    subject: "You're Invited: Pan-African Tech Leadership Summit 2026",
    previewText: "Join 500+ CTOs and founders in Lagos this November.",
    senderName: "Russell Technologies Events",
    senderEmail: "newsletter@russelltechnologies.org",
    audience: "Active Engagement",
    sentDate: "Oct 12, 2026, 9:00 AM",
    status: "Scheduled",
    recipientsCount: 890,
    templateId: "event-invite",
    content: "Join us for three transformative days exploring AI, fintech, and agri-tech...",
  },
  {
    id: "camp-4",
    title: "Farmspots Cooperative Impact Report",
    subject: "How 2,000+ farmers connected directly to grain off-takers",
    previewText: "A look inside our agricultural marketplace deployment in Western Nigeria.",
    senderName: "Russell Technologies",
    senderEmail: "newsletter@russelltechnologies.org",
    audience: "All Subscribers",
    sentDate: "Draft",
    status: "Draft",
    recipientsCount: 1250,
    templateId: "company-news",
    content: "Our team visited cooperative clusters in Oyo and Osun States...",
  },
];

/* ── Standard Email Templates ────────────────────────────────────────── */
interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  defaultSubject: string;
  htmlMarkup: string;
}

const standardTemplates: EmailTemplate[] = [
  {
    id: "digest",
    name: "Weekly Tech & Industry Digest",
    category: "Newsletter",
    badge: "Popular",
    description: "Multi-story curated layout with featured story, editorial note, article list, and event card.",
    defaultSubject: "Russell Technologies Weekly: What We Learned This Week",
    htmlMarkup: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0b1328; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">RUSSELL <span style="color: #0062ff;">TECHNOLOGIES</span></h1>
          <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">Weekly Engineering & Innovation Digest</p>
        </div>
        <div style="padding: 24px;">
          <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">Featured Insight: Cloud Scalability in Emerging Markets</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">How decentralized caching, edge CDNs, and offline-first mobile apps unlock reliable user experiences regardless of network conditions.</p>
          <div style="margin: 20px 0; padding: 16px; background: #f8fafc; border-left: 4px solid #0062ff; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #1e293b;">Key Takeaway:</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">Optimizing asset bundles and using WebP reduces mobile bandwidth consumption by over 60%.</p>
          </div>
          <a href="#" style="display: inline-block; background: #0062ff; color: #ffffff; padding: 10px 20px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px;">Read Full Analysis →</a>
        </div>
        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
          You received this email because you subscribed to updates from Russell Technologies.<br />
          Lagos, Nigeria • russelltechnologies.org • <a href="#" style="color: #0062ff;">Unsubscribe</a>
        </div>
      </div>
    `,
  },
  {
    id: "product-launch",
    name: "Product Release & Feature Update",
    category: "Product",
    badge: "High Engagement",
    description: "Showcases new software capabilities, hero product banner, changelog bullets, and direct CTA.",
    defaultSubject: "What's New: Major Feature Announcement",
    htmlMarkup: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0b1328 0%, #0062ff 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
          <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase;">New Release</span>
          <h1 style="margin: 12px 0 6px; font-size: 24px; font-weight: 800;">Introducing Blueflame v3.2</h1>
          <p style="margin: 0; font-size: 13px; color: #e2e8f0;">Real-Time Depot Logistics & Automated Stock Auditing</p>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">We've redesigned fuel distribution analytics from the ground up to give terminal operators instant insight into inventory, tanker dispatches, and financial ledger settlement.</p>
          <ul style="font-size: 13px; color: #334155; line-height: 1.8; padding-left: 20px;">
            <li><strong>Automated Stock Recon:</strong> Live reconciliation against pump meters.</li>
            <li><strong>Offline Mode:</strong> Full functionality when remote depot connectivity drops.</li>
            <li><strong>High-Speed WebP Previews:</strong> Instant slip & waybill generation.</li>
          </ul>
          <div style="text-align: center; margin: 24px 0;">
            <a href="#" style="display: inline-block; background: #0062ff; color: #ffffff; padding: 12px 28px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,98,255,0.25);">Explore Features & Demo →</a>
          </div>
        </div>
        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
          Russell Technologies • Plot 12 Admiralty Way, Lekki Phase 1, Lagos
        </div>
      </div>
    `,
  },
  {
    id: "event-invite",
    name: "Event, Webinar & Keynote Invitation",
    category: "Events",
    badge: "High Conversion",
    description: "Event banner, speaker spotlight, calendar date badge, agenda bullet points, and RSVP button.",
    defaultSubject: "Exclusive Invitation: Russell Technologies Leadership Forum",
    htmlMarkup: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; padding: 28px 24px; text-align: center; color: #ffffff;">
          <div style="display: inline-block; background: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 12px;">
            OCTOBER 10, 2026 • 10:00 AM WAT
          </div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Pan-African Technology Summit</h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">Hybrid: Live in Victoria Island, Lagos & Virtual Webcast</p>
        </div>
        <div style="padding: 24px;">
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">Join executive decision makers, infrastructure architects, and leading industry engineers as we unpack the next decade of African digital infrastructure.</p>
          <div style="background: #f1f5f9; padding: 16px; border-radius: 10px; margin: 16px 0;">
            <p style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #0f172a;">Keynote Speakers:</p>
            <p style="margin: 0; font-size: 12px; color: #475569;">Executive Engineering Team & Guest Industry Pioneers</p>
          </div>
          <div style="text-align: center; margin: 24px 0 10px;">
            <a href="#" style="display: inline-block; background: #0062ff; color: #ffffff; padding: 12px 28px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 10px;">Reserve Complimentary Seat →</a>
          </div>
        </div>
        <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
          Russell Technologies • info@russelltechnologies.org
        </div>
      </div>
    `,
  },
  {
    id: "company-news",
    name: "Corporate Announcement & Executive Letter",
    category: "Corporate",
    badge: "Official",
    description: "Clean minimalist layout suitable for quarterly stakeholder updates, company milestones, and strategic announcements.",
    defaultSubject: "A Letter from Russell Technologies Leadership",
    htmlMarkup: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="padding: 28px 28px 16px; border-bottom: 2px solid #0062ff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #0b1328;">RUSSELL <span style="color: #0062ff;">TECHNOLOGIES</span></h1>
        </div>
        <div style="padding: 28px;">
          <h2 style="font-size: 17px; color: #0f172a; margin-top: 0;">Quarterly Strategic Update & Expansion Notice</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.7;">Dear Partners, Clients, and Community,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.7;">Over the past quarter, our systems delivered 99.9% uptime across all active deployments, supporting over 150 enterprise implementations in Nigeria, Ghana, and Kenya.</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.7;">We remain committed to engineering high-availability digital solutions tailored to the real operational challenges facing African industries.</p>
          <p style="font-size: 14px; color: #334155; margin-top: 24px; line-height: 1.4;">Warm regards,<br /><strong>Russell Leadership Team</strong><br /><span style="font-size: 12px; color: #64748b;">Russell Technologies Ltd</span></p>
        </div>
        <div style="background: #f8fafc; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
          Russell Technologies • russelltechnologies.org
        </div>
      </div>
    `,
  },
];

/* ── Chart Data ──────────────────────────────────────────────────────── */
const subscriberGrowthData = [
  { month: "Jan", subscribers: 350 },
  { month: "Feb", subscribers: 480 },
  { month: "Mar", subscribers: 550 },
  { month: "Apr", subscribers: 680 },
  { month: "May", subscribers: 820 },
  { month: "Jun", subscribers: 940 },
  { month: "Jul", subscribers: 1050 },
  { month: "Aug", subscribers: 1120 },
  { month: "Sep", subscribers: 1250 },
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

export function AdminNewsletterPage() {
  const [activeTab, setActiveTab] = useState<NewsletterTab>("campaigns");

  /* ── Campaign States ───────────────────────────────────────────────── */
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewTemplateModal, setPreviewTemplateModal] = useState<EmailTemplate | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  /* ── Campaign Creator Form State ───────────────────────────────────── */
  const [campTitle, setCampTitle] = useState("");
  const [campSubject, setCampSubject] = useState("");
  const [campPreviewText, setCampPreviewText] = useState("");
  const [campAudience, setCampAudience] = useState("All Subscribers");
  const [campTemplateId, setCampTemplateId] = useState("digest");
  const [campBody, setCampBody] = useState("");

  /* ── Subscribers State ─────────────────────────────────────────────── */
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>(adminSubscribers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [newSubEmail, setNewSubEmail] = useState("");
  const [newSubSource, setNewSubSource] = useState("Website");

  /* ── Signup Form Settings State ────────────────────────────────────── */
  const [formHeading, setFormHeading] = useState("Stay Ahead with Russell Insights");
  const [formSubheading, setFormSubheading] = useState(
    "Subscribe to receive bi-weekly technology blueprints, product updates, and executive briefings.",
  );
  const [formButtonText, setFormButtonText] = useState("Subscribe Now");
  const [formSuccessMessage, setFormSuccessMessage] = useState(
    "Thank you for subscribing! Please check your inbox to confirm.",
  );
  const [doubleOptIn, setDoubleOptIn] = useState(true);
  const [enableGdpr, setEnableGdpr] = useState(true);
  const [gdprDisclaimer, setGdprDisclaimer] = useState(
    "I agree to receive communications from Russell Technologies. I can unsubscribe at any time.",
  );
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  /* ── Filtered Subscribers ──────────────────────────────────────────── */
  const filteredSubs = subscribers.filter((s) => {
    if (selectedStatus !== "all" && s.status !== selectedStatus) return false;
    if (selectedSource !== "all" && s.source !== selectedSource) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectSub = (id: string) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  /* ── CSV and PDF Export ────────────────────────────────────────────── */
  const handleExportSubscribersCsv = () => {
    try {
      exportToCsv("russell_newsletter_subscribers", subscribers, [
        { header: "ID", key: "id" },
        { header: "Name", key: "name" },
        { header: "Email Address", key: "email" },
        { header: "Status", key: "status" },
        { header: "Acquisition Source", key: "source" },
        { header: "Date Subscribed", key: "dateSubscribed" },
      ]);
      toast.success("Subscribers exported to CSV successfully!");
    } catch {
      toast.error("Failed to export subscribers");
    }
  };

  const handleExportSubscribersPdf = () => {
    try {
      exportToPdf({
        title: "Verified Newsletter Subscriber Register",
        subtitle: "Official audience membership roll • Russell Technologies",
        tableHeaders: ["Subscriber Name", "Email Address", "Status", "Source Channel", "Date Joined"],
        tableRows: subscribers.map((s) => [
          s.name,
          s.email,
          s.status,
          s.source,
          s.dateSubscribed,
        ]),
      });
      toast.success("Generating print-ready Subscriber PDF preview...");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  /* ── Add Subscriber Handler ────────────────────────────────────────── */
  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim() || !newSubEmail.trim()) {
      toast.error("Please fill in both name and email");
      return;
    }
    const initials = newSubName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const newSub: AdminSubscriber = {
      id: `sub-${Date.now()}`,
      name: newSubName.trim(),
      email: newSubEmail.trim(),
      status: "Subscribed",
      source: newSubSource,
      dateSubscribed: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      initials,
    };

    setSubscribers([newSub, ...subscribers]);
    setNewSubName("");
    setNewSubEmail("");
    setShowAddSubModal(false);
    toast.success(`Subscriber ${newSub.name} added successfully!`);
  };

  /* ── Create Campaign Handler ───────────────────────────────────────── */
  const handleSaveCampaign = (sendNow: boolean = false) => {
    if (!campTitle.trim() || !campSubject.trim()) {
      toast.error("Please provide both Campaign Title and Subject line");
      return;
    }

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      title: campTitle,
      subject: campSubject,
      previewText: campPreviewText || campSubject,
      senderName: "Russell Technologies",
      senderEmail: "newsletter@russelltechnologies.org",
      audience: campAudience,
      sentDate: sendNow ? "Just now" : "Draft",
      status: sendNow ? "Sent" : "Draft",
      recipientsCount:
        campAudience === "All Subscribers"
          ? 1250
          : campAudience === "Enterprise Leads"
            ? 420
            : 890,
      openRate: sendNow ? 0.0 : undefined,
      clickRate: sendNow ? 0.0 : undefined,
      templateId: campTemplateId,
      content: campBody || "Campaign content...",
    };

    setCampaigns([newCampaign, ...campaigns]);
    setShowCreateModal(false);
    setCampTitle("");
    setCampSubject("");
    setCampPreviewText("");
    setCampBody("");

    if (sendNow) {
      toast.success(
        `Campaign dispatched successfully to ${newCampaign.recipientsCount} recipients!`,
      );
    } else {
      toast.success("Campaign draft saved successfully!");
    }
  };

  /* ── Copy Embed Code ───────────────────────────────────────────────── */
  const embedCodeSnippet = `<iframe src="https://russelltechnologies.org/embed/newsletter" width="100%" height="240" frameborder="0" style="border:none;overflow:hidden;border-radius:12px;"></iframe>`;

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedEmbed(true);
    toast.success("Embed iframe snippet copied to clipboard!");
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  return (
    <AdminLayout>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Newsletter & Campaigns
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Create campaigns, manage subscriber lists, customize signup forms and email templates.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Create New Campaign</span>
          </button>
        </div>
      </div>

      {/* 4 TAB SWITCHER */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6 max-w-2xl border border-slate-200/80">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "campaigns"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Send className="size-3.5" /> Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "subscribers"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="size-3.5" /> Subscribers ({subscribers.length})
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "templates"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Mail className="size-3.5" /> Templates ({standardTemplates.length})
        </button>
        <button
          onClick={() => setActiveTab("signup-form")}
          className={`flex-1 min-w-[120px] py-2 px-3 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
            activeTab === "signup-form"
              ? "bg-white text-blue-700 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Code className="size-3.5" /> Signup Form Settings
        </button>
      </div>

      {/* ═══════════════ TAB 1: CAMPAIGNS & COMPOSER ═══════════════ */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard
              title="Total Subscribers"
              value={subscribers.length.toLocaleString()}
              change="+12%"
              note="+132 this month"
              icon={Users}
              iconBgColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <AdminStatCard
              title="Campaigns Sent"
              value={campaigns.filter((c) => c.status === "Sent").length}
              change="+60%"
              note={`${campaigns.filter((c) => c.status === "Scheduled").length} scheduled`}
              icon={Mail}
              iconBgColor="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <AdminStatCard
              title="Average Open Rate"
              value="45.6%"
              change="+8%"
              note="Industry avg: 28%"
              icon={Send}
              iconBgColor="bg-purple-50"
              iconColor="text-purple-600"
            />
            <AdminStatCard
              title="Average Click Rate"
              value="8.2%"
              change="+2%"
              note="vs last month"
              icon={MousePointerClick}
              iconBgColor="bg-rose-50"
              iconColor="text-rose-600"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-800">Subscriber Growth</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">Past 9 Months</span>
              </div>
              <div className="h-52 w-full">
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

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="size-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-800">Engagement Rates</h3>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-blue-600">
                    <span className="size-2 rounded-full bg-blue-600" /> Open Rate
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="size-2 rounded-full bg-emerald-600" /> Click Rate
                  </span>
                </div>
              </div>
              <div className="h-52 w-full">
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

          {/* CAMPAIGN LIST */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">All Campaigns</h3>
                <p className="text-xs text-slate-400 mt-0.5">Historical and active newsletter communications</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-100 transition"
              >
                <Plus className="size-3.5" /> Compose Campaign
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-4 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-800">{camp.title}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            camp.status === "Sent"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : camp.status === "Scheduled"
                                ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {camp.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        <strong>Subject:</strong> {camp.subject}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span>Audience: <strong>{camp.audience}</strong></span>
                        <span>•</span>
                        <span>Recipients: <strong>{camp.recipientsCount.toLocaleString()}</strong></span>
                        <span>•</span>
                        <span>{camp.sentDate}</span>
                      </div>
                    </div>
                  </div>

                  {camp.status === "Sent" ? (
                    <div className="flex items-center gap-6 sm:text-right shrink-0">
                      <div>
                        <p className="text-base font-extrabold text-slate-900">{camp.openRate}%</p>
                        <p className="text-[10px] text-slate-400">Open Rate</p>
                      </div>
                      <div>
                        <p className="text-base font-extrabold text-slate-900">{camp.clickRate}%</p>
                        <p className="text-[10px] text-slate-400">Click Rate</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setCampaigns(
                            campaigns.map((c) =>
                              c.id === camp.id ? { ...c, status: "Sent", sentDate: "Just now", openRate: 0, clickRate: 0 } : c,
                            ),
                          );
                          toast.success(`Dispatched ${camp.title}!`);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition"
                      >
                        Send Now
                      </button>
                      <button
                        onClick={() => {
                          setCampaigns(campaigns.filter((c) => c.id !== camp.id));
                          toast.success("Campaign deleted");
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ TAB 2: MANAGE SUBSCRIBERS ═══════════════ */}
      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {/* SEARCH & FILTERS BAR */}
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

              <button
                onClick={handleExportSubscribersCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition shadow-2xs"
                title="Download CSV"
              >
                <FileSpreadsheet className="size-3.5 text-emerald-600" /> Export CSV
              </button>

              <button
                onClick={handleExportSubscribersPdf}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition shadow-2xs"
                title="Print or Export PDF"
              >
                <Printer className="size-3.5 text-blue-600" /> Export PDF
              </button>

              <button
                onClick={() => setShowAddSubModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Plus className="size-3.5" /> Add Subscriber
              </button>
            </div>
          </div>

          {/* BULK ACTIONS BAR */}
          {selectedSubs.length > 0 && (
            <div className="flex items-center justify-between text-xs text-blue-900 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl">
              <span className="font-bold">{selectedSubs.length} subscribers selected</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSubscribers(
                      subscribers.map((s) =>
                        selectedSubs.includes(s.id) ? { ...s, status: "Unsubscribed" } : s,
                      ),
                    );
                    setSelectedSubs([]);
                    toast.success("Updated selected subscribers to Unsubscribed");
                  }}
                  className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition"
                >
                  Unsubscribe
                </button>
                <button
                  onClick={() => {
                    setSubscribers(subscribers.filter((s) => !selectedSubs.includes(s.id)));
                    setSelectedSubs([]);
                    toast.success("Deleted selected subscribers");
                  }}
                  className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* SUBSCRIBERS TABLE */}
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
                            selectedSubs.length === filteredSubs.length ? [] : filteredSubs.map((s) => s.id),
                          )
                        }
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-4 px-2">Subscriber Name</th>
                    <th className="py-4 px-3">Email Address</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Acquisition Source</th>
                    <th className="py-4 px-3">Date Joined</th>
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
                        <td className="py-3 px-3 text-slate-600 font-medium">{sub.email}</td>
                        <td className="py-3 px-3">
                          <AdminStatusBadge status={sub.status} />
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{sub.source}</td>
                        <td className="py-3 px-3 text-slate-500">{sub.dateSubscribed}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                const newStatus = sub.status === "Subscribed" ? "Unsubscribed" : "Subscribed";
                                setSubscribers(
                                  subscribers.map((s) => (s.id === sub.id ? { ...s, status: newStatus } : s)),
                                );
                                toast.success(`${sub.name} is now ${newStatus}`);
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md transition"
                            >
                              {sub.status === "Subscribed" ? "Unsubscribe" : "Re-activate"}
                            </button>
                            <button
                              onClick={() => {
                                setSubscribers(subscribers.filter((s) => s.id !== sub.id));
                                toast.success(`Removed ${sub.name}`);
                              }}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              title="Delete subscriber"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <p>Showing {filteredSubs.length} of {subscribers.length} subscribers</p>
              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1 rounded-lg border border-slate-200 font-bold text-slate-700 bg-slate-50">1</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ TAB 3: EMAIL TEMPLATES ═══════════════ */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Standard Email Templates</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pre-designed, fully responsive email layouts optimized for high deliverability and engagement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between hover:border-blue-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      {template.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {template.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900">{template.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{template.description}</p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[11px] font-bold text-slate-700 mb-0.5">Sample Subject:</p>
                    <p className="text-xs text-slate-600 font-mono truncate">{template.defaultSubject}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setPreviewTemplateModal(template)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition shadow-2xs"
                  >
                    <Eye className="size-3.5 text-blue-600" /> Preview Template
                  </button>
                  <button
                    onClick={() => {
                      setCampTemplateId(template.id);
                      setCampSubject(template.defaultSubject);
                      setCampTitle(template.name);
                      setShowCreateModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    <Send className="size-3.5" /> Use in Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ TAB 4: SIGNUP FORM SETTINGS ═══════════════ */}
      {activeTab === "signup-form" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SETTINGS CONTROLS (60%) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-5">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Code className="size-4 text-blue-600" /> Signup Form Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize the copy, fields, and behavior of the public newsletter subscription widget.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Form Heading</label>
                <input
                  type="text"
                  value={formHeading}
                  onChange={(e) => setFormHeading(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subheading / Description</label>
                <textarea
                  rows={2}
                  value={formSubheading}
                  onChange={(e) => setFormSubheading(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Submit Button Label</label>
                  <input
                    type="text"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Post-Signup Action</label>
                  <select className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800">
                    <option>Show Inline Success Message</option>
                    <option>Redirect to Custom URL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Success Message Copy</label>
                <input
                  type="text"
                  value={formSuccessMessage}
                  onChange={(e) => setFormSuccessMessage(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              {/* TOGGLES */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Double Opt-in Verification</p>
                    <p className="text-[11px] text-slate-500">Sends confirmation link before activating subscriber.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDoubleOptIn(!doubleOptIn)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      doubleOptIn ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        doubleOptIn ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">GDPR Compliance Disclaimer</p>
                    <p className="text-[11px] text-slate-500">Displays explicit consent checkbox below form.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableGdpr(!enableGdpr)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enableGdpr ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        enableGdpr ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Newsletter signup form settings saved!")}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Save Form Settings
              </button>
            </div>
          </div>

          {/* PREVIEW & EMBED SNIPPET (40%) */}
          <div className="lg:col-span-5 space-y-6">
            {/* LIVE PREVIEW */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Live Preview</span>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3">
                <h4 className="font-extrabold text-base leading-snug">{formHeading}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{formSubheading}</p>

                <div className="space-y-2 pt-1">
                  <input
                    type="email"
                    disabled
                    placeholder="Enter your work email"
                    className="w-full text-xs bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder:text-slate-400"
                  />
                  {enableGdpr && (
                    <div className="flex items-start gap-2 pt-1">
                      <input type="checkbox" disabled checked className="mt-0.5 rounded-sm" />
                      <span className="text-[10px] text-slate-400 leading-tight">{gdprDisclaimer}</span>
                    </div>
                  )}
                  <button
                    disabled
                    className="w-full py-2 bg-[#0062ff] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    {formButtonText}
                  </button>
                </div>
              </div>
            </div>

            {/* EMBED CODE */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Code className="size-4 text-blue-600" /> Embed Widget Snippet
              </h4>
              <p className="text-[11px] text-slate-500">
                Copy this HTML code to embed the subscription form on any landing page or third-party website.
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  rows={3}
                  value={embedCodeSnippet}
                  className="w-full p-2.5 text-[11px] font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-700 resize-none focus:outline-hidden"
                />
              </div>

              <button
                onClick={handleCopyEmbedCode}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                {copiedEmbed ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Embed Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MODAL: CREATE NEW CAMPAIGN ═══════════════ */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Send className="size-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Compose New Campaign</h3>
                  <p className="text-xs text-slate-400">Design, customize and schedule your email broadcast</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Internal Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g. October 2026 Innovation Briefing"
                  value={campTitle}
                  onChange={(e) => setCampTitle(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Subject Line</label>
                <input
                  type="text"
                  placeholder="Compelling subject line that catches recipient attention..."
                  value={campSubject}
                  onChange={(e) => setCampSubject(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Preview Text (Pre-header)</label>
                <input
                  type="text"
                  placeholder="Short teaser line visible in the inbox preview..."
                  value={campPreviewText}
                  onChange={(e) => setCampPreviewText(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Audience Segment</label>
                  <select
                    value={campAudience}
                    onChange={(e) => setCampAudience(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
                  >
                    <option value="All Subscribers">All Subscribers (1,250)</option>
                    <option value="Enterprise Leads">Enterprise Leads (420)</option>
                    <option value="Active Engagement">Active Engagement (890)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Template</label>
                  <select
                    value={campTemplateId}
                    onChange={(e) => setCampTemplateId(e.target.value)}
                    className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
                  >
                    {standardTemplates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Campaign Body / Message</label>
                <textarea
                  rows={4}
                  placeholder="Write your email announcement or newsletter content here..."
                  value={campBody}
                  onChange={(e) => setCampBody(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs text-blue-900">
                <span className="font-semibold">Sender: newsletter@russelltechnologies.org</span>
                <button
                  type="button"
                  onClick={() => toast.success("Test email dispatched to admin inbox!")}
                  className="px-3 py-1 bg-white border border-blue-200 rounded-lg font-bold text-blue-700 hover:bg-blue-50 transition"
                >
                  Send Test Email
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveCampaign(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSaveCampaign(true)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Send className="size-3.5" /> Dispatch Campaign Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MODAL: ADD SUBSCRIBER ═══════════════ */}
      {showAddSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form onSubmit={handleAddSubscriber} className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <UserCheck className="size-4 text-blue-600" /> Add Subscriber
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSubModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Femi Adeyemi"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. femi@domain.com"
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Acquisition Source</label>
                <select
                  value={newSubSource}
                  onChange={(e) => setNewSubSource(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Website">Website</option>
                  <option value="Event">Event</option>
                  <option value="Manual">Manual</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddSubModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
              >
                Save Subscriber
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ═══════════════ MODAL: PREVIEW TEMPLATE ═══════════════ */}
      {previewTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            {/* MODAL HEADER */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-sm text-slate-900">{previewTemplateModal.name}</h3>
                <p className="text-[11px] text-slate-400">{previewTemplateModal.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1 rounded-md text-xs ${
                      previewDevice === "desktop" ? "bg-blue-600 text-white" : "text-slate-500"
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1 rounded-md text-xs ${
                      previewDevice === "mobile" ? "bg-blue-600 text-white" : "text-slate-500"
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="size-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setPreviewTemplateModal(null)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-400"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* PREVIEW FRAME */}
            <div className="p-6 bg-slate-100 overflow-y-auto flex-1 flex justify-center items-start">
              <div
                className={`transition-all bg-white shadow-md rounded-xl overflow-hidden ${
                  previewDevice === "mobile" ? "w-[360px]" : "w-full max-w-xl"
                }`}
                dangerouslySetInnerHTML={{ __html: previewTemplateModal.htmlMarkup }}
              />
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <button
                onClick={() => setPreviewTemplateModal(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setCampTemplateId(previewTemplateModal.id);
                  setCampSubject(previewTemplateModal.defaultSubject);
                  setCampTitle(previewTemplateModal.name);
                  setPreviewTemplateModal(null);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Use This Template in Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
