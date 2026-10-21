/**
 * React Query hooks wrapping all admin server functions.
 * Import these in admin route components instead of accessing admin-data.ts directly.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBlogPosts,
  fetchBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  fetchEvents,
  fetchEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  fetchSubscribers,
  createSubscriber,
  publicSubscribe,
  updateSubscriber,
  deleteSubscriber,
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  sendCampaignBlast,
  fetchContacts,
  submitContactForm,
  updateContact,
  deleteContact,
  replyToContact,
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  fetchMediaFiles,
  createMediaRecord,
  updateMediaRecord,
  deleteMediaRecord,
  fetchAdminUsers,
  updateAdminUser,
  fetchSettings,
  saveSettings,
  fetchAuditLogs,
  createAuditLog,
  fetchDashboardStats,
  fetchCurrentProfile,
  fetchAnalytics,
} from "@/lib/server-fns";

// ─── Query Keys ────────────────────────────────────────────────────────────

export const queryKeys = {
  blogPosts: (filters?: Record<string, unknown>) => ["blog-posts", filters] as const,
  blogPost: (id: string) => ["blog-post", id] as const,
  events: (filters?: Record<string, unknown>) => ["events", filters] as const,
  event: (id: string) => ["event", id] as const,
  subscribers: (filters?: Record<string, unknown>) => ["subscribers", filters] as const,
  campaigns: (filters?: Record<string, unknown>) => ["campaigns", filters] as const,
  contacts: (filters?: Record<string, unknown>) => ["contacts", filters] as const,
  comments: (filters?: Record<string, unknown>) => ["comments", filters] as const,
  media: (filters?: Record<string, unknown>) => ["media", filters] as const,
  users: (filters?: Record<string, unknown>) => ["users", filters] as const,
  settings: (key?: string) => ["settings", key] as const,
  auditLogs: (filters?: Record<string, unknown>) => ["audit-logs", filters] as const,
  dashboardStats: ["dashboard-stats"] as const,
  profile: (userId: string) => ["profile", userId] as const,
  analytics: (days?: number) => ["analytics", days] as const,
};

// ─── Blog Posts ────────────────────────────────────────────────────────────

export function useBlogPosts(filters?: { status?: string; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.blogPosts(filters),
    queryFn: () => fetchBlogPosts({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: queryKeys.blogPost(id),
    queryFn: () => fetchBlogPost({ data: { id } }),
    enabled: !!id,
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createBlogPost>[0]["data"]) => createBlogPost({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateBlogPost>[0]["data"]) => updateBlogPost({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteBlogPost({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog-posts"] }),
  });
}

// ─── Events ────────────────────────────────────────────────────────────────

export function useEvents(filters?: { status?: string; limit?: number; upcoming?: boolean }) {
  return useQuery({
    queryKey: queryKeys.events(filters),
    queryFn: () => fetchEvents({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => fetchEvent({ data: { id } }),
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createEvent>[0]["data"]) => createEvent({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateEvent>[0]["data"]) => updateEvent({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteEvent({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useRegisterForEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof registerForEvent>[0]["data"]) => registerForEvent({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["subscribers"] });
    },
  });
}

// ─── Subscribers ───────────────────────────────────────────────────────────

export function useSubscribers(filters?: { status?: string; source?: string; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.subscribers(filters),
    queryFn: () => fetchSubscribers({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useCreateSubscriber() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createSubscriber>[0]["data"]) => createSubscriber({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscribers"] }),
  });
}

export function usePublicSubscribe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof publicSubscribe>[0]["data"]) => publicSubscribe({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscribers"] }),
  });
}

export function useUpdateSubscriber() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateSubscriber>[0]["data"]) => updateSubscriber({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscribers"] }),
  });
}

export function useDeleteSubscriber() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteSubscriber({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscribers"] }),
  });
}

// ─── Campaigns ─────────────────────────────────────────────────────────────

export function useCampaigns(filters?: { status?: string }) {
  return useQuery({
    queryKey: queryKeys.campaigns(filters),
    queryFn: () => fetchCampaigns({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useCreateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createCampaign>[0]["data"]) => createCampaign({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export function useUpdateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateCampaign>[0]["data"]) => updateCampaign({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export function useSendCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => sendCampaignBlast({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["campaigns"] }),
  });
}

export const useSendCampaignBlast = useSendCampaign;

// ─── Contacts ──────────────────────────────────────────────────────────────

export function useContacts(filters?: { status?: string }) {
  return useQuery({
    queryKey: queryKeys.contacts(filters),
    queryFn: () => fetchContacts({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useSubmitContactForm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof submitContactForm>[0]["data"]) => submitContactForm({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateContact>[0]["data"]) => updateContact({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteContact({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

export function useReplyToContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof replyToContact>[0]["data"]) => replyToContact({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
}

// ─── Comments ──────────────────────────────────────────────────────────────

export function useComments(filters?: { status?: string; post_id?: string }) {
  return useQuery({
    queryKey: queryKeys.comments(filters),
    queryFn: () => fetchComments({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createComment>[0]["data"]) => createComment({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments"] }),
  });
}

export function useUpdateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateComment>[0]["data"]) => updateComment({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments"] }),
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string }) => deleteComment({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments"] }),
  });
}

// ─── Media ─────────────────────────────────────────────────────────────────

export function useMediaFiles(filters?: { folder?: string; format?: string }) {
  return useQuery({
    queryKey: queryKeys.media(filters),
    queryFn: () => fetchMediaFiles({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useCreateMediaRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createMediaRecord>[0]["data"]) => createMediaRecord({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useUpdateMediaRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateMediaRecord>[0]["data"]) => updateMediaRecord({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useDeleteMediaRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof deleteMediaRecord>[0]["data"]) => deleteMediaRecord({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

// ─── Users ─────────────────────────────────────────────────────────────────

export function useAdminUsers(filters?: { role?: string }) {
  return useQuery({
    queryKey: queryKeys.users(filters),
    queryFn: () => fetchAdminUsers({ data: filters ?? {} }),
    staleTime: 60_000,
  });
}

export function useUpdateAdminUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof updateAdminUser>[0]["data"]) => updateAdminUser({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ─── Settings ──────────────────────────────────────────────────────────────

export function useSettings(key?: string) {
  return useQuery({
    queryKey: queryKeys.settings(key),
    queryFn: () => fetchSettings({ data: { key } }),
    staleTime: 60_000,
  });
}

export function useSaveSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof saveSettings>[0]["data"]) => saveSettings({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

// ─── Audit Logs ────────────────────────────────────────────────────────────

export function useAuditLogs(filters?: { category?: string; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.auditLogs(filters),
    queryFn: () => fetchAuditLogs({ data: filters ?? {} }),
    staleTime: 30_000,
  });
}

export function useCreateAuditLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof createAuditLog>[0]["data"]) => createAuditLog({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["audit-logs"] }),
  });
}

// ─── Dashboard ─────────────────────────────────────────────────────────────

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: () => fetchDashboardStats(),
    staleTime: 60_000,
  });
}

// ─── Profile ───────────────────────────────────────────────────────────────

export function useCurrentProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => fetchCurrentProfile({ data: { userId } }),
    enabled: !!userId,
  });
}

// ─── Analytics ─────────────────────────────────────────────────────────────

export function useAnalytics(days?: number) {
  return useQuery({
    queryKey: queryKeys.analytics(days),
    queryFn: () => fetchAnalytics({ data: { days } }),
    staleTime: 60_000,
  });
}
