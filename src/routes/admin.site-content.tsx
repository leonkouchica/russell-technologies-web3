import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Layers,
  Package,
  Quote,
  Users,
  BarChart3,
  Search,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  GripVertical,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  ExternalLink,
  Star,
  Briefcase,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { meta } from "@/components/site/blocks";
import { toast } from "sonner";
import {
  services as siteServices,
  products as siteProducts,
  testimonials as siteTestimonials,
  clients as siteClients,
  metrics as siteMetrics,
} from "@/lib/site-data";

export const Route = createFileRoute("/admin/site-content")({
  head: () =>
    meta(
      "Site Content — Admin Dashboard",
      "Manage services, products, testimonials, clients and key metrics.",
    ),
  component: AdminSiteContentPage,
});

/* ── Shared Styles ─────────────────────────────────────────────────── */
const inputCls =
  "w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition";
const labelCls = "text-xs font-bold text-slate-700 block mb-1";
const cardCls =
  "bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]";

/* ── Tab Config ──────────────────────────────────────────────────────── */
type ContentTab =
  | "services"
  | "products"
  | "testimonials"
  | "clients"
  | "metrics";

const tabs: { id: ContentTab; label: string; icon: React.ElementType }[] = [
  { id: "services", label: "Services", icon: Layers },
  { id: "products", label: "Products", icon: Package },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "clients", label: "Clients", icon: Users },
  { id: "metrics", label: "Key Metrics", icon: BarChart3 },
];

