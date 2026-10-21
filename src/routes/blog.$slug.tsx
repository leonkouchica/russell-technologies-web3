import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";
import { posts } from "@/lib/site-data";
import { CtaBand, PostCard, meta } from "@/components/site/blocks";
import { fetchBlogPostBySlug } from "@/lib/server-fns";
import { useComments, useCreateComment } from "@/hooks/use-admin-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const dbPost = await fetchBlogPostBySlug({ data: { slug: params.slug } });
      if (dbPost) {
        return {
          post: {
            id: dbPost.id,
            slug: dbPost.slug,
            title: dbPost.title,
            excerpt: dbPost.excerpt || "",
            content: dbPost.content || "",
            category: dbPost.category,
            date: new Date(dbPost.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            read: "5 min read",
            image: dbPost.image_url || posts[0].image,
            author: dbPost.author_name || "Russell Team",
          },
        };
      }
    } catch {
      // Fallback to static posts
    }
    const staticPost = posts.find((p) => p.slug === params.slug);
    if (!staticPost) throw notFound();
    return {
      post: {
        ...staticPost,
        id: staticPost.slug,
        content: "",
      },
    };
  },
  head: ({ loaderData }) =>
    loaderData ? { meta: [...meta(`${loaderData.post.title} — Russell Technologies`, loaderData.post.excerpt).meta.filter((m) => !("property" in m && m.property === "og:type")), { property: "og:type", content: "article" }] } : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const { data: comments = [] } = useComments({ status: "Approved" });
  const postComments = comments.filter((c) => c.post_id === post.id || c.post_id === post.slug);

  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const createCommentMutation = useCreateComment();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !commentText.trim()) {
      toast.error("Please fill in your name, email, and comment.");
      return;
    }
    setSubmitting(true);
    try {
      await createCommentMutation.mutateAsync({
        post_id: post.id,
        author_name: authorName.trim(),
        author_email: authorEmail.trim(),
        content: commentText.trim(),
      });
      toast.success("Thank you! Your comment has been submitted for moderation.");
      setCommentText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to post comment.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

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
          {post.content ? (
            <div className="whitespace-pre-line text-base leading-relaxed text-slate-700">
              {post.content}
            </div>
          ) : (
            <>
              <p>Across the region, organizations are discovering that the right technology doesn't have to be complex or expensive. Starting with a clear problem and choosing tools that fit existing workflows makes adoption faster and results more lasting.</p>
              <h2 className="pt-4 text-2xl font-bold">Start with the problem</h2>
              <p>The most successful digital projects we've delivered begin with listening — understanding who uses the system, what slows them down and what success looks like. Only then do we design the solution.</p>
              <h2 className="pt-4 text-2xl font-bold">Measure what matters</h2>
              <p>Define a few clear metrics up front — time saved, errors reduced, revenue gained — and review them regularly. Technology should earn its place by delivering measurable value.</p>
            </>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-16 border-t border-slate-200 pt-10">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-navy">Comments ({postComments.length})</h2>
          </div>

          {postComments.length > 0 ? (
            <div className="mt-6 space-y-4">
              {postComments.map((c) => (
                <div key={c.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy">{c.author_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">No approved comments yet. Be the first to share your thoughts!</p>
          )}

          {/* Comment submission form */}
          <form onSubmit={handleCommentSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-navy">Leave a Comment</h3>
            <p className="mt-1 text-xs text-muted-foreground">Your email address will not be published. Required fields are marked *</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-700">Name *</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Email *</label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-700">Comment *</label>
              <textarea
                required
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button type="submit" disabled={submitting} className="mt-4 gap-2 text-xs font-semibold">
              <Send className="size-3.5" />
              {submitting ? "Submitting…" : "Post Comment"}
            </Button>
          </form>
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
