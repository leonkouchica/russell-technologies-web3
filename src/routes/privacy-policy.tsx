import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Calendar,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Globe,
  Mail,
  ChevronRight,
  Printer,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { contact } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Russell Technologies" },
      {
        name: "description",
        content:
          "Read Russell Technologies' Privacy Policy. Learn how we safeguard your data across our platforms including EDUPRO, RUSSELL LAW, BLUEFLAME, and FARMSPOTS.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const sections = [
  { id: "overview", title: "1. Overview & Commitment" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "product-privacy", title: "4. Product-Specific Privacy Safeguards" },
  { id: "sharing-disclosure", title: "5. Information Sharing & Disclosure" },
  { id: "data-security", title: "6. Data Security & Storage" },
  { id: "cookies-tracking", title: "7. Cookies & Tracking Technologies" },
  { id: "your-rights", title: "8. Your Rights & Choices" },
  { id: "retention", title: "9. Data Retention & Deletion" },
  { id: "contact-us", title: "10. Contacting Our Data Protection Team" },
];

export function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero Header */}
      <section className="border-b border-border bg-white py-14 lg:py-18">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-4">
                <ShieldCheck className="size-4" /> Data Protection & Trust
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                At Russell Technologies, transparency and data dignity are central to how we engineer digital solutions.
                This policy explains how we collect, protect, and handle your information across our websites, services, and software platforms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 lg:min-w-[280px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="size-3.5 text-primary" /> Effective Date
                </div>
                <div className="text-sm font-bold text-navy">October 12, 2026</div>
                <div className="text-xs text-muted-foreground">Version 2.4 · NDPA & GDPR Compliant</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="gap-2 sm:ml-auto"
              >
                <Printer className="size-3.5" /> Print
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-x mt-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Quick Navigation Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeSection === s.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              <hr className="my-5 border-slate-100" />

              <div className="rounded-xl bg-blue-50/60 p-3.5 border border-blue-100">
                <div className="flex items-center gap-2 text-xs font-bold text-navy">
                  <Lock className="size-4 text-blue-600" /> Have questions?
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Our Data Protection Officer is ready to assist with any privacy queries.
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                >
                  <Mail className="size-3.5" /> Contact DPO
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Text Articles */}
          <main className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            {/* 1. Overview */}
            <article id="overview" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Eye className="size-4" /> Section 1
              </div>
              <h2 className="text-2xl font-bold text-navy">1. Overview & Commitment</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Russell Technologies ("we," "us," or "our") operates modern web systems, enterprise management software,
                and digital portals. We respect the privacy of every individual who visits our website, uses our services,
                or interacts with our proprietary platforms—including <strong>EDUPRO</strong>, <strong>RUSSELL LAW</strong>, <strong>BLUEFLAME</strong>, and <strong>FARMSPOTS</strong>.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                This policy outlines our practices concerning the collection, storage, transfer, and utilization of personal data,
                governed in strict compliance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and international data privacy principles (including GDPR standards where applicable).
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 2. Information We Collect */}
            <article id="information-we-collect" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <FileText className="size-4" /> Section 2
              </div>
              <h2 className="text-2xl font-bold text-navy">2. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We collect personal information that you voluntarily furnish, as well as operational data collected automatically:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mt-4">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-navy text-sm">A. Directly Provided Data</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>Contact details (Full name, corporate email address, phone number).</li>
                    <li>Company information and organizational credentials.</li>
                    <li>Demo inquiries, RFP submissions, and technical requirements.</li>
                    <li>Newsletter subscriptions and event registrations.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-navy text-sm">B. Automated Technical Telemetry</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>IP addresses and generalized geographic locations.</li>
                    <li>Browser user-agents, device fingerprints, and operating systems.</li>
                    <li>Navigation logs, time spent on pages, and referring domains.</li>
                    <li>System logs and performance metrics.</li>
                  </ul>
                </div>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 3. How We Use Information */}
            <article id="how-we-use-information" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <UserCheck className="size-4" /> Section 3
              </div>
              <h2 className="text-2xl font-bold text-navy">3. How We Use Information</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We process your personal information under lawful bases including legitimate interests, contractual necessity, and consent:
              </p>
              <div className="space-y-2 mt-3">
                {[
                  "To deliver, operate, and maintain high-availability software platforms.",
                  "To respond to requests for proposals, schedule product walkthroughs, and provide dedicated support.",
                  "To verify enterprise accounts and maintain role-based access security.",
                  "To transmit service announcements, release notes, and subscribed newsletters.",
                  "To prevent fraudulent activities, cyber threats, and unauthorized access.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 4. Product-Specific Privacy Safeguards */}
            <article id="product-privacy" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldCheck className="size-4" /> Section 4
              </div>
              <h2 className="text-2xl font-bold text-navy">4. Product-Specific Privacy Safeguards</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Due to the diverse nature of our flagship products, specific protective covenants apply to each ecosystem:
              </p>

              <div className="grid gap-4 mt-4">
                <div className="border-l-4 border-primary bg-slate-50 p-4 rounded-r-xl">
                  <h4 className="font-bold text-navy text-sm">EDUPRO (Education Management)</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Student academic records, fee receipts, and parental contact data are handled as strictly confidential.
                    School administrators retain ultimate data controllership, and records are isolated via tenant sandboxing.
                  </p>
                </div>

                <div className="border-l-4 border-navy bg-slate-50 p-4 rounded-r-xl">
                  <h4 className="font-bold text-navy text-sm">RUSSELL LAW (Legal Practice Management)</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Case files, court filings, and privileged client communications are protected with end-to-end AES-256 encryption.
                    Our staff have zero unauthorized access to legal work product or attorney-client confidential records.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 bg-slate-50 p-4 rounded-r-xl">
                  <h4 className="font-bold text-navy text-sm">FARMSPOTS (Agri-Marketplace)</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Transaction histories, logistics coordinates, and escrow payment credentials are encrypted and retained solely
                    to satisfy dispute arbitration and commercial compliance requirements.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 bg-slate-50 p-4 rounded-r-xl">
                  <h4 className="font-bold text-navy text-sm">BLUEFLAME (Music Distribution)</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Artist discographies, royalty ledgers, and streaming analytics are safeguarded to ensure accurate payout attribution and copyright integrity.
                  </p>
                </div>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 5. Sharing & Disclosure */}
            <article id="sharing-disclosure" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Lock className="size-4" /> Section 5
              </div>
              <h2 className="text-2xl font-bold text-navy">5. Information Sharing & Disclosure</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong>We do not sell, rent, or trade your personal information.</strong> We only share information with:
              </p>
              <ul className="mt-2 space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li><strong>Verified Cloud Infrastructure Providers</strong>: Certified hosting and computing partners (e.g. AWS, Cloudflare, Vercel) bound by data processing agreements.</li>
                <li><strong>Payment Processors & Banking Gateways</strong>: Secure, PCI-DSS certified partners handling escrow settlements.</li>
                <li><strong>Legal & Regulatory Authorities</strong>: Where strictly mandated by competent court orders or statutory law in Nigeria.</li>
              </ul>
            </article>

            <hr className="border-slate-100" />

            {/* 6. Data Security & Storage */}
            <article id="data-security" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldCheck className="size-4" /> Section 6
              </div>
              <h2 className="text-2xl font-bold text-navy">6. Data Security & Storage</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We employ industry-leading technical and operational safeguards:
              </p>
              <div className="grid gap-3 sm:grid-cols-3 mt-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <div className="font-bold text-navy text-sm">TLS 1.3 / SSL</div>
                  <div className="text-[11px] text-muted-foreground mt-1">End-to-end encryption in transit across all endpoints.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <div className="font-bold text-navy text-sm">AES-256 Storage</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Encrypted relational databases and object storage at rest.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <div className="font-bold text-navy text-sm">Role-Based RBAC</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Strict multi-tier permission boundaries and audit trails.</div>
                </div>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 7. Cookies */}
            <article id="cookies-tracking" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Globe className="size-4" /> Section 7
              </div>
              <h2 className="text-2xl font-bold text-navy">7. Cookies & Tracking Technologies</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our site uses cookies to ensure smooth navigation, remember theme preferences (Light/Dark mode), and gather aggregate telemetry.
                You can configure your browser to reject non-essential cookies at any time without forfeiting primary site functionality.
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 8. Your Rights */}
            <article id="your-rights" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <UserCheck className="size-4" /> Section 8
              </div>
              <h2 className="text-2xl font-bold text-navy">8. Your Rights & Choices</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Under relevant data protection statutes, you hold rights to:
              </p>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li>Request access to copies of personal data held about you.</li>
                <li>Demand rectification of erroneous or outdated records.</li>
                <li>Request erasure of your information where no statutory retention obligations apply.</li>
                <li>Withdraw consent for optional communications and promotional newsletters at any time.</li>
              </ul>
            </article>

            <hr className="border-slate-100" />

            {/* 9. Retention */}
            <article id="retention" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Calendar className="size-4" /> Section 9
              </div>
              <h2 className="text-2xl font-bold text-navy">9. Data Retention & Deletion</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We retain personal data only for as long as is necessary to fulfill the purposes for which it was gathered,
                resolve customer disputes, enforce agreements, or satisfy statutory audit requirements under Nigerian law.
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 10. Contact Us */}
            <article id="contact-us" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Mail className="size-4" /> Section 10
              </div>
              <h2 className="text-2xl font-bold text-navy">10. Contacting Our Data Protection Team</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To exercise any of your data rights or to submit an inquiry regarding our compliance practices, please reach out to our designated Data Protection Officer:
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-2 mt-4 text-xs sm:text-sm">
                <div className="font-bold text-navy">Russell Technologies Data Protection Office</div>
                <div className="text-slate-600">Address: {contact.address}</div>
                <div className="text-slate-600">Official Email: <a href={`mailto:${contact.email}`} className="text-blue-600 font-semibold hover:underline">{contact.email}</a></div>
                <div className="text-slate-600">Helpline: {contact.phone}</div>
                <div className="text-slate-600">Operating Hours: {contact.hours}</div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
