import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type {
  HeroSlide,
  HeroContent,
  Stat,
  AboutContent,
  Highlight,
  Award,
  Service,
  NewsArticle,
  Event,
  GalleryImage,
  ContactInfo,
} from '@/types/database';

// ============================================
// ADMIN DATA HOOKS - Fetches ALL records (including inactive)
// ============================================

export function useAdminHeroSlides() {
  return useQuery({
    queryKey: ['admin', 'heroSlides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as HeroSlide[];
    },
  });
}

export function useAdminHeroContent() {
  return useQuery({
    queryKey: ['admin', 'heroContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as HeroContent | null;
    },
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Stat[];
    },
  });
}

export function useAdminAboutContent() {
  return useQuery({
    queryKey: ['admin', 'aboutContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as AboutContent | null;
    },
  });
}

export function useAdminHighlights() {
  return useQuery({
    queryKey: ['admin', 'highlights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('highlights')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Highlight[];
    },
  });
}

export function useAdminAwards() {
  return useQuery({
    queryKey: ['admin', 'awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Award[];
    },
  });
}

export function useAdminServices() {
  return useQuery({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useAdminNewsArticles() {
  return useQuery({
    queryKey: ['admin', 'newsArticles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      return data as NewsArticle[];
    },
  });
}

export function useAdminEvents() {
  return useQuery({
    queryKey: ['admin', 'events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
}

export function useAdminGalleryImages() {
  return useQuery({
    queryKey: ['admin', 'galleryImages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as GalleryImage[];
    },
  });
}

export function useAdminContactInfo() {
  return useQuery({
    queryKey: ['admin', 'contactInfo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as ContactInfo | null;
    },
  });
}
