-- ============================================
-- REMICCO Database RLS Policies
-- Run this in Supabase SQL Editor to enable
-- proper permissions for admin CRUD operations
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (for website visitors)
-- ============================================

-- Hero Slides - Public can read active slides
CREATE POLICY "Public can view active hero slides" ON public.hero_slides
    FOR SELECT USING (is_active = true);

-- Hero Content - Public can read
CREATE POLICY "Public can view hero content" ON public.hero_content
    FOR SELECT USING (true);

-- Stats - Public can read active stats
CREATE POLICY "Public can view active stats" ON public.stats
    FOR SELECT USING (is_active = true);

-- About Content - Public can read
CREATE POLICY "Public can view about content" ON public.about_content
    FOR SELECT USING (true);

-- Highlights - Public can read active highlights
CREATE POLICY "Public can view active highlights" ON public.highlights
    FOR SELECT USING (is_active = true);

-- Awards - Public can read active awards
CREATE POLICY "Public can view active awards" ON public.awards
    FOR SELECT USING (is_active = true);

-- Services - Public can read active services
CREATE POLICY "Public can view active services" ON public.services
    FOR SELECT USING (is_active = true);

-- News Articles - Public can read active articles
CREATE POLICY "Public can view active news articles" ON public.news_articles
    FOR SELECT USING (is_active = true);

-- Events - Public can read active events
CREATE POLICY "Public can view active events" ON public.events
    FOR SELECT USING (is_active = true);

-- Gallery Images - Public can read active images
CREATE POLICY "Public can view active gallery images" ON public.gallery_images
    FOR SELECT USING (is_active = true);

-- Contact Info - Public can read
CREATE POLICY "Public can view contact info" ON public.contact_info
    FOR SELECT USING (true);

-- Site Settings - Public can read
CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);

-- ============================================
-- AUTHENTICATED ADMIN POLICIES (Full CRUD)
-- ============================================

-- Hero Slides - Admin full access
CREATE POLICY "Admins can do everything with hero slides" ON public.hero_slides
    FOR ALL USING (auth.role() = 'authenticated');

-- Hero Content - Admin full access
CREATE POLICY "Admins can do everything with hero content" ON public.hero_content
    FOR ALL USING (auth.role() = 'authenticated');

-- Stats - Admin full access
CREATE POLICY "Admins can do everything with stats" ON public.stats
    FOR ALL USING (auth.role() = 'authenticated');

-- About Content - Admin full access
CREATE POLICY "Admins can do everything with about content" ON public.about_content
    FOR ALL USING (auth.role() = 'authenticated');

-- Highlights - Admin full access
CREATE POLICY "Admins can do everything with highlights" ON public.highlights
    FOR ALL USING (auth.role() = 'authenticated');

-- Awards - Admin full access
CREATE POLICY "Admins can do everything with awards" ON public.awards
    FOR ALL USING (auth.role() = 'authenticated');

-- Services - Admin full access
CREATE POLICY "Admins can do everything with services" ON public.services
    FOR ALL USING (auth.role() = 'authenticated');

-- News Articles - Admin full access
CREATE POLICY "Admins can do everything with news articles" ON public.news_articles
    FOR ALL USING (auth.role() = 'authenticated');

-- Events - Admin full access
CREATE POLICY "Admins can do everything with events" ON public.events
    FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Images - Admin full access
CREATE POLICY "Admins can do everything with gallery images" ON public.gallery_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Contact Info - Admin full access
CREATE POLICY "Admins can do everything with contact info" ON public.contact_info
    FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings - Admin full access
CREATE POLICY "Admins can do everything with site settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE POLICIES (for image uploads)
-- ============================================

-- Create a storage bucket for images if it doesn't exist
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO NOTHING;

-- Allow public access to view images
-- CREATE POLICY "Public can view images" ON storage.objects
--     FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
-- CREATE POLICY "Authenticated users can upload images" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their images
-- CREATE POLICY "Authenticated users can update images" ON storage.objects
--     FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images
-- CREATE POLICY "Authenticated users can delete images" ON storage.objects
--     FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
