import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
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
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { adminCurrentUser } from "@/lib/admin-data";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    { label: "Users & Roles", href: "/admin/users", icon: Users2 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return currentPath === "/admin" || currentPath === "/admin/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 antialiased flex flex-col lg:flex-row">
      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0b1328] text-white sticky top-0 z-50 shadow-md">
        <Link to="/admin" className="flex items-center gap-2.5">
          <img src={logoImg} alt="Russell Technologies" className="h-7 w-auto" />
          <span className="font-bold text-base tracking-tight">Russell <span className="text-blue-400 font-medium">Technologies</span></span>
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
          {/* LOGO */}
          <div className="px-2 mb-6 hidden lg:flex items-center gap-2.5">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img src={logoImg} alt="Russell Technologies" className="h-8 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white leading-tight">Russell</span>
                <span className="text-[11px] font-medium text-slate-400 -mt-0.5 tracking-wide">Technologies</span>
              </div>
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

        {/* SIDEBAR FOOTER (Public Site link) */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <Link to="/" target="_blank" className="hover:text-white flex items-center gap-1.5 transition">
            <ExternalLink className="size-3.5" /> View Public Site
          </Link>
          <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full font-medium">v1.0</span>
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, pages, events, subscribers..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#f4f7fb] border border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:outline-hidden transition text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* NOTIFICATIONS */}
            <div className="relative">
              <button
                className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                aria-label="View notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* USER PROFILE */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition"
              >
                <img
                  src={adminCurrentUser.avatar}
                  alt={adminCurrentUser.name}
                  className="size-9 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">{adminCurrentUser.name}</span>
                  <span className="text-[11px] text-slate-400 font-medium leading-tight">{adminCurrentUser.title}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="fixed inset-0 z-20"
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-800">{adminCurrentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{adminCurrentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        {adminCurrentUser.role}
                      </span>
                    </div>
                    <Link
                      to="/admin/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <User className="size-4 text-slate-400" /> My Profile & Security
                    </Link>
                    <Link
                      to="/admin/users"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Users2 className="size-4 text-slate-400" /> Users & Permissions
                    </Link>
                    <Link
                      to="/admin/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="size-4 text-slate-400" /> System Settings
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <Link
                      to="/admin/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <LogOut className="size-4 text-slate-400" /> Lock Screen / Sign Out
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
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
