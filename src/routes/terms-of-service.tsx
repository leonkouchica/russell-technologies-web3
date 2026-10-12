import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  FileText,
  Calendar,
  Scale,
  ShieldAlert,
  CreditCard,
  Layers,
  HelpCircle,
  ChevronRight,
  Printer,
  CheckCircle2,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { contact } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Russell Technologies" },
      {
        name: "description",
        content:
          "Review the Terms of Service for Russell Technologies products and digital solutions, including EDUPRO, RUSSELL LAW, BLUEFLAME, and FARMSPOTS.",
      },
    ],
  }),
  component: TermsOfServicePage,
});

const termsSections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services-scope", title: "2. Services & Platform Access" },
  { id: "accounts-security", title: "3. Account Registration & Security" },
  { id: "acceptable-use", title: "4. Acceptable Use Policy" },
  { id: "commercial-terms", title: "5. Billing, Subscriptions & Fees" },
  { id: "intellectual-property", title: "6. Intellectual Property Rights" },
  { id: "product-terms", title: "7. Specialized Product Provisions" },
  { id: "disclaimers-liability", title: "8. Disclaimers & Limitation of Liability" },
  { id: "governing-law", title: "9. Governing Law & Arbitration" },
  { id: "contact-information", title: "10. Questions & Legal Notices" },
];

