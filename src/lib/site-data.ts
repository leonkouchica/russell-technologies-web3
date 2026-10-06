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
  displayName: string;
  tag: string;
  heroTitle: string;
  short: string;
  intro: string;
  image: string;
  color: string;
  features: string[];
  audience: string[];
  heroPoints: { title: string; text: string }[];
  impact: { eyebrow: string; title: string; text: string; metrics: { value: string; label: string }[] };
  featureCards: { title: string; text: string }[];
  processTitle: string;
  process: { title: string; text: string }[];
  experienceTitle: string;
  experienceText: string;
  experiencePoints: string[];
  caseStudy: { eyebrow: string; title: string; text: string; quote: string; person: string; role: string; metrics: { value: string; label: string }[] };
  ctaTitle: string;
  ctaText: string;
};

export const products: Product[] = [
  {
    slug: "edupro", name: "EduPro", displayName: "EDUPRO", tag: "Education Management System", heroTitle: "Education Management System", color: "bg-primary",
    short: "All-in-one school management system for administration, academics and communication.",
    intro: "A complete school management system for primary and secondary schools — simplifying operations, engaging students, and empowering educators with technology.",
    image: classroom,
    features: ["Student information & admissions", "Fees & billing", "Results & report cards", "Attendance tracking", "Parent & teacher portal", "SMS & email notifications"],
    audience: ["Primary schools", "Secondary schools", "Colleges", "Training institutes"],
    heroPoints: [
      { title: "All-in-One Platform", text: "Manage your entire school in one place." },
      { title: "Secure & Reliable", text: "Your data is safe and backed up." },
      { title: "Easy to Use", text: "Designed for every school community." },
      { title: "Built for Growth", text: "Scales with your school's needs." },
    ],
    impact: { eyebrow: "Trusted by schools", title: "Education Made Simple.", text: "EDUPRO helps schools automate administrative tasks, manage academic records, improve communication, and deliver a better learning experience for everyone.", metrics: [{ value: "500+", label: "Schools Using EDUPRO" }, { value: "50K+", label: "Students Managed" }, { value: "99.9%", label: "System Uptime" }, { value: "4.8/5", label: "Customer Satisfaction" }] },
    featureCards: [
      { title: "Admissions & Enrollment", text: "Streamline student admissions, manage applications, documents, and enrollment with ease." },
      { title: "Student Records", text: "Store and manage student profiles, academic history, attendance, and performance." },
      { title: "Fees & Payments", text: "Automate fee collection, track payments, generate invoices, and manage due amounts." },
      { title: "Examinations & Results", text: "Manage exams, grade students, and publish results online." },
      { title: "Class & Timetable", text: "Create class schedules, assign teachers, and manage sessions." },
      { title: "Communication", text: "Keep parents, teachers, and students connected with announcements, alerts, and messages." },
      { title: "Reports & Analytics", text: "Get real-time insights into academic and financial performance." },
      { title: "Parent & Student Portal", text: "Give families secure access to information, results, payments, and more." },
    ],
    processTitle: "From Enrollment to Graduation — All in One Platform.",
    process: [{ title: "Set Up Your School", text: "Configure classes, sessions, and staff." }, { title: "Enroll Students", text: "Manage admissions and student records." }, { title: "Manage Academics", text: "Run classes, attendance, and results." }, { title: "Connect Everyone", text: "Keep staff and families informed." }, { title: "Track & Improve", text: "Use reports to make better decisions." }],
    experienceTitle: "A Smarter Way to Manage Schools.",
    experienceText: "EDUPRO is designed with a clean, modern interface that makes it easy for administrators, teachers, students, and parents to get things done — anytime, anywhere.",
    experiencePoints: ["Cloud-based and accessible from any device", "Role-based access for staff, students, and parents", "Real-time updates and notifications", "Secure data with regular backups", "Dedicated support and training"],
    caseStudy: { eyebrow: "Real impact", title: "Empowering Schools. Transforming Education.", text: "From small private schools to large institutions, EDUPRO is helping schools across Nigeria and beyond deliver better learning experiences and operate more efficiently.", quote: "EDUPRO has simplified our school operations and improved communication with parents. It's a game changer!", person: "Mrs. Adebisi", role: "School Administrator, Lagos, Nigeria", metrics: [] },
    ctaTitle: "Ready to Transform Your School?", ctaText: "Join hundreds of schools already using EDUPRO to streamline operations, engage students, and achieve greater results.",
  },
  {
    slug: "russell-law", name: "Russell Law", displayName: "RUSSELL LAW", tag: "All-in-One Legal Technology Platform", heroTitle: "All-in-One Legal Technology Platform", color: "bg-navy",
    short: "Smart legal practice management for law firms, case tracking and client management.",
    intro: "Manage cases, clients, documents, billing, and court schedules — in one secure, easy-to-use platform designed for law firms, legal departments, and independent legal professionals.",
    image: prodLaw,
    features: ["Case & matter management", "Court calendar & deadlines", "Document management", "Time tracking & billing", "Client portal", "Reports & insights"],
    audience: ["Law firms", "Legal departments", "Sole practitioners", "Chambers"],
    heroPoints: [{ title: "Case Management", text: "Track cases from intake to closure." }, { title: "Document Management", text: "Secure storage with version control." }, { title: "Client & Contact Management", text: "Keep client information organized." }, { title: "Billing & Invoicing", text: "Track time, generate invoices, and get paid." }],
    impact: { eyebrow: "Why Russell Law", title: "Modern Tools. Smarter Legal Practice.", text: "RUSSELL LAW helps legal professionals streamline their workflows, improve collaboration, and deliver better client outcomes with technology.", metrics: [{ value: "50%", label: "Faster Case Processing" }, { value: "40%", label: "Increase in Productivity" }, { value: "99.9%", label: "Data Security & Uptime" }, { value: "Higher", label: "Client Satisfaction" }] },
    featureCards: [{ title: "Case Management", text: "Track case progress, deadlines, court dates, and tasks in one place." }, { title: "Document Management", text: "Store, organize, and search documents with version control and secure access." }, { title: "Time Tracking & Billing", text: "Track billable hours, generate invoices, and manage payments effortlessly." }, { title: "Client Management", text: "Keep client information, case history, and communications organized." }],
    processTitle: "From Intake to Resolution — All in One Platform.",
    process: [{ title: "Create Case", text: "Add client details and open a new case." }, { title: "Manage Documents", text: "Upload, organize, and secure documents." }, { title: "Track Progress", text: "Set tasks, schedules, and court dates." }, { title: "Bill & Invoice", text: "Track time and generate invoices automatically." }, { title: "Collaborate", text: "Work with your team and keep clients informed." }, { title: "Close & Report", text: "Close cases and generate detailed reports." }],
    experienceTitle: "A Smarter Way to Practice Law.", experienceText: "A secure, intuitive workspace built around the daily needs of modern legal teams.", experiencePoints: ["Centralized case and client records", "Secure cloud document storage", "Automated deadlines and reminders", "Simple time tracking and billing", "Real-time practice insights"],
    caseStudy: { eyebrow: "Case study", title: "A Law Firm That Works Smarter.", text: "See how a mid-sized law firm used RUSSELL LAW to reduce administrative work, improve case tracking, and increase revenue.", quote: "RUSSELL LAW has transformed the way we manage our cases and clients. Our team is more productive, and our clients are happier.", person: "Tunde A.", role: "Managing Partner, Law Firm, Lagos, Nigeria", metrics: [{ value: "60%", label: "Reduction in manual work" }, { value: "35%", label: "Increase in billable hours" }, { value: "99%", label: "Client data security" }] },
    ctaTitle: "Get Started with RUSSELL LAW", ctaText: "Whether you're a solo practitioner, a growing law firm, or a corporate legal team — RUSSELL LAW gives you the tools to practice smarter and achieve more.",
  },
  {
    slug: "blueflame", name: "Blueflame", displayName: "BLUEFLAME", tag: "Music Portal", heroTitle: "Music Portal", color: "bg-primary",
    short: "Digital music distribution and media platform empowering artists and creators.",
    intro: "Discover, stream, and support African and global music — connecting artists, fans, and opportunities on one powerful platform.",
    image: prodBlueflame,
    features: ["Distribution to major stores", "Royalty tracking", "Artist profiles", "Release scheduling", "Streaming analytics", "Fan engagement"],
    audience: ["Independent artists", "Record labels", "Producers", "Media houses"],
    heroPoints: [{ title: "Stream & Discover", text: "Access millions of songs and playlists." }, { title: "Support Artists", text: "Follow, like and support emerging talent." }, { title: "Live Events", text: "Get updates on concerts, shows and performances." }, { title: "Built for Growth", text: "Empowering African artists with global reach." }],
    impact: { eyebrow: "African sounds. Global reach.", title: "Music Made Simple.", text: "BLUEFLAME helps artists reach more fans, monetize their music, and grow their careers while giving listeners a seamless music experience.", metrics: [{ value: "100K+", label: "Artists & Creators" }, { value: "1M+", label: "Active Listeners" }, { value: "99.9%", label: "Platform Uptime" }, { value: "4.8/5", label: "User Satisfaction" }] },
    featureCards: [{ title: "Music Streaming", text: "Access millions of songs, albums and curated playlists anytime, anywhere." }, { title: "Artist Profiles", text: "Create and manage artist profiles, discographies, and media content." }, { title: "Playlists & Charts", text: "Discover trending songs, editor's picks, and genre-based charts." }, { title: "Live Events", text: "Get updates on concerts, shows, and exclusive music events." }, { title: "Fan Engagement", text: "Follow, like, comment and interact with your favourite artists." }, { title: "Monetization Tools", text: "Earn through streams, subscriptions, and promotional opportunities." }, { title: "Social Sharing", text: "Share your music across social media platforms with ease." }, { title: "Industry Opportunities", text: "Connect with labels, managers, and collaborators to grow your career." }],
    processTitle: "From Upload to Global Audience — All in One Platform.",
    process: [{ title: "Create an Account", text: "Sign up as an artist, listener or industry professional." }, { title: "Upload & Manage", text: "Upload your music, albums and content securely." }, { title: "Get Discovered", text: "Reach new fans through playlists, search and recommendations." }, { title: "Engage & Grow", text: "Interact with fans and build your community." }, { title: "Monetize", text: "Earn from streams, subscriptions and events." }],
    experienceTitle: "A Smarter Way to Experience Music.", experienceText: "BLUEFLAME is designed with a clean, modern interface that makes it easy for listeners to discover music and for artists to manage their content — anytime, anywhere.", experiencePoints: ["Stream high-quality audio", "Personalized playlists and recommendations", "Real-time charts and trending music", "Artist dashboards and analytics", "Available on web and mobile app"],
    caseStudy: { eyebrow: "Real impact", title: "Empowering Artists. Connecting the World.", text: "From independent artists to global superstars, BLUEFLAME is helping African music reach new audiences, create opportunities, and build a stronger creative economy.", quote: "BLUEFLAME gave me a platform to share my music with the world. The exposure and support have been incredible!", person: "Zara Williams", role: "Recording Artist, Lagos, Nigeria", metrics: [] },
    ctaTitle: "Ready to Be Part of the Next Wave?", ctaText: "Join thousands of artists and listeners already using BLUEFLAME to discover, create, and experience music without borders.",
  },
  {
    slug: "farmspots", name: "Farmspots", displayName: "FARMSPOTS", tag: "Agriculture Marketplace", heroTitle: "Agriculture Marketplace", color: "bg-orange",
    short: "Agricultural marketplace connecting farmers, buyers and suppliers digitally.",
    intro: "A comprehensive platform that connects farmers, buyers, and suppliers — making it easier to buy and sell agricultural produce, access verified markets, logistics, and grow sustainable food systems across Africa.",
    image: prodFarm,
    features: ["Produce marketplace", "Farmer profiles", "Input supplier directory", "Secure payments", "Order & delivery tracking", "Market price insights"],
    audience: ["Farmers", "Buyers & retailers", "Agro suppliers", "Cooperatives"],
    heroPoints: [{ title: "End-to-End Marketplace", text: "Buy, sell and trade farm produce easily." }, { title: "Verified Farmers & Buyers", text: "Trusted and verified community." }, { title: "Reliable Logistics & Delivery", text: "Track orders from farm to destination." }, { title: "Built for Growth", text: "Empowering farmers and agribusinesses." }],
    impact: { eyebrow: "Trusted by farmers and businesses", title: "Agriculture Made Simple.", text: "FARMSPOTS helps farmers and agribusinesses access markets, manage orders, track logistics, and grow their business with technology.", metrics: [{ value: "10,000+", label: "Verified Farmers" }, { value: "5,000+", label: "Active Buyers" }, { value: "99.9%", label: "Platform Uptime" }, { value: "4.8/5", label: "User Satisfaction" }] },
    featureCards: [{ title: "Marketplace", text: "Buy and sell fresh farm produce, inputs, and equipment from verified users." }, { title: "Farmer Management", text: "Onboard and verify farmers, manage profiles, products, and farm locations." }, { title: "Logistics & Delivery", text: "Access reliable logistics partners and track deliveries in real time." }, { title: "Payments & Escrow", text: "Secure payments with escrow protection for buyers and sellers." }, { title: "Inventory Management", text: "Manage farm produce and supplies with real-time stock updates." }, { title: "Market Insights", text: "Access price trends, demand insights, and market reports." }, { title: "Communication", text: "Chat with buyers, sellers, and logistics partners directly." }, { title: "Agriculture Resources", text: "Get access to articles, guides, and training resources for better farming practices." }],
    processTitle: "From Farm to Market — All in One Platform.",
    process: [{ title: "Join & Get Verified", text: "Create an account and complete verification." }, { title: "List Products", text: "Add your farm produce, inputs, or services." }, { title: "Buy or Sell", text: "Connect with verified buyers or trusted farmers." }, { title: "Logistics & Delivery", text: "Arrange delivery and track orders in real time." }, { title: "Get Paid", text: "Receive secure payment via escrow." }],
    experienceTitle: "A Smarter Way to Trade Agriculture.", experienceText: "FARMSPOTS is designed with a clean, modern interface that makes it easy for farmers, buyers, and suppliers to manage their business — anytime, anywhere.", experiencePoints: ["Access via web and mobile app", "Easy product listing and order management", "Real-time order tracking and notifications", "Secure payments with escrow", "Dedicated support for farmers and buyers"],
    caseStudy: { eyebrow: "Real impact", title: "Empowering Farmers. Strengthening Food Systems.", text: "From smallholder farmers to large agribusinesses, FARMSPOTS is helping to create better market access, fair opportunities, and a more resilient agriculture ecosystem across Africa.", quote: "FARMSPOTS has made it so much easier for me to sell my farm produce and reach more buyers. I can now grow my business with confidence.", person: "Amina Bello", role: "Smallholder Farmer, Kaduna, Nigeria", metrics: [] },
    ctaTitle: "Ready to Grow with FARMSPOTS?", ctaText: "Join thousands of farmers and buyers already using FARMSPOTS to trade, grow, and build a stronger agriculture ecosystem.",
  },
];

