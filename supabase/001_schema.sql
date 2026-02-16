-- REMICCO Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tagline VARCHAR(255) NOT NULL,
  heading TEXT NOT NULL,
  heading_highlight VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  primary_button_text VARCHAR(100) NOT NULL,
  primary_button_link VARCHAR(255) NOT NULL,
  secondary_button_text VARCHAR(100),
  secondary_button_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats Table
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  value VARCHAR(50) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_tag VARCHAR(255) NOT NULL,
  section_title VARCHAR(255) NOT NULL,
  paragraphs TEXT[] NOT NULL,
  quote_text TEXT NOT NULL,
  quote_author VARCHAR(255) NOT NULL,
  citation_text TEXT,
  citation_url VARCHAR(500),
  vision_title VARCHAR(255) NOT NULL,
  vision_text TEXT NOT NULL,
  mission_title VARCHAR(255) NOT NULL,
  mission_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Highlights Table
CREATE TABLE IF NOT EXISTS highlights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards Table
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year VARCHAR(10) NOT NULL,
  title TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  icon VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  full_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  terms TEXT,
  interest_rate VARCHAR(100),
  loan_amount_range VARCHAR(100),
  payment_terms VARCHAR(200),
  contact_info TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255),
  source VARCHAR(255),
  source_url TEXT,
  published_date DATE NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info Table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  office_hours TEXT[] NOT NULL,
  facebook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_stats_active ON stats(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_highlights_active ON highlights(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_awards_active ON awards(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_news_active ON news_articles(is_active, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active, event_date);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_images(is_active, order_index);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_highlights_updated_at BEFORE UPDATE ON highlights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables (anonymous users can view)
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON highlights FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON awards FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON news_articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON contact_info FOR SELECT USING (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Allow authenticated full access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON highlights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON news_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
