import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BarChart3, BookOpen, Building2, GraduationCap, Mail, Music, Scale, Settings, Sprout, Users } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/blog-hero.webp";
import av1 from "@/assets/avatar-1.webp";
import { posts, type Post } from "@/lib/site-data";
import { meta } from "@/components/site/blocks";
import { BlueCta, Btn, IconBubble, LineEyebrow, SplitHero } from "@/components/site/kit";

export const Route = createFileRoute("/blog/")({
  head: () => meta("Blog — Russell Technologies", "Insights on education, agriculture, law, music, technology and digital transformation across Africa."),
  component: Blog,
});

const catTone: Record<string, string> = {
  Education: "bg-blue-soft text-primary", Agriculture: "bg-chart-2/12 text-chart-2", Legal: "bg-orange-soft text-orange",
  Music: "bg-chart-4/12 text-chart-4", Technology: "bg-blue-soft text-primary", Business: "bg-orange-soft text-orange",
};

const topics = [
  [GraduationCap, "Education", "Tips, stories & innovation", "blue"], [Sprout, "Agriculture", "Markets, farmers & growth", "green"],
  [Scale, "Legal & Compliance", "Law, policy & insights", "orange"], [Music, "Music & Creative", "Artists, industry & trends", "purple"],
  [Settings, "Technology", "Digital solutions & tools", "blue"], [Building2, "Business Growth", "Strategy, people & impact", "orange"],
] as const;

const popularPosts = [posts[0], posts[1], posts[6]].filter((p): p is Post => Boolean(p));

function Card({ p }: { p: Post }) {
  return (
    <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-0.5">
      <img src={p.image} alt="" width={992} height={672} loading="lazy" className="aspect-[16/7] w-full object-cover" />
      <div className="flex flex-1 flex-col p-4">
        <span className={`w-fit rounded px-2 py-0.5 text-[11px] font-semibold ${catTone[p.category] ?? "bg-blue-soft text-primary"}`}>{p.category}</span>
        <h3 className="mt-2 flex-1 font-bold leading-snug group-hover:text-primary">{p.title}</h3>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{p.date} · {p.read}</span>
          <span className="grid size-6 place-items-center rounded-full bg-blue-soft text-primary"><ArrowRight className="size-3.5" /></span>
        </div>
      </div>
    </Link>
  );
}

function Subscribe() {
  const [email, setEmail] = useState("");
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("Please enter a valid email address."); return; } toast.success("You're subscribed!"); setEmail(""); }}>
      <label htmlFor="blog-email" className="sr-only">Email</label>
      <input id="blog-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
      <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Subscribe <ArrowRight className="size-4" /></button>
    </form>
  );
}

