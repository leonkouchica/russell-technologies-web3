import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatCard } from "@/components/admin/AdminComponents";
import { adminMediaFiles, AdminMediaFile } from "@/lib/admin-data";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/media")({
  head: () => meta("Media Library — Admin Dashboard", "Asset management, media uploads and file storage."),
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const [selectedFile, setSelectedFile] = useState<AdminMediaFile>(adminMediaFiles[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState(false);

  const filteredFiles = adminMediaFiles.filter((f) => {
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

  return (
    <AdminLayout>
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
          onClick={() => alert("Upload dialog opened. Supports JPG, PNG, PDF, MP4")}
          className="inline-flex items-center justify-center gap-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          <Upload className="size-4" />
          <span>Upload Files</span>
        </button>
      </div>

      {/* 5 STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <AdminStatCard
          title="All Files"
          value={428}
          note="+12% this month"
          icon={FileText}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <AdminStatCard
          title="Images"
          value={312}
          note="73% of total"
          icon={ImageIcon}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <AdminStatCard
          title="Videos"
          value={48}
          note="11% of total"
          icon={Video}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <AdminStatCard
          title="Documents"
          value={52}
          note="12% of total"
          icon={FileCheck}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
        <AdminStatCard
          title="Others"
          value={16}
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
              <button className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs">
                <Download className="size-3.5" /> Download
              </button>
              <button className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs">
                <RefreshCw className="size-3.5" /> Replace
              </button>
            </div>

            <button
              onClick={() => alert(`Deleted file: ${selectedFile.filename}`)}
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
