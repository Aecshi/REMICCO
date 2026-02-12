-- REMICCO Cleanup: Remove duplicate rows and test data
-- Run this ONCE in Supabase SQL Editor to fix the duplicated data

-- ============================================
-- STEP 1: Remove all test/junk data added via admin
-- ============================================
DELETE FROM services WHERE title ILIKE '%test%';
DELETE FROM news_articles WHERE title ILIKE '%test%' OR title ILIKE '%fasdgsad%' OR title ILIKE '%gdssag%';
DELETE FROM about_content WHERE id NOT IN (SELECT id FROM about_content ORDER BY created_at ASC LIMIT 1);

-- ============================================
-- STEP 2: Remove duplicate hero_content (keep oldest)
-- ============================================
DELETE FROM hero_content
WHERE id NOT IN (
  SELECT id FROM hero_content ORDER BY created_at ASC LIMIT 1
);

-- ============================================
-- STEP 3: Remove duplicate hero_slides (keep one per alt_text)
-- ============================================
DELETE FROM hero_slides
WHERE id NOT IN (
  SELECT DISTINCT ON (alt_text) id FROM hero_slides ORDER BY alt_text, created_at ASC
);

-- ============================================
-- STEP 4: Remove duplicate stats (keep one per label)
-- ============================================
DELETE FROM stats
WHERE id NOT IN (
  SELECT DISTINCT ON (label) id FROM stats ORDER BY label, created_at ASC
);

-- ============================================
-- STEP 5: Remove duplicate highlights (keep one per text)
-- ============================================
DELETE FROM highlights
WHERE id NOT IN (
  SELECT DISTINCT ON (text) id FROM highlights ORDER BY text, created_at ASC
);

-- ============================================
-- STEP 6: Remove duplicate awards (keep one per title)
-- ============================================
DELETE FROM awards
WHERE id NOT IN (
  SELECT DISTINCT ON (title) id FROM awards ORDER BY title, created_at ASC
);

-- ============================================
-- STEP 7: Remove duplicate services (keep one per title)
-- ============================================
DELETE FROM services
WHERE id NOT IN (
  SELECT DISTINCT ON (title) id FROM services ORDER BY title, created_at ASC
);

-- ============================================
-- STEP 8: Remove duplicate news_articles (keep one per title)
-- ============================================
DELETE FROM news_articles
WHERE id NOT IN (
  SELECT DISTINCT ON (title) id FROM news_articles ORDER BY title, created_at ASC
);

-- ============================================
-- STEP 9: Remove duplicate events (keep one per title)
-- ============================================
DELETE FROM events
WHERE id NOT IN (
  SELECT DISTINCT ON (title) id FROM events ORDER BY title, created_at ASC
);

-- ============================================
-- STEP 10: Remove duplicate gallery_images (keep one per image_url)
-- ============================================
DELETE FROM gallery_images
WHERE id NOT IN (
  SELECT DISTINCT ON (image_url) id FROM gallery_images ORDER BY image_url, created_at ASC
);

-- ============================================
-- STEP 11: Remove duplicate contact_info (keep oldest)
-- ============================================
DELETE FROM contact_info
WHERE id NOT IN (
  SELECT id FROM contact_info ORDER BY created_at ASC LIMIT 1
);

-- ============================================
-- VERIFY: Check row counts after cleanup
-- ============================================
SELECT 'hero_content' AS table_name, COUNT(*) AS rows FROM hero_content
UNION ALL SELECT 'hero_slides', COUNT(*) FROM hero_slides
UNION ALL SELECT 'stats', COUNT(*) FROM stats
UNION ALL SELECT 'about_content', COUNT(*) FROM about_content
UNION ALL SELECT 'highlights', COUNT(*) FROM highlights
UNION ALL SELECT 'awards', COUNT(*) FROM awards
UNION ALL SELECT 'services', COUNT(*) FROM services
UNION ALL SELECT 'news_articles', COUNT(*) FROM news_articles
UNION ALL SELECT 'events', COUNT(*) FROM events
UNION ALL SELECT 'gallery_images', COUNT(*) FROM gallery_images
UNION ALL SELECT 'contact_info', COUNT(*) FROM contact_info
ORDER BY table_name;
