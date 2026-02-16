-- Migration: Add image_url column to services table
-- Run this SQL in your Supabase SQL Editor

-- Add image_url column to services table
ALTER TABLE services
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Optional: Add comment to the column
COMMENT ON COLUMN services.image_url IS 'URL or path to the service image for bento cards';
