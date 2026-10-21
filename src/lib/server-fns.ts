/**
 * Server functions for all admin CRUD operations.
 * These run on the server via TanStack Start's createServerFn — keys never reach the browser.
 */
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseAdmin } from "./supabase";
import { sendEmail, sendBatchEmail } from "./zeptomail";

// ─── Helpers ───────────────────────────────────────────────────────────────

export function escapeHtml(str: unknown): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Blog Posts ────────────────────────────────────────────────────────────

export const fetchBlogPosts = createServerFn({ method: "GET" })
  .validator((input: { status?: string; limit?: number }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data?.status) query = query.eq("status", data.status);
    if (data?.limit) query = query.limit(data.limit);
    const { data: posts, error } = await query;
    if (error) throw new Error(error.message);
    return posts ?? [];
  });

export const fetchBlogPost = createServerFn({ method: "GET" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: post, error } = await sb.from("blog_posts").select("*").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    return post;
  });

export const fetchBlogPostBySlug = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: post, error } = await sb.from("blog_posts").select("*").eq("slug", data.slug).single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return post ?? null;
  });

export const createBlogPost = createServerFn({ method: "POST" })
  .validator(
    (input: {
      title: string;
      category: string;
      status?: string;
      excerpt?: string;
      content?: string;
      image_url?: string;
      featured?: boolean;
      author_name?: string;
      scheduled_at?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const slug = slugify(data.title);
    const { data: post, error } = await sb
      .from("blog_posts")
      .insert({ ...data, slug })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Created Blog Post",
      category: "Content",
      target: data.title,
      user_name: data.author_name ?? "Admin",
      status: "Success",
    });
    return post;
  });

export const updateBlogPost = createServerFn({ method: "POST" })
  .validator((input: { id: string } & Record<string, unknown>) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    if (updates.title && typeof updates.title === "string") {
      updates.slug = slugify(updates.title);
    }
    updates.updated_at = new Date().toISOString();
    const { data: post, error } = await sb.from("blog_posts").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Updated Blog Post",
      category: "Content",
      target: (updates.title as string) ?? id,
      user_name: (updates.author_name as string) ?? "Admin",
      status: "Success",
    });
    return post;
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .validator((input: { id: string; title?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Blog Post",
      category: "Content",
      target: data.title ?? data.id,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

// ─── Events ────────────────────────────────────────────────────────────────

export const fetchEvents = createServerFn({ method: "GET" })
  .validator((input: { status?: string; limit?: number; upcoming?: boolean }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("events").select("*").order("date_time", { ascending: true });
    if (data?.status) query = query.eq("status", data.status);
    if (data?.upcoming) query = query.gte("date_time", new Date().toISOString());
    if (data?.limit) query = query.limit(data.limit);
    const { data: events, error } = await query;
    if (error) throw new Error(error.message);
    return events ?? [];
  });

export const fetchEvent = createServerFn({ method: "GET" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: event, error } = await sb.from("events").select("*").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    return event;
  });

export const fetchEventBySlug = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: event, error } = await sb.from("events").select("*").eq("slug", data.slug).single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return event ?? null;
  });

export const createEvent = createServerFn({ method: "POST" })
  .validator(
    (input: {
      title: string;
      type: string;
      status?: string;
      date_time: string;
      location?: string;
      max_attendees?: number;
      image_url?: string;
      description?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const slug = slugify(data.title);
    const { data: event, error } = await sb.from("events").insert({ ...data, slug }).select().single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Created Event",
      category: "Content",
      target: data.title,
      status: "Success",
    });
    return event;
  });

