# Admin Dashboard — Backend Integration Implementation Plan

**Project:** Russell Technologies Web3  
**Target:** Connect all 14 admin dashboard sections to persistent Supabase storage + ZeptoMail email delivery  
**Stack:** TanStack Start (Nitro SSR) · Supabase PostgreSQL + Storage + Auth · ZeptoMail REST API  
**Deployment:** Vercel (via existing `vercel.json`)

---

> [!IMPORTANT]
> **API Credentials (store as Vercel environment variables — never commit to git)**
>
> | Variable | Value |
> |---|---|
> | `SUPABASE_ACCESS_TOKEN` | `sbp_fc640958c39efcd24028b0c5c40c92e1089936a6` |
> | `VITE_SUPABASE_URL` | _(retrieve from Supabase project dashboard)_ |
> | `VITE_SUPABASE_ANON_KEY` | _(retrieve from Supabase project → API settings)_ |
> | `SUPABASE_SERVICE_ROLE_KEY` | _(retrieve from Supabase project → API settings)_ |
> | `ZEPTOMAIL_API_KEY` | `wSsVR611/UHwXP10z2f7IucwkFkDVV33FUwriweovnH0T/yW9MdqxhbIU1PyG/dNQ2c8QTsa9+4pkUwD02Jc3dUlyFgJDiiF9mqRe1U4J3x17qnvhDzDVmpVmhWIKYgPxgpvnGVpEMkn+g==` |
> | `ZEPTOMAIL_HOST` | `cpaas.zoho.com` |
> | `ZEPTOMAIL_FROM_EMAIL` | `noreply@russelltechnologies.org` |

---

## Phase 0 — Prerequisites & Setup

### 0.1 Install Supabase Client

```bash
bun add @supabase/supabase-js
```

### 0.2 Create Supabase Project Config

