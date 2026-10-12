import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import student from "@/assets/student.jpg";
import farmer from "@/assets/farmer.jpg";
import gavel from "@/assets/gavel.jpg";
import artist from "@/assets/artist.jpg";
import dataImg from "@/assets/data.jpg";
import classroom from "@/assets/classroom.jpg";
import meeting from "@/assets/meeting.jpg";
import building from "@/assets/building.jpg";
import aboutOffice from "@/assets/about-office.jpg";
import africaMap from "@/assets/africa-map.png";
import prodBlueflame from "@/assets/prod-blueflame.jpg";
import prodFarmspots from "@/assets/prod-farmspots.jpg";
import prodLaw from "@/assets/prod-law.jpg";

export interface AdminUser {
  id: string;
  name: string;
  title?: string;
  email: string;
  role: "Super Admin" | "Administrator" | "Editor" | "Author" | "Contributor" | "Subscriber";
  status: "Active" | "Inactive";
  lastLogin: string;
  avatar?: string;
  initials?: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Education" | "Agriculture" | "Legal" | "Music" | "Technology" | "Business" | "Sustainability" | "Company News" | "Tips & Guides";
  status: "Published" | "Draft" | "Scheduled" | "Trash";
  author: {
    name: string;
    avatar?: string;
  };
  views: number;
  commentsCount: number;
  date: string;
  dateRelative: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export interface AdminWebPage {
  id: string;
  title: string;
  slug: string;
  path: string;
  type: "Homepage" | "Standard" | "Product Page" | "Blog Index" | "Legal Page";
  status: "Published" | "Draft" | "Archived";
  lastUpdated: string;
  lastUpdatedBy: string;
  views: number;
  image: string;
  seoStatus: "Optimized" | "Needs Review" | "Not Set";
}

export interface AdminEvent {
  id: string;
  title: string;
  slug: string;
  type: "Online" | "In-person" | "Hybrid";
  dateTime: string;
  formattedDate: string;
  formattedTime: string;
  monthBadge: string;
  dayBadge: string;
  location: string;
  registeredCount: number;
  maxAttendees?: number;
  status: "Published" | "Draft" | "Scheduled";
  image: string;
  isUpcoming?: boolean;
}

export interface AdminSubscriber {
  id: string;
  name: string;
  email: string;
  status: "Subscribed" | "Unsubscribed";
  source: "Website" | "Event" | "Manual" | "Social Media";
  dateSubscribed: string;
  avatar?: string;
  initials: string;
}

export interface AdminMediaFile {
  id: string;
  title: string;
  filename: string;
  format: "JPG" | "PNG" | "PDF" | "MP4" | "WEBP";
  size: string;
  dimensions?: string;
  duration?: string;
  folder: "Company Images" | "Events" | "Products" | "Documents";
  uploadedDate: string;
  uploadedBy: string;
  url: string;
  thumbnail: string;
  altText: string;
  caption: string;
  tags: string[];
}

export const adminCurrentUser: AdminUser = {
  id: "u-admin",
  name: "Admin",
  title: "Super Admin",
  email: "admin@russelltech.com",
  role: "Super Admin",
  status: "Active",
  lastLogin: "Sep 30, 2026, 10:24 AM",
  avatar: avatar1,
  initials: "AD",
};

export const adminOverviewMetrics = {
  totalBlogPosts: { value: 24, change: "+33%", changeType: "increase" as const, note: "+6 this month" },
  webPages: { value: 12, change: "+20%", changeType: "increase" as const, note: "+2 this month" },
  newsletterSignups: { value: 1250, change: "+18%", changeType: "increase" as const, note: "+190 this month" },
  events: { value: 8, change: "+60%", changeType: "increase" as const, note: "+3 this month" },
};

export const websiteActivityChartData = [
  { date: "Sep 1", pageViews: 1200, uniqueVisitors: 550 },
  { date: "Sep 3", pageViews: 1400, uniqueVisitors: 620 },
  { date: "Sep 5", pageViews: 1950, uniqueVisitors: 850 },
  { date: "Sep 8", pageViews: 1600, uniqueVisitors: 780 },
  { date: "Sep 10", pageViews: 2100, uniqueVisitors: 980 },
  { date: "Sep 13", pageViews: 1800, uniqueVisitors: 890 },
  { date: "Sep 15", pageViews: 2400, uniqueVisitors: 1100 },
  { date: "Sep 18", pageViews: 2150, uniqueVisitors: 990 },
  { date: "Sep 20", pageViews: 2600, uniqueVisitors: 1250 },
  { date: "Sep 23", pageViews: 2750, uniqueVisitors: 1120 },
  { date: "Sep 25", pageViews: 3200, uniqueVisitors: 1350 },
  { date: "Sep 28", pageViews: 2900, uniqueVisitors: 1200 },
  { date: "Sep 30", pageViews: 3450, uniqueVisitors: 1480 },
];

export const upcomingAdminEvents: AdminEvent[] = [
  {
    id: "evt-1",
    title: "Tech for Education Webinar",
    slug: "tech-for-education-webinar",
    type: "Online",
    dateTime: "Oct 10, 2026, 10:00 AM WAT",
    formattedDate: "Oct 10, 2026",
    formattedTime: "10:00 AM (WAT)",
    monthBadge: "OCT",
    dayBadge: "10",
    location: "Online Event",
    registeredCount: 50,
    status: "Published",
    image: classroom,
    isUpcoming: true,
  },
  {
    id: "evt-2",
    title: "FARMSPOTS Partner Onboarding",
    slug: "farmspots-partner-onboarding",
    type: "In-person",
    dateTime: "Oct 18, 2026, 2:00 PM WAT",
    formattedDate: "Oct 18, 2026",
    formattedTime: "2:00 PM (WAT)",
    monthBadge: "OCT",
    dayBadge: "18",
    location: "Lagos, Nigeria",
    registeredCount: 120,
    status: "Published",
    image: farmer,
    isUpcoming: true,
  },
  {
    id: "evt-3",
    title: "BLUEFLAME Artists Showcase",
    slug: "blueflame-artists-showcase",
    type: "Online",
    dateTime: "Nov 05, 2026, 6:00 PM WAT",
    formattedDate: "Nov 05, 2026",
    formattedTime: "6:00 PM (WAT)",
    monthBadge: "NOV",
    dayBadge: "05",
    location: "Online Event",
    registeredCount: 75,
    status: "Published",
    image: artist,
    isUpcoming: true,
  },
  {
    id: "evt-4",
    title: "Russell Tech Innovation Summit",
    slug: "russell-tech-innovation-summit",
    type: "In-person",
    dateTime: "Nov 20, 2026, 9:00 AM WAT",
    formattedDate: "Nov 20, 2026",
    formattedTime: "9:00 AM (WAT)",
    monthBadge: "NOV",
    dayBadge: "20",
    location: "Lagos, Nigeria",
    registeredCount: 200,
    status: "Published",
    image: meeting,
    isUpcoming: true,
  },
];

export const allAdminEvents: AdminEvent[] = [
  {
    id: "evt-photo-week",
    title: "African Photo Week Conference 2026",
    slug: "african-photo-week-conference-2026",
    type: "Online",
    dateTime: "Oct 10, 2026, 10:00 AM",
    formattedDate: "Oct 10, 2026",
    formattedTime: "10:00 AM (WAT)",
    monthBadge: "OCT",
    dayBadge: "10",
    location: "Online",
    registeredCount: 320,
    maxAttendees: 500,
    status: "Published",
    image: artist,
    isUpcoming: true,
  },
  {
    id: "evt-1",
    title: "Tech for Education Webinar",
    slug: "tech-for-education-webinar",
    type: "Online",
    dateTime: "Oct 18, 2026, 2:00 PM",
    formattedDate: "Oct 18, 2026",
    formattedTime: "2:00 PM",
    monthBadge: "OCT",
    dayBadge: "18",
    location: "Online",
    registeredCount: 120,
    status: "Published",
    image: student,
    isUpcoming: true,
  },
  {
    id: "evt-3",
    title: "BLUEFLAME Artists Showcase",
    slug: "blueflame-artists-showcase",
    type: "Online",
    dateTime: "Nov 5, 2026, 6:00 PM",
    formattedDate: "Nov 5, 2026",
    formattedTime: "6:00 PM",
    monthBadge: "NOV",
    dayBadge: "05",
    location: "Online",
    registeredCount: 75,
    status: "Published",
    image: artist,
    isUpcoming: true,
  },
  {
    id: "evt-4",
    title: "Russell Tech Innovation Summit",
    slug: "russell-tech-innovation-summit",
    type: "In-person",
    dateTime: "Nov 20, 2026, 9:00 AM",
    formattedDate: "Nov 20, 2026",
    formattedTime: "9:00 AM",
    monthBadge: "NOV",
    dayBadge: "20",
    location: "Lagos, Nigeria",
    registeredCount: 200,
    status: "Published",
    image: meeting,
    isUpcoming: true,
  },
  {
    id: "evt-farm-partner",
    title: "FARMSPOTS Partner Onboarding",
    slug: "farmspots-partner-onboarding",
    type: "In-person",
    dateTime: "Dec 3, 2026, 11:00 AM",
    formattedDate: "Dec 3, 2026",
    formattedTime: "11:00 AM",
    monthBadge: "DEC",
    dayBadge: "03",
    location: "Ibadan, Nigeria",
    registeredCount: 85,
    status: "Draft",
    image: farmer,
    isUpcoming: true,
  },
  {
    id: "evt-workshop",
    title: "Website Management Workshop",
    slug: "website-management-workshop",
    type: "Online",
    dateTime: "Jan 15, 2027, 3:00 PM",
    formattedDate: "Jan 15, 2027",
    formattedTime: "3:00 PM",
    monthBadge: "JAN",
    dayBadge: "15",
    location: "Online",
    registeredCount: 0,
    status: "Scheduled",
    image: dataImg,
    isUpcoming: true,
  },
  {
    id: "evt-networking",
    title: "Creative Industry Networking",
    slug: "creative-industry-networking",
    type: "In-person",
    dateTime: "Feb 10, 2027, 4:00 PM",
    formattedDate: "Feb 10, 2027",
    formattedTime: "4:00 PM",
    monthBadge: "FEB",
    dayBadge: "10",
    location: "Abuja, Nigeria",
    registeredCount: 0,
    status: "Scheduled",
    image: meeting,
    isUpcoming: true,
  },
  {
    id: "evt-agri-forum",
    title: "Sustainable Agriculture Forum",
    slug: "sustainable-agriculture-forum",
    type: "In-person",
    dateTime: "Mar 22, 2027, 10:00 AM",
    formattedDate: "Mar 22, 2027",
    formattedTime: "10:00 AM",
    monthBadge: "MAR",
    dayBadge: "22",
    location: "Lagos, Nigeria",
    registeredCount: 0,
    status: "Draft",
    image: farmer,
    isUpcoming: true,
  },
];

export const adminBlogPosts: AdminBlogPost[] = [
  {
    id: "bp-1",
    title: "How Technology is Transforming Education in African Schools",
    slug: "how-technology-is-transforming-education-in-african-schools",
    category: "Education",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 1200,
    commentsCount: 12,
    date: "Sep 10, 2026",
    dateRelative: "2 days ago",
    excerpt: "Discover how digital tools are helping schools streamline operations and enhance student outcomes across Nigeria.",
    image: student,
    featured: true,
  },
  {
    id: "bp-2",
    title: "Building Stronger Agricultural Value Chains in Africa",
    slug: "building-stronger-agricultural-value-chains-in-africa",
    category: "Agriculture",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 856,
    commentsCount: 8,
    date: "Sep 5, 2026",
    dateRelative: "7 days ago",
    excerpt: "A look at how platforms like FARMSPOTS are connecting farmers to bigger markets, eliminating middleman inefficiencies.",
    image: farmer,
  },
  {
    id: "bp-3",
    title: "How African Artists Can Reach Global Audiences",
    slug: "how-african-artists-can-reach-global-audiences",
    category: "Music",
    status: "Draft",
    author: { name: "Admin", avatar: avatar1 },
    views: 620,
    commentsCount: 4,
    date: "Aug 20, 2026",
    dateRelative: "3 weeks ago",
    excerpt: "Explore practical strategies for artists to grow their fan base using digital distribution and smart streaming analytics.",
    image: artist,
  },
  {
    id: "bp-4",
    title: "Understanding Compliance for Growing Businesses in Africa",
    slug: "understanding-compliance-for-growing-businesses-in-africa",
    category: "Legal",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 910,
    commentsCount: 7,
    date: "Aug 28, 2026",
    dateRelative: "3 weeks ago",
    excerpt: "Key legal and regulatory considerations for SMEs and growing enterprises looking to scale safely.",
    image: gavel,
  },
  {
    id: "bp-5",
    title: "The Role of Data in Building Smarter Businesses",
    slug: "the-role-of-data-in-building-smarter-businesses",
    category: "Technology",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 1500,
    commentsCount: 15,
    date: "Aug 15, 2026",
    dateRelative: "1 month ago",
    excerpt: "How data-driven decisions can help businesses grow, streamline inventory, and stay competitive in changing markets.",
    image: dataImg,
  },
  {
    id: "bp-6",
    title: "Creating Inclusive Learning Opportunities Through Technology",
    slug: "creating-inclusive-learning-opportunities-through-technology",
    category: "Education",
    status: "Scheduled",
    author: { name: "Admin", avatar: avatar1 },
    views: 0,
    commentsCount: 0,
    date: "Oct 5, 2026",
    dateRelative: "Scheduled",
    excerpt: "Practical ways schools can use technology to support every learner, regardless of background or physical location.",
    image: classroom,
  },
  {
    id: "bp-7",
    title: "BLUEFLAME Spotlight: Empowering African Creatives",
    slug: "blueflame-spotlight-empowering-african-creatives",
    category: "Music",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 780,
    commentsCount: 5,
    date: "Jul 30, 2026",
    dateRelative: "2 months ago",
    excerpt: "How BLUEFLAME is giving artists the tools to create, distribute and grow globally with automated royalties.",
    image: artist,
  },
  {
    id: "bp-8",
    title: "Digital Transformation Trends for African Businesses in 2026",
    slug: "digital-transformation-trends-for-african-businesses-in-2026",
    category: "Business",
    status: "Published",
    author: { name: "Admin", avatar: avatar1 },
    views: 1100,
    commentsCount: 9,
    date: "Jul 18, 2026",
    dateRelative: "2 months ago",
    excerpt: "Key trends and opportunities shaping the future of digital business and cloud infrastructure across Africa.",
    image: meeting,
  },
];

export const adminWebPages: AdminWebPage[] = [
  {
    id: "pg-home",
    title: "Home",
    slug: "home",
    path: "/",
    type: "Homepage",
    status: "Published",
    lastUpdated: "Sep 10, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 12500,
    image: student,
    seoStatus: "Optimized",
  },
  {
    id: "pg-about",
    title: "About Us",
    slug: "about-us",
    path: "/about",
    type: "Standard",
    status: "Published",
    lastUpdated: "Sep 5, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 4200,
    image: aboutOffice,
    seoStatus: "Optimized",
  },
  {
    id: "pg-services",
    title: "Services",
    slug: "services",
    path: "/services",
    type: "Standard",
    status: "Published",
    lastUpdated: "Aug 28, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 3800,
    image: meeting,
    seoStatus: "Optimized",
  },
  {
    id: "pg-products",
    title: "Products",
    slug: "products",
    path: "/products",
    type: "Standard",
    status: "Published",
    lastUpdated: "Aug 20, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 5100,
    image: dataImg,
    seoStatus: "Optimized",
  },
  {
    id: "pg-blueflame",
    title: "BLUEFLAME",
    slug: "blueflame",
    path: "/products/blueflame",
    type: "Product Page",
    status: "Published",
    lastUpdated: "Aug 15, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 2900,
    image: prodBlueflame,
    seoStatus: "Optimized",
  },
  {
    id: "pg-farmspots",
    title: "FARMSPOTS",
    slug: "farmspots",
    path: "/products/farmspots",
    type: "Product Page",
    status: "Published",
    lastUpdated: "Aug 15, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 3400,
    image: prodFarmspots,
    seoStatus: "Optimized",
  },
  {
    id: "pg-blog",
    title: "Blog",
    slug: "blog",
    path: "/blog",
    type: "Blog Index",
    status: "Published",
    lastUpdated: "Jul 30, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 6200,
    image: student,
    seoStatus: "Optimized",
  },
  {
    id: "pg-contact",
    title: "Contact",
    slug: "contact",
    path: "/contact",
    type: "Standard",
    status: "Published",
    lastUpdated: "Jul 18, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 2100,
    image: meeting,
    seoStatus: "Optimized",
  },
  {
    id: "pg-privacy",
    title: "Privacy Policy",
    slug: "privacy-policy",
    path: "/privacy-policy",
    type: "Legal Page",
    status: "Draft",
    lastUpdated: "Jul 10, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 320,
    image: gavel,
    seoStatus: "Needs Review",
  },
  {
    id: "pg-terms",
    title: "Terms of Service",
    slug: "terms-of-service",
    path: "/terms-of-service",
    type: "Legal Page",
    status: "Published",
    lastUpdated: "Jun 28, 2026 by Admin",
    lastUpdatedBy: "Admin",
    views: 1400,
    image: gavel,
    seoStatus: "Optimized",
  },
];

export const adminSubscribers: AdminSubscriber[] = [
  {
    id: "sub-1",
    name: "Adeola Johnson",
    email: "adeola.johnson@example.com",
    status: "Subscribed",
    source: "Website",
    dateSubscribed: "Sep 10, 2026, 8:24 AM",
    initials: "AJ",
  },
  {
    id: "sub-2",
    name: "Chinedu Okafor",
    email: "chinedu.okafor@example.com",
    status: "Subscribed",
    source: "Event",
    dateSubscribed: "Sep 9, 2026, 3:12 PM",
    initials: "CO",
  },
  {
    id: "sub-3",
    name: "Fatima Yusuf",
    email: "fatima.yusuf@example.com",
    status: "Subscribed",
    source: "Website",
    dateSubscribed: "Sep 8, 2026, 11:45 AM",
    initials: "FY",
  },
  {
    id: "sub-4",
    name: "Tunde Balogun",
    email: "tunde.balogun@example.com",
    status: "Unsubscribed",
    source: "Manual",
    dateSubscribed: "Sep 7, 2026, 6:30 PM",
    initials: "TB",
  },
  {
    id: "sub-5",
    name: "Grace Adebayo",
    email: "grace.adebayo@example.com",
    status: "Subscribed",
    source: "Event",
    dateSubscribed: "Sep 6, 2026, 2:10 PM",
    initials: "GA",
  },
  {
    id: "sub-6",
    name: "Ibrahim Bello",
    email: "ibrahim.bello@example.com",
    status: "Subscribed",
    source: "Website",
    dateSubscribed: "Sep 5, 2026, 9:18 AM",
    initials: "IB",
  },
  {
    id: "sub-7",
    name: "Nkechi Eze",
    email: "nkechi.eze@example.com",
    status: "Subscribed",
    source: "Social Media",
    dateSubscribed: "Sep 4, 2026, 4:05 PM",
    initials: "NE",
  },
  {
    id: "sub-8",
    name: "Daniel Smith",
    email: "daniel.smith@example.com",
    status: "Subscribed",
    source: "Website",
    dateSubscribed: "Sep 3, 2026, 1:22 PM",
    initials: "DS",
  },
];

export const adminMediaFiles: AdminMediaFile[] = [
  {
    id: "med-1",
    title: "russell-office.jpg",
    filename: "russell-office.jpg",
    format: "JPG",
    size: "2.4 MB",
    dimensions: "1920 × 1080",
    folder: "Company Images",
    uploadedDate: "Sep 10, 2026, 10:24 AM",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/russell-office.jpg",
    thumbnail: building,
    altText: "Russell Technologies office building",
    caption: "Our headquarters in Lagos, Nigeria.",
    tags: ["office", "building", "russell", "lagos"],
  },
  {
    id: "med-2",
    title: "tech-summit-2026.jpg",
    filename: "tech-summit-2026.jpg",
    format: "JPG",
    size: "3.1 MB",
    folder: "Events",
    uploadedDate: "Sep 8, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/tech-summit-2026.jpg",
    thumbnail: meeting,
    altText: "Tech Summit Keynote Presentation",
    caption: "Annual innovation conference auditorium.",
    tags: ["events", "summit", "keynote"],
  },
  {
    id: "med-3",
    title: "speaker-keynote.jpg",
    filename: "speaker-keynote.jpg",
    format: "JPG",
    size: "1.8 MB",
    folder: "Events",
    uploadedDate: "Sep 8, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/speaker-keynote.jpg",
    thumbnail: avatar1,
    altText: "Keynote Speaker on Stage",
    caption: "Russell Technologies executive address.",
    tags: ["speaker", "conference"],
  },
  {
    id: "med-4",
    title: "office-space.jpg",
    filename: "office-space.jpg",
    format: "JPG",
    size: "2.9 MB",
    folder: "Company Images",
    uploadedDate: "Sep 5, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/office-space.jpg",
    thumbnail: aboutOffice,
    altText: "Open Plan Office Floor",
    caption: "Modern workstation in Victoria Island.",
    tags: ["office", "workspace"],
  },
  {
    id: "med-5",
    title: "intro-video.mp4",
    filename: "intro-video.mp4",
    format: "MP4",
    size: "45 MB",
    duration: "02:35",
    folder: "Company Images",
    uploadedDate: "Sep 4, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/intro-video.mp4",
    thumbnail: dataImg,
    altText: "Russell Technologies Corporate Video",
    caption: "Company brand showreel and overview.",
    tags: ["video", "showreel", "brand"],
  },
  {
    id: "med-6",
    title: "team-meeting.jpg",
    filename: "team-meeting.jpg",
    format: "JPG",
    size: "2.1 MB",
    folder: "Company Images",
    uploadedDate: "Aug 28, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/team-meeting.jpg",
    thumbnail: meeting,
    altText: "Team Collaboration Meeting",
    caption: "Product engineering planning session.",
    tags: ["team", "meeting", "work"],
  },
  {
    id: "med-7",
    title: "product-showcase.jpg",
    filename: "product-showcase.jpg",
    format: "JPG",
    size: "1.9 MB",
    folder: "Products",
    uploadedDate: "Aug 25, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/product-showcase.jpg",
    thumbnail: dataImg,
    altText: "Product UI Dashboard Display",
    caption: "Overview of SaaS solutions suite.",
    tags: ["products", "ui", "saas"],
  },
  {
    id: "med-8",
    title: "africa-map.png",
    filename: "africa-map.png",
    format: "PNG",
    size: "850 KB",
    folder: "Company Images",
    uploadedDate: "Aug 20, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/africa-map.png",
    thumbnail: africaMap,
    altText: "Africa Footprint Map",
    caption: "Pan-African expansion hubs.",
    tags: ["africa", "map", "expansion"],
  },
  {
    id: "med-9",
    title: "company-brochure.pdf",
    filename: "company-brochure.pdf",
    format: "PDF",
    size: "4.2 MB",
    folder: "Documents",
    uploadedDate: "Aug 18, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/company-brochure.pdf",
    thumbnail: gavel,
    altText: "Company Profile and Brochure",
    caption: "Detailed corporate profile PDF.",
    tags: ["document", "brochure", "pdf"],
  },
  {
    id: "med-10",
    title: "event-poster.jpg",
    filename: "event-poster.jpg",
    format: "JPG",
    size: "2.5 MB",
    folder: "Events",
    uploadedDate: "Aug 15, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/event-poster.jpg",
    thumbnail: artist,
    altText: "African Photo Week Poster",
    caption: "Conference promotional poster banner.",
    tags: ["events", "poster", "conference"],
  },
  {
    id: "med-11",
    title: "farmspots-banner.jpg",
    filename: "farmspots-banner.jpg",
    format: "JPG",
    size: "1.7 MB",
    folder: "Products",
    uploadedDate: "Aug 12, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/farmspots-banner.jpg",
    thumbnail: prodFarmspots,
    altText: "FARMSPOTS Product Banner",
    caption: "Agricultural marketplace hero image.",
    tags: ["farmspots", "agriculture", "products"],
  },
  {
    id: "med-12",
    title: "blueflame-product.jpg",
    filename: "blueflame-product.jpg",
    format: "JPG",
    size: "2.3 MB",
    folder: "Products",
    uploadedDate: "Aug 10, 2026",
    uploadedBy: "Admin",
    url: "https://russelltech.com/uploads/blueflame-product.jpg",
    thumbnail: prodBlueflame,
    altText: "BLUEFLAME Product Mockup",
    caption: "Downstream fuel logistics interface.",
    tags: ["blueflame", "energy", "products"],
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "u-1",
    name: "Admin User",
    title: "Super Admin",
    email: "admin@russelltech.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Sep 30, 2026 10:24 AM",
    avatar: avatar1,
  },
  {
    id: "u-2",
    name: "Chioma Okafor",
    title: "Content Manager",
    email: "chioma@russelltech.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Sep 29, 2026 4:15 PM",
    avatar: avatar2,
  },
  {
    id: "u-3",
    name: "Tunde Adebayo",
    title: "Marketing Lead",
    email: "tunde@russelltech.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Sep 29, 2026 11:02 AM",
    avatar: avatar3,
  },
  {
    id: "u-4",
    name: "Grace Johnson",
    title: "Event Coordinator",
    email: "grace@russelltech.com",
    role: "Author",
    status: "Active",
    lastLogin: "Sep 28, 2026 3:40 PM",
    avatar: avatar2,
  },
  {
    id: "u-5",
    name: "Ibrahim Bello",
    title: "Support Staff",
    email: "ibrahim@russelltech.com",
    role: "Contributor",
    status: "Active",
    lastLogin: "Sep 27, 2026 9:18 AM",
    initials: "IB",
  },
  {
    id: "u-6",
    name: "Nkechi Eze",
    title: "Newsletter Manager",
    email: "nkechi@russelltech.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Sep 26, 2026 1:25 PM",
    initials: "NE",
  },
  {
    id: "u-7",
    name: "Daniel Smith",
    title: "Web Developer",
    email: "daniel@russelltech.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "Sep 25, 2026 5:30 PM",
    avatar: avatar1,
  },
  {
    id: "u-8",
    name: "Fatima Yusuf",
    title: "Content Writer",
    email: "fatima@russelltech.com",
    role: "Author",
    status: "Inactive",
    lastLogin: "Sep 20, 2026 8:12 AM",
    initials: "FY",
  },
];
