/**
 * Seed script — migrates existing mock data from admin-data.ts into Supabase.
 * Run with: bun run scripts/seed-supabase.ts
 *
 * Requires environment variables:
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in .env or shell.");
  process.exit(1);
}

const sb = createClient(supabaseUrl, serviceRoleKey);

// ─── Blog Posts ────────────────────────────────────────────────────────────

const blogPosts = [
  {
    title: "How Technology is Transforming Education in African Schools",
    slug: "how-technology-is-transforming-education-in-african-schools",
    category: "Education",
    status: "Published",
    author_name: "Admin",
    views: 1200,
    comments_count: 12,
    excerpt: "Discover how digital tools are helping schools streamline operations and enhance student outcomes across Nigeria.",
    featured: true,
    created_at: "2026-09-10T08:00:00Z",
  },
  {
    title: "Building Stronger Agricultural Value Chains in Africa",
    slug: "building-stronger-agricultural-value-chains-in-africa",
    category: "Agriculture",
    status: "Published",
    author_name: "Admin",
    views: 856,
    comments_count: 8,
    excerpt: "A look at how platforms like FARMSPOTS are connecting farmers to bigger markets, eliminating middleman inefficiencies.",
    created_at: "2026-09-05T08:00:00Z",
  },
  {
    title: "How African Artists Can Reach Global Audiences",
    slug: "how-african-artists-can-reach-global-audiences",
    category: "Music",
    status: "Draft",
    author_name: "Admin",
    views: 620,
    comments_count: 4,
    excerpt: "Explore practical strategies for artists to grow their fan base using digital distribution and smart streaming analytics.",
    created_at: "2026-08-20T08:00:00Z",
  },
  {
    title: "Understanding Compliance for Growing Businesses in Africa",
    slug: "understanding-compliance-for-growing-businesses-in-africa",
    category: "Legal",
    status: "Published",
    author_name: "Admin",
    views: 910,
    comments_count: 7,
    excerpt: "Key legal and regulatory considerations for SMEs and growing enterprises looking to scale safely.",
    created_at: "2026-08-28T08:00:00Z",
  },
  {
    title: "The Role of Data in Building Smarter Businesses",
    slug: "the-role-of-data-in-building-smarter-businesses",
    category: "Technology",
    status: "Published",
    author_name: "Admin",
    views: 1500,
    comments_count: 15,
    excerpt: "How data-driven decisions can help businesses grow, streamline inventory, and stay competitive in changing markets.",
    created_at: "2026-08-15T08:00:00Z",
  },
  {
    title: "Creating Inclusive Learning Opportunities Through Technology",
    slug: "creating-inclusive-learning-opportunities-through-technology",
    category: "Education",
    status: "Scheduled",
    author_name: "Admin",
    views: 0,
    comments_count: 0,
    excerpt: "Practical ways schools can use technology to support every learner, regardless of background or physical location.",
    scheduled_at: "2026-10-05T08:00:00Z",
    created_at: "2026-09-15T08:00:00Z",
  },
  {
    title: "BLUEFLAME Spotlight: Empowering African Creatives",
    slug: "blueflame-spotlight-empowering-african-creatives",
    category: "Music",
    status: "Published",
    author_name: "Admin",
    views: 780,
    comments_count: 5,
    excerpt: "How BLUEFLAME is giving artists the tools to create, distribute and grow globally with automated royalties.",
    created_at: "2026-07-30T08:00:00Z",
  },
  {
    title: "Digital Transformation Trends for African Businesses in 2026",
    slug: "digital-transformation-trends-for-african-businesses-in-2026",
    category: "Business",
    status: "Published",
    author_name: "Admin",
    views: 1100,
    comments_count: 9,
    excerpt: "Key trends and opportunities shaping the future of digital business and cloud infrastructure across Africa.",
    created_at: "2026-07-18T08:00:00Z",
  },
];

// ─── Events ────────────────────────────────────────────────────────────────

const events = [
  { title: "African Photo Week Conference 2026", slug: "african-photo-week-conference-2026", type: "Online", status: "Published", date_time: "2026-10-10T10:00:00Z", location: "Online", registered_count: 320, max_attendees: 500 },
  { title: "Tech for Education Webinar", slug: "tech-for-education-webinar", type: "Online", status: "Published", date_time: "2026-10-18T14:00:00Z", location: "Online", registered_count: 120 },
  { title: "BLUEFLAME Artists Showcase", slug: "blueflame-artists-showcase", type: "Online", status: "Published", date_time: "2026-11-05T18:00:00Z", location: "Online", registered_count: 75 },
  { title: "Russell Tech Innovation Summit", slug: "russell-tech-innovation-summit", type: "In-person", status: "Published", date_time: "2026-11-20T09:00:00Z", location: "Lagos, Nigeria", registered_count: 200 },
  { title: "FARMSPOTS Partner Onboarding", slug: "farmspots-partner-onboarding", type: "In-person", status: "Draft", date_time: "2026-12-03T11:00:00Z", location: "Ibadan, Nigeria", registered_count: 85 },
  { title: "Website Management Workshop", slug: "website-management-workshop", type: "Online", status: "Scheduled", date_time: "2027-01-15T15:00:00Z", location: "Online", registered_count: 0 },
  { title: "Creative Industry Networking", slug: "creative-industry-networking", type: "In-person", status: "Scheduled", date_time: "2027-02-10T16:00:00Z", location: "Abuja, Nigeria", registered_count: 0 },
  { title: "Sustainable Agriculture Forum", slug: "sustainable-agriculture-forum", type: "In-person", status: "Draft", date_time: "2027-03-22T10:00:00Z", location: "Lagos, Nigeria", registered_count: 0 },
];

// ─── Subscribers ───────────────────────────────────────────────────────────

const subscribers = [
  { name: "Adeola Johnson", email: "adeola.johnson@example.com", status: "Subscribed", source: "Website", subscribed_at: "2026-09-10T08:24:00Z" },
  { name: "Chinedu Okafor", email: "chinedu.okafor@example.com", status: "Subscribed", source: "Event", subscribed_at: "2026-09-09T15:12:00Z" },
  { name: "Fatima Yusuf", email: "fatima.yusuf@example.com", status: "Subscribed", source: "Website", subscribed_at: "2026-09-08T11:45:00Z" },
  { name: "Tunde Balogun", email: "tunde.balogun@example.com", status: "Unsubscribed", source: "Manual", subscribed_at: "2026-09-07T18:30:00Z" },
  { name: "Grace Adebayo", email: "grace.adebayo@example.com", status: "Subscribed", source: "Event", subscribed_at: "2026-09-06T14:10:00Z" },
  { name: "Ibrahim Bello", email: "ibrahim.bello@example.com", status: "Subscribed", source: "Website", subscribed_at: "2026-09-05T09:18:00Z" },
  { name: "Nkechi Eze", email: "nkechi.eze@example.com", status: "Subscribed", source: "Social Media", subscribed_at: "2026-09-04T16:05:00Z" },
  { name: "Daniel Smith", email: "daniel.smith@example.com", status: "Subscribed", source: "Website", subscribed_at: "2026-09-03T13:22:00Z" },
];

// ─── Admin Users ───────────────────────────────────────────────────────────

const adminProfiles = [
  { id: "00000000-0000-0000-0000-000000000001", name: "Admin User", title: "Super Admin", role: "Super Admin", status: "Active", email: "admin@russelltechnologies.org", initials: "AD" },
  { id: "00000000-0000-0000-0000-000000000002", name: "Chioma Okafor", title: "Content Manager", role: "Editor", status: "Active", email: "chioma@russelltechnologies.org", initials: "CO" },
  { id: "00000000-0000-0000-0000-000000000003", name: "Tunde Adebayo", title: "Marketing Lead", role: "Editor", status: "Active", email: "tunde@russelltechnologies.org", initials: "TA" },
  { id: "00000000-0000-0000-0000-000000000004", name: "Grace Johnson", title: "Event Coordinator", role: "Author", status: "Active", email: "grace@russelltechnologies.org", initials: "GJ" },
  { id: "00000000-0000-0000-0000-000000000005", name: "Ibrahim Bello", title: "Support Staff", role: "Contributor", status: "Active", email: "ibrahim@russelltechnologies.org", initials: "IB" },
  { id: "00000000-0000-0000-0000-000000000006", name: "Nkechi Eze", title: "Newsletter Manager", role: "Editor", status: "Active", email: "nkechi@russelltechnologies.org", initials: "NE" },
  { id: "00000000-0000-0000-0000-000000000007", name: "Daniel Smith", title: "Web Developer", role: "Administrator", status: "Active", email: "daniel@russelltechnologies.org", initials: "DS" },
  { id: "00000000-0000-0000-0000-000000000008", name: "Fatima Yusuf", title: "Content Writer", role: "Author", status: "Inactive", email: "fatima@russelltechnologies.org", initials: "FY" },
];

// ─── Contacts ──────────────────────────────────────────────────────────────

const contacts = [
  { name: "Olusegun Adeyemi", email: "olusegun@example.com", company: "Adeyemi Farms Ltd", service: "Web Development", budget: "$5,000 – $10,000", message: "We need a modern website for our agricultural export business.", status: "New", created_at: "2026-09-15T10:00:00Z" },
  { name: "Amina Hassan", email: "amina@example.com", company: "Hassan Legal Consult", service: "Automation", budget: "$10,000 – $25,000", message: "Looking for document automation for our legal practice.", status: "In Review", created_at: "2026-09-12T14:30:00Z" },
  { name: "Kelechi Nwosu", email: "kelechi@example.com", company: "EduBridge Africa", service: "Mobile Applications", budget: "$25,000+", message: "Interested in building a learning management app for schools.", status: "Responded", created_at: "2026-09-08T09:15:00Z" },
];

// ─── Comments ──────────────────────────────────────────────────────────────

const comments = [
  { author: "John Doe", email: "john@example.com", content: "Great article on education technology! Very insightful.", status: "Approved", post_title: "How Technology is Transforming Education in African Schools", created_at: "2026-09-11T08:30:00Z" },
  { author: "Sarah Obi", email: "sarah@example.com", content: "Would love to see more coverage of agricultural tech innovations.", status: "Pending", post_title: "Building Stronger Agricultural Value Chains in Africa", created_at: "2026-09-06T15:20:00Z" },
  { author: "Mike Chen", email: "mike@example.com", content: "The data analytics section was particularly useful for our business.", status: "Approved", post_title: "The Role of Data in Building Smarter Businesses", created_at: "2026-08-16T11:45:00Z" },
  { author: "spam_bot", email: "spam@fake.com", content: "Buy cheap watches at...", status: "Trash", post_title: "General", created_at: "2026-09-14T03:00:00Z" },
];

// ─── Audit Logs ────────────────────────────────────────────────────────────

const auditLogs = [
  { action: "Exported CSV Database", category: "Export", target: "Contacts & Inquiries (12 records)", user_name: "Admin User", user_role: "Super Admin", status: "Success", ip_address: "197.210.44.12", details: "Downloaded 12 client proposals in UTF-8 BOM CSV format." },
  { action: "Dispatched Campaign Blast", category: "Marketing", target: "Tech Digest #42 (1,250 subscribers)", user_name: "Nkechi Eze", user_role: "Editor", status: "Success", ip_address: "102.89.32.108", details: "Scheduled broadcast sent via newsletter engine." },
  { action: "High-Res Image Optimization", category: "System", target: "Media Library (44 WebP assets)", user_name: "Daniel Smith", user_role: "Administrator", status: "Success", ip_address: "197.210.44.12", details: "Client-side WebP conversion pipeline with 74.2% average size reduction." },
  { action: "Created New Blog Publication", category: "Content", target: "Sustainable AgTech in West Africa", user_name: "Chioma Okafor", user_role: "Content Manager", status: "Success", ip_address: "105.112.56.24", details: "Published long-form post with featured image and SEO meta description." },
  { action: "System Settings Synchronized", category: "System", target: "Notification & Mailchimp Keys", user_name: "Admin User", user_role: "Super Admin", status: "Info", ip_address: "197.210.44.12", details: "Updated webhook verification token." },
  { action: "User Authentication Challenge", category: "Security", target: "2FA Verification (admin@russelltechnologies.org)", user_name: "Admin User", user_role: "Super Admin", status: "Success", ip_address: "197.210.44.12", details: "Hardware passkey authentication verified." },
];

// ─── Site Settings ─────────────────────────────────────────────────────────

const settings = [
  { key: "general", value: { siteName: "Russell Technologies", tagline: "Technology Solutions for Africa", darkMode: false, maintenanceMode: false }, updated_by: "Admin" },
  { key: "contact", value: { email: "info@russelltechnologies.org", phone: "+234 901 234 5678", address: "Victoria Island, Lagos", city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" }, updated_by: "Admin" },
  { key: "social", value: { twitter: "https://x.com/russelltechng", linkedin: "https://linkedin.com/company/russell-technologies", github: "https://github.com/russell-technologies" }, updated_by: "Admin" },
  { key: "seo", value: { titleTemplate: "%s — Russell Technologies", metaDescription: "Russell Technologies builds technology solutions for education, agriculture, music, and business across Africa.", ogImage: "" }, updated_by: "Admin" },
  { key: "notifications", value: { newInquiry: true, newComment: true, newSubscriber: true, systemAlerts: true }, updated_by: "Admin" },
];

// ─── Run Seed ──────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Supabase database...\n");

  const results: { table: string; count: number; status: string }[] = [];

  // Blog Posts
  const { error: bpErr } = await sb.from("blog_posts").upsert(blogPosts, { onConflict: "slug" });
  results.push({ table: "blog_posts", count: blogPosts.length, status: bpErr ? `❌ ${bpErr.message}` : "✅" });

  // Events
  const { error: evErr } = await sb.from("events").upsert(events, { onConflict: "slug" });
  results.push({ table: "events", count: events.length, status: evErr ? `❌ ${evErr.message}` : "✅" });

  // Subscribers
  const { error: subErr } = await sb.from("subscribers").upsert(subscribers, { onConflict: "email" });
  results.push({ table: "subscribers", count: subscribers.length, status: subErr ? `❌ ${subErr.message}` : "✅" });

  // Admin Profiles
  const { error: apErr } = await sb.from("admin_profiles").upsert(adminProfiles, { onConflict: "id" });
  results.push({ table: "admin_profiles", count: adminProfiles.length, status: apErr ? `❌ ${apErr.message}` : "✅" });

  // Contacts
  const { error: ctErr } = await sb.from("contacts").insert(contacts);
  results.push({ table: "contacts", count: contacts.length, status: ctErr ? `❌ ${ctErr.message}` : "✅" });

  // Comments (no foreign key constraint to real post IDs, uses post_title reference instead)
  const { error: cmErr } = await sb.from("comments").insert(comments);
  results.push({ table: "comments", count: comments.length, status: cmErr ? `❌ ${cmErr.message}` : "✅" });

  // Audit Logs
  const { error: alErr } = await sb.from("audit_logs").insert(auditLogs);
  results.push({ table: "audit_logs", count: auditLogs.length, status: alErr ? `❌ ${alErr.message}` : "✅" });

  // Settings
  const { error: stErr } = await sb.from("site_settings").upsert(settings, { onConflict: "key" });
  results.push({ table: "site_settings", count: settings.length, status: stErr ? `❌ ${stErr.message}` : "✅" });

  console.log("─────────────────────────────────────────");
  console.log("Table             Count   Status");
  console.log("─────────────────────────────────────────");
  for (const r of results) {
    console.log(`${r.table.padEnd(18)} ${String(r.count).padEnd(7)} ${r.status}`);
  }
  console.log("─────────────────────────────────────────\n");

  const failures = results.filter((r) => r.status.startsWith("❌"));
  if (failures.length) {
    console.error(`⚠️  ${failures.length} table(s) had errors.`);
    process.exit(1);
  } else {
    console.log("✅ All data seeded successfully!");
  }
}

seed();
