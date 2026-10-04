import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  FileSearch,
  Gauge,
  Globe2,
  Layers3,
  Lightbulb,
  LockKeyhole,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TimerReset,
  UserRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  siDocker,
  siFigma,
  siFirebase,
  siFlutter,
  siGithub,
  siKotlin,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSap,
  siStripe,
  siSwift,
  siTensorflow,
  siTypescript,
  siZoho,
} from "simple-icons";
import type { Service } from "@/lib/site-data";
import { services } from "@/lib/site-data";
import { LineEyebrow, PillEyebrow } from "@/components/site/kit";
import { meta } from "@/components/site/blocks";
import webHero from "@/assets/service-web-hero.jpg";
import mobileHero from "@/assets/service-mobile-hero.jpg";
import automationHero from "@/assets/service-automation-hero.jpg";
import aiHero from "@/assets/service-ai-hero.jpg";
import building from "@/assets/building.jpg";
import logistics from "@/assets/logistics.jpg";
import caseWoman from "@/assets/case-woman.jpg";

type Tone = "blue" | "green" | "orange" | "purple";
type Feature = { title: string; text: string; icon: LucideIcon; tone: Tone; bullets?: string[] };
type ProcessStep = { title: string; text: string; icon: LucideIcon; tone: Tone };
type Tech = { name: string; label: string; icon?: { path: string; title: string }; glyph?: LucideIcon };
type Detail = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  hero: string;
  heroPosition?: string;
  heroPoints: Feature[];
  impactTitle: string;
  impactText: string;
  metrics: { value: string; label: string; icon: LucideIcon }[];
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilities: Feature[];
  processEyebrow: string;
  processTitle: string;
  processText?: string;
  process: ProcessStep[];
  technologyTitle: string;
  technologies: Tech[];
  caseTitle: string;
  caseText: string;
  caseImage: string;
  caseMetrics: { value: string; label: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
};

const commonProcess: ProcessStep[] = [
  { title: "Discover", text: "Understand your goals, workflows, and opportunities.", icon: Search, tone: "blue" },
  { title: "Design", text: "Define the solution, experience, and architecture.", icon: Lightbulb, tone: "purple" },
  { title: "Build", text: "Develop and integrate with modern best practices.", icon: Code2, tone: "orange" },
  { title: "Test", text: "Validate quality, security, and performance.", icon: CheckCircle2, tone: "green" },
  { title: "Deploy", text: "Launch, train users, and ensure adoption.", icon: Rocket, tone: "purple" },
  { title: "Optimize", text: "Monitor, improve, and scale for greater value.", icon: BarChart3, tone: "blue" },
];

