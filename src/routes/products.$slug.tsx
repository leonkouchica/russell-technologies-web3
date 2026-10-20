import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, CalendarDays, Check, CheckCircle2,
  CircleDollarSign, Clock3, CloudUpload, FileCheck2, FileText, GraduationCap, Headphones,
  Heart, Leaf, LibraryBig, LockKeyhole, MessageCircle, PackageCheck, PlayCircle, Scale,
  ShieldCheck, ShoppingCart, Sprout, Star, TrendingUp, Truck, UserCheck, UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { products, type Product } from "@/lib/site-data";
import { LineEyebrow, PillEyebrow } from "@/components/site/kit";
import { meta } from "@/components/site/blocks";
import eduHero from "@/assets/product-edupro-hero.webp";
import lawHero from "@/assets/product-law-hero.webp";
import blueHero from "@/assets/product-blueflame-hero.webp";
import farmHero from "@/assets/product-farmspots-hero.webp";
import student from "@/assets/student.webp";
import artist from "@/assets/artist.webp";
import farmer from "@/assets/farmer.webp";

type ProductSlug = Product["slug"];
type Theme = { accent: string; soft: string; button: string; line: "primary" | "orange" };

const heroes: Record<ProductSlug, string> = { edupro: eduHero, "russell-law": lawHero, blueflame: blueHero, farmspots: farmHero };
const caseImages: Record<ProductSlug, string> = { edupro: student, "russell-law": lawHero, blueflame: artist, farmspots: farmer };

const themes: Record<ProductSlug, Theme> = {
  edupro: { accent: "text-primary", soft: "bg-blue-soft text-primary", button: "bg-primary text-primary-foreground hover:bg-primary/90", line: "primary" },
  "russell-law": { accent: "text-primary", soft: "bg-blue-soft text-primary", button: "bg-primary text-primary-foreground hover:bg-primary/90", line: "primary" },
  blueflame: { accent: "text-primary", soft: "bg-chart-4/15 text-chart-4", button: "bg-primary text-primary-foreground hover:bg-primary/90", line: "primary" },
  farmspots: { accent: "text-chart-2", soft: "bg-chart-2/15 text-chart-2", button: "bg-chart-2 text-primary-foreground hover:bg-chart-2/90", line: "orange" },
};

const productIcons: Record<ProductSlug, LucideIcon[]> = {
  edupro: [GraduationCap, ShieldCheck, UsersRound, TrendingUp],
  "russell-law": [Scale, FileText, UsersRound, BarChart3],
  blueflame: [Headphones, UsersRound, CalendarDays, TrendingUp],
  farmspots: [ShoppingCart, ShieldCheck, Truck, TrendingUp],
};

const featureIcons: Record<ProductSlug, LucideIcon[]> = {
  edupro: [UsersRound, UserCheck, CircleDollarSign, FileCheck2, BookOpen, MessageCircle, BarChart3, GraduationCap],
  "russell-law": [BriefcaseBusiness, FileText, Clock3, UsersRound],
  blueflame: [Headphones, UsersRound, TrendingUp, CalendarDays, Heart, CircleDollarSign, MessageCircle, BriefcaseBusiness],
  farmspots: [ShoppingCart, UsersRound, Truck, LockKeyhole, PackageCheck, TrendingUp, MessageCircle, Leaf],
};

const processIcons: Record<ProductSlug, LucideIcon[]> = {
  edupro: [GraduationCap, UserCheck, BookOpen, MessageCircle, BarChart3],
  "russell-law": [BriefcaseBusiness, FileText, CalendarDays, CircleDollarSign, UsersRound, BarChart3],
  blueflame: [UserCheck, CloudUpload, TrendingUp, UsersRound, CircleDollarSign],
  farmspots: [UsersRound, PackageCheck, ShoppingCart, Truck, CheckCircle2],
};

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((item) => item.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => loaderData
    ? meta(`${loaderData.product.displayName} — ${loaderData.product.tag} | Russell Technologies`, loaderData.product.intro)
    : { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] },
  component: ProductDetail,
});

