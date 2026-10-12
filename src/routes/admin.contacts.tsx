import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Contact,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Trash2,
  MoreVertical,
  Reply,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { meta } from "@/components/site/blocks";

export const Route = createFileRoute("/admin/contacts")({
  head: () => meta("Contacts & Inquiries — Admin Dashboard", "Incoming project proposals, strategy requests and messages."),
  component: AdminContactsPage,
});

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  date: string;
  status: "New" | "Replied" | "Archived";
}

const mockInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "Dr. Kunle Adeleke",
    email: "kunle.adeleke@apexhealth.ng",
    phone: "+234 803 234 5678",
    service: "Custom Web Application",
    budget: "$10,000 - $25,000",
    message: "We need an integrated patient portal with automated SMS reminders and laboratory report dispatch for our multi-clinic system in Abuja.",
    date: "Sep 10, 2026, 9:15 AM",
    status: "New",
  },
  {
    id: "inq-2",
    name: "Ngozi Eze",
    email: "ngozi@zenithenergy.com",
    phone: "+234 812 888 9911",
    service: "BLUEFLAME Fuel Management",
    budget: "Enterprise",
    message: "Looking for a demo and multi-depot deployment proposal for our downstream retail operations across Lagos and Port Harcourt.",
    date: "Sep 8, 2026, 2:30 PM",
    status: "Replied",
  },
  {
    id: "inq-3",
    name: "Tunde Oladipo",
    email: "tunde@greengrovefarms.org",
    phone: "+234 809 111 2233",
    service: "FARMSPOTS Supply Chain",
    budget: "$5,000 - $10,000",
    message: "We represent a cooperative of 200 grain farmers in Oyo State. Want to connect our aggregation center to off-takers.",
    date: "Sep 5, 2026, 11:00 AM",
    status: "Replied",
  },
];

function AdminContactsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry>(mockInquiries[0]);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    alert(`Reply sent to ${selectedInquiry.email}`);
    setReplyText("");
    setInquiries(
      inquiries.map((i) => (i.id === selectedInquiry.id ? { ...i, status: "Replied" } : i))
    );
  };

  return (
    <AdminLayout>
      <div className="flex items-start gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full mt-1 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact Inquiries & Leads
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Client messages received from the website contact and booking forms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INQUIRIES LIST (50%) */}
        <div className="lg:col-span-5 space-y-3">
          {inquiries.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedInquiry(item)}
              className={`p-4 rounded-2xl border transition cursor-pointer bg-white ${
                selectedInquiry.id === item.id
                  ? "border-blue-600 ring-2 ring-blue-500/10 shadow-md"
                  : "border-slate-200/80 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-slate-900">{item.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "New"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-600 mb-1">{item.service}</p>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.message}</p>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">{item.date}</p>
            </div>
          ))}
        </div>

        {/* INQUIRY DETAIL & REPLY BOX (50%) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{selectedInquiry.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="size-3.5 text-slate-400" /> {selectedInquiry.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="size-3.5 text-slate-400" /> {selectedInquiry.phone}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400">{selectedInquiry.date}</span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Service Interest</span>
                  <span className="font-bold text-slate-800">{selectedInquiry.service}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Estimated Budget</span>
                  <span className="font-bold text-slate-800">{selectedInquiry.budget}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Message</label>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            {/* REPLY BOX */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="text-xs font-bold text-slate-700 block">Send Direct Response</label>
              <textarea
                placeholder="Write your email response to this client..."
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-hidden text-slate-800"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSendReply}
                  className="px-5 py-2 bg-[#0062ff] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Reply className="size-3.5" /> Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