const details: Record<Service["slug"], Detail> = {
  "web-development": {
    eyebrow: "Our service",
    title: "Web Development",
    accent: "Solutions",
    description: "We build high-performance websites and web applications that are secure, scalable, and tailored to your business goals. From concept to deployment, we deliver digital experiences that drive growth.",
    hero: webHero,
    heroPosition: "center",
    heroPoints: [
      { title: "High Performance", text: "Optimized for speed and reliability.", icon: Gauge, tone: "purple" },
      { title: "Secure & Scalable", text: "Built with the latest security standards.", icon: ShieldCheck, tone: "blue" },
      { title: "Modern Technologies", text: "Using the best frameworks and tools.", icon: Code2, tone: "green" },
      { title: "User Focused", text: "Designed for exceptional experiences.", icon: UserRound, tone: "orange" },
    ],
    impactTitle: "We build digital experiences that deliver real results.",
    impactText: "Our web solutions help businesses attract more customers, streamline operations, and achieve measurable growth.",
    metrics: [
      { value: "250+", label: "Projects Delivered", icon: BarChart3 },
      { value: "98%", label: "Client Satisfaction", icon: CheckCircle2 },
      { value: "60%", label: "Average Performance Improvement", icon: Rocket },
      { value: "24/7", label: "Support & Maintenance", icon: TimerReset },
    ],
    capabilitiesEyebrow: "Modern web solutions",
    capabilitiesTitle: "Web development for real business needs.",
    capabilities: [
      { title: "Custom Web Applications", text: "Purpose-built systems for unique business processes.", icon: Code2, tone: "blue" },
      { title: "Corporate Websites", text: "Fast, polished sites designed to build trust.", icon: Globe2, tone: "green" },
      { title: "E-commerce Platforms", text: "Secure storefronts that make buying effortless.", icon: MonitorSmartphone, tone: "orange" },
      { title: "Portals & Dashboards", text: "Clear interfaces for customers, teams, and data.", icon: BarChart3, tone: "purple" },
    ],
    processEyebrow: "Our process",
    processTitle: "From concept to deployment.",
    processText: "We follow a structured, transparent process to ensure every project is delivered on time, to the highest standards, and aligned with your business goals.",
    process: commonProcess.slice(0, 5),
    technologyTitle: "Built with industry-leading technologies.",
    technologies: [
      { name: "React", label: "Frontend", icon: siReact }, { name: "Next.js", label: "Full Stack", icon: siNextdotjs },
      { name: "TypeScript", label: "Language", icon: siTypescript }, { name: "Node.js", label: "Backend", icon: siNodedotjs },
      { name: "PostgreSQL", label: "Database", icon: siPostgresql }, { name: "MongoDB", label: "Database", icon: siMongodb },
      { name: "AWS", label: "Cloud", glyph: Cloud }, { name: "Docker", label: "DevOps", icon: siDocker },
      { name: "Figma", label: "Design", icon: siFigma }, { name: "GitHub", label: "Version Control", icon: siGithub },
    ],
    caseTitle: "From manual processes to a modern web platform.",
    caseText: "We helped a leading organization transform outdated manual workflows into a modern, scalable web application.",
    caseImage: building,
    caseMetrics: [{ value: "85%", label: "Faster processing" }, { value: "₦2.4B", label: "Revenue increase" }, { value: "40%", label: "Reduction in operational costs" }],
    ctaEyebrow: "Ready to build?",
    ctaTitle: "Let’s Build Your Next Web Solution",
    ctaText: "Whether you need a new website, a web application, or a complete digital platform — let’s create something impactful together.",
  },
  "mobile-applications": {
    eyebrow: "Our service", title: "Mobile Application", accent: "Solutions",
    description: "We design and build native and cross-platform mobile applications that help businesses reach customers, support teams, and deliver seamless digital experiences across iOS and Android.",
    hero: mobileHero,
    heroPoints: [
      { title: "iOS & Android", text: "Apps built for both major platforms.", icon: Smartphone, tone: "purple" },
      { title: "Cross-Platform", text: "Efficient builds using modern frameworks.", icon: Layers3, tone: "blue" },
      { title: "Secure Experiences", text: "Built with secure authentication and data protection.", icon: ShieldCheck, tone: "green" },
      { title: "User Friendly", text: "Interfaces designed for engagement.", icon: UserRound, tone: "orange" },
    ],
    impactTitle: "Mobile apps that create real business value.",
    impactText: "We help organizations launch mobile products that improve customer access, internal workflows, and digital engagement.",
    metrics: [
      { value: "2 Platforms", label: "iOS & Android", icon: Smartphone }, { value: "Fast", label: "Optimized Performance", icon: Zap },
      { value: "Secure", label: "Protected User Data", icon: LockKeyhole }, { value: "Scalable", label: "Ready for Growth", icon: BarChart3 },
    ],
    capabilitiesEyebrow: "Types of mobile apps", capabilitiesTitle: "Solutions for different business needs.",
    capabilities: [
      { title: "Customer Apps", text: "Feature-rich experiences for customers.", icon: UsersIcon, tone: "blue", bullets: ["E-Commerce", "Self-service"] },
      { title: "Internal Business Apps", text: "Tools that improve team productivity.", icon: Layers3, tone: "blue", bullets: ["Team Operations", "Workflows"] },
      { title: "Marketplace Apps", text: "Connect buyers and sellers securely.", icon: MonitorSmartphone, tone: "orange", bullets: ["Marketplace", "Payments"] },
      { title: "On-Demand Apps", text: "Location-based apps for field operations.", icon: Target, tone: "blue", bullets: ["Delivery", "Logistics"] },
    ],
    processEyebrow: "Our process", processTitle: "From idea to app store.", processText: "We follow a proven process to deliver high-quality mobile applications that are user-focused, scalable, and built for long-term success.", process: commonProcess.slice(0, 5).map((p, i) => i === 4 ? { ...p, title: "Launch" } : p),
    technologyTitle: "Built with modern mobile technologies.",
    technologies: [
      { name: "Flutter", label: "Cross-Platform", icon: siFlutter }, { name: "React Native", label: "Cross-Platform", icon: siReact },
      { name: "Swift", label: "iOS Development", icon: siSwift }, { name: "Kotlin", label: "Android Development", icon: siKotlin },
      { name: "Firebase", label: "Backend & Auth", icon: siFirebase }, { name: "Node.js", label: "APIs & Services", icon: siNodedotjs },
      { name: "AWS", label: "Cloud Infrastructure", glyph: Cloud }, { name: "Figma", label: "UI/UX Design", icon: siFigma },
    ],
    caseTitle: "A mobile app that transformed operations.", caseText: "We helped a logistics company launch a mobile application that improved delivery tracking, reduced manual work, and increased customer satisfaction.", caseImage: logistics,
    caseMetrics: [{ value: "60%", label: "Faster delivery processing" }, { value: "40%", label: "Reduction in manual work" }, { value: "96%", label: "Customer satisfaction" }],
    ctaEyebrow: "Ready to build?", ctaTitle: "Let’s Build Your Mobile Application", ctaText: "Whether you need a customer app, an internal tool, or a complete mobile platform — we’ll turn your idea into a high-performing solution.",
  },
  automation: {
    eyebrow: "Our service", title: "Automation", accent: "Systems",
    description: "We design and implement intelligent automation systems that streamline operations, reduce manual work, and improve accuracy — helping your business run faster, smarter, and more efficiently.",
    hero: automationHero,
    heroPoints: [
      { title: "Streamlined Processes", text: "Reduce manual work and save time.", icon: Workflow, tone: "blue" },
      { title: "System Integrations", text: "Connect your tools and data.", icon: Network, tone: "blue" },
      { title: "Process Visibility", text: "Track work from start to finish.", icon: Search, tone: "green" },
      { title: "Operational Control", text: "Improve consistency and accountability.", icon: UserRound, tone: "orange" },
    ],
    impactTitle: "Turn complex operations into efficient systems.", impactText: "Our automation solutions help organizations save time, reduce errors, improve compliance, and focus on higher-value work.",
    metrics: [{ value: "70%", label: "Less Manual Work", icon: TimerReset }, { value: "3x", label: "Faster Approvals", icon: Zap }, { value: "99%", label: "Process Accuracy", icon: ShieldCheck }, { value: "Real-Time", label: "Operational Visibility", icon: BarChart3 }],
    capabilitiesEyebrow: "Key automation solutions", capabilitiesTitle: "Built for real business operations.",
    capabilities: [
      { title: "Workflow Automation", text: "Automate repetitive tasks and approval processes.", icon: Workflow, tone: "blue", bullets: ["Leave requests", "Approvals"] },
      { title: "System Integrations", text: "Connect tools and platforms for seamless data flow.", icon: Network, tone: "orange", bullets: ["CRM & ERP", "Payments"] },
      { title: "Document Automation", text: "Automate processing, extraction, and classification.", icon: FileSearch, tone: "orange", bullets: ["Extract data", "Validate information"] },
      { title: "Monitoring & Reporting", text: "Track performance and generate insights.", icon: BarChart3, tone: "purple", bullets: ["Live metrics", "Alerts"] },
    ],
    processEyebrow: "Our process", processTitle: "A clear path from problem to solution.", process: commonProcess,
    technologyTitle: "Works with the systems you already use.",
    technologies: [{ name: "APIs", label: "Integrations", glyph: Network }, { name: "Microsoft 365", label: "Productivity", glyph: Layers3 }, { name: "Google", label: "Workspace", glyph: Globe2 }, { name: "Salesforce", label: "CRM", glyph: Cloud }, { name: "SAP", label: "ERP", icon: siSap }, { name: "Zoho", label: "Business Apps", icon: siZoho }, { name: "QuickBooks", label: "Accounting", glyph: Database }, { name: "Stripe", label: "Payments", icon: siStripe }, { name: "Custom Systems", label: "Integrations", glyph: Database }],
    caseTitle: "From manual processes to automated operations.", caseText: "We helped a financial services company automate loan processing, reducing manual work, improving compliance, and increasing processing speed.", caseImage: caseWoman,
    caseMetrics: [{ value: "85%", label: "Faster processing" }, { value: "₦2.4B", label: "Revenue increase" }, { value: "40%", label: "Reduction in operational costs" }],
    ctaEyebrow: "Ready to automate?", ctaTitle: "Let’s Build Smarter Operations", ctaText: "Whether you need to automate workflows, integrate systems, or build a custom solution — we’ll help you design and implement the right system.",
  },
  "ai-solutions": {
    eyebrow: "Our service", title: "AI", accent: "Solutions",
    description: "We help organizations integrate artificial intelligence into real business workflows — from intelligent assistants and predictive analytics to document processing and decision-support systems.",
    hero: aiHero,
    heroPoints: [
      { title: "AI Assistants", text: "Support teams and customers with intelligent assistants.", icon: BrainCircuit, tone: "purple" },
      { title: "Predictive Insights", text: "Use data to anticipate trends and risks.", icon: BarChart3, tone: "green" },
      { title: "Document Intelligence", text: "Automate review, extraction, and classification.", icon: FileSearch, tone: "orange" },
      { title: "Workflow Intelligence", text: "Embed AI into everyday operations.", icon: Workflow, tone: "blue" },
    ],
    impactTitle: "Smarter operations. Better decisions.", impactText: "We design AI solutions around measurable business outcomes — helping you work smarter, move faster, and stay ahead.",
    metrics: [{ value: "3x", label: "Faster Processing", icon: BarChart3 }, { value: "More Accurate", label: "Decision-Making", icon: Target }, { value: "60%", label: "Reduction in Manual Work", icon: TimerReset }, { value: "Scalable", label: "Across Departments", icon: BarChart3 }],
    capabilitiesEyebrow: "Key AI capabilities", capabilitiesTitle: "Practical AI for real business value.",
    capabilities: [
      { title: "AI Assistants", text: "Support teams and customers with reliable intelligent assistants.", icon: BrainCircuit, tone: "purple", bullets: ["Customer support", "Knowledge search"] },
      { title: "Predictive Analytics", text: "Turn operational data into forward-looking insight.", icon: BarChart3, tone: "green", bullets: ["Demand forecasting", "Risk prediction"] },
      { title: "Document Intelligence", text: "Automate extraction, tagging, and validation.", icon: FileSearch, tone: "orange", bullets: ["Classification", "Workflow integration"] },
      { title: "Workflow Automation", text: "Embed AI into connected daily operations.", icon: Workflow, tone: "blue", bullets: ["System integrations", "Real-time monitoring"] },
    ],
    processEyebrow: "How we deliver", processTitle: "A structured approach to AI success.", process: commonProcess,
    technologyTitle: "Built with leading AI technologies.",
    technologies: [{ name: "OpenAI", label: "LLMs & AI Models", glyph: Sparkles }, { name: "Python", label: "AI & Data Processing", icon: siPython }, { name: "TensorFlow", label: "Machine Learning", icon: siTensorflow }, { name: "LangChain", label: "AI Applications", icon: siLangchain }, { name: "PostgreSQL", label: "Data Storage", icon: siPostgresql }, { name: "AWS", label: "Cloud Infrastructure", glyph: Cloud }, { name: "Docker", label: "Deployment", icon: siDocker }, { name: "Azure", label: "Cloud Services", glyph: Cloud }],
    caseTitle: "From manual work to intelligent operations.", caseText: "We helped a financial services company implement document intelligence and workflow automation, reducing processing time and improving compliance.", caseImage: caseWoman,
    caseMetrics: [{ value: "85%", label: "Faster processing" }, { value: "₦2.4B", label: "Revenue increase" }, { value: "40%", label: "Reduction in operational costs" }],
    ctaEyebrow: "Ready to explore AI?", ctaTitle: "Let’s Build Smarter Systems", ctaText: "Whether you need an AI assistant, intelligent document processing, predictive analytics, or a complete AI-powered workflow — we’re here to help.",
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => loaderData ? meta(`${loaderData.service.title} — Russell Technologies`, loaderData.service.short) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: ServiceDetail,
});

