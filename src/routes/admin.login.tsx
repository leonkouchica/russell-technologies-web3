import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  FileText,
  Calendar,
  BarChart3,
} from "lucide-react";
import logo from "@/assets/logo.webp";
import officeImg from "@/assets/admin-login-office.webp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Russell Technologies" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        toast.error(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        toast.success("Authentication successful! Welcome back.");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };


  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Enter your administrator email.");
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (resetError) {
      toast.error(resetError.message);
      return;
    }
    setResetSent(true);
    toast.success("Reset instructions dispatched to " + forgotEmail);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* ═══════════════════════════════════════════════════════════════
          LEFT COLUMN: BRANDING & OPERATIONS SHOWCASE (Dark Navy)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[53%] xl:w-[55%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-[#001333] via-[#001f52] to-[#000f28] p-10 xl:p-14 text-white select-none">
        {/* Office Photo Background (Right Side of Left Column) */}
        <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none">
          <img
            src={officeImg}
            alt="Russell Technologies Executive Office"
            className="h-full w-full object-cover object-left"
          />
          {/* Seamless gradient fade from dark navy */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001333] via-[#001333]/85 via-40% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000f28] via-transparent to-transparent opacity-60" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-block" aria-label="Russell Technologies">
            <img
              src={logo}
              alt="Russell Technologies"
              width={150}
              height={48}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        {/* Middle Content */}
        <div className="relative z-10 my-auto max-w-xl py-6">
          <p className="text-[11px] font-bold tracking-[0.24em] text-blue-300/80 uppercase mb-3">
            MANAGE &nbsp;·&nbsp; CREATE &nbsp;·&nbsp; GROW
          </p>
          <h1 className="text-3xl xl:text-[44px] font-black tracking-tight text-white leading-[1.12]">
            Admin Dashboard<br />
            for a Smarter<br />
            <span className="text-[#3b82f6]">Digital Presence</span>
          </h1>
          <p className="mt-4 text-xs xl:text-sm text-slate-300/85 max-w-md leading-relaxed">
            Manage your website content, events, newsletter, media and more — all in one secure dashboard.
          </p>

          {/* Feature List (4 Items exactly matching UI reference) */}
          <div className="mt-8 space-y-4 max-w-md">
            {/* 1. Content Management */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-blue-600/20 border border-blue-400/20 text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Content Management</h3>
                <p className="text-[11px] xl:text-xs text-slate-400 mt-0.5">Create and update blog posts, pages and media</p>
              </div>
            </div>

            {/* 2. Event Management */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-purple-600/20 border border-purple-400/20 text-purple-400 flex items-center justify-center shrink-0 shadow-sm">
                <Calendar className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Event Management</h3>
                <p className="text-[11px] xl:text-xs text-slate-400 mt-0.5">Organize and publish events</p>
              </div>
            </div>

            {/* 3. Newsletter & Subscribers */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-emerald-600/20 border border-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Newsletter & Subscribers</h3>
                <p className="text-[11px] xl:text-xs text-slate-400 mt-0.5">Grow and engage your audience</p>
              </div>
            </div>

            {/* 4. Analytics & Insights */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-amber-500/20 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <BarChart3 className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Analytics & Insights</h3>
                <p className="text-[11px] xl:text-xs text-slate-400 mt-0.5">Track performance and measure impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent & Statement */}
        <div className="relative z-10 pt-4">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="w-9 h-1 rounded-full bg-[#f97316]" />
            <span className="w-14 h-1 rounded-full bg-[#1e3a8a]" />
          </div>
          <p className="text-xs xl:text-sm font-medium text-slate-300/90 leading-snug">
            Building technology solutions for<br />
            a better Africa.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT COLUMN: ADMIN LOGIN CARD (Light Floating Canvas)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-[47%] xl:w-[45%] min-h-screen flex flex-col justify-between p-5 sm:p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#f2f7fd] to-[#e4eefd]">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 size-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

        {/* Top bar with return link */}
        <div className="flex items-center justify-between relative z-10 mb-4 sm:mb-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="size-3.5" /> Return to Website
          </Link>
          <div className="lg:hidden">
            <img src={logo} alt="Russell Technologies" className="h-7 w-auto" />
          </div>
        </div>

        {/* Floating Login Card */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-[460px]">
          <div className="bg-white rounded-3xl sm:rounded-[28px] p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,35,85,0.09)] border border-slate-100">
            {/* Blue Lock Badge Icon */}
            <div className="size-14 rounded-2xl bg-[#edf4ff] text-[#0052ff] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="size-6 text-[#0052ff]" strokeWidth={2.2} />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight text-center">
              Admin Login
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 text-center mt-1.5 leading-relaxed">
              Sign in to access your Russell Technologies<br />
              admin dashboard.
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent transition shadow-xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 size-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:border-transparent transition shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-4 rounded border-slate-300 text-[#0052ff] focus:ring-[#0052ff]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="font-semibold text-[#0052ff] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#0052ff] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="size-4" />
                  </span>
                )}
              </button>

            </form>

            {/* Bottom Security Note */}
            <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center leading-tight">
              <Shield className="size-3.5 text-slate-400 shrink-0" />
              <span>
                This dashboard is restricted to authorized personnel only.<br />
                All access attempts are monitored and secured.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="relative z-10 text-center text-[11px] text-slate-400 mt-4 sm:mt-0">
          © {new Date().getFullYear()} Russell Technologies Inc. All rights reserved.
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="size-4 text-[#0052ff]" /> Password Recovery
              </h3>
              <button
                onClick={() => { setShowForgotModal(false); setResetSent(false); }}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="size-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Reset Instructions Sent</h4>
                <p className="text-xs text-slate-500">
                  Please check your inbox. If the email address exists in the system, you will receive password reset instructions.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setShowForgotModal(false); setResetSent(false); }}
                  className="mt-2 text-xs"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
                <p className="text-xs text-slate-600">
                  Enter your registered administrator email address. We will send a secure one-time reset link.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@russelltechnologies.org"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052ff]"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="flex-1 text-xs bg-[#0052ff] hover:bg-blue-700 text-white font-semibold"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
