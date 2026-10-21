import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Upload,
  Search,
  FileText,
  Image as ImageIcon,
  Video,
  FileCheck,
  FolderPlus,
  FolderInput,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Copy,
  Download,
  RefreshCw,
  X,
  Play,
  Check,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatCard } from "@/components/admin/AdminComponents";
import { adminMediaFiles, AdminMediaFile } from "@/lib/admin-data";
import {
  useMediaFiles,
  useCreateMediaRecord,
  useDeleteMediaRecord,
} from "@/hooks/use-admin-data";
import { supabase } from "@/lib/supabase";
import { meta } from "@/components/site/blocks";
import { convertImageToWebP, formatBytes } from "@/lib/image-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/media")({
  head: () => meta("Media Library — Admin Dashboard", "Asset management, media uploads and file storage."),
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const { data: liveMedia } = useMediaFiles();
  const createMediaMutation = useCreateMediaRecord();
  const deleteMediaMutation = useDeleteMediaRecord();

  const mediaList: AdminMediaFile[] = (liveMedia && liveMedia.length > 0)
    ? liveMedia.map((m) => ({
        id: m.id,
        title: m.title,
        filename: m.filename,
        format: (m.format as AdminMediaFile["format"]) || "WEBP",
        size: formatBytes(m.size_bytes || 0),
        dimensions: m.dimensions || "—",
        folder: m.folder || "Company Images",
        uploadedDate: m.created_at ? new Date(m.created_at).toLocaleDateString() : "Recent",
        uploadedBy: m.uploaded_by || "Admin",
        url: m.public_url,
        thumbnail: m.public_url,
        altText: m.alt_text || m.title,
        caption: m.caption || "",
        tags: m.tags || ["upload"],
      }))
    : adminMediaFiles;

  const [selectedId, setSelectedId] = useState<string>("");
  const selectedFile = mediaList.find((f) => f.id === selectedId) || mediaList[0] || adminMediaFiles[0];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = mediaList.filter((f) => {
    if (selectedType !== "all" && f.format !== selectedType) return false;
    if (selectedFolder !== "all" && f.folder !== selectedFolder) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return f.title.toLowerCase().includes(q) || f.tags.some((t) => t.includes(q));
    }
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const processAndUploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploading(true);
    const newItems: AdminMediaFile[] = [];

    for (const file of fileArray) {
      try {
        if (file.type.startsWith("image/")) {
          toast.loading(`Converting ${file.name} to High-Quality WebP...`, { id: file.name });
          const res = await convertImageToWebP(file, { quality: 0.92 });
          let publicUrl = res.dataUrl;
          const storagePath = `media/${Date.now()}-${res.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

          if (supabase) {
            try {
              const uploadRes = await supabase.storage.from("media").upload(storagePath, res.blob, {
                contentType: "image/webp",
                upsert: true,
              });
              if (!uploadRes.error) {
                const pub = supabase.storage.from("media").getPublicUrl(storagePath);
                if (pub.data?.publicUrl) publicUrl = pub.data.publicUrl;
              }
            } catch (e) {
              console.warn("Storage upload failed, using dataUrl fallback:", e);
            }
          }

          await createMediaMutation.mutateAsync({
            title: res.name,
            filename: res.name,
            format: "WEBP",
            size_bytes: res.webpSize,
            dimensions: `${res.width} × ${res.height}`,
            folder: "Company Images",
            storage_path: storagePath,
            public_url: publicUrl,
            alt_text: res.name.replace(".webp", ""),
            caption: `WebP converted asset (${formatBytes(res.webpSize)})`,
            tags: ["webp", "image", "upload"],
            uploaded_by: "Admin",
          });

          toast.success(
            `Converted & saved ${res.name} (High-Quality WebP • ${res.savedPercentage}% smaller)`,
            { id: file.name }
          );
        } else {
          const storagePath = `media/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          let publicUrl = "";

          if (supabase) {
            try {
              const uploadRes = await supabase.storage.from("media").upload(storagePath, file, { upsert: true });
              if (!uploadRes.error) {
                const pub = supabase.storage.from("media").getPublicUrl(storagePath);
                if (pub.data?.publicUrl) publicUrl = pub.data.publicUrl;
              }
            } catch (e) {
              console.warn("Storage upload failed:", e);
            }
          }

          await createMediaMutation.mutateAsync({
            title: file.name,
            filename: file.name,
            format: file.name.split(".").pop()?.toUpperCase() || "FILE",
            size_bytes: file.size,
            folder: file.type.startsWith("video/") ? "Videos" : "Documents",
            storage_path: storagePath,
            public_url: publicUrl || URL.createObjectURL(file),
            uploaded_by: "Admin",
          });
          toast.success(`Uploaded ${file.name}`);
        }
      } catch (err) {
        toast.error(`Failed to process ${file.name}`);
      }
    }

    if (newItems.length > 0) {
      setMediaList((prev) => [...newItems, ...prev]);
      setSelectedFile(newItems[0]);
    }
    setIsUploading(false);
  };

  const handleReplaceFile = async (file: File) => {
    if (!selectedFile) return;
    try {
      if (file.type.startsWith("image/")) {
        toast.loading(`Converting replacement image to High-Quality WebP...`, { id: "replace" });
        const res = await convertImageToWebP(file, { quality: 0.92 });
        toast.success(`Replaced with high-quality WebP (${res.savedPercentage}% saved)`, { id: "replace" });

        const updated: AdminMediaFile = {
          ...selectedFile,
          title: res.name,
          filename: res.name,
          format: "WEBP",
          size: formatBytes(res.webpSize),
          dimensions: `${res.width} × ${res.height}`,
          thumbnail: res.dataUrl,
          url: res.dataUrl,
          uploadedDate: "Just now",
        };

        setMediaList((prev) => prev.map((f) => (f.id === selectedFile.id ? updated : f)));
        setSelectedFile(updated);
      }
    } catch {
      toast.error("Failed to replace image");
    }
  };

  return (
    <AdminLayout>
      {/* HIDDEN FILE INPUTS */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*,application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            processAndUploadFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <input
        type="file"
        ref={replaceInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleReplaceFile(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Media Library
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Upload, organize, and manage your images, videos, documents, and other media files.
            </p>
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0 disabled:opacity-60 cursor-pointer"
        >
          <Upload className="size-4" />
          <span>{isUploading ? "Converting to WebP..." : "Upload Files"}</span>
        </button>
      </div>

      {/* DRAG & DROP UPLOAD ZONE WITH AUTO-WEBP HIGHLIGHT */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files) processAndUploadFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 p-4 rounded-2xl border-2 border-dashed transition cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDragOver
            ? "border-blue-600 bg-blue-50/80 scale-[1.005]"
            : "border-blue-200/80 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30 hover:border-blue-400"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Upload className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Drag & drop files here, or click to browse
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                <Sparkles className="size-3" /> Auto WebP Conversion
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              All images (JPG, PNG, GIF, BMP) are automatically converted into pristine, high-quality WebP format for fast web delivery.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs shrink-0 pointer-events-none"
        >
          Select Files
        </button>
      </div>

      {/* 5 STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <AdminStatCard
          title="All Files"
          value={mediaList.length}
          note="+12% this month"
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Images"
          value={mediaList.filter((f) => f.format === "WEBP" || f.format === "JPG" || f.format === "PNG").length}
          note="Optimized WebP"
          icon={ImageIcon}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Videos"
          value={mediaList.filter((f) => f.format === "MP4").length}
          note="11% of total"
          icon={Video}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Documents"
          value={mediaList.filter((f) => f.format === "PDF").length}
          note="12% of total"
          icon={FileCheck}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
        <AdminStatCard
          title="Others"
          value={mediaList.filter((f) => !["WEBP", "JPG", "PNG", "MP4", "PDF"].includes(f.format)).length}
          note="4% of total"
          icon={FileText}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* MAIN TWO-COLUMN GRID: MEDIA GALLERY (75%) + DETAILS (25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search files by name, type or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
              >
                <option value="all">All File Types</option>
                <option value="WEBP">WEBP (High Quality)</option>
                <option value="JPG">JPG</option>
                <option value="PNG">PNG</option>
                <option value="MP4">MP4</option>
                <option value="PDF">PDF</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2">
                <option>All Dates</option>
              </select>

              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2"
              >
                <option value="all">All Folders</option>
                <option value="Company Images">Company Images</option>
                <option value="Events">Events</option>
                <option value="Products">Products</option>
                <option value="Documents">Documents</option>
              </select>

              <select className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-2">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button className="p-1 rounded-lg bg-blue-600 text-white shadow-2xs">
                  <LayoutGrid className="size-3.5" />
                </button>
                <button className="p-1 rounded-lg text-slate-500 hover:text-slate-800">
                  <List className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* BULK ACTION BAR */}
          <div className="flex items-center justify-between text-xs text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIds.length === filteredFiles.length && filteredFiles.length > 0}
                onChange={() =>
                  setSelectedIds(selectedIds.length === filteredFiles.length ? [] : filteredFiles.map((f) => f.id))
                }
                className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-700">{selectedIds.length} selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition">
                <FolderPlus className="size-3.5 text-blue-600" /> New Folder
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition">
                <FolderInput className="size-3.5 text-slate-500" /> Move to Folder
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition">
                <Trash2 className="size-3.5" />
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">
                <MoreVertical className="size-3.5" />
              </button>
            </div>
          </div>

          {/* MEDIA GRID (3/4 COLUMNS) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile?.id === file.id;
              const isChecked = selectedIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`bg-white rounded-2xl border transition overflow-hidden cursor-pointer group flex flex-col ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md"
                      : "border-slate-200/80 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  {/* PREVIEW CONTAINER */}
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={file.thumbnail}
                      alt={file.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* TOP CHECKBOX */}
                    <div
                      className="absolute top-2.5 left-2.5 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(file.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 bg-white/90"
                      />
                    </div>

                    {/* VIDEO BADGE IF APPLICABLE */}
                    {file.format === "MP4" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="size-8 rounded-full bg-white/90 flex items-center justify-center text-slate-900 shadow-md">
                          <Play className="size-4 ml-0.5 fill-current" />
                        </div>
                        {file.duration && (
                          <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/75 text-white px-1.5 py-0.5 rounded-sm">
                            {file.duration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* METADATA */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-800 truncate" title={file.filename}>
                        {file.filename}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {file.format} • {file.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>{file.uploadedDate}</span>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600"
                      >
                        <MoreVertical className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <p>Showing 1 to {filteredFiles.length} of 428 files</p>
            <div className="flex items-center gap-1.5">
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400" disabled>
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-8 rounded-lg bg-[#0062ff] text-white font-bold flex items-center justify-center">1</button>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">2</button>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">3</button>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">4</button>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">5</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">36</button>
              <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: FILE DETAILS (25%) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4 sticky top-20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">File Details</h3>
              <button className="text-slate-400 hover:text-slate-600">
                <X className="size-4" />
              </button>
            </div>

            {/* PREVIEW IMAGE */}
            <div className="rounded-xl overflow-hidden border border-slate-100 h-44 bg-slate-100">
              <img
                src={selectedFile.thumbnail}
                alt={selectedFile.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* METADATA DETAILS */}
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 truncate">{selectedFile.filename}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedFile.format} • {selectedFile.size} {selectedFile.dimensions ? `• ${selectedFile.dimensions}` : ""}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Uploaded on {selectedFile.uploadedDate} by {selectedFile.uploadedBy}
              </p>
            </div>

            {/* FILE URL */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">File URL</label>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                <input
                  type="text"
                  readOnly
                  value={selectedFile.url}
                  className="w-full bg-transparent text-[11px] text-slate-600 focus:outline-hidden truncate"
                />
                <button
                  onClick={() => handleCopy(selectedFile.url)}
                  className="p-1 hover:bg-slate-200 rounded-md text-slate-500 hover:text-slate-700 shrink-0"
                  title="Copy URL"
                >
                  {copiedUrl ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* ALT TEXT */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Alt Text</label>
              <input
                type="text"
                defaultValue={selectedFile.altText}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* CAPTION */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Caption</label>
              <textarea
                rows={2}
                defaultValue={selectedFile.caption}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* TAGS */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedFile.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-md font-semibold"
                  >
                    {t} <span className="cursor-pointer hover:text-blue-900">✕</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a tag..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
              />
            </div>

            {/* FOLDER */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Folder</label>
              <select
                defaultValue={selectedFile.folder}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="Company Images">Company Images</option>
                <option value="Events">Events</option>
                <option value="Products">Products</option>
                <option value="Documents">Documents</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = selectedFile.url;
                  link.download = selectedFile.filename;
                  link.click();
                }}
                className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Download className="size-3.5" /> Download
              </button>
              <button
                onClick={() => replaceInputRef.current?.click()}
                className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <RefreshCw className="size-3.5" /> Replace (WebP)
              </button>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (confirm(`Are you sure you want to delete ${selectedFile.filename}?`)) {
                  try {
                    await deleteMediaMutation.mutateAsync({ id: selectedFile.id });
                    toast.success(`Deleted ${selectedFile.filename}`);
                  } catch {
                    toast.error("Failed to delete media asset");
                  }
                }
              }}
              className="w-full py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Trash2 className="size-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