export type Post = {
  slug: string; title: string; excerpt: string; category: string; date: string; read: string; image: string; author: string;
};

export const posts: Post[] = [
  { slug: "technology-transforming-education-in-african-schools", title: "How Technology is Transforming Education in African Schools", excerpt: "Discover how digital tools like EDUPRO are helping schools streamline operations, improve learning outcomes, and empower the next generation.", category: "Education", date: "Sep 10, 2026", read: "8 min read", image: student, author: "Adaeze Johnson" },
  { slug: "building-stronger-agricultural-value-chains", title: "Building Stronger Agricultural Value Chains in Africa", excerpt: "How digital marketplaces connect farmers, buyers and distributors to unlock fairer prices.", category: "Agriculture", date: "Sep 5, 2026", read: "6 min read", image: farmer, author: "Russell Team" },
  { slug: "understanding-compliance-for-growing-businesses", title: "Understanding Compliance for Growing Businesses in Africa", excerpt: "A practical guide to the regulations every scaling business should plan for.", category: "Legal", date: "Aug 28, 2026", read: "7 min read", image: gavel, author: "Russell Team" },
  { slug: "african-artists-reach-global-audiences", title: "How African Artists Can Reach Global Audiences in the Digital Age", excerpt: "Distribution, streaming and fan engagement tools that put creators in control.", category: "Music", date: "Aug 20, 2026", read: "8 min read", image: artist, author: "Russell Team" },
  { slug: "role-of-data-in-building-smarter-businesses", title: "The Role of Data in Building Smarter Businesses", excerpt: "Simple ways businesses can use data and analytics to make better decisions today.", category: "Technology", date: "Sep 15, 2026", read: "6 min read", image: data, author: "Russell Team" },
  { slug: "digital-strategies-for-smes-2026", title: "5 Digital Strategies for SMEs to Scale in 2026", excerpt: "Cut manual work, reach more customers and grow with the right digital foundations.", category: "Business", date: "Aug 10, 2026", read: "5 min read", image: meeting, author: "Russell Team" },
  { slug: "inclusive-learning-opportunities-through-technology", title: "Creating Inclusive Learning Opportunities Through Technology", excerpt: "How schools are using digital tools to reach every learner.", category: "Education", date: "Aug 3, 2026", read: "7 min read", image: classroom, author: "Russell Team" },
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
  email: "info@russelltech.com",
  phone: "+234 812 345 6789",
  address: "Plot 12, Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  city: "Lagos, Nigeria",
  hours: "Mon – Fri, 9:00 AM – 5:00 PM (WAT)",
};
