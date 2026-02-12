export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Site Settings - General site configuration
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Hero Slides - For the hero section slider
      hero_slides: {
        Row: {
          id: string;
          image_url: string;
          alt_text: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          alt_text: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          alt_text?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Hero Content - Main hero section text content
      hero_content: {
        Row: {
          id: string;
          tagline: string;
          heading: string;
          heading_highlight: string;
          description: string;
          primary_button_text: string;
          primary_button_link: string;
          secondary_button_text: string;
          secondary_button_link: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tagline: string;
          heading: string;
          heading_highlight: string;
          description: string;
          primary_button_text: string;
          primary_button_link: string;
          secondary_button_text?: string;
          secondary_button_link?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tagline?: string;
          heading?: string;
          heading_highlight?: string;
          description?: string;
          primary_button_text?: string;
          primary_button_link?: string;
          secondary_button_text?: string;
          secondary_button_link?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Stats - Statistics shown in hero section
      stats: {
        Row: {
          id: string;
          label: string;
          value: string;
          icon: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          value: string;
          icon: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          value?: string;
          icon?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // About Content - About section content
      about_content: {
        Row: {
          id: string;
          section_tag: string;
          section_title: string;
          paragraphs: string[];
          quote_text: string;
          quote_author: string;
          citation_text: string;
          citation_url: string;
          vision_title: string;
          vision_text: string;
          mission_title: string;
          mission_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_tag: string;
          section_title: string;
          paragraphs: string[];
          quote_text: string;
          quote_author: string;
          citation_text?: string;
          citation_url?: string;
          vision_title: string;
          vision_text: string;
          mission_title: string;
          mission_text: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_tag?: string;
          section_title?: string;
          paragraphs?: string[];
          quote_text?: string;
          quote_author?: string;
          citation_text?: string;
          citation_url?: string;
          vision_title?: string;
          vision_text?: string;
          mission_title?: string;
          mission_text?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Highlights - About section highlights/checkmarks
      highlights: {
        Row: {
          id: string;
          text: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          text?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Awards - Recognition and awards
      awards: {
        Row: {
          id: string;
          year: string;
          title: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year: string;
          title: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          year?: string;
          title?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Services - Programs and services offered
      services: {
        Row: {
          id: string;
          icon: string;
          title: string;
          description: string;
          full_description: string | null;
          features: Json;
          requirements: Json;
          terms: string | null;
          interest_rate: string | null;
          loan_amount_range: string | null;
          payment_terms: string | null;
          contact_info: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          icon: string;
          title: string;
          description: string;
          full_description?: string | null;
          features?: Json;
          requirements?: Json;
          terms?: string | null;
          interest_rate?: string | null;
          loan_amount_range?: string | null;
          payment_terms?: string | null;
          contact_info?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          icon?: string;
          title?: string;
          description?: string;
          full_description?: string | null;
          features?: Json;
          requirements?: Json;
          terms?: string | null;
          interest_rate?: string | null;
          loan_amount_range?: string | null;
          payment_terms?: string | null;
          contact_info?: string | null;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // News Articles
      news_articles: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string | null;
          image_url: string;
          category: string;
          author: string | null;
          source: string | null;
          source_url: string | null;
          published_date: string;
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content?: string | null;
          image_url: string;
          category: string;
          author?: string | null;
          source?: string | null;
          source_url?: string | null;
          published_date: string;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string | null;
          image_url?: string;
          category?: string;
          author?: string | null;
          source?: string | null;
          source_url?: string | null;
          published_date?: string;
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Events - Upcoming events for the ticker
      events: {
        Row: {
          id: string;
          title: string;
          event_date: string;
          location: string;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          event_date: string;
          location: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          event_date?: string;
          location?: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Gallery Images
      gallery_images: {
        Row: {
          id: string;
          image_url: string;
          title: string;
          category: string;
          date: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title: string;
          category: string;
          date: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string;
          category?: string;
          date?: string;
          order_index?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Contact Info - Footer contact information
      contact_info: {
        Row: {
          id: string;
          address: string;
          phone: string;
          email: string;
          office_hours: string[];
          facebook_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          address: string;
          phone: string;
          email: string;
          office_hours: string[];
          facebook_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          address?: string;
          phone?: string;
          email?: string;
          office_hours?: string[];
          facebook_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
export type HeroContent = Database['public']['Tables']['hero_content']['Row'];
export type Stat = Database['public']['Tables']['stats']['Row'];
export type AboutContent = Database['public']['Tables']['about_content']['Row'];
export type Highlight = Database['public']['Tables']['highlights']['Row'];
export type Award = Database['public']['Tables']['awards']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type NewsArticle = Database['public']['Tables']['news_articles']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];
export type ContactInfo = Database['public']['Tables']['contact_info']['Row'];
export type SiteSetting = Database['public']['Tables']['site_settings']['Row'];