function Action({ children, outline = false, theme, section, slug }: { children: ReactNode; outline?: boolean; theme: Theme; section?: string; slug?: ProductSlug }) {
  const content = <>{children}<ArrowRight className="size-4" /></>;
  return <Button asChild variant={outline ? "outline" : "default"} className={`h-auto min-h-11 border px-6 py-3 text-sm font-bold ${outline ? "border-primary bg-background text-primary hover:bg-blue-soft" : `border-transparent ${theme.button}`}`}>
    {section && slug ? <Link to="/products/$slug" params={{ slug }} hash={section}>{content}</Link> : <Link to="/contact" hash="message">{content}</Link>}
  </Button>;
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const theme = themes[product.slug];
  const heroIcons = productIcons[product.slug];
  const cardIcons = featureIcons[product.slug];
  const steps = processIcons[product.slug];
  const isLaw = product.slug === "russell-law";
  const nameParts = { edupro: ["EDU", "PRO"], blueflame: ["BLUE", "FLAME"], farmspots: ["FARM", "SPOTS"], "russell-law": ["RUSSELL ", "LAW"] }[product.slug];

  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="container-x grid min-h-[500px] items-center gap-6 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8 lg:py-0">
          <div className="relative z-10 min-w-0 lg:py-5">
            <PillEyebrow>Our product</PillEyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-none md:text-[3.65rem]">{nameParts[0]}<span className={theme.accent}>{nameParts[1]}</span></h1>
            <h2 className="mt-2 text-xl font-extrabold text-navy">{product.heroTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">{product.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3"><Action theme={theme}>Request a Demo</Action><Action theme={theme} outline section="features" slug={product.slug}>Explore Features</Action></div>
          </div>
          <div className="relative aspect-[1408/928] overflow-hidden rounded-lg lg:aspect-auto lg:h-[500px] lg:rounded-none">
            <img src={heroes[product.slug]} alt={`${product.displayName} platform`} width={1408} height={928} className="h-full w-full object-contain lg:object-cover" />
            <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-surface to-transparent lg:block" />
            <div className="absolute bottom-3 left-3 rounded-lg bg-card px-3 py-2 shadow-card lg:bottom-auto lg:left-auto lg:right-5 lg:top-8 lg:px-5 lg:py-3"><p className={`text-lg font-extrabold ${theme.accent}`}>{product.impact.metrics[0]?.value}</p><p className="text-[11px] text-muted-foreground">{product.impact.metrics[0]?.label}</p></div>
          </div>
          <div className="grid gap-5 pb-2 min-[360px]:grid-cols-2 lg:col-span-2 lg:-mt-24 lg:grid-cols-4 lg:pb-9 lg:pr-[51%]">
            {product.heroPoints.map((point, index) => { const Icon = heroIcons[index] ?? CheckCircle2; return <div key={point.title} className="flex gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-full ${index === 3 ? "bg-orange-soft text-orange" : theme.soft}`}><Icon className="size-5" /></span><div><h3 className="text-xs font-extrabold">{point.title}</h3><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{point.text}</p></div></div>; })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-10 text-navy-foreground">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div><LineEyebrow tone="orange">{product.impact.eyebrow}</LineEyebrow><h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-foreground md:text-4xl">{product.impact.title}</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-navy-foreground/75">{product.impact.text}</p><Link to="/products/$slug" params={{ slug: product.slug }} hash="how-it-works" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground">See How It Works <ArrowRight className="size-4" /></Link></div>
          <div className="grid gap-3 min-[360px]:grid-cols-2">{product.impact.metrics.map((metric, index) => { const Icon = heroIcons[index] ?? Star; return <div key={metric.label} className="flex min-h-24 flex-col items-start gap-3 rounded-lg border border-primary/15 bg-navy-soft p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"><span className={`grid size-12 shrink-0 place-items-center rounded-full ${index === 3 ? "bg-orange/15 text-orange" : "bg-primary/15 text-primary"}`}><Icon className="size-6" /></span><div><p className="text-xl font-extrabold text-navy-foreground">{metric.value}</p><p className="text-xs text-navy-foreground/65">{metric.label}</p></div></div>; })}</div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 py-10 lg:py-14">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_0.9fr_auto]"><div><LineEyebrow>Key features</LineEyebrow><h2 className="mt-2 max-w-lg text-3xl font-extrabold leading-tight">{isLaw ? "Everything You Need to Run Your Legal Practice." : `Everything You Need for ${product.slug === "edupro" ? "Your School" : product.slug === "blueflame" ? "Music" : "Agricultural Trade"}, in One Place.`}</h2></div><p className="text-xs leading-relaxed text-muted-foreground">A complete set of secure, simple, and scalable tools designed around the people and organizations we serve.</p><Button asChild variant="link" className="h-auto justify-start p-0 text-xs font-bold"><Link to="/products/$slug" params={{ slug: product.slug }} hash="feature-list">View all features <ArrowRight /></Link></Button></div>
          <div id="feature-list" className={`mt-8 scroll-mt-24 grid gap-4 sm:grid-cols-2 ${isLaw ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}>{product.featureCards.map((feature, index) => { const Icon = cardIcons[index] ?? CheckCircle2; const tones = [theme.soft, "bg-chart-2/15 text-chart-2", "bg-orange-soft text-orange", "bg-chart-4/15 text-chart-4"]; return <article key={feature.title} className="min-h-40 rounded-lg border border-border bg-card p-5 shadow-card"><span className={`grid size-10 place-items-center rounded-full ${tones[index % tones.length]}`}><Icon className="size-5" /></span><h3 className="mt-4 text-sm font-extrabold">{feature.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feature.text}</p></article>; })}</div>
        </div>
      </section>

      {product.slug !== "edupro" && <section id="how-it-works" className="scroll-mt-24 border-y border-border bg-surface py-11">
        <div className="container-x"><div className="flex flex-wrap items-end justify-between gap-5"><div><LineEyebrow>How it works</LineEyebrow><h2 className="mt-2 text-2xl font-extrabold md:text-3xl">{product.processTitle}</h2></div><Action theme={theme} outline>Request a Demo</Action></div>
          <ol className={`mt-9 grid gap-6 ${product.process.length === 6 ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>{product.process.map((step, index) => { const Icon = steps[index] ?? Check; return <li key={step.title} className="relative">{index < product.process.length - 1 && <span className="absolute left-12 right-[-1.5rem] top-6 hidden h-px bg-primary/30 lg:block" />}<span className={`relative grid size-12 place-items-center rounded-full ${index % 3 === 1 ? "bg-orange-soft text-orange" : theme.soft}`}><Icon className="size-5" /></span><p className="mt-3 text-[10px] font-extrabold text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-1 text-xs font-extrabold">{step.title}</h3><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{step.text}</p></li>; })}</ol>
        </div>
      </section>}

      {!isLaw && <section id={product.slug === "edupro" ? "how-it-works" : "experience"} className="scroll-mt-24 overflow-hidden bg-blue-soft/45 py-11"><div className="container-x grid items-center gap-9 lg:grid-cols-[0.76fr_1.24fr]"><div><LineEyebrow>Simple. Powerful. Intuitive.</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">{product.experienceTitle}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.experienceText}</p><ul className="mt-5 space-y-2">{product.experiencePoints.map((point) => <li key={point} className="flex items-center gap-2 text-xs text-foreground/80"><CheckCircle2 className={`size-4 ${theme.accent}`} />{point}</li>)}</ul><div className="mt-6 flex flex-wrap gap-3"><Action theme={theme}>Request a Demo</Action><Button variant="outline" disabled title="Demo video not provided" className="h-auto min-h-11 border-primary px-6 py-3 text-sm font-bold text-primary"><PlayCircle className="size-4" />Watch Video</Button></div></div><div className="relative"><img src={heroes[product.slug]} alt={`${product.displayName} application dashboard`} width={1408} height={928} loading="lazy" className="aspect-[16/9] w-full rounded-lg object-cover shadow-card" /><div className="absolute bottom-3 right-3 rounded-lg bg-card px-3 py-2 shadow-card lg:bottom-auto lg:-top-5 lg:right-6 lg:px-5 lg:py-3"><p className="text-xs font-extrabold text-navy">Real-time Insights</p><p className="text-[10px] text-muted-foreground">for Better Decisions</p></div></div></div></section>}

      <section className="relative overflow-hidden bg-navy py-10 text-navy-foreground"><div className="container-x grid items-center gap-7 lg:grid-cols-[0.86fr_0.72fr_0.62fr]"><div><LineEyebrow tone="orange">{product.caseStudy.eyebrow}</LineEyebrow><h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-foreground">{product.caseStudy.title}</h2><p className="mt-3 text-sm leading-relaxed text-navy-foreground/75">{product.caseStudy.text}</p><Link to="/clients" className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground">Read Success Stories <ArrowRight className="size-4" /></Link></div><img src={caseImages[product.slug]} alt="Customer success story" width={992} height={672} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" /><div className="rounded-lg bg-card p-5 text-foreground shadow-card"><p className="text-3xl leading-none text-chart-2">“</p><blockquote className="text-xs leading-relaxed text-muted-foreground">{product.caseStudy.quote}</blockquote><div className="mt-3 flex gap-0.5 text-orange">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3 fill-current" />)}</div><p className="mt-3 text-xs font-extrabold text-navy">{product.caseStudy.person}</p><p className="text-[10px] text-muted-foreground">{product.caseStudy.role}</p>{product.caseStudy.metrics.length > 0 && <div className="mt-4 space-y-2 border-t border-border pt-4">{product.caseStudy.metrics.map((metric) => <div key={metric.label} className="flex items-center justify-between gap-3"><span className="text-lg font-extrabold text-primary">{metric.value}</span><span className="text-right text-[10px] text-muted-foreground">{metric.label}</span></div>)}</div>}</div></div></section>

      <section className="py-8"><div className="container-x flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div><LineEyebrow>Get started</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">{product.ctaTitle}</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">{product.ctaText}</p></div><div className="flex flex-wrap gap-3"><Action theme={theme}>Request a Demo</Action><Action theme={theme} outline>Talk to Our Team</Action></div></div></section>
    </>
  );
}