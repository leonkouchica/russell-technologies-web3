import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  Eye,
  Send,
  Upload,
  Trash2,
  Calendar,
  X,
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
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import studentImg from "@/assets/student.jpg";
import { adminCurrentUser } from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/blog-posts/create")({
  head: () => meta("Create New Blog Post — Admin Dashboard", "Draft and publish new blog articles."),
  component: AdminCreateBlogPostPage,
});

export function AdminCreateBlogPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>(["education", "technology"]);
  const [newTag, setNewTag] = useState("");
  const [author, setAuthor] = useState("Admin (You)");
  const [status, setStatus] = useState("Draft");
  const [publishDate, setPublishDate] = useState("Sep 10, 2026, 10:00 AM");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [allowIndexing, setAllowIndexing] = useState(true);
  const [featuredImage, setFeaturedImage] = useState<string | null>(studentImg);
  const [isPublished, setIsPublished] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim().toLowerCase())) {
        setTags([...tags, newTag.trim().toLowerCase()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <AdminLayout>
      {/* BREADCRUMB & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/admin/blog-posts" className="hover:text-blue-600 flex items-center gap-1 transition">
            <ChevronLeft className="size-4" /> Blog Posts
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800">Create New Post</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Draft saved successfully!")}
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
            onClick={() => setIsPublished(true)}
            className="px-5 py-2 rounded-xl bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <Send className="size-3.5" /> Publish Post
          </button>
        </div>
      </div>

      {/* PAGE HEADING */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create New Blog Post
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Write, customize, and publish your post. Share valuable insights with your audience.
          </p>
        </div>
      </div>

      {isPublished && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-5 text-emerald-600" />
            <span className="text-xs font-bold">Post published successfully! Available at /blog/{slug || "new-post"}</span>
          </div>
          <button onClick={() => setIsPublished(false)} className="text-emerald-700 hover:text-emerald-900">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* MAIN TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: TITLE, RICH EDITOR & FEATURED IMAGE (~65%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TITLE INPUT CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter post title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                }}
                maxLength={120}
                className="w-full text-lg sm:text-xl font-bold text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:border-blue-500"
              />
              <span className="absolute right-3.5 bottom-3 text-xs font-medium text-slate-400">
                {title.length}/120
              </span>
            </div>

            {/* PERMALINK */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <LinkIcon className="size-3.5" /> Permalink:
              </span>
              <span className="text-slate-500">https://russelltech.com/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="enter-post-slug"
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden focus:bg-white text-xs w-48"
              />
            </div>
          </div>

          {/* RICH EDITOR CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* TOOLBAR */}
            <div className="bg-slate-50/80 p-2 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700">
              <select className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden mr-1">
                <option>Paragraph</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 font-bold" title="Bold">
                <Bold className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 italic" title="Italic">
                <Italic className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 underline" title="Underline">
                <Underline className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Bullet List">
                <List className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Numbered List">
                <ListOrdered className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Align Left">
                <AlignLeft className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Align Center">
                <AlignCenter className="size-4" />
              </button>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Add Link">
                <LinkIcon className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Add Image">
                <ImageIcon className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Add Video">
                <Video className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700" title="Code">
                <Code className="size-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 ml-auto" title="Expand">
                <Maximize2 className="size-4" />
              </button>
            </div>

            {/* CONTENT TEXTAREA */}
            <textarea
              placeholder="Start writing your post content here..."
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden resize-y leading-relaxed"
            />

            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-end text-xs text-slate-400 font-medium">
              <span>{wordCount} words</span>
            </div>
          </div>

          {/* FEATURED IMAGE CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-4">
              <ImageIcon className="size-4 text-blue-600" /> Featured Image
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* DROPZONE */}
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center transition flex flex-col items-center justify-center bg-slate-50/50">
                <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Upload className="size-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Drag and drop an image here, or <span className="text-blue-600 cursor-pointer">click to upload</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                <button className="mt-3 px-4 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
                  Upload Image
                </button>
              </div>

              {/* IMAGE PREVIEW */}
              {featuredImage && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-100 group">
                  <img
                    src={featuredImage}
                    alt="Featured preview"
                    className="w-full h-44 object-cover"
                  />
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="absolute top-2.5 right-2.5 size-8 rounded-full bg-white text-rose-600 shadow-md flex items-center justify-center hover:bg-rose-50 transition"
                    title="Remove image"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS, EXCERPT, SEO (~35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* POST SETTINGS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <FileText className="size-4 text-blue-600" /> Post Settings
            </h3>

            {/* CATEGORY */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="">Select a category</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Legal">Legal</option>
                <option value="Technology">Technology</option>
                <option value="Music">Music</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* TAGS */}
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
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              />
              <p className="text-[10px] text-slate-400 mt-1">Press Enter to add a tag</p>
            </div>

            {/* AUTHOR */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Author</label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <img
                  src={adminCurrentUser.avatar}
                  alt={adminCurrentUser.name}
                  className="size-6 rounded-full object-cover"
                />
                <span className="text-xs font-medium text-slate-800">{author}</span>
              </div>
            </div>

            {/* STATUS */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            {/* PUBLISH DATE */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Publish Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                <input
                  type="text"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-slate-800 focus:bg-white focus:outline-hidden font-medium"
                />
                <button
                  onClick={() => setPublishDate("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* EXCERPT CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
              <FileText className="size-4 text-blue-600" /> Excerpt
            </h3>
            <textarea
              placeholder="Write a short summary of your post..."
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={200}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-hidden"
            />
            <div className="text-right text-[10px] text-slate-400 mt-1">
              {excerpt.length}/200
            </div>
          </div>

          {/* SEO SETTINGS CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Search className="size-4 text-blue-600" /> SEO Settings
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Meta Title</label>
              <input
                type="text"
                placeholder="Enter meta title..."
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                maxLength={60}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              />
              <div className="text-right text-[10px] text-slate-400 mt-0.5">{metaTitle.length}/60</div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Meta Description</label>
              <textarea
                placeholder="Enter meta description..."
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                maxLength={160}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-hidden"
              />
              <div className="text-right text-[10px] text-slate-400 mt-0.5">{metaDescription.length}/160</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Allow Search Engines to Index</p>
                <p className="text-[11px] text-slate-400">Helps your post appear in search results</p>
              </div>
              <input
                type="checkbox"
                checked={allowIndexing}
                onChange={(e) => setAllowIndexing(e.target.checked)}
                className="toggle-checkbox size-5 text-blue-600 rounded-sm focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
