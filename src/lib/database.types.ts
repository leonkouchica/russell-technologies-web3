/**
 * Database types generated from Supabase schema.
 * Matches the 11 tables created in the russelltech-web project.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          status: string;
          author_id: string | null;
          author_name: string | null;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          featured: boolean;
          views: number;
          comments_count: number;
          scheduled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          status?: string;
          author_id?: string | null;
          author_name?: string | null;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          featured?: boolean;
          views?: number;
          comments_count?: number;
          scheduled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          status?: string;
          author_id?: string | null;
          author_name?: string | null;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          featured?: boolean;
          views?: number;
          comments_count?: number;
          scheduled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          type: string;
          status: string;
          date_time: string;
          location: string | null;
          registered_count: number;
          max_attendees: number | null;
          image_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          type: string;
          status?: string;
          date_time: string;
          location?: string | null;
          registered_count?: number;
          max_attendees?: number | null;
          image_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          type?: string;
          status?: string;
          date_time?: string;
          location?: string | null;
          registered_count?: number;
          max_attendees?: number | null;
          image_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscribers: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          status: string;
          source: string;
          subscribed_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email: string;
          status?: string;
          source?: string;
          subscribed_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          status?: string;
          source?: string;
          subscribed_at?: string;
          updated_at?: string;
        };
      };
      campaigns: {
        Row: {
          id: string;
          title: string;
          subject: string;
          preheader: string | null;
          audience: string;
          html_content: string | null;
          plain_text: string | null;
          status: string;
          open_rate: number;
          click_rate: number;
          sent_count: number;
          scheduled_at: string | null;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          preheader?: string | null;
          audience?: string;
          html_content?: string | null;
          plain_text?: string | null;
          status?: string;
          open_rate?: number;
          click_rate?: number;
          sent_count?: number;
          scheduled_at?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          preheader?: string | null;
          audience?: string;
          html_content?: string | null;
          plain_text?: string | null;
          status?: string;
          open_rate?: number;
          click_rate?: number;
          sent_count?: number;
          scheduled_at?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          service: string | null;
          budget: string | null;
          message: string | null;
          status: string;
          created_at: string;
          responded_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          service?: string | null;
          budget?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
          responded_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          service?: string | null;
          budget?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
          responded_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string | null;
          post_title: string | null;
          author: string;
          email: string | null;
          content: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          post_title?: string | null;
          author: string;
          email?: string | null;
          content: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          post_title?: string | null;
          author?: string;
          email?: string | null;
          content?: string;
          status?: string;
          created_at?: string;
        };
      };
      media_files: {
        Row: {
          id: string;
          title: string;
          filename: string;
          format: string;
          size_bytes: number | null;
          size_display: string | null;
          dimensions: string | null;
          duration: string | null;
          folder: string;
          storage_path: string;
          public_url: string;
          alt_text: string | null;
          caption: string | null;
          tags: string[];
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          filename: string;
          format: string;
          size_bytes?: number | null;
          size_display?: string | null;
          dimensions?: string | null;
          duration?: string | null;
          folder?: string;
          storage_path: string;
          public_url: string;
          alt_text?: string | null;
          caption?: string | null;
          tags?: string[];
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          filename?: string;
          format?: string;
          size_bytes?: number | null;
          size_display?: string | null;
          dimensions?: string | null;
          duration?: string | null;
          folder?: string;
          storage_path?: string;
          public_url?: string;
          alt_text?: string | null;
          caption?: string | null;
          tags?: string[];
          uploaded_by?: string | null;
          created_at?: string;
        };
      };
      admin_profiles: {
        Row: {
          id: string;
          name: string | null;
          title: string | null;
          role: string;
          status: string;
          email: string | null;
          avatar_url: string | null;
          initials: string | null;
          last_login: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          title?: string | null;
          role?: string;
          status?: string;
          email?: string | null;
          avatar_url?: string | null;
          initials?: string | null;
          last_login?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          title?: string | null;
          role?: string;
          status?: string;
          email?: string | null;
          avatar_url?: string | null;
          initials?: string | null;
          last_login?: string | null;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          action: string;
          category: string;
          target: string | null;
          user_name: string | null;
          user_role: string | null;
          ip_address: string | null;
          status: string;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          action: string;
          category: string;
          target?: string | null;
          user_name?: string | null;
          user_role?: string | null;
          ip_address?: string | null;
          status?: string;
          details?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          action?: string;
          category?: string;
          target?: string | null;
          user_name?: string | null;
          user_role?: string | null;
          ip_address?: string | null;
          status?: string;
          details?: string | null;
          created_at?: string;
        };
      };
      page_views: {
        Row: {
          id: string;
          path: string;
          referrer: string | null;
          user_agent: string | null;
          country: string | null;
          device: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          path: string;
          referrer?: string | null;
          user_agent?: string | null;
          country?: string | null;
          device?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          path?: string;
          referrer?: string | null;
          user_agent?: string | null;
          country?: string | null;
          device?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
