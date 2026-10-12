import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Mail,
  Save,
  Check,
  Building,
  Key,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/settings")({
  head: () => meta("Settings — Admin Dashboard", "Configure system options, notifications and integrations."),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("Russell Technologies");
  const [tagline, setTagline] = useState("Digital infrastructure for a smarter tomorrow");
  const [contactEmail, setContactEmail] = useState("info@russelltech.com");
  const [phoneNumber, setPhoneNumber] = useState("+234 800 787 7355");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Configurations
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage global site preferences, brand information, and communication channels.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] max-w-4xl space-y-6">
        <div>
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-1">
            <Building className="size-4 text-blue-600" /> General Site Identity
          </h3>
          <p className="text-xs text-slate-400">Public name, branding tagline, and main metadata.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Company / Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-1">
            <Mail className="size-4 text-blue-600" /> Official Contact Channels
          </h3>
          <p className="text-xs text-slate-400 mb-4">Emails and phone numbers displayed on footer and contact pages.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Support / General Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Office Telephone</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
          >
            {saved ? <Check className="size-4" /> : <Save className="size-4" />}
            <span>{saved ? "Settings Saved" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
