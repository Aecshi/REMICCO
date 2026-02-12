import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];

// Generic mutation hook factory
function createMutation<T extends keyof Tables>(
  tableName: T,
  queryKeys: string[][] // Multiple query keys to invalidate
) {
  return () => {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
      queryKeys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    };

    const insertMutation = useMutation({
      mutationFn: async (data: Tables[T]["Insert"]) => {
        const { data: result, error } = await supabase
          .from(tableName)
          .insert(data as any)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      onSuccess: invalidateAll,
    });

    const updateMutation = useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Tables[T]["Update"] }) => {
        const { data: result, error } = await supabase
          .from(tableName)
          .update(data as any)
          .eq("id", id as any)
          .select()
          .single();
        if (error) throw error;
        return result;
      },
      onSuccess: invalidateAll,
    });

    const deleteMutation = useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", id as any);
        if (error) throw error;
      },
      onSuccess: invalidateAll,
    });

    return {
      insert: insertMutation,
      update: updateMutation,
      delete: deleteMutation,
    };
  };
}

// Export mutation hooks for each table - invalidates both admin and public caches
export const useHeroSlidesMutation = createMutation("hero_slides", [["heroSlides"], ["admin", "heroSlides"]]);
export const useHeroContentMutation = createMutation("hero_content", [["heroContent"], ["admin", "heroContent"]]);
export const useStatsMutation = createMutation("stats", [["stats"], ["admin", "stats"]]);
export const useAboutContentMutation = createMutation("about_content", [["aboutContent"], ["admin", "aboutContent"]]);
export const useHighlightsMutation = createMutation("highlights", [["highlights"], ["admin", "highlights"]]);
export const useAwardsMutation = createMutation("awards", [["awards"], ["admin", "awards"]]);
export const useServicesMutation = createMutation("services", [["services"], ["admin", "services"]]);
export const useNewsArticlesMutation = createMutation("news_articles", [["newsArticles"], ["admin", "newsArticles"]]);
export const useEventsMutation = createMutation("events", [["events"], ["admin", "events"]]);
export const useGalleryImagesMutation = createMutation("gallery_images", [["galleryImages"], ["admin", "galleryImages"]]);
export const useContactInfoMutation = createMutation("contact_info", [["contactInfo"], ["admin", "contactInfo"]]);
export const useSiteSettingsMutation = createMutation("site_settings", [["siteSettings"], ["admin", "siteSettings"]]);