export function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero Header */}
      <section className="border-b border-border bg-white py-14 lg:py-18">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Terms of Service</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-4">
                <Scale className="size-4" /> Legal Agreement & Policies
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                These Terms of Service govern your access to and use of Russell Technologies' website, products,
                APIs, mobile applications, and enterprise services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 lg:min-w-[280px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="size-3.5 text-primary" /> Last Revised
                </div>
                <div className="text-sm font-bold text-navy">October 12, 2026</div>
                <div className="text-xs text-muted-foreground">Applies to all Russell Technologies platforms</div>
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
                {termsSections.map((s) => (
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

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-navy">
                  <HelpCircle className="size-4 text-primary" /> Need Clarification?
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Contact our legal and enterprise compliance desk.
                </p>
                <Link
                  to="/contact"
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Contact Legal Support
                </Link>
              </div>
            </div>
          </aside>

          {/* Policy Text Articles */}
          <main className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            {/* 1. Acceptance */}
            <article id="acceptance" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Scale className="size-4" /> Section 1
              </div>
              <h2 className="text-2xl font-bold text-navy">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                By visiting our website, signing an enterprise software contract, creating an account, or otherwise using
                solutions provided by <strong>Russell Technologies</strong> ("Russell Technologies," "we," "our," or "us"),
                you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a school,
                law firm, agricultural cooperative, or other entity, you represent and warrant that you hold legal authority
                to bind that organization.
              </p>
              <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
                <AlertTriangle className="size-5 text-blue-600 shrink-0 mt-0.5" />
                <span>If you do not agree to all terms and conditions set forth herein, you may not access or use any Russell Technologies software, portals, or digital infrastructure.</span>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 2. Services Scope */}
            <article id="services-scope" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Layers className="size-4" /> Section 2
              </div>
              <h2 className="text-2xl font-bold text-navy">2. Services & Platform Access</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Russell Technologies licenses and delivers cloud-based software suites and bespoke technical services:
              </p>
              <ul className="mt-2 space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li><strong>Proprietary SaaS Suites</strong>: Including EDUPRO (School Management), RUSSELL LAW (Legal Practice Management), BLUEFLAME (Music Distribution Portal), and FARMSPOTS (Agriculture Marketplace).</li>
                <li><strong>Custom Engineering & Integrations</strong>: Web Development, Native & Cross-Platform Mobile Apps, Automation Workflows, and Custom Artificial Intelligence implementations.</li>
                <li><strong>Availability Commitment</strong>: We strive for 99.9% uptime across production clusters, subject to scheduled maintenance windows announced in advance.</li>
              </ul>
            </article>

            <hr className="border-slate-100" />

            {/* 3. Accounts & Security */}
            <article id="accounts-security" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <FileText className="size-4" /> Section 3
              </div>
              <h2 className="text-2xl font-bold text-navy">3. Account Registration & Security</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Certain modules require user credentials. You agree to:
              </p>
              <div className="space-y-2 mt-3">
                {[
                  "Provide accurate, current, and complete registration information.",
                  "Safeguard your authentication credentials and notify us immediately of any unauthorized breach.",
                  "Refrain from sharing administrative credentials across multiple unverified users.",
                  "Accept full responsibility for all activities occurring under your authorized tenant accounts.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 4. Acceptable Use */}
            <article id="acceptable-use" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldAlert className="size-4" /> Section 4
              </div>
              <h2 className="text-2xl font-bold text-navy">4. Acceptable Use Policy</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                You agree not to misuse Russell Technologies services or assist others in doing so. You will not:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mt-3 text-xs sm:text-sm text-slate-600">
                <div className="rounded-xl border border-red-100 bg-red-50/30 p-3.5">
                  <div className="font-bold text-red-900 mb-1">Prohibited Technical Conduct</div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Reverse engineer or decompile any source code or API contracts.</li>
                    <li>Probe, scan, or breach system vulnerability defenses.</li>
                    <li>Launch denial-of-service (DoS) or automated crawler overload.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-red-100 bg-red-50/30 p-3.5">
                  <div className="font-bold text-red-900 mb-1">Prohibited Content & Actions</div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Transmit malicious payloads, ransomware, or spyware.</li>
                    <li>Publish defamatory, fraudulent, or infringing media.</li>
                    <li>Circumvent licensing seats or tenant tenancy barriers.</li>
                  </ul>
                </div>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 5. Commercial Terms */}
            <article id="commercial-terms" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <CreditCard className="size-4" /> Section 5
              </div>
              <h2 className="text-2xl font-bold text-navy">5. Billing, Subscriptions & Fees</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Fees for SaaS subscriptions and bespoke development contracts are determined by mutually agreed Service Level Agreements (SLAs) or published tier schedules:
              </p>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li><strong>Invoicing & Currency</strong>: Payments are billed in Nigerian Naira (NGN) or United States Dollars (USD) as specified on invoices.</li>
                <li><strong>Taxes</strong>: Applicable VAT, sales taxes, and statutory withholdings are assessed in conformity with federal laws.</li>
                <li><strong>Late Payments</strong>: Past-due invoices may result in service suspension after a 14-day cure grace period.</li>
              </ul>
            </article>

            <hr className="border-slate-100" />

            {/* 6. Intellectual Property */}
            <article id="intellectual-property" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Layers className="size-4" /> Section 6
              </div>
              <h2 className="text-2xl font-bold text-navy">6. Intellectual Property Rights</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong>Russell Technologies Property</strong>: All software, interface designs, trademarks, algorithmic workflows, documentation, and source code are the exclusive intellectual property of Russell Technologies.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <strong>Customer Data Ownership</strong>: You retain complete ownership of all data, files, and content uploaded into our platforms. You grant Russell Technologies a non-exclusive, worldwide license solely to process and host that data to fulfill our service delivery obligations.
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 7. Specialized Product Provisions */}
            <article id="product-terms" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Scale className="size-4" /> Section 7
              </div>
              <h2 className="text-2xl font-bold text-navy">7. Specialized Product Provisions</h2>
              <div className="space-y-3 mt-3 text-xs sm:text-sm text-slate-600">
                <p><strong>EDUPRO</strong>: Educational institutions are solely responsible for ensuring lawful parental consent for minor students under local education department directives.</p>
                <p><strong>RUSSELL LAW</strong>: The platform constitutes productivity software and does not furnish legal advice or create an attorney-client relationship between Russell Technologies and the law firm's clients.</p>
                <p><strong>FARMSPOTS</strong>: Farmers and buyers agree that produce grading, delivery inspection, and quality warranties rest between trading counterparties, assisted by our verified escrow settlement system.</p>
                <p><strong>BLUEFLAME</strong>: Uploading creators warrant that they hold 100% rights or mechanical synchronization licenses for all audio masters and visual works submitted for distribution.</p>
              </div>
            </article>

            <hr className="border-slate-100" />

            {/* 8. Disclaimers */}
            <article id="disclaimers-liability" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <AlertTriangle className="size-4" /> Section 8
              </div>
              <h2 className="text-2xl font-bold text-navy">8. Disclaimers & Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, RUSSELL TECHNOLOGIES SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."
                WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A SPECIFIC PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                IN NO EVENT SHALL RUSSELL TECHNOLOGIES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
                (INCLUDING LOSS OF PROFITS, DATA LOSS, OR WORK STOPPAGE) ARISING OUT OF YOUR USE OF THE SERVICES.
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 9. Governing Law */}
            <article id="governing-law" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Scale className="size-4" /> Section 9
              </div>
              <h2 className="text-2xl font-bold text-navy">9. Governing Law & Arbitration</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                These Terms shall be governed by, construed, and enforced in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>.
                Any dispute, claim, or controversy arising out of or relating to these Terms shall be resolved first through good-faith mediation,
                and failing amicable settlement within 30 days, shall be referred to binding arbitration in Lagos, Nigeria under the Arbitration and Mediation Act 2023.
              </p>
            </article>

            <hr className="border-slate-100" />

            {/* 10. Contact Information */}
            <article id="contact-information" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Mail className="size-4" /> Section 10
              </div>
              <h2 className="text-2xl font-bold text-navy">10. Questions & Legal Notices</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                For formal legal notifications, contractual inquiries, or general questions regarding these Terms, contact our legal department:
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-2 mt-4 text-xs sm:text-sm">
                <div className="font-bold text-navy">Russell Technologies Legal Affairs</div>
                <div className="text-slate-600">Headquarters: {contact.address}</div>
                <div className="text-slate-600">Email: <a href={`mailto:${contact.email}`} className="text-blue-600 font-semibold hover:underline">{contact.email}</a></div>
                <div className="text-slate-600">Telephone: {contact.phone}</div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
