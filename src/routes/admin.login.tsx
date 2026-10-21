import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Sign In | Russell Technologies" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        toast.success("Authentication successful! Welcome back, Admin.");
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
    <div className="min-h-screen bg-[#0b1328] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute -top-40 -left-40 size-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="size-4" /> Return to Public Website
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-slate-300">
          <ShieldCheck className="size-3.5 text-blue-400" />
          <span>Restricted Access · Authorized Staff Only</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#101b38]/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
          {/* Logo & Headline */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block" aria-label="Russell Technologies">
              <img
                src={logo}
                alt="Russell Technologies"
                width={120}
                height={42}
                className="mx-auto h-10 w-auto brightness-0 invert"
              />
            </Link>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
              Operations Console
            </h1>
            <p className="mt-1.5 text-xs text-slate-400">
              Sign in to manage web pages, articles, events, and system analytics.
            </p>
          </div>

          {/* Quick Credential Helper Pill */}
          <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-950/40 p-3 text-xs text-slate-300 flex items-start gap-2.5">
            <KeyRound className="size-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-blue-300">Demo Access Credentials:</span><br />
              <span className="text-[11px] font-mono text-slate-300">admin@russelltechnologies.org / admin2026</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@russelltechnologies.org"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-xs text-slate-400 select-none cursor-pointer">
                Keep session authenticated on this workstation
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 shadow-lg shadow-blue-600/30 transition disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Credentials…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In to Admin Console <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 border-t border-slate-800/80 pt-5 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
            <Lock className="size-3 text-slate-400" />
            <span>256-Bit SSL Encrypted Session · Zero-Trust Policy</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-[#101b38] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="size-4 text-blue-400" /> Password Recovery
              </h3>
              <button
                onClick={() => { setShowForgotModal(false); setResetSent(false); }}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="size-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
                <p className="text-xs text-slate-400">
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
                <p className="text-xs text-slate-300">
                  Enter your registered administrator email address. We will send a secure one-time reset link.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@russelltechnologies.org"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="flex-1 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="relative z-10 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Russell Technologies Inc. All rights reserved.
      </div>
    </div>
  );
}