function UsersIcon(props: { className?: string }) {
  return <UserRound {...props} />;
}

const toneClasses: Record<Tone, string> = {
  blue: "bg-blue-soft text-primary",
  green: "bg-chart-2/15 text-chart-2",
  orange: "bg-orange-soft text-orange",
  purple: "bg-chart-4/15 text-chart-4",
};

function ActionLink({ variant = "solid", children }: { variant?: "solid" | "outline"; children: React.ReactNode }) {
  return (
    <Link to="/contact" className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold transition ${variant === "solid" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-primary bg-background text-primary hover:bg-blue-soft"}`}>
      {children}<ArrowRight className="size-4" />
    </Link>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const detail = details[service.slug];

  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="container-x grid min-h-[510px] items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-0">
          <div className="relative z-10 py-5 lg:py-14">
            <PillEyebrow>{detail.eyebrow}</PillEyebrow>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.03] md:text-[3.8rem]">
              {detail.title} <span className="text-primary">{detail.accent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">{detail.description}</p>
            <div className="mt-7 flex flex-wrap gap-3"><ActionLink>Start Your Project</ActionLink><ActionLink variant="outline">View Our Work</ActionLink></div>
          </div>
          <div className="relative h-[330px] overflow-hidden rounded-xl lg:h-[510px] lg:rounded-none">
            <img src={detail.hero} alt={`${service.title} systems`} width={1408} height={920} className={`h-full w-full object-cover ${detail.heroPosition ?? "center"}`} />
            <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-surface to-transparent lg:block" />
          </div>
          <div className="grid gap-5 pb-10 sm:grid-cols-2 lg:col-span-2 lg:-mt-24 lg:grid-cols-4 lg:pr-[52%]">
            {detail.heroPoints.map((point) => <FeatureIntro key={point.title} feature={point} />)}
          </div>
        </div>
      </section>

      <section className="bg-navy py-10 text-navy-foreground lg:py-12">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <LineEyebrow tone="orange">Our impact</LineEyebrow>
            <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight text-navy-foreground md:text-4xl">{detail.impactTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-foreground/70">{detail.impactText}</p>
            <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore our approach <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {detail.metrics.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex min-h-24 items-center gap-4 rounded-lg border border-primary/15 bg-navy-soft p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Icon className="size-6" /></span>
                <div><p className="text-xl font-extrabold text-navy-foreground">{value}</p><p className="text-xs text-navy-foreground/65">{label}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><LineEyebrow>{detail.capabilitiesEyebrow}</LineEyebrow><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{detail.capabilitiesTitle}</h2></div>
            <ActionLink variant="outline">Discuss Your Project</ActionLink>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {detail.capabilities.map((feature) => <CapabilityCard key={feature.title} feature={feature} image={detail.hero} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-12 lg:py-14">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div><LineEyebrow>{detail.processEyebrow}</LineEyebrow><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{detail.processTitle}</h2></div>
            {detail.processText && <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{detail.processText}</p>}
          </div>
          <ol className={`mt-10 grid gap-6 ${detail.process.length === 5 ? "md:grid-cols-5" : "md:grid-cols-3 lg:grid-cols-6"}`}>
            {detail.process.map((step, index) => <ProcessItem key={step.title} step={step} index={index} last={index === detail.process.length - 1} />)}
          </ol>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4"><div><LineEyebrow>Technology stack</LineEyebrow><h2 className="mt-3 text-3xl font-extrabold">{detail.technologyTitle}</h2></div><span className="hidden text-sm font-semibold text-primary sm:inline-flex">View full tech stack&nbsp; →</span></div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {detail.technologies.map((tech) => <TechCard key={tech.name} tech={tech} />)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-10 text-navy-foreground lg:py-12">
        <div className="container-x grid items-center gap-7 lg:grid-cols-[1fr_0.65fr_0.55fr]">
          <div>
            <LineEyebrow tone="orange">Case study</LineEyebrow>
            <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-navy-foreground md:text-4xl">{detail.caseTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-foreground/70">{detail.caseText}</p>
            <Link to="/clients" className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Read the full case study <ArrowRight className="size-4" /></Link>
          </div>
          <img src={detail.caseImage} alt="Client case study" width={912} height={736} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div className="overflow-hidden rounded-lg border border-primary/25 bg-navy-soft">
            {detail.caseMetrics.map((metric, index) => <div key={metric.label} className={`flex items-center gap-3 p-4 ${index ? "border-t border-primary/20" : ""}`}><span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary"><Target className="size-4" /></span><div><p className="text-xl font-extrabold text-navy-foreground">{metric.value}</p><p className="text-xs text-navy-foreground/65">{metric.label}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-xl bg-primary px-8 py-9 md:px-12">
            <div className="absolute -bottom-24 -right-8 size-52 rounded-full border-[16px] border-orange" aria-hidden />
            <div className="absolute -bottom-20 right-20 size-48 rounded-full border-[12px] border-primary-foreground/15" aria-hidden />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:pr-40">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/85">{detail.ctaEyebrow}</p><h2 className="mt-2 text-3xl font-extrabold text-primary-foreground">{detail.ctaTitle}</h2><p className="mt-2 max-w-2xl text-sm text-primary-foreground/80">{detail.ctaText}</p></div>
              <div className="flex shrink-0 flex-wrap gap-3"><Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-bold text-primary">Start Your Project <ArrowRight className="size-4" /></Link><Link to="/contact" className="inline-flex items-center rounded-md border border-primary-foreground/70 px-6 py-3 text-sm font-bold text-primary-foreground">Contact Us</Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureIntro({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return <div className="flex gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-full ${toneClasses[feature.tone]}`}><Icon className="size-5" /></span><div><h3 className="text-sm font-bold">{feature.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{feature.text}</p></div></div>;
}

function CapabilityCard({ feature, image }: { feature: Feature; image: string }) {
  const Icon = feature.icon;
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="p-5"><div className="flex items-center gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-full ${toneClasses[feature.tone]}`}><Icon className="size-5" /></span><h3 className="text-sm font-extrabold">{feature.title}</h3></div><p className="mt-3 min-h-12 text-xs leading-relaxed text-muted-foreground">{feature.text}</p></div>
      <div className="relative mx-4 h-28 overflow-hidden rounded-md bg-surface"><img src={image} alt="" width={1408} height={920} loading="lazy" className="h-full w-full object-cover opacity-85" /></div>
      <ul className="space-y-2 p-5">{(feature.bullets ?? ["Secure and scalable", "Built around your workflow"]).map((bullet) => <li key={bullet} className="flex items-center gap-2 text-xs text-foreground/75"><Check className="size-4 text-primary" />{bullet}</li>)}</ul>
      <Link to="/contact" className="mx-5 mb-5 inline-flex items-center gap-2 text-xs font-bold text-primary">Learn more <ArrowRight className="size-3.5" /></Link>
    </article>
  );
}

function ProcessItem({ step, index, last }: { step: ProcessStep; index: number; last: boolean }) {
  const Icon = step.icon;
  return (
    <li className="relative">
      {!last && <span className="absolute left-12 right-[-1.5rem] top-6 hidden h-px bg-primary/25 md:block" aria-hidden />}
      <span className={`relative grid size-12 place-items-center rounded-full ${toneClasses[step.tone]}`}><Icon className="size-5" /></span>
      <p className="mt-4 text-xs font-extrabold text-primary">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-1 text-sm font-extrabold">{step.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
    </li>
  );
}

function TechCard({ tech }: { tech: Tech }) {
  const Glyph = tech.glyph;
  return (
    <div className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-border bg-card p-3 text-center shadow-card">
      {tech.icon ? <svg viewBox="0 0 24 24" className="size-7 text-primary" fill="currentColor" aria-label={tech.icon.title}><path d={tech.icon.path} /></svg> : Glyph ? <Glyph className="size-7 text-primary" /> : <Bot className="size-7 text-primary" />}
      <p className="mt-3 text-xs font-extrabold text-navy">{tech.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{tech.label}</p>
    </div>
  );
}