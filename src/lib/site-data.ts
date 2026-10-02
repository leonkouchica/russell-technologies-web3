import svcWeb from "@/assets/svc-web.jpg";
import svcMobile from "@/assets/svc-mobile.jpg";
import svcAutomation from "@/assets/svc-automation.jpg";
import svcAi from "@/assets/svc-ai.jpg";
import classroom from "@/assets/classroom.jpg";
import prodLaw from "@/assets/prod-law.jpg";
import prodBlueflame from "@/assets/prod-blueflame.jpg";
import prodFarm from "@/assets/prod-farmspots.jpg";
import student from "@/assets/student.jpg";
import farmer from "@/assets/farmer.jpg";
import gavel from "@/assets/gavel.jpg";
import artist from "@/assets/artist.jpg";
import data from "@/assets/data.jpg";
import meeting from "@/assets/meeting.jpg";

export type Service = {
  slug: "web-development" | "mobile-applications" | "automation" | "ai-solutions";
  title: string;
  short: string;
  intro: string;
  image: string;
  features: string[];
  process: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, secure and scalable websites and web applications built to grow your business.",
    intro: "We design and build modern websites, portals and web platforms that are fast, secure and easy to manage.",
    image: svcWeb,
    features: ["Custom web applications", "Corporate websites", "E-commerce platforms", "Customer & staff portals", "Content management systems", "API development & integrations"],
    process: ["Discovery & planning", "UX & interface design", "Development & testing", "Launch & ongoing support"],
    tech: ["React", "TypeScript", "Node.js", "Laravel", "PostgreSQL", "AWS"],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    short: "Native and cross-platform mobile apps that deliver seamless user experiences.",
    intro: "From idea to app store, we build mobile experiences your customers enjoy using every day.",
    image: svcMobile,
    features: ["iOS & Android apps", "Cross-platform (Flutter, React Native)", "Mobile payments & wallets", "Offline-first apps", "Push notifications", "App store publishing"],
    process: ["Product strategy", "Prototyping", "Agile development", "Release & growth"],
    tech: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Stripe"],
  },
  {
    slug: "automation",
    title: "Automation",
    short: "Streamline workflows, eliminate manual tasks and boost operational efficiency.",
    intro: "We connect your tools and automate repetitive work so your team can focus on what matters.",
    image: svcAutomation,
    features: ["Workflow automation", "Document processing", "Reporting & dashboards", "ERP & CRM integrations", "Approval pipelines", "Scheduled jobs & alerts"],
    process: ["Process audit", "Automation design", "Build & integrate", "Monitor & optimise"],
    tech: ["Python", "Zapier", "n8n", "Power Automate", "REST APIs", "Webhooks"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    short: "Intelligent solutions powered by AI and machine learning to drive smarter decisions.",
    intro: "Practical AI that solves real business problems — from chat assistants to predictive analytics.",
    image: svcAi,
    features: ["AI chat assistants", "Predictive analytics", "Document intelligence", "Recommendation engines", "Computer vision", "Custom model integration"],
    process: ["Use-case discovery", "Data preparation", "Model build & evaluation", "Deploy & improve"],
    tech: ["OpenAI", "Gemini", "Python", "TensorFlow", "LangChain", "Vector DBs"],
  },
];

export type Product = {
  slug: "edupro" | "russell-law" | "blueflame" | "farmspots";
  name: string;
  tag: string;
  short: string;
  intro: string;
  image: string;
  color: string;
  features: string[];
  audience: string[];
};

export const products: Product[] = [
  {
    slug: "edupro", name: "EduPro", tag: "School Management", color: "bg-primary",
    short: "All-in-one school management system for administration, academics and communication.",
    intro: "EduPro brings admissions, fees, results, attendance and parent communication into one simple platform.",
    image: classroom,
    features: ["Student information & admissions", "Fees & billing", "Results & report cards", "Attendance tracking", "Parent & teacher portal", "SMS & email notifications"],
    audience: ["Primary schools", "Secondary schools", "Colleges", "Training institutes"],
  },
  {
    slug: "russell-law", name: "Russell Law", tag: "Legal Practice", color: "bg-navy",
    short: "Smart legal practice management for law firms, case tracking and client management.",
    intro: "Russell Law helps firms manage cases, deadlines, documents, billing and clients in one secure place.",
    image: prodLaw,
    features: ["Case & matter management", "Court calendar & deadlines", "Document management", "Time tracking & billing", "Client portal", "Reports & insights"],
    audience: ["Law firms", "Legal departments", "Sole practitioners", "Chambers"],
  },
  {
    slug: "blueflame", name: "Blueflame", tag: "Music & Media", color: "bg-primary",
    short: "Digital music distribution and media platform empowering artists and creators.",
    intro: "Blueflame gives artists and labels the tools to distribute, promote and earn from their music.",
    image: prodBlueflame,
    features: ["Distribution to major stores", "Royalty tracking", "Artist profiles", "Release scheduling", "Streaming analytics", "Fan engagement"],
    audience: ["Independent artists", "Record labels", "Producers", "Media houses"],
  },
  {
    slug: "farmspots", name: "Farmspots", tag: "Agri-Commerce", color: "bg-orange",
    short: "Agricultural marketplace connecting farmers, buyers and suppliers digitally.",
    intro: "Farmspots connects farmers directly to buyers and input suppliers, with secure payments and logistics.",
    image: prodFarm,
    features: ["Produce marketplace", "Farmer profiles", "Input supplier directory", "Secure payments", "Order & delivery tracking", "Market price insights"],
    audience: ["Farmers", "Buyers & retailers", "Agro suppliers", "Cooperatives"],
  },
];

export type Post = {
  slug: string; title: string; excerpt: string; category: string; date: string; read: string; image: string; author: string;
};

export const posts: Post[] = [
  { slug: "digital-transformation-in-african-schools", title: "How Digital Transformation Is Reshaping Schools in Africa", excerpt: "From admissions to report cards, see how schools are saving hours every week with EduPro.", category: "Education", date: "May 12, 2025", read: "5 min read", image: student, author: "Russell Team" },
  { slug: "technology-for-smallholder-farmers", title: "Technology for Smallholder Farmers: Opening New Markets", excerpt: "Digital marketplaces are helping farmers reach buyers directly and earn more.", category: "Agriculture", date: "May 5, 2025", read: "4 min read", image: farmer, author: "Russell Team" },
  { slug: "modern-law-firm-operations", title: "Running a Modern Law Firm with Practice Management Software", excerpt: "Why case tracking, billing and client portals belong in one secure platform.", category: "Legal Tech", date: "Apr 28, 2025", read: "6 min read", image: gavel, author: "Russell Team" },
  { slug: "independent-artists-digital-distribution", title: "Independent Artists and the Rise of Digital Distribution", excerpt: "How creators are reaching global audiences and keeping more of their royalties.", category: "Media", date: "Apr 20, 2025", read: "4 min read", image: artist, author: "Russell Team" },
  { slug: "data-driven-decisions-with-ai", title: "Making Data-Driven Decisions with Practical AI", excerpt: "Simple ways businesses can use AI and analytics to make smarter decisions today.", category: "AI", date: "Apr 12, 2025", read: "7 min read", image: data, author: "Russell Team" },
  { slug: "automation-for-growing-businesses", title: "Five Workflows Every Growing Business Should Automate", excerpt: "Cut manual work and errors by automating approvals, reports and notifications.", category: "Automation", date: "Apr 3, 2025", read: "5 min read", image: meeting, author: "Russell Team" },
];

export const metrics = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

export const clients = ["Ministry of Education", "Zambia Bar Association", "AgriLink", "Copperbelt Schools", "MediaWave", "FastTrack Logistics", "HealthFirst", "Lusaka City Council"];

export const testimonials = [
  { quote: "EduPro transformed how we run our school. Fees, results and parent communication are now effortless.", name: "Grace Mwansa", role: "Head Teacher, Copperbelt Schools" },
  { quote: "Russell Technologies delivered our case management platform on time and the support has been outstanding.", name: "John Banda", role: "Managing Partner, Banda & Co." },
  { quote: "Farmspots helped our cooperative sell directly to buyers. Our members are earning more than ever.", name: "Peter Phiri", role: "Chairperson, AgriLink Cooperative" },
];

export const contact = {
  email: "info@russelltechnologies.com",
  phone: "+260 97 000 0000",
  address: "Lusaka, Zambia",
  hours: "Mon – Fri, 8:00 – 17:00",
};