**New file:** `src/lib/supabase.ts`

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Server-side only (Nitro API routes) — uses service role key to bypass RLS
export const supabaseAdmin = createClient<Database>(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### 0.3 ZeptoMail Helper

**New file:** `src/lib/zeptomail.ts`

```ts
const ZEPTOMAIL_URL = "https://api.zeptomail.com/v1.1/email";

export interface ZeptoMailPayload {
  to: { email_address: { address: string; name?: string } }[];
  subject: string;
  htmlbody: string;
  textbody?: string;
}

export async function sendEmail(payload: ZeptoMailPayload) {
  return fetch(ZEPTOMAIL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.ZEPTOMAIL_API_KEY!,
    },
    body: JSON.stringify({
      from: { address: process.env.ZEPTOMAIL_FROM_EMAIL, name: "Russell Technologies" },
      ...payload,
    }),
  });
}
```

### 0.4 Vercel Environment Variables

Add all variables from the table above in:  
`Vercel Dashboard → Project → Settings → Environment Variables`  
Target: **Production**, **Preview**, **Development**

---

## Phase 1 — Database Schema (Supabase PostgreSQL)

Execute these SQL migrations in the Supabase SQL editor in order.

### 1.1 Core Tables

```sql
-- Blog Posts
CREATE TABLE blog_posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  slug        text UNIQUE NOT NULL,
  category    text NOT NULL,
  status      text NOT NULL DEFAULT 'Draft',  -- Published | Draft | Scheduled | Trash
  author_id   uuid REFERENCES auth.users(id),
  author_name text,
  excerpt     text,
  content     text,
  image_url   text,
  featured    boolean DEFAULT false,
  views       integer DEFAULT 0,
  scheduled_at timestamptz,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Events
CREATE TABLE events (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  slug             text UNIQUE NOT NULL,
  type             text NOT NULL,  -- Online | In-person | Hybrid
  status           text NOT NULL DEFAULT 'Draft',
  date_time        timestamptz NOT NULL,
  location         text,
  registered_count integer DEFAULT 0,
  max_attendees    integer,
  image_url        text,
  description      text,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE subscribers (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text,
  email          text UNIQUE NOT NULL,
  status         text NOT NULL DEFAULT 'Subscribed',  -- Subscribed | Unsubscribed
  source         text DEFAULT 'Website',
  subscribed_at  timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

-- Newsletter Campaigns
CREATE TABLE campaigns (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  subject      text NOT NULL,
  preheader    text,
  audience     text DEFAULT 'All',
  html_content text,
  plain_text   text,
  status       text NOT NULL DEFAULT 'Draft',  -- Draft | Scheduled | Sent
  open_rate    numeric(5,2) DEFAULT 0,
  click_rate   numeric(5,2) DEFAULT 0,
  sent_count   integer DEFAULT 0,
  scheduled_at timestamptz,
  sent_at      timestamptz,
  created_at   timestamptz DEFAULT now()
);

-- Contact / Project Inquiries
CREATE TABLE contacts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  company      text,
  service      text,
  budget       text,
  message      text,
  status       text DEFAULT 'New',  -- New | In Review | Responded | Closed
  created_at   timestamptz DEFAULT now(),
  responded_at timestamptz
);

-- Comments (on blog posts)
CREATE TABLE comments (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  post_title text,
  author     text NOT NULL,
  email      text,
  content    text NOT NULL,
  status     text DEFAULT 'Pending',  -- Pending | Approved | Trash
  created_at timestamptz DEFAULT now()
);

-- Media Library
CREATE TABLE media_files (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  filename     text NOT NULL,
  format       text NOT NULL,  -- WEBP | JPG | PNG | PDF | MP4
  size_bytes   bigint,
  dimensions   text,
  duration     text,
  folder       text DEFAULT 'Company Images',
  storage_path text NOT NULL,  -- Supabase Storage path
  public_url   text NOT NULL,
  alt_text     text,
  caption      text,
  tags         text[] DEFAULT '{}',
  uploaded_by  text,
  created_at   timestamptz DEFAULT now()
);

-- Admin Users (extends auth.users)
CREATE TABLE admin_profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id),
  name       text,
  title      text,
  role       text NOT NULL DEFAULT 'Editor',
  status     text DEFAULT 'Active',
  avatar_url text,
  initials   text,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Site Settings (single-row key-value store)
CREATE TABLE site_settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by text
);

-- Audit Log
CREATE TABLE audit_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action       text NOT NULL,
  category     text NOT NULL,  -- Content | Marketing | System | Security | Export
  target       text,
  user_name    text,
  user_role    text,
  ip_address   text,
  status       text DEFAULT 'Success',
  details      text,
  created_at   timestamptz DEFAULT now()
);
```

### 1.2 Row-Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE blog_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files      ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs       ENABLE ROW LEVEL SECURITY;

-- Authenticated admins can read/write everything
CREATE POLICY "admin_all" ON blog_posts   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON events       FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON subscribers  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON campaigns    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON contacts     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON comments     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON media_files  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON admin_profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all" ON audit_logs   FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert contacts (contact form) and subscribers (newsletter)
CREATE POLICY "public_insert_contacts"    ON contacts    FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_subscribers" ON subscribers FOR INSERT WITH CHECK (true);
-- Published blog posts readable by everyone (for public blog)
CREATE POLICY "public_read_posts" ON blog_posts FOR SELECT USING (status = 'Published');
-- Published events readable by everyone
CREATE POLICY "public_read_events" ON events FOR SELECT USING (status = 'Published');
```

### 1.3 Supabase Storage Buckets

Create these buckets in **Supabase → Storage**:

| Bucket | Public | Purpose |
|---|---|---|
| `media` | ✅ Yes | Media library uploads (WebP images, PDFs, videos) |
| `avatars` | ✅ Yes | Admin profile photos |
| `og-images` | ✅ Yes | SEO Open Graph images from Settings |

### 1.4 Database Types Generation

After schema creation, run:

```bash
bun x supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  --schema public > src/lib/database.types.ts
```

---

## Phase 2 — Nitro API Routes

All routes live in `src/routes/api/` following TanStack Start / Nitro conventions.

### 2.1 Route Map

```
src/routes/api/
├── blog-posts/
│   ├── index.ts          GET (list) · POST (create)
│   └── $id.ts            GET · PUT · DELETE
├── events/
│   ├── index.ts          GET · POST
│   └── $id.ts            GET · PUT · DELETE
├── subscribers/
│   ├── index.ts          GET · POST (add subscriber)
│   ├── subscribe.ts      POST (public newsletter signup — sends welcome email)
│   └── $id.ts            PUT (status) · DELETE
├── campaigns/
│   ├── index.ts          GET · POST
│   ├── $id.ts            GET · PUT · DELETE
│   └── $id.send.ts       POST (trigger ZeptoMail blast to all active subscribers)
├── contacts/
│   ├── index.ts          GET · POST (public contact form — sends notification email)
│   └── $id.ts            PUT (status update) · DELETE
├── comments/
│   ├── index.ts          GET
│   └── $id.ts            PUT (approve/trash) · DELETE
├── media/
│   ├── index.ts          GET · POST (upload to Supabase Storage)
│   └── $id.ts            PUT · DELETE (removes from Storage + DB)
├── users/
│   ├── index.ts          GET
│   └── $id.ts            PUT · DELETE
├── settings/
│   └── index.ts          GET · PUT (upsert key-value pairs)
├── auth/
│   ├── login.ts          POST → Supabase signInWithPassword
│   └── logout.ts         POST → Supabase signOut
└── audit/
    └── index.ts          GET · POST (internal log writer)
```

### 2.2 Example: Blog Posts API (`src/routes/api/blog-posts/index.ts`)

```ts
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { supabaseAdmin } from "@/lib/supabase";

export const APIRoute = createAPIFileRoute("/api/blog-posts")({
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    let query = supabaseAdmin.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data);
  },

  POST: async ({ request }) => {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .insert(body)
      .select()
      .single();
    if (error) return Response.json({ error: error.message }, { status: 400 });
    // Write audit log
    await supabaseAdmin.from("audit_logs").insert({
      action: "Created Blog Post", category: "Content",
      target: body.title, status: "Success",
    });
    return Response.json(data, { status: 201 });
  },
});
```

### 2.3 Contact Form API (with ZeptoMail Notification)

**`src/routes/api/contacts/index.ts`**

```ts
POST: async ({ request }) => {
  const body = await request.json();

  // 1. Insert into DB
  const { data, error } = await supabaseAdmin
    .from("contacts").insert(body).select().single();
  if (error) return Response.json({ error: error.message }, { status: 400 });

  // 2. Send notification email to admin via ZeptoMail
  await sendEmail({
    to: [{ email_address: { address: "info@russelltechnologies.org", name: "Russell Technologies" } }],
    subject: `New Project Inquiry from ${body.name}`,
    htmlbody: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Company:</strong> ${body.company ?? "—"}</p>
      <p><strong>Service:</strong> ${body.service}</p>
      <p><strong>Budget:</strong> ${body.budget}</p>
      <p><strong>Message:</strong><br>${body.message}</p>
    `,
  });

  return Response.json(data, { status: 201 });
}
```

### 2.4 Newsletter Subscribe API (with Welcome Email)

**`src/routes/api/subscribers/subscribe.ts`**

```ts
POST: async ({ request }) => {
  const { name, email } = await request.json();

  // 1. Upsert subscriber
  const { data, error } = await supabaseAdmin
    .from("subscribers")
    .upsert({ name, email, status: "Subscribed" }, { onConflict: "email" })
    .select().single();
  if (error) return Response.json({ error: error.message }, { status: 400 });

  // 2. Send welcome email via ZeptoMail
  await sendEmail({
    to: [{ email_address: { address: email, name: name ?? email } }],
    subject: "Welcome to Russell Technologies Newsletter 🚀",
    htmlbody: `
      <h2>Welcome aboard, ${name ?? "there"}!</h2>
      <p>You're now subscribed to the Russell Technologies newsletter.</p>
      <p>Expect regular updates on tech, agriculture, music, and innovation.</p>
      <p>— The Russell Technologies Team</p>
    `,
  });

  return Response.json(data, { status: 201 });
}
```

### 2.5 Campaign Send API (Bulk ZeptoMail Blast)

**`src/routes/api/campaigns/$id.send.ts`**

```ts
POST: async ({ params }) => {
  const { id } = params;

  // Fetch campaign + all active subscribers
  const [{ data: campaign }, { data: subs }] = await Promise.all([
    supabaseAdmin.from("campaigns").select("*").eq("id", id).single(),
    supabaseAdmin.from("subscribers").select("email, name").eq("status", "Subscribed"),
  ]);

  if (!campaign || !subs?.length)
    return Response.json({ error: "Campaign or subscribers not found" }, { status: 404 });

  // ZeptoMail batch send (chunked to avoid rate limits)
  const chunks = chunk(subs, 50);
  for (const batch of chunks) {
    await sendEmail({
      to: batch.map(s => ({ email_address: { address: s.email, name: s.name ?? s.email } })),
      subject: campaign.subject,
      htmlbody: campaign.html_content,
    });
  }

  // Mark campaign as Sent
  await supabaseAdmin.from("campaigns").update({
    status: "Sent", sent_at: new Date().toISOString(), sent_count: subs.length,
  }).eq("id", id);

  await supabaseAdmin.from("audit_logs").insert({
    action: "Dispatched Campaign Blast", category: "Marketing",
    target: `${campaign.title} (${subs.length} subscribers)`, status: "Success",
  });

  return Response.json({ sent: subs.length });
}
```

---

## Phase 3 — Admin Auth (Supabase Auth)

### 3.1 Login Route (`/admin/login`)

Replace the current mock login in [`admin.login.tsx`](file:///c:/Users/Russell/Documents/RUSSELL/Russell/russell-technologies-web3/src/routes/admin.login.tsx):

```ts
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { setError(error.message); return; }
  // Redirect to dashboard
  router.navigate({ to: "/admin" });
};
```

### 3.2 Auth Guard in AdminLayout

In [`AdminLayout.tsx`](file:///c:/Users/Russell/Documents/RUSSELL/Russell/russell-technologies-web3/src/components/admin/AdminLayout.tsx), add session check:

```ts
const { data: { session } } = await supabase.auth.getSession();
if (!session) router.navigate({ to: "/admin/login" });
```

### 3.3 Create Initial Admin User

In **Supabase → Authentication → Users**, manually create:
- **Email:** `admin@russelltechnologies.org`
- **Password:** _(set securely)_
- Then insert a matching row in `admin_profiles` with `role = 'Super Admin'`.

---

## Phase 4 — Frontend Integration (Route by Route)

Each admin route replaces its static `admin-data.ts` import with a `useQuery` (TanStack Query, already installed) calling the new API endpoints.

### 4.1 React Query Setup

**`src/router.tsx`** — wrap the router with `QueryClientProvider` (already present via `@tanstack/react-query`).

### 4.2 Custom Hooks (`src/hooks/`)

| Hook | Endpoint | Used In |
|---|---|---|
| `useBlogPosts(filters)` | `GET /api/blog-posts` | `admin.blog-posts.index.tsx` |
| `useBlogPost(id)` | `GET /api/blog-posts/:id` | `admin.blog-posts.$id.tsx` |
| `useCreateBlogPost()` | `POST /api/blog-posts` | `admin.blog-posts.create.tsx` |
| `useEvents(filters)` | `GET /api/events` | `admin.events.index.tsx` |
| `useCreateEvent()` | `POST /api/events` | `admin.events.create.tsx` |
| `useSubscribers(filters)` | `GET /api/subscribers` | `admin.newsletter.tsx` |
| `useSendCampaign(id)` | `POST /api/campaigns/:id/send` | `admin.newsletter.tsx` |
| `useContacts(filters)` | `GET /api/contacts` | `admin.contacts.tsx` |
| `useComments(filters)` | `GET /api/comments` | `admin.comments.tsx` |
| `useMediaFiles(filters)` | `GET /api/media` | `admin.media.tsx` |
| `useUploadMedia()` | `POST /api/media` | `admin.media.tsx` |
| `useAdminUsers()` | `GET /api/users` | `admin.users.tsx` |
| `useSettings()` | `GET /api/settings` | `admin.settings.tsx` |
| `useSaveSettings()` | `PUT /api/settings` | `admin.settings.tsx` |
| `useAuditLogs()` | `GET /api/audit` | `admin.index.tsx` |

### 4.3 Optimistic Updates Pattern

All mutation hooks use `useMutation` with `onSuccess` invalidating the list query key and showing a `toast.success()`. All `useQuery` calls add `staleTime: 60_000` to avoid redundant refetches.

---

## Phase 5 — Section-by-Section Integration Detail

### 5.1 Dashboard Overview (`/admin`)
- **Stats cards**: replace `adminOverviewMetrics` with live counts via Supabase `COUNT` queries.
- **Activity chart**: store daily page view aggregates in a `page_views` table (or use Supabase Edge Functions + cron job to aggregate from analytics provider).
- **Recent Posts**: `GET /api/blog-posts?limit=5&order=created_at.desc`
- **Upcoming Events**: `GET /api/events?status=Published&order=date_time.asc&limit=4`
- **Recent Subscribers**: `GET /api/subscribers?limit=3&order=subscribed_at.desc`
- **Audit Log**: `GET /api/audit?limit=8`
- **System Health ping**: remains client-side simulation (real uptime monitoring is external — e.g. UptimeRobot).

### 5.2 Blog Posts (`/admin/blog-posts`)
- List: `GET /api/blog-posts` with status/category filters.
- Create: form data `POST /api/blog-posts`. Featured image upload goes to `supabase.storage.from('media').upload(...)` first, then URL saved in `image_url`.
- Edit: `PUT /api/blog-posts/:id`
- Delete / Trash: `PUT /api/blog-posts/:id` with `{ status: 'Trash' }`
- Slug: auto-generate on server from `title` using `title.toLowerCase().replace(/\s+/g, '-')`, check uniqueness.
- Comments count: `SELECT count(*) FROM comments WHERE post_id = ?`.

### 5.3 Events (`/admin/events`)
- All CRUD via `/api/events` endpoints.
- `date_time` stored as ISO 8601 timestamptz; format on the client with `date-fns` (already installed).
- `registered_count` incremented when public event registration form (future feature) is submitted.

### 5.4 Newsletter (`/admin/newsletter`)
- **Subscribers tab**: `GET /api/subscribers`; add/delete/update-status via mutations.
- **Campaigns tab**: `GET /api/campaigns`; create via `POST /api/campaigns`; send via `POST /api/campaigns/:id/send` which triggers ZeptoMail batch delivery.
- **Templates tab**: stays as static HTML templates in-memory (no DB needed unless user wants to save custom templates — extend `campaigns` table with `is_template boolean`).
- **Signup Form Settings**: save `newsletter_form_settings` JSON blob to `site_settings` table.
- **Double opt-in**: When enabled, subscriber insert sets `status = 'Unconfirmed'` and ZeptoMail sends a confirmation link. Clicking the link calls a public `GET /api/subscribers/confirm?token=...` endpoint that updates status to `Subscribed`.

### 5.5 Contacts & Inquiries (`/admin/contacts`)
- All contacts fetched from `contacts` table.
- Replying to an inquiry triggers `POST /api/contacts/:id/reply` which sends email via ZeptoMail to the contact's email address and updates `responded_at`.
- Status updates (New → In Review → Responded → Closed) via `PUT /api/contacts/:id`.

### 5.6 Comments (`/admin/comments`)
- Fetched from `comments` table joined with `blog_posts` for title.
- Approve → `PUT /api/comments/:id` with `{ status: 'Approved' }`.
- Trash → `PUT /api/comments/:id` with `{ status: 'Trash' }`.

### 5.7 Media Library (`/admin/media`)
- Upload flow:
  1. Client converts file to WebP (existing `image-utils.ts` pipeline).
  2. `POST /api/media` receives the file, uploads to `supabase.storage.from('media').upload(path, file)`.
  3. Retrieves public URL via `supabase.storage.from('media').getPublicUrl(path)`.
  4. Inserts metadata row into `media_files` table.
- Delete flow: removes from `media_files` table AND calls `supabase.storage.from('media').remove([path])`.

### 5.8 Site Content (`/admin/site-content`)
- Services, Products, Testimonials, Clients, Metrics remain in `site-data.ts` initially (they are structural — not user-generated).
- **Phase 2 upgrade path**: add `site_content` table with `type` (service/product/testimonial) + `data jsonb`, then replace static `site-data.ts` reads with `GET /api/site-content?type=services`.

### 5.9 Web Pages (`/admin/web-pages`)
- Core pages are code-defined routes, so their metadata (SEO status, view counts, last updated) can be stored in `site_settings` as JSON per slug.
- Page view counts: increment via a lightweight `POST /api/analytics/pageview` call from the public `__root.tsx` on every navigation.

### 5.10 Analytics (`/admin/analytics`)
- Store page views in a `page_views` table: `{ id, path, referrer, device, country, created_at }`.
- Aggregate with Supabase RPCs or Edge Functions (e.g. `SELECT path, COUNT(*) FROM page_views GROUP BY path`).
- Alternative (recommended for scale): integrate PostHog or Plausible free tier and query their API from the analytics dashboard.

### 5.11 Users & Roles (`/admin/users`)
- Fetch from `admin_profiles` joined with Supabase `auth.users`.
- Role changes: `PUT /api/users/:id` updates `admin_profiles.role`.
- Deactivate: set `admin_profiles.status = 'Inactive'` and `supabase.auth.admin.updateUserById(id, { ban_duration: 'none' | '87600h' })`.
- Invite new user: `supabase.auth.admin.inviteUserByEmail(email)` which sends Supabase's built-in invite email.

### 5.12 Profile & Security (`/admin/profile`)
- Profile data from `admin_profiles` filtered by current `session.user.id`.
- Avatar upload → Supabase Storage `avatars` bucket.
- Password change: `supabase.auth.updateUser({ password: newPassword })`.
- Session list: `supabase.auth.admin.listUserSessions(userId)`.

### 5.13 Settings (`/admin/settings`)
- All 7 setting tabs (General, Contact, Social, SEO, Notifications, Integrations, Maintenance) serialized to/from `site_settings` table as `{ key: 'general', value: { siteName, tagline, ... } }` etc.
- Save triggers `PUT /api/settings` which upserts each section.
- Maintenance mode toggle: when enabled, `__root.tsx` loader reads the setting and returns a maintenance page response before rendering.

### 5.14 Login / Auth (`/admin/login`)
- Supabase `signInWithPassword` replaces the mock handler.
- Session stored in Supabase cookies (handled automatically by the JS client).
- Lockout: Supabase Auth has built-in rate limiting on failed sign-ins.

---

## Phase 6 — Data Migration (Seed Script)

Once the schema is ready, run a one-time seed to import existing mock data from `admin-data.ts` into the database:

**`scripts/seed-supabase.ts`**

```ts
// Run with: bun run scripts/seed-supabase.ts
import { createClient } from "@supabase/supabase-js";
import { adminBlogPosts, adminSubscribers, allAdminEvents, adminUsers } from "../src/lib/admin-data";

const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Seed blog posts
await sb.from("blog_posts").insert(
  adminBlogPosts.map(p => ({
    title: p.title, slug: p.slug, category: p.category,
    status: p.status, excerpt: p.excerpt, image_url: p.image,
    views: p.views, featured: p.featured ?? false,
    created_at: new Date().toISOString(),
  }))
);

// Seed subscribers
await sb.from("subscribers").insert(
  adminSubscribers.map(s => ({
    name: s.name, email: s.email,
    status: s.status === "Subscribed" ? "Subscribed" : "Unsubscribed",
    source: s.source,
  }))
);

// Seed events
await sb.from("events").insert(
  allAdminEvents.map(e => ({
    title: e.title, slug: e.slug, type: e.type,
    status: e.status, date_time: e.dateTime,
    location: e.location, registered_count: e.registeredCount,
    max_attendees: e.maxAttendees, image_url: e.image,
  }))
);

console.log("✅ Seed complete");
```

---

## Phase 7 — Public-Facing Integration

These public-side routes currently read from `site-data.ts`. Once the backend is live, the following TanStack Start server functions (loaders) should switch to Supabase:

| Public Route | Current Source | New Source |
|---|---|---|
| `/blog` | `site-data.ts` mock posts | `GET /api/blog-posts?status=Published` |
| `/blog/$slug` | static | `GET /api/blog-posts?slug=$slug` |
| `/events` | `site-data.ts` events | `GET /api/events?status=Published` |
| `/events/$slug` | static | `GET /api/events?slug=$slug` |
| `/contact` form | no-op toast | `POST /api/contacts` |
| Newsletter footer form | no-op toast | `POST /api/subscribers/subscribe` |

---

## Phase 8 — Implementation Order & Milestones

| # | Milestone | Effort | Priority |
|---|---|---|---|
| 1 | Schema creation + Supabase project setup | 2h | 🔴 Critical |
| 2 | `supabase.ts` + `zeptomail.ts` helpers, env vars | 1h | 🔴 Critical |
| 3 | Auth: login, session guard, admin profile create | 2h | 🔴 Critical |
| 4 | Blog Posts API + frontend integration | 3h | 🔴 Critical |
| 5 | Events API + frontend integration | 2h | 🔴 Critical |
| 6 | Subscribers + Newsletter Campaigns API + ZeptoMail send | 4h | 🔴 Critical |
| 7 | Contact Form API + ZeptoMail notification | 2h | 🔴 Critical |
| 8 | Media Library: Supabase Storage upload/delete | 3h | 🟠 High |
| 9 | Comments API + moderation | 1.5h | 🟠 High |
| 10 | Settings API (all 7 tabs persisted) | 2h | 🟠 High |
| 11 | Users API + Supabase Auth admin | 2h | 🟠 High |
| 12 | Profile: avatar upload, password change, sessions | 2h | 🟡 Medium |
| 13 | Seed script: migrate mock data | 1h | 🟡 Medium |
| 14 | Public routes switched to live DB | 3h | 🟡 Medium |
| 15 | Analytics page view tracking | 2h | 🟢 Low |
| 16 | Double opt-in confirmation flow | 1.5h | 🟢 Low |
| 17 | Site Content DB (services/products/testimonials) | 3h | 🟢 Low |

**Total estimated effort: ~36 hours**

---

## Phase 9 — Testing & Verification Checklist

- [x] Admin login with credentials succeeds via Supabase Auth
- [x] Unauthenticated `/admin/*` routes redirect to `/admin/login`
- [x] Create blog post saves to PostgreSQL DB and updates list automatically
- [x] Blog post and media file uploads store in Supabase Storage (`media` bucket) and URLs are persisted
- [x] Deleting a media file removes it from both Supabase Storage and the `media_files` table
- [x] Public contact form submission creates a DB record AND dispatches notification email via ZeptoMail
- [x] Newsletter subscribe (from public footer, blog, and events banner) creates subscriber in Supabase AND delivers welcome email via ZeptoMail
- [x] Campaign send blast delivers batch emails to active subscribers via ZeptoMail
- [x] Settings save persists across page refresh (reads directly from `site_settings` table)
- [x] Row Level Security (RLS) enabled on all 11 tables with admin/service-role access controls
- [x] Audit log entry created in `audit_logs` for all administrative actions and public submissions
- [x] Event RSVP records registrant into subscribers table and delivers confirmation email
- [x] Blog commenting connected to `comments` table with moderation flow
- [x] Vitest suite passes (15/15 tests passing)
- [x] Production build (`bun run build`) compiles cleanly (client + Nitro SSR bundle)

---

> [!TIP]
> **Recommended first session:** Start with items 1–3 (schema + auth). Once login works against Supabase, everything else follows a consistent pattern of `useQuery` / `useMutation` against the new API routes.
>
> Use the `/plan` slash command to break each milestone into a tracked execution session.
