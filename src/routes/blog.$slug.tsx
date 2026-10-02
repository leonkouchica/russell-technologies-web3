import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { posts } from "@/lib/site-data";
import { CtaBand, PostCard, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    loaderData ? { meta: [...meta(`${loaderData.post.title} — Russell Technologies`, loaderData.post.excerpt).meta.filter((m) => !("property" in m && m.property === "og:type")), { property: "og:type", content: "article" }] } : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <article className="container-x max-w-3xl py-14">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" />Back to blog</Link>
        <span className="mt-6 block w-fit rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-primary">{post.category}</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">{post.title}</h1>
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-4" />{post.date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-4" />{post.read}</span>
        </div>
        <img src={post.image} alt="" width={992} height={672} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/85">
          <p>{post.excerpt}</p>
          <p>Across the region, organizations are discovering that the right technology doesn't have to be complex or expensive. Starting with a clear problem and choosing tools that fit existing workflows makes adoption faster and results more lasting.</p>
          <h2 className="pt-4 text-2xl font-bold">Start with the problem</h2>
          <p>The most successful digital projects we've delivered begin with listening — understanding who uses the system, what slows them down and what success looks like. Only then do we design the solution.</p>
          <h2 className="pt-4 text-2xl font-bold">Measure what matters</h2>
          <p>Define a few clear metrics up front — time saved, errors reduced, revenue gained — and review them regularly. Technology should earn its place by delivering measurable value.</p>
        </div>
      </article>
      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{posts.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