function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);
  const [topic, setTopic] = useState<string | null>(null);
  const latest = topic ? rest.filter((p) => topic.startsWith(p.category) || p.category.startsWith(topic.split(" ")[0] ?? "")) : rest;
  if (!featured) return null;
  return (
    <>
      <SplitHero
        eyebrow="Our blog" title="Insights for a Smarter, Brighter" accent="Tomorrow." image={heroImg} imageAlt="Man reading on a laptop"
        text="Explore ideas, stories, and expert perspectives on education, agriculture, law, music, technology and digital transformation across Africa and beyond."
        actions={<><Btn to="/blog">Explore Articles</Btn><a href="#subscribe" className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-blue-soft">Subscribe <ArrowRight className="size-4" /></a></>}
        card={
          <div className="hidden w-60 space-y-4 rounded-xl bg-card p-5 shadow-card md:block">
            {([[BookOpen, "100+", "Articles & Insights", "blue"], [Users, "Industry Experts", "Real Experiences", "blue"], [BarChart3, "Practical Knowledge", "For Real Growth", "orange"]] as const).map(([I, t, d, tone]) => (
              <div key={t} className="flex items-center gap-3"><IconBubble icon={I} tone={tone} /><div><p className="text-sm font-bold text-navy">{t}</p><p className="text-[11px] text-muted-foreground">{d}</p></div></div>
            ))}
          </div>
        }
      />

      <section className="border-b border-border py-6">
        <div className="container-x">
          <LineEyebrow>Browse by topic</LineEyebrow>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-border">
            {topics.map(([I, t, d, tone]) => (
              <button key={t} onClick={() => setTopic(topic === t ? null : t)} aria-pressed={topic === t} className={`rounded-lg p-3 text-left transition hover:bg-muted ${topic === t ? "bg-blue-soft" : ""}`}>
                <IconBubble icon={I} tone={tone} size="lg" />
                <p className="mt-3 text-sm font-bold text-navy">{t}</p><p className="text-[11px] text-muted-foreground">{d}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_17rem]">
          <div>
            <LineEyebrow>Featured article</LineEyebrow>
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group mt-3 grid gap-6 rounded-xl border border-border bg-card p-3 shadow-card md:grid-cols-[1fr_1.1fr]">
              <img src={featured.image} alt="" width={896} height={752} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="flex flex-col justify-center p-3">
                <span className="w-fit rounded bg-blue-soft px-2 py-0.5 text-[11px] font-semibold text-primary">{featured.category}</span>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight group-hover:text-primary">{featured.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={av1} alt="" width={512} height={512} loading="lazy" className="size-9 rounded-full object-cover" />
                  <div className="flex-1"><p className="text-xs font-bold text-navy">By {featured.author}</p><p className="text-[11px] text-muted-foreground">{featured.date} · {featured.read}</p></div>
                  <span className="grid size-7 place-items-center rounded-full bg-blue-soft text-primary"><ArrowRight className="size-4" /></span>
                </div>
              </div>
            </Link>

            <div className="mt-8 flex items-center justify-between"><LineEyebrow>Latest articles</LineEyebrow>{topic && <button onClick={() => setTopic(null)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View All Articles <ArrowRight className="size-4" /></button>}</div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{latest.map((p) => <Card key={p.slug} p={p} />)}</div>
            {latest.length === 0 && <p className="mt-4 text-sm text-muted-foreground">No articles in this topic yet.</p>}
          </div>

          <aside className="space-y-5">
            <div id="subscribe" className="rounded-xl bg-blue-soft p-5">
              <div className="flex gap-3"><div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Mail className="size-5" /></div><div><h3 className="font-bold">Stay Updated</h3><p className="mt-1 text-xs text-muted-foreground">Get the latest articles, insights and product updates delivered to your inbox.</p></div></div>
              <Subscribe />
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-bold">Featured Topics</h3>
              <ul className="mt-4 space-y-3">
                {([["Digital Transformation", 24, 4], ["Education Innovation", 18, 6], ["Agriculture & Food Systems", 16, 1], ["Legal & Regulatory Insights", 12, 2], ["Music Industry Trends", 14, 3]] as const).map(([t, n, i]) => (
                  <li key={t} className="flex items-center gap-3"><img src={posts[i]!.image} alt="" width={96} height={96} loading="lazy" className="size-11 rounded-md object-cover" /><div><p className="text-sm font-semibold text-navy">{t}</p><p className="text-[11px] text-muted-foreground">{n} articles</p></div></li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-bold">Popular Articles</h3>
              <ol className="mt-4 space-y-4">
                {popularPosts.map((p, i) => (
                  <li key={p.slug}><Link to="/blog/$slug" params={{ slug: p.slug }} className="flex gap-3 hover:text-primary"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-soft font-bold text-primary">{i + 1}</span><span><span className="block text-sm font-semibold leading-snug">{p.title}</span><span className="text-[11px] text-muted-foreground">{p.date} · {p.read}</span></span></Link></li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
      <div className="pb-10"><BlueCta eyebrow="Join the conversation" title="Be Part of a Smarter Tomorrow." text="Subscribe to our blog and get the latest insights, stories, and opportunities from across our products and industries." primary="Subscribe Now" single /></div>
    </>
  );
}