/* ── Inline Edit Row ─────────────────────────────────────────────────── */
function InlineEditRow({
  label,
  value,
  onSave,
  onDelete,
  isTextarea,
}: {
  label?: string;
  value: string;
  onSave: (v: string) => void;
  onDelete?: () => void;
  isTextarea?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    onSave(draft);
    setEditing(false);
    toast.success("Updated successfully");
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-start gap-3 group py-2.5">
      <div className="pt-1 text-slate-300 cursor-grab">
        <GripVertical className="size-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        {label && (
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {label}
          </p>
        )}
        {editing ? (
          <div className="space-y-2">
            {isTextarea ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                className={`${inputCls} resize-none`}
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className={inputCls}
                autoFocus
              />
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={save}
                className="px-3 py-1.5 bg-[#0062ff] text-white text-[11px] font-bold rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
              >
                <Check className="size-3" /> Save
              </button>
              <button
                onClick={cancel}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
              >
                <X className="size-3" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-700 font-medium">{value}</p>
        )}
      </div>
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <Pencil className="size-3.5" />
          </button>
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                toast.success("Removed");
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
function AdminSiteContentPage() {
  const [activeTab, setActiveTab] = useState<ContentTab>("services");

  /* ── Services State ─────────────────────────────────── */
  const [servicesList, setServicesList] = useState(
    siteServices.map((s, i) => ({
      id: `svc-${i}`,
      title: s.title,
      short: s.short,
      slug: s.slug,
      features: [...s.features],
      tech: [...s.tech],
      status: "Published" as "Published" | "Draft",
    })),
  );
  const [expandedService, setExpandedService] = useState<string | null>(null);

  /* ── Products State ─────────────────────────────────── */
  const [productsList, setProductsList] = useState(
    siteProducts.map((p, i) => ({
      id: `prod-${i}`,
      name: p.name,
      displayName: p.displayName,
      tag: p.tag,
      short: p.short,
      slug: p.slug,
      status: "Published" as "Published" | "Draft",
      features: [...p.features],
    })),
  );
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  /* ── Testimonials State ─────────────────────────────── */
  const [testimonialsList, setTestimonialsList] = useState(
    siteTestimonials.map((t, i) => ({
      id: `test-${i}`,
      quote: t.quote,
      name: t.name,
      role: t.role,
    })),
  );
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    name: "",
    role: "",
  });

  /* ── Clients State ──────────────────────────────────── */
  const [clientsList, setClientsList] = useState(
    siteClients.map((c, i) => ({ id: `client-${i}`, name: c })),
  );
  const [newClient, setNewClient] = useState("");

  /* ── Metrics State ──────────────────────────────────── */
  const [metricsList, setMetricsList] = useState(
    siteMetrics.map((m, i) => ({
      id: `metric-${i}`,
      value: m.value,
      label: m.label,
    })),
  );

  /* ── Render ──────────────────────────────────────────── */
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Site Content
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage the services, products, testimonials, clients and key
              metrics shown on your public site.
            </p>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          {
            label: "Services",
            count: servicesList.length,
            icon: Layers,
            color: "blue",
          },
          {
            label: "Products",
            count: productsList.length,
            icon: Package,
            color: "purple",
          },
          {
            label: "Testimonials",
            count: testimonialsList.length,
            icon: Quote,
            color: "amber",
          },
          {
            label: "Clients",
            count: clientsList.length,
            icon: Users,
            color: "emerald",
          },
          {
            label: "Key Metrics",
            count: metricsList.length,
            icon: BarChart3,
            color: "rose",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`${cardCls} flex items-center gap-3 cursor-pointer hover:shadow-md transition`}
              onClick={() =>
                setActiveTab(s.label.toLowerCase().replace(" ", "-") as ContentTab)
              }
            >
              <div
                className={`p-2 rounded-xl bg-${s.color}-50 text-${s.color}-600`}
              >
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 leading-tight">
                  {s.count}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* TABS */}
      <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200/80 p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                active
                  ? "bg-[#0062ff] text-white shadow-sm shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon
                className={`size-3.5 ${active ? "text-white" : "text-slate-400"}`}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═══════ SERVICES TAB ═══════ */}
      {activeTab === "services" && (
        <div className="space-y-4">
          {servicesList.map((svc) => {
            const expanded = expandedService === svc.id;
            return (
              <div key={svc.id} className={`${cardCls} transition-all`}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedService(expanded ? null : svc.id)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Briefcase className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">
                        {svc.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        /{svc.slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        svc.status === "Published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                      }`}
                    >
                      {svc.status}
                    </span>
                    {expanded ? (
                      <ChevronUp className="size-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="size-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {expanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Service Title</label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) =>
                            setServicesList((prev) =>
                              prev.map((s) =>
                                s.id === svc.id
                                  ? { ...s, title: e.target.value }
                                  : s,
                              ),
                            )
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Status</label>
                        <select
                          value={svc.status}
                          onChange={(e) =>
                            setServicesList((prev) =>
                              prev.map((s) =>
                                s.id === svc.id
                                  ? {
                                      ...s,
                                      status: e.target.value as
                                        | "Published"
                                        | "Draft",
                                    }
                                  : s,
                              ),
                            )
                          }
                          className={inputCls}
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Short Description</label>
                      <textarea
                        value={svc.short}
                        onChange={(e) =>
                          setServicesList((prev) =>
                            prev.map((s) =>
                              s.id === svc.id
                                ? { ...s, short: e.target.value }
                                : s,
                            ),
                          )
                        }
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className={labelCls}>Features</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {svc.features.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60"
                          >
                            {f}
                            <button
                              onClick={() =>
                                setServicesList((prev) =>
                                  prev.map((s) =>
                                    s.id === svc.id
                                      ? {
                                          ...s,
                                          features: s.features.filter(
                                            (_, idx) => idx !== i,
                                          ),
                                        }
                                      : s,
                                  ),
                                )
                              }
                              className="text-slate-400 hover:text-rose-500"
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <label className={labelCls}>Tech Stack</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {svc.tech.map((t, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200/60"
                          >
                            {t}
                            <button
                              onClick={() =>
                                setServicesList((prev) =>
                                  prev.map((s) =>
                                    s.id === svc.id
                                      ? {
                                          ...s,
                                          tech: s.tech.filter(
                                            (_, idx) => idx !== i,
                                          ),
                                        }
                                      : s,
                                  ),
                                )
                              }
                              className="text-blue-400 hover:text-rose-500"
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() =>
                          toast.success(`${svc.title} updated!`)
                        }
                        className="px-4 py-2 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                      >
                        <Save className="size-3.5" /> Save Service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════ PRODUCTS TAB ═══════ */}
      {activeTab === "products" && (
        <div className="space-y-4">
          {productsList.map((prod) => {
            const expanded = expandedProduct === prod.id;
            return (
              <div key={prod.id} className={`${cardCls} transition-all`}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedProduct(expanded ? null : prod.id)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <Package className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {prod.tag} · /{prod.slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        prod.status === "Published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                      }`}
                    >
                      {prod.status}
                    </span>
                    {expanded ? (
                      <ChevronUp className="size-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="size-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {expanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Product Name</label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) =>
                            setProductsList((prev) =>
                              prev.map((p) =>
                                p.id === prod.id
                                  ? { ...p, name: e.target.value }
                                  : p,
                              ),
                            )
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Display Name</label>
                        <input
                          type="text"
                          value={prod.displayName}
                          onChange={(e) =>
                            setProductsList((prev) =>
                              prev.map((p) =>
                                p.id === prod.id
                                  ? { ...p, displayName: e.target.value }
                                  : p,
                              ),
                            )
                          }
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Tag / Category</label>
                        <input
                          type="text"
                          value={prod.tag}
                          onChange={(e) =>
                            setProductsList((prev) =>
                              prev.map((p) =>
                                p.id === prod.id
                                  ? { ...p, tag: e.target.value }
                                  : p,
                              ),
                            )
                          }
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Status</label>
                        <select
                          value={prod.status}
                          onChange={(e) =>
                            setProductsList((prev) =>
                              prev.map((p) =>
                                p.id === prod.id
                                  ? {
                                      ...p,
                                      status: e.target.value as
                                        | "Published"
                                        | "Draft",
                                    }
                                  : p,
                              ),
                            )
                          }
                          className={inputCls}
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Short Description</label>
                      <textarea
                        value={prod.short}
                        onChange={(e) =>
                          setProductsList((prev) =>
                            prev.map((p) =>
                              p.id === prod.id
                                ? { ...p, short: e.target.value }
                                : p,
                            ),
                          )
                        }
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className={labelCls}>Key Features</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {prod.features.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-200/60"
                          >
                            {f}
                            <button
                              onClick={() =>
                                setProductsList((prev) =>
                                  prev.map((p) =>
                                    p.id === prod.id
                                      ? {
                                          ...p,
                                          features: p.features.filter(
                                            (_, idx) => idx !== i,
                                          ),
                                        }
                                      : p,
                                  ),
                                )
                              }
                              className="text-purple-400 hover:text-rose-500"
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() =>
                          toast.success(`${prod.name} updated!`)
                        }
                        className="px-4 py-2 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                      >
                        <Save className="size-3.5" /> Save Product
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════ TESTIMONIALS TAB ═══════ */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500">
              {testimonialsList.length} testimonials displayed on the public
              site.
            </p>
            <button
              onClick={() => setShowAddTestimonial(true)}
              className="px-4 py-2 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <Plus className="size-3.5" /> Add Testimonial
            </button>
          </div>

          {/* ADD NEW FORM */}
          {showAddTestimonial && (
            <div className={`${cardCls} space-y-4 border-blue-200 bg-blue-50/20`}>
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Plus className="size-4 text-blue-600" /> New Testimonial
              </h3>
              <div>
                <label className={labelCls}>Quote</label>
                <textarea
                  value={newTestimonial.quote}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      quote: e.target.value,
                    })
                  }
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="What the client said..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Name</label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        name: e.target.value,
                      })
                    }
                    className={inputCls}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className={labelCls}>Role / Company</label>
                  <input
                    type="text"
                    value={newTestimonial.role}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        role: e.target.value,
                      })
                    }
                    className={inputCls}
                    placeholder="CEO, Acme Corp"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowAddTestimonial(false);
                    setNewTestimonial({ quote: "", name: "", role: "" });
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (
                      newTestimonial.quote &&
                      newTestimonial.name &&
                      newTestimonial.role
                    ) {
                      setTestimonialsList([
                        ...testimonialsList,
                        {
                          id: `test-${Date.now()}`,
                          ...newTestimonial,
                        },
                      ]);
                      setNewTestimonial({ quote: "", name: "", role: "" });
                      setShowAddTestimonial(false);
                      toast.success("Testimonial added!");
                    } else {
                      toast.error("Please fill in all fields.");
                    }
                  }}
                  className="px-4 py-2 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Check className="size-3.5" /> Add
                </button>
              </div>
            </div>
          )}

          {/* TESTIMONIAL LIST */}
          {testimonialsList.map((t) => (
            <div key={t.id} className={`${cardCls}`}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 mt-0.5">
                  <Quote className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 font-medium italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="size-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTestimonialsList(
                      testimonialsList.filter((item) => item.id !== t.id),
                    );
                    toast.success("Testimonial removed");
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════ CLIENTS TAB ═══════ */}
      {activeTab === "clients" && (
        <div className={`${cardCls} space-y-5`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Users className="size-4 text-emerald-600" /> Client Logos &
                Names
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Displayed in the "Trusted By" section on the homepage.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {clientsList.length} clients
            </span>
          </div>

          {/* ADD CLIENT */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="Enter client name..."
              className={`${inputCls} flex-1`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newClient.trim()) {
                  setClientsList([
                    ...clientsList,
                    { id: `client-${Date.now()}`, name: newClient.trim() },
                  ]);
                  setNewClient("");
                  toast.success("Client added!");
                }
              }}
            />
            <button
              onClick={() => {
                if (newClient.trim()) {
                  setClientsList([
                    ...clientsList,
                    { id: `client-${Date.now()}`, name: newClient.trim() },
                  ]);
                  setNewClient("");
                  toast.success("Client added!");
                }
              }}
              className="px-4 py-2.5 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="size-3.5" /> Add
            </button>
          </div>

          {/* CLIENT LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {clientsList.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {c.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-slate-700">
                    {c.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setClientsList(
                      clientsList.filter((item) => item.id !== c.id),
                    );
                    toast.success(`${c.name} removed`);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ METRICS TAB ═══════ */}
      {activeTab === "metrics" && (
        <div className={`${cardCls} space-y-5`}>
          <div>
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <BarChart3 className="size-4 text-rose-600" /> Key Metrics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Headline statistics displayed in the hero and about sections.
              Edit the value or label inline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metricsList.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div>
                  <label className={labelCls}>Value</label>
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) =>
                      setMetricsList((prev) =>
                        prev.map((item) =>
                          item.id === m.id
                            ? { ...item, value: e.target.value }
                            : item,
                        ),
                      )
                    }
                    className={inputCls}
                    placeholder="e.g. 150+"
                  />
                </div>
                <div>
                  <label className={labelCls}>Label</label>
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) =>
                      setMetricsList((prev) =>
                        prev.map((item) =>
                          item.id === m.id
                            ? { ...item, label: e.target.value }
                            : item,
                        ),
                      )
                    }
                    className={inputCls}
                    placeholder="e.g. Projects Delivered"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add new metric */}
          <button
            onClick={() => {
              setMetricsList([
                ...metricsList,
                {
                  id: `metric-${Date.now()}`,
                  value: "",
                  label: "",
                },
              ]);
              toast.info("New metric added — fill in the details.");
            }}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:text-blue-600 hover:border-blue-300 transition flex items-center justify-center gap-2"
          >
            <Plus className="size-3.5" /> Add Metric
          </button>

          <div className="flex items-center justify-end pt-3 border-t border-slate-100">
            <button
              onClick={() => toast.success("Metrics saved!")}
              className="px-5 py-2.5 bg-[#0062ff] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <Save className="size-3.5" /> Save Metrics
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
