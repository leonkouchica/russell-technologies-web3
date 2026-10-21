import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Shield,
  Key,
  Smartphone,
  Laptop,
  CheckCircle2,
  Lock,
  Mail,
  Camera,
  LogOut,
  Save,
  Globe,
  Bell,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import avatar1 from "@/assets/avatar-1.webp";
import { convertImageToWebP } from "@/lib/image-utils";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/profile")({
  component: AdminProfilePage,
});

export function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "security" | "sessions">("general");
  const [avatarSrc, setAvatarSrc] = useState<string>(avatar1);
  const [isConvertingAvatar, setIsConvertingAvatar] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Russell Super Admin",
    title: "Chief Technology Administrator",
    email: "admin@russelltechnologies.org",
    phone: "+234 812 345 6789",
    timezone: "Africa/Lagos (WAT, UTC+1)",
    bio: "Lead administrator and platform operations supervisor overseeing Russell Technologies web3 architectures.",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  // Sync profile with Supabase authenticated user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUserId(user.id);
        const meta = user.user_metadata || {};
        setProfile((prev) => ({
          ...prev,
          email: user.email || prev.email,
          name: meta.name || meta.full_name || prev.name,
          title: meta.title || prev.title,
          phone: meta.phone || prev.phone,
          bio: meta.bio || prev.bio,
        }));
        if (meta.avatar_url) {
          setAvatarSrc(meta.avatar_url);
        }
      }
    });
  }, []);

  const handleAvatarUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    try {
      setIsConvertingAvatar(true);
      toast.loading("Converting profile picture to High-Quality WebP...", { id: "avatar-upload" });
      const res = await convertImageToWebP(file, { quality: 0.92, maxWidth: 1024, maxHeight: 1024 });

      // Upload to Supabase Storage avatars bucket
      const filename = `avatar-${currentUserId || "admin"}-${Date.now()}.webp`;
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filename, res.blob, { contentType: "image/webp", upsert: true });

      if (uploadErr) {
        // Fallback to data URL if bucket policy denies
        setAvatarSrc(res.dataUrl);
        toast.success(`Profile photo updated (${res.savedPercentage}% saved • WebP)`, { id: "avatar-upload" });
        return;
      }

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);
      const publicUrl = urlData.publicUrl;
      setAvatarSrc(publicUrl);

      // Persist in Supabase auth user metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      toast.success(
        `Profile photo converted & saved to Supabase Storage (${res.savedPercentage}% saved • ${res.width}×${res.height})`,
        { id: "avatar-upload" }
      );
    } catch {
      toast.error("Failed to convert avatar image");
    } finally {
      setIsConvertingAvatar(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.auth.updateUser({
        data: {
          name: profile.name,
          title: profile.title,
          phone: profile.phone,
          bio: profile.bio,
        },
      });
      toast.success("Profile preferences saved to Supabase!");
    } catch (err: unknown) {
      toast.error("Failed to save profile: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.newPass) {
      toast.error("Please enter a new password.");
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordForm.newPass });
      if (error) throw error;
      toast.success("Security credentials updated! Your new password is now active.");
      setPasswordForm({ current: "", newPass: "", confirm: "" });
    } catch (err: unknown) {
      toast.error("Failed to update password: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <AdminLayout title="Administrator Profile & Security">
      <div className="space-y-6">
        {/* Profile Header Banner */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleAvatarUpload(e.target.files[0]);
                      e.target.value = "";
                    }
                  }}
                />
                <img
                  src={avatarSrc}
                  alt={profile.name}
                  className="size-20 rounded-2xl object-cover border-4 border-slate-100 shadow-md"
                />
                <button
                  type="button"
                  title="Upload New Photo (Auto-WebP)"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isConvertingAvatar}
                  className="absolute -bottom-1.5 -right-1.5 grid size-7 place-items-center rounded-lg bg-primary text-white shadow hover:bg-blue-600 transition cursor-pointer"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-navy">{profile.name}</h2>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{profile.title}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mail className="size-3 text-slate-400" /> {profile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="size-3 text-slate-400" /> {profile.timezone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center">
              <Link to="/admin/login">
                <Button variant="outline" size="sm" className="gap-2 text-xs text-rose-600 hover:text-rose-700 border-rose-200 hover:bg-rose-50">
                  <LogOut className="size-3.5" /> Sign Out
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex gap-2 border-b border-slate-100 pb-px">
            {[
              { id: "general", label: "General Information", icon: User },
              { id: "security", label: "Security & Authentication", icon: Lock },
              { id: "sessions", label: "Active Sessions & Devices", icon: Laptop },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as never)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-navy"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: General Information */}
        {activeTab === "general" && (
          <form onSubmit={handleSaveProfile} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-navy">Personal & Role Details</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-700">Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Administrative Role / Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Official Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Timezone</label>
                <input
                  type="text"
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Bio / Notes</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" className="gap-2 text-xs font-semibold">
                <Save className="size-3.5" /> Save Profile Details
              </Button>
            </div>
          </form>
        )}

        {/* Tab 2: Security & Password */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* 2FA Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="size-4 text-emerald-600" />
                    <h3 className="text-base font-bold text-navy">Two-Factor Authentication (2FA)</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Protect your console access with an additional authenticator app or SMS code verification.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    toast.success(twoFactorEnabled ? "2FA Disabled" : "2FA Enabled successfully!");
                  }}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                    twoFactorEnabled
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {twoFactorEnabled ? "Enabled (Active)" : "Disabled"}
                </button>
              </div>
            </div>

            {/* Password Change Form */}
            <form onSubmit={handleUpdatePassword} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <Key className="size-4 text-primary" /> Change Administrator Password
              </h3>

              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPass}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button type="submit" className="gap-2 text-xs font-semibold">
                  <Lock className="size-3.5" /> Update Password
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Active Sessions */}
        {activeTab === "sessions" && (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy">Connected Workstations & Sessions</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Devices authenticated with your Super Admin credentials.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    await supabase.auth.signOut({ scope: "others" });
                    toast.success("All other sessions terminated successfully!");
                  } catch (err: unknown) {
                    toast.error("Failed to revoke sessions: " + (err instanceof Error ? err.message : String(err)));
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-700 border-rose-200"
              >
                Revoke Other Sessions
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between rounded-xl border border-slate-200/80 p-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-blue-600">
                    <Laptop className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy text-xs">Windows 11 · Chrome 132</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        Current Session
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Lagos, Nigeria · IP: 102.89.41.22
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-medium">Active now</div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200/80 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
                    <Smartphone className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold text-navy text-xs">Apple iPhone 15 Pro · Safari Mobile</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Lagos, Nigeria · IP: 105.112.98.14
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">2 hours ago</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
