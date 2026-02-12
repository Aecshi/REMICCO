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
// HERO SECTION HOOKS
// ============================================

export function useHeroSlides() {
  return useQuery({
    queryKey: ['heroSlides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as HeroSlide[];
    },
  });
}

export function useHeroContent() {
  return useQuery({
    queryKey: ['heroContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      return data as HeroContent;
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Stat[];
    },
  });
}

// ============================================
// ABOUT SECTION HOOKS
// ============================================

export function useAboutContent() {
  return useQuery({
    queryKey: ['aboutContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      return data as AboutContent;
    },
  });
}

export function useHighlights() {
  return useQuery({
    queryKey: ['highlights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('highlights')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Highlight[];
    },
  });
}

export function useAwards() {
  return useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Award[];
    },
  });
}

// ============================================
// SERVICES SECTION HOOKS
// ============================================

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });
}

// ============================================
// NEWS SECTION HOOKS
// ============================================

export function useNewsArticles(limit?: number) {
  return useQuery({
    queryKey: ['newsArticles', limit],
    queryFn: async () => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .eq('is_active', true)
        .order('published_date', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as NewsArticle[];
    },
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['featuredNews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('published_date', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data?.[0] as NewsArticle | undefined;
    },
  });
}

// Single news article by ID
export function useNewsArticle(id: string | undefined) {
  return useQuery({
    queryKey: ['newsArticle', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as NewsArticle;
    },
    enabled: !!id,
  });
}

// ============================================
// EVENTS HOOKS
// ============================================

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
}

// ============================================
// GALLERY HOOKS
// ============================================

export function useGalleryImages(category?: string) {
  return useQuery({
    queryKey: ['galleryImages', category],
    queryFn: async () => {
      let query = supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as GalleryImage[];
    },
  });
}

export function useGalleryCategories() {
  return useQuery({
    queryKey: ['galleryCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('category')
        .eq('is_active', true);

      if (error) throw error;
      
      const categories = ['All', ...new Set((data || []).map((item: { category: string }) => item.category))];
      return categories;
    },
  });
}

// ============================================
// CONTACT INFO HOOKS
// ============================================

export function useContactInfo() {
  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      return data as ContactInfo;
    },
  });
}
