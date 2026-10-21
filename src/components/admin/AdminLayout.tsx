import { useState, useRef, useEffect, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  LayoutGrid,
  Calendar,
  Mail,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Contact,
  Users2,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  LogOut,
  ShieldAlert,
  User,
  Layers,
  Check,
  Clock,
  Sun,
  Moon,
  Sparkles,
  CheckCheck,
  Trash2,
  Activity,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { adminCurrentUser } from "@/lib/admin-data";
import { supabase } from "@/lib/supabase";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NotificationItem {
  id: string;
  category: "inquiry" | "comment" | "system" | "marketing";
  title: string;
  desc: string;
  time: string;
  read: boolean;
  link?: string;
  actionText?: string;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<"all" | "inquiry" | "comment" | "system">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(adminCurrentUser);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCurrentUser((prev) => ({
            ...prev,
            email: session.user.email ?? prev.email,
            name: session.user.user_metadata?.name ?? session.user.email?.split("@")[0] ?? prev.name,
          }));
        } else {
          // Strict authentication check: enforce redirect in real browser environments
          const isTest = typeof process !== "undefined" && process.env?.NODE_ENV === "test";
          if (!isTest && typeof window !== "undefined") {
            navigate({ to: "/admin/login" });
          }
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setCurrentUser((prev) => ({
            ...prev,
            email: session.user.email ?? prev.email,
            name: session.user.user_metadata?.name ?? session.user.email?.split("@")[0] ?? prev.name,
          }));
        } else if (event === "SIGNED_OUT") {
          const isTest = typeof process !== "undefined" && process.env?.NODE_ENV === "test";
          if (!isTest && typeof window !== "undefined") {
            navigate({ to: "/admin/login" });
          }
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [navigate]);

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate({ to: "/admin/login" });
  };

  // Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("russell_admin_theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("russell_admin_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("russell_admin_theme", "light");
      }
    }
  }, [isDark]);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Blog Posts", href: "/admin/blog-posts", icon: FileText },
    { label: "Web Pages", href: "/admin/web-pages", icon: LayoutGrid },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Comments", href: "/admin/comments", icon: MessageSquare },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Contacts", href: "/admin/contacts", icon: Contact },
    { label: "Site Content", href: "/admin/site-content", icon: Layers },
    { label: "Users & Roles", href: "/admin/users", icon: Users2 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  /* Notification Center Data */
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      category: "inquiry",
      title: "New Project Proposal",
      desc: "Dr. Kunle Adeleke submitted an Enterprise AI & Cloud Migration proposal.",
      time: "15m ago",
      read: false,
      link: "/admin/contacts",
      actionText: "Review Proposal",
    },
    {
      id: "n2",
      category: "system",
      title: "WebP Asset Optimization Complete",
      desc: "All 44 image assets converted to WebP with 74.2% size reduction.",
      time: "1h ago",
      read: false,
      link: "/admin/media",
      actionText: "View Media",
    },
    {
      id: "n3",
      category: "comment",
      title: "Comment Awaiting Moderation",
      desc: "Adeola Adebisi commented on 'AI in African Agriculture'.",
      time: "3h ago",
      read: false,
      link: "/admin/comments",
      actionText: "Moderate",
    },
    {
      id: "n4",
      category: "marketing",
      title: "New Newsletter Subscriber",
      desc: "chioma.nwankwo@outlook.com subscribed via Website Footer.",
      time: "5h ago",
      read: true,
      link: "/admin/newsletter",
      actionText: "View Subscribers",
    },
    {
      id: "n5",
      category: "system",
      title: "Automated Backup Verified",
      desc: "Snapshot created and SSL TLS 1.3 certs renewed for 90 days.",
      time: "1d ago",
      read: true,
      link: "/admin/analytics",
      actionText: "Health Status",
    },
  ]);

  const filteredNotifications = notifications.filter((n) => {
    if (notifFilter === "all") return true;
    return n.category === notifFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  /* Search results filtering */
  const searchResults = searchQuery.trim().length > 1
    ? navItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return currentPath === "/admin" || currentPath === "/admin/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <div className="admin-layout min-h-screen bg-[#f4f7fb] dark:bg-[#070d18] text-slate-800 dark:text-slate-100 antialiased flex flex-col lg:flex-row transition-colors duration-200">
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0b1328] text-white sticky top-0 z-50 shadow-md">
        <Link to="/admin" className="flex items-center">
          <img src={logoImg} alt="Russell Technologies" className="h-7 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b1328] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-white/10">
          {/* LOGO (Text removed per user request) */}
          <div className="px-2 mb-6 hidden lg:flex items-center">
            <Link to="/admin" className="flex items-center">
              <img src={logoImg} alt="Russell Technologies" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#0062ff] text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`size-4.5 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* NEED HELP CARD */}
          <div className="mt-8 mb-4 p-4 rounded-2xl bg-[#080e1c] border border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-1">
                <div className="size-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold">
                  💬
                </div>
                <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                  🙋
                </div>
              </div>
            </div>
            <h4 className="font-bold text-sm text-white">Need Help?</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Check our docs or contact support for help anytime.
            </p>
            <Link
              to="/contact"
              target="_blank"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              View Support <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>

        {/* SIDEBAR FOOTER (Public Site & System Health) */}
        <div className="p-4 border-t border-white/5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <Link to="/" target="_blank" className="hover:text-white flex items-center gap-1.5 transition">
              <ExternalLink className="size-3.5" /> View Public Site
            </Link>
            <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full font-medium">v1.2</span>
          </div>
          <Link
            to="/admin"
            hash="system-health"
            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-950/70 transition text-[11px]"
            title="System Status: All systems operational"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
            <span className="text-[10px] font-mono opacity-80">99.98%</span>
          </Link>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f7fb] dark:bg-[#070d18] transition-colors duration-200">
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-white dark:bg-[#0c1527] border-b border-slate-200/90 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchResults.length > 0) {
                  navigate({ to: searchResults[0].href });
                  setSearchQuery("");
                  setSearchFocused(false);
                }
              }}
              placeholder="Search posts, pages, events, subscribers..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#f4f7fb] dark:bg-[#111c33] border border-transparent dark:border-slate-800/80 rounded-full focus:bg-white dark:focus:bg-[#0f1930] focus:border-blue-500 focus:outline-hidden transition text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {/* Search Results Dropdown */}
            {searchFocused && searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0c1527] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => { setSearchQuery(""); setSearchFocused(false); }}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                      >
                        <Icon className="size-4 text-slate-400 dark:text-slate-500" />
                        {item.label}
                      </Link>
                    );
                  })
                ) : (
                  <p className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500">No results for "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? (
                <Sun className="size-5 text-amber-400" />
              ) : (
                <Moon className="size-5 text-slate-600" />
              )}
            </button>

            {/* NOTIFICATIONS CENTER */}
            <div className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setUserDropdownOpen(false); }}
                className="relative p-2 rounded-full text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                aria-label="View notifications center"
              >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Center Tray */}
              {notificationsOpen && (
                <>
                  <div onClick={() => setNotificationsOpen(false)} className="fixed inset-0 z-20" />
                  <div className="absolute right-0 mt-2 w-88 sm:w-96 rounded-2xl bg-white dark:bg-[#0c1527] shadow-2xl border border-slate-200/90 dark:border-slate-800 z-30 animate-in fade-in zoom-in-95 duration-100 overflow-hidden text-left">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Notification Center</h4>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-extrabold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        {unreadCount > 0 && (
                          <button
                            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                          >
                            <CheckCheck className="size-3.5" /> Mark read
                          </button>
                        )}
                        {notifications.length > 0 && (
                          <button
                            onClick={() => setNotifications([])}
                            className="text-slate-400 hover:text-red-500 transition"
                            title="Clear all notifications"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 px-3 py-2 bg-slate-50/70 dark:bg-[#09101f] border-b border-slate-100 dark:border-slate-800 text-xs">
                      {(["all", "inquiry", "comment", "system"] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setNotifFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition text-[11px] ${
                            notifFilter === cat
                              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition flex items-start gap-3 group relative ${
                              !n.read ? "bg-blue-50/30 dark:bg-blue-950/20" : ""
                            }`}
                          >
                            {/* Icon Indicator */}
                            <div className="mt-0.5 shrink-0">
                              {n.category === "inquiry" && (
                                <div className="size-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                                  <Contact className="size-3.5" />
                                </div>
                              )}
                              {n.category === "comment" && (
                                <div className="size-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                                  <MessageSquare className="size-3.5" />
                                </div>
                              )}
                              {n.category === "system" && (
                                <div className="size-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                                  <Activity className="size-3.5" />
                                </div>
                              )}
                              {n.category === "marketing" && (
                                <div className="size-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                                  <Mail className="size-3.5" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pr-6">
                              <div className="flex items-center gap-1.5">
                                <h5 className={`text-xs font-bold leading-tight ${n.read ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-white"}`}>
                                  {n.title}
                                </h5>
                                {!n.read && (
                                  <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                {n.desc}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                                  <Clock className="size-2.5" /> {n.time}
                                </span>
                                {n.link && (
                                  <Link
                                    to={n.link}
                                    onClick={() => {
                                      setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                                      setNotificationsOpen(false);
                                    }}
                                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                                  >
                                    {n.actionText || "View"} <ArrowRight className="size-2.5" />
                                  </Link>
                                )}
                              </div>
                            </div>

                            {/* Dismiss button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setNotifications(prev => prev.filter(item => item.id !== n.id));
                              }}
                              className="absolute top-3 right-3 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 opacity-0 group-hover:opacity-100 transition"
                              title="Dismiss"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <CheckCircle2 className="size-7 text-emerald-500 mx-auto mb-2 opacity-80" />
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">You're all caught up!</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">No notifications in this filter.</p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#09101f] text-center">
                      <Link
                        to="/admin"
                        hash="audit-log"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        <Activity className="size-3.5" /> View Activity & Audit Log
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* USER PROFILE */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="size-9 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{currentUser.name}</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium leading-tight">{currentUser.title}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="fixed inset-0 z-20"
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0c1527] shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        {currentUser.role}
                      </span>
                    </div>
                    <Link
                      to="/admin/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <User className="size-4 text-slate-400" /> My Profile & Security
                    </Link>
                    <Link
                      to="/admin/users"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <Users2 className="size-4 text-slate-400" /> Users & Permissions
                    </Link>
                    <Link
                      to="/admin/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <Settings className="size-4 text-slate-400" /> System Settings
                    </Link>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left"
                    >
                      <LogOut className="size-4 text-slate-400" /> Lock Screen / Sign Out
                    </button>
                    <Link
                      to="/"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="size-4" /> Exit to Public Site
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