export const updateEvent = createServerFn({ method: "POST" })
  .validator((input: { id: string } & Record<string, unknown>) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    if (updates.title && typeof updates.title === "string") {
      updates.slug = slugify(updates.title);
    }
    updates.updated_at = new Date().toISOString();
    const { data: event, error } = await sb.from("events").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Updated Event",
      category: "Content",
      target: (updates.title as string) ?? id,
      user_name: "Admin",
      status: "Success",
    });
    return event;
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .validator((input: { id: string; title?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Event",
      category: "Content",
      target: data.title ?? data.id,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

/** Register attendee for an event, save to subscribers, and dispatch confirmation email */
export const registerForEvent = createServerFn({ method: "POST" })
  .validator(
    (input: {
      eventId: string;
      name: string;
      email: string;
      organization?: string;
      role?: string;
      _hp?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    if (data._hp && data._hp.trim().length > 0) {
      return { success: true };
    }
    const sb = getSupabaseAdmin();
    const { data: event } = await sb.from("events").select("title, date_time, location").eq("id", data.eventId).single();

    await sb.from("subscribers").upsert(
      {
        name: data.name,
        email: data.email,
        source: `Event: ${event?.title ?? data.eventId}`,
        status: "Subscribed",
      },
      { onConflict: "email" },
    );

    const safeName = escapeHtml(data.name);
    const safeTitle = escapeHtml(event?.title ?? "our upcoming event");
    const safeLocation = escapeHtml(event?.location ?? "Online");

    await sendEmail({
      to: [{ email_address: { address: data.email, name: data.name } }],
      subject: `RSVP Confirmed: ${event?.title ?? "Russell Technologies Event"}`,
      htmlbody: `
        <div style="font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <h2 style="color:#0f172a;font-size:24px;margin-bottom:16px">You're Registered! 🎉</h2>
          <p style="color:#475569;font-size:16px;line-height:1.6">Dear ${safeName},</p>
          <p style="color:#475569;font-size:16px;line-height:1.6">Your RSVP for <strong>${safeTitle}</strong> is confirmed.</p>
          <div style="margin:24px 0;padding:20px;background:#f8fafc;border-left:4px solid #0062ff;border-radius:6px">
            <p style="margin:0 0 8px 0;font-size:14px;color:#64748b"><strong>Date:</strong> ${event?.date_time ? new Date(event.date_time).toLocaleString() : "TBD"}</p>
            <p style="margin:0;font-size:14px;color:#64748b"><strong>Location:</strong> ${safeLocation}</p>
          </div>
          <p style="color:#475569;font-size:16px;line-height:1.6">We look forward to having you with us.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
          <p style="color:#94a3b8;font-size:13px">— The Russell Technologies Events Team<br/>russelltechnologies.org</p>
        </div>
      `,
    });

    return { success: true };
  });

// ─── Subscribers ───────────────────────────────────────────────────────────

export const fetchSubscribers = createServerFn({ method: "GET" })
  .validator((input: { status?: string; source?: string; limit?: number }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("subscribers").select("*").order("subscribed_at", { ascending: false });
    if (data?.status) query = query.eq("status", data.status);
    if (data?.source) query = query.eq("source", data.source);
    if (data?.limit) query = query.limit(data.limit);
    const { data: subs, error } = await query;
    if (error) throw new Error(error.message);
    return subs ?? [];
  });

export const createSubscriber = createServerFn({ method: "POST" })
  .validator((input: { name?: string; email: string; source?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: sub, error } = await sb
      .from("subscribers")
      .upsert({ name: data.name, email: data.email, source: data.source ?? "Manual", status: "Subscribed" }, { onConflict: "email" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return sub;
  });

/** Public newsletter subscribe — sends welcome email via ZeptoMail */
export const publicSubscribe = createServerFn({ method: "POST" })
  .validator((input: { name?: string; email: string; _hp?: string; _ts?: number }) => input)
  .handler(async ({ data }) => {
    // Anti-spam protection: honeypot + timing detection
    if (data._hp && data._hp.trim().length > 0) {
      return { id: "rejected", email: data.email, status: "Subscribed" };
    }
    if (data._ts && Date.now() - data._ts < 800) {
      return { id: "rejected", email: data.email, status: "Subscribed" };
    }

    const sb = getSupabaseAdmin();
    const { data: sub, error } = await sb
      .from("subscribers")
      .upsert({ name: data.name, email: data.email, source: "Website", status: "Subscribed" }, { onConflict: "email" })
      .select()
      .single();
    if (error) throw new Error(error.message);

    const safeName = escapeHtml(data.name ?? "there");

    // Send welcome email via ZeptoMail
    await sendEmail({
      to: [{ email_address: { address: data.email, name: data.name ?? data.email } }],
      subject: "Welcome to Russell Technologies Newsletter 🚀",
      htmlbody: `
        <div style="font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <h2 style="color:#0f172a;font-size:24px;margin-bottom:16px">Welcome aboard, ${safeName}!</h2>
          <p style="color:#475569;font-size:16px;line-height:1.6">You're now subscribed to the Russell Technologies newsletter.</p>
          <p style="color:#475569;font-size:16px;line-height:1.6">Expect regular updates on technology, agriculture, music, and innovation across Africa.</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
          <p style="color:#94a3b8;font-size:13px">— The Russell Technologies Team<br/>russelltechnologies.org</p>
        </div>
      `,
    });

    return sub;
  });

export const updateSubscriber = createServerFn({ method: "POST" })
  .validator((input: { id: string; status?: string; name?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    (updates as Record<string, unknown>).updated_at = new Date().toISOString();
    const { data: sub, error } = await sb.from("subscribers").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Updated Subscriber",
      category: "Marketing",
      target: sub.email ?? id,
      user_name: "Admin",
      status: "Success",
    });
    return sub;
  });

export const deleteSubscriber = createServerFn({ method: "POST" })
  .validator((input: { id: string; email?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("subscribers").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Subscriber",
      category: "Marketing",
      target: data.email ?? data.id,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

// ─── Campaigns ─────────────────────────────────────────────────────────────

export const fetchCampaigns = createServerFn({ method: "GET" })
  .validator((input: { status?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("campaigns").select("*").order("created_at", { ascending: false });
    if (data?.status) query = query.eq("status", data.status);
    const { data: campaigns, error } = await query;
    if (error) throw new Error(error.message);
    return campaigns ?? [];
  });

export const createCampaign = createServerFn({ method: "POST" })
  .validator(
    (input: {
      title: string;
      subject: string;
      preheader?: string;
      audience?: string;
      html_content?: string;
      plain_text?: string;
      status?: string;
      scheduled_at?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: campaign, error } = await sb.from("campaigns").insert(data).select().single();
    if (error) throw new Error(error.message);
    return campaign;
  });

export const updateCampaign = createServerFn({ method: "POST" })
  .validator((input: { id: string } & Record<string, unknown>) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    const { data: campaign, error } = await sb.from("campaigns").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return campaign;
  });

/** Send a campaign blast via ZeptoMail to all active subscribers */
export const sendCampaignBlast = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();

    // Fetch campaign
    const { data: campaign, error: cErr } = await sb.from("campaigns").select("*").eq("id", data.id).single();
    if (cErr || !campaign) throw new Error(cErr?.message ?? "Campaign not found");

    // Fetch all active subscribers
    const { data: subs, error: sErr } = await sb.from("subscribers").select("email, name").eq("status", "Subscribed");
    if (sErr) throw new Error(sErr.message);
    if (!subs?.length) throw new Error("No active subscribers found");

    // Send via ZeptoMail in batches
    const recipients = subs.map((s) => ({
      email_address: { address: s.email, name: s.name ?? s.email },
    }));
    const result = await sendBatchEmail(recipients, campaign.subject, campaign.html_content ?? "");

    // Mark campaign as Sent
    await sb
      .from("campaigns")
      .update({
        status: "Sent",
        sent_at: new Date().toISOString(),
        sent_count: result.totalSent,
      })
      .eq("id", data.id);

    // Audit log
    await sb.from("audit_logs").insert({
      action: "Dispatched Campaign Blast",
      category: "Marketing",
      target: `${campaign.title} (${result.totalSent} subscribers)`,
      status: "Success",
      details: `Sent: ${result.totalSent}, Errors: ${result.errors}`,
    });

    return { sent: result.totalSent, errors: result.errors };
  });

// ─── Contacts ──────────────────────────────────────────────────────────────

export const fetchContacts = createServerFn({ method: "GET" })
  .validator((input: { status?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("contacts").select("*").order("created_at", { ascending: false });
    if (data?.status) query = query.eq("status", data.status);
    const { data: contacts, error } = await query;
    if (error) throw new Error(error.message);
    return contacts ?? [];
  });

/** Public contact form submission — sends notification email to admin */
export const submitContactForm = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      email: string;
      company?: string;
      service?: string;
      budget?: string;
      message?: string;
      _hp?: string;
      _ts?: number;
    }) => input,
  )
  .handler(async ({ data }) => {
    // Anti-spam protection: honeypot + timing detection
    if (data._hp && data._hp.trim().length > 0) {
      return { id: "rejected", name: data.name, email: data.email };
    }
    if (data._ts && Date.now() - data._ts < 1200) {
      return { id: "rejected", name: data.name, email: data.email };
    }

    const sb = getSupabaseAdmin();
    const { _hp, _ts, ...record } = data;
    const { data: contact, error } = await sb.from("contacts").insert(record).select().single();
    if (error) throw new Error(error.message);

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = escapeHtml(data.company ?? "—");
    const safeService = escapeHtml(data.service ?? "—");
    const safeBudget = escapeHtml(data.budget ?? "—");
    const safeMessage = escapeHtml(data.message ?? "No message provided.");

    // Send notification email to admin via ZeptoMail
    await sendEmail({
      to: [{ email_address: { address: "info@russelltechnologies.org", name: "Russell Technologies" } }],
      subject: `New Project Inquiry from ${data.name}`,
      htmlbody: `
        <div style="font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <h2 style="color:#0f172a;font-size:22px;margin-bottom:20px">📬 New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px;color:#334155">
            <tr><td style="padding:8px 0;font-weight:600;width:120px">Name</td><td style="padding:8px 0">${safeName}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Company</td><td style="padding:8px 0">${safeCompany}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Service</td><td style="padding:8px 0">${safeService}</td></tr>
            <tr><td style="padding:8px 0;font-weight:600">Budget</td><td style="padding:8px 0">${safeBudget}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:8px;color:#475569;font-size:15px;line-height:1.6">
            <strong>Message:</strong><br/>${safeMessage}
          </div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
          <p style="color:#94a3b8;font-size:12px">This inquiry was submitted via the Russell Technologies website contact form.</p>
        </div>
      `,
    });

    // Audit log
    await sb.from("audit_logs").insert({
      action: "New Contact Inquiry Received",
      category: "Content",
      target: `${data.name} — ${data.service ?? "General"}`,
      status: "Success",
    });

    return contact;
  });

export const updateContact = createServerFn({ method: "POST" })
  .validator((input: { id: string; status?: string; responded_at?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    const { data: contact, error } = await sb.from("contacts").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return contact;
  });

export const deleteContact = createServerFn({ method: "POST" })
  .validator((input: { id: string; name?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("contacts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Contact Inquiry",
      category: "Content",
      target: data.name ?? data.id,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

export const replyToContact = createServerFn({ method: "POST" })
  .validator(
    (input: {
      id: string;
      email: string;
      name: string;
      replyMessage: string;
      subject?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const safeName = escapeHtml(data.name);
    const safeReply = escapeHtml(data.replyMessage);

    await sendEmail({
      to: [{ email_address: { address: data.email, name: data.name } }],
      subject: data.subject || "Re: Your Inquiry to Russell Technologies",
      htmlbody: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;line-height:1.6">
          <p>Dear ${safeName},</p>
          <div style="margin:16px 0;white-space:pre-wrap">${safeReply}</div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
          <p style="color:#64748b;font-size:13px">
            Best regards,<br/>
            <strong>Russell Technologies Team</strong><br/>
            <a href="https://russelltechnologies.org" style="color:#0062ff">russelltechnologies.org</a>
          </p>
        </div>
      `,
    });

    await sb.from("contacts").update({ status: "Responded", responded_at: new Date().toISOString() }).eq("id", data.id);
    await sb.from("audit_logs").insert({
      action: "Replied to Contact Inquiry",
      category: "Content",
      target: `${data.name} (${data.email})`,
      status: "Success",
    });

    return { success: true };
  });

// ─── Comments ──────────────────────────────────────────────────────────────

export const fetchComments = createServerFn({ method: "GET" })
  .validator((input: { status?: string; post_id?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("comments").select("*").order("created_at", { ascending: false });
    if (data?.status) query = query.eq("status", data.status);
    if (data?.post_id) query = query.eq("post_id", data.post_id);
    const { data: comments, error } = await query;
    if (error) throw new Error(error.message);
    return comments ?? [];
  });

export const updateComment = createServerFn({ method: "POST" })
  .validator((input: { id: string; status: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: comment, error } = await sb.from("comments").update({ status: data.status }).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return comment;
  });

export const deleteComment = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { error } = await sb.from("comments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Comment",
      category: "Content",
      target: data.id,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

/** Public comment submission on a blog post — saved with Pending status for moderation */
export const createComment = createServerFn({ method: "POST" })
  .validator(
    (input: {
      post_id: string;
      author_name: string;
      author_email: string;
      content: string;
      _hp?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    // Bot protection: honeypot
    if (data._hp && data._hp.trim().length > 0) {
      return { id: "rejected", status: "Rejected" };
    }
    const sb = getSupabaseAdmin();
    const { _hp, ...record } = data;
    const { data: comment, error } = await sb
      .from("comments")
      .insert({ ...record, status: "Pending" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return comment;
  });

// ─── Media ─────────────────────────────────────────────────────────────────

export const fetchMediaFiles = createServerFn({ method: "GET" })
  .validator((input: { folder?: string; format?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("media_files").select("*").order("created_at", { ascending: false });
    if (data?.folder) query = query.eq("folder", data.folder);
    if (data?.format) query = query.eq("format", data.format);
    const { data: files, error } = await query;
    if (error) throw new Error(error.message);
    return files ?? [];
  });

export const createMediaRecord = createServerFn({ method: "POST" })
  .validator(
    (input: {
      title: string;
      filename: string;
      format: string;
      size_bytes?: number;
      size_display?: string;
      dimensions?: string;
      duration?: string;
      folder?: string;
      storage_path: string;
      public_url: string;
      alt_text?: string;
      caption?: string;
      tags?: string[];
      uploaded_by?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: file, error } = await sb.from("media_files").insert(data).select().single();
    if (error) throw new Error(error.message);
    return file;
  });

export const updateMediaRecord = createServerFn({ method: "POST" })
  .validator((input: { id: string; alt_text?: string; caption?: string; tags?: string[]; folder?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    const { data: file, error } = await sb.from("media_files").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return file;
  });

export const deleteMediaRecord = createServerFn({ method: "POST" })
  .validator((input: { id: string; storage_path: string; filename?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    // Remove from Supabase Storage
    await sb.storage.from("media").remove([data.storage_path]);
    // Remove DB record
    const { error } = await sb.from("media_files").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Deleted Media File",
      category: "Content",
      target: data.filename ?? data.storage_path,
      user_name: "Admin",
      status: "Success",
    });
    return { success: true };
  });

// ─── Admin Users ───────────────────────────────────────────────────────────

export const fetchAdminUsers = createServerFn({ method: "GET" })
  .validator((input: { role?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("admin_profiles").select("*").order("created_at", { ascending: false });
    if (data?.role) query = query.eq("role", data.role);
    const { data: users, error } = await query;
    if (error) throw new Error(error.message);
    return users ?? [];
  });

export const createAdminUser = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      email: string;
      role?: string;
      status?: string;
      title?: string;
      password?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let userId = crypto.randomUUID();

    if (data.password && data.password.trim().length >= 6) {
      try {
        const { data: authUser, error: authErr } = await sb.auth.admin.createUser({
          email: data.email,
          password: data.password,
          email_confirm: true,
          user_metadata: { name: data.name, role: data.role || "Editor" },
        });
        if (authUser?.user?.id) {
          userId = authUser.user.id;
        } else if (authErr) {
          console.warn("Supabase Auth admin createUser notice:", authErr.message);
        }
      } catch (err) {
        console.warn("Could not create auth user, proceeding with admin profile:", err);
      }
    }

    const initials = data.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newRecord = {
      id: userId,
      name: data.name,
      email: data.email,
      role: data.role || "Editor",
      status: data.status || "Active",
      title: data.title || "Team Member",
      initials,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      last_login: new Date().toISOString(),
    };

    const { data: profile, error } = await sb
      .from("admin_profiles")
      .upsert(newRecord)
      .select()
      .single();

    if (error) throw new Error(error.message);

    await sb.from("audit_logs").insert({
      action: "Created Admin User",
      category: "Security",
      target: data.name,
      user_name: "Super Admin",
      status: "Success",
      details: `Created user ${data.email} with role ${data.role || "Editor"}`,
    });

    return profile;
  });

export const updateAdminUser = createServerFn({ method: "POST" })
  .validator((input: { id: string; role?: string; status?: string; name?: string; title?: string; email?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { id, ...updates } = data;
    const { data: user, error } = await sb.from("admin_profiles").update(updates).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Updated Admin User",
      category: "Security",
      target: user.name ?? id,
      user_name: "Super Admin",
      status: "Success",
      details: updates.role ? `Role changed to ${updates.role}` : undefined,
    });
    return user;
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .validator((input: { id: string; name?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();

    try {
      await sb.auth.admin.deleteUser(data.id);
    } catch {
      // User might not exist in auth.users
    }

    const { error } = await sb.from("admin_profiles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    await sb.from("audit_logs").insert({
      action: "Deleted Admin User",
      category: "Security",
      target: data.name ?? data.id,
      user_name: "Super Admin",
      status: "Success",
    });

    return { success: true };
  });

// ─── Settings ──────────────────────────────────────────────────────────────

export const fetchSettings = createServerFn({ method: "GET" })
  .validator((input: { key?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    if (data?.key) {
      const { data: setting, error } = await sb.from("site_settings").select("*").eq("key", data.key).single();
      if (error && error.code !== "PGRST116") throw new Error(error.message);
      return setting;
    }
    const { data: settings, error } = await sb.from("site_settings").select("*");
    if (error) throw new Error(error.message);
    return settings ?? [];
  });

export const saveSettings = createServerFn({ method: "POST" })
  .validator((input: { key: string; value: Record<string, unknown>; updated_by?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: setting, error } = await sb
      .from("site_settings")
      .upsert(
        { key: data.key, value: data.value as unknown as import("./database.types").Json, updated_at: new Date().toISOString(), updated_by: data.updated_by ?? "Admin" },
        { onConflict: "key" },
      )
      .select()
      .single();
    if (error) throw new Error(error.message);
    await sb.from("audit_logs").insert({
      action: "Settings Updated",
      category: "System",
      target: `Settings: ${data.key}`,
      user_name: data.updated_by ?? "Admin",
      status: "Success",
    });
    return setting;
  });

// ─── Audit Logs ────────────────────────────────────────────────────────────

export const fetchAuditLogs = createServerFn({ method: "GET" })
  .validator((input: { category?: string; limit?: number }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    let query = sb.from("audit_logs").select("*").order("created_at", { ascending: false });
    if (data?.category) query = query.eq("category", data.category);
    if (data?.limit) query = query.limit(data.limit);
    const { data: logs, error } = await query;
    if (error) throw new Error(error.message);
    return logs ?? [];
  });

export const createAuditLog = createServerFn({ method: "POST" })
  .validator(
    (input: {
      action: string;
      category: string;
      target?: string;
      user_name?: string;
      user_role?: string;
      ip_address?: string;
      status?: string;
      details?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: log, error } = await sb.from("audit_logs").insert(data).select().single();
    if (error) throw new Error(error.message);
    return log;
  });

// ─── Dashboard Overview Stats ──────────────────────────────────────────────

export const fetchDashboardStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const sb = getSupabaseAdmin();
    const [posts, events, subs, contacts] = await Promise.all([
      sb.from("blog_posts").select("id", { count: "exact", head: true }),
      sb.from("events").select("id", { count: "exact", head: true }),
      sb.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "Subscribed"),
      sb.from("contacts").select("id", { count: "exact", head: true }),
    ]);
    return {
      totalBlogPosts: posts.count ?? 0,
      totalEvents: events.count ?? 0,
      totalSubscribers: subs.count ?? 0,
      totalContacts: contacts.count ?? 0,
    };
  });

// ─── Auth ──────────────────────────────────────────────────────────────────

export const fetchCurrentProfile = createServerFn({ method: "GET" })
  .validator((input: { userId: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const { data: profile, error } = await sb.from("admin_profiles").select("*").eq("id", data.userId).single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return profile;
  });

// ─── Page Views / Analytics ────────────────────────────────────────────────

export const trackPageView = createServerFn({ method: "POST" })
  .validator((input: { path: string; referrer?: string; user_agent?: string }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    await sb.from("page_views").insert(data);
    return { ok: true };
  });

export const fetchAnalytics = createServerFn({ method: "GET" })
  .validator((input: { days?: number }) => input)
  .handler(async ({ data }) => {
    const sb = getSupabaseAdmin();
    const since = new Date();
    since.setDate(since.getDate() - (data?.days ?? 30));
    const { data: views, error } = await sb
      .from("page_views")
      .select("*")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return views ?? [];
  });
