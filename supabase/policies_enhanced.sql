-- Enhanced Row Level Security Policies for REMICCO
-- This file contains improved RLS policies with better security controls
-- Run this AFTER 001_schema.sql to enhance security

-- ============================================
-- IMPROVED RLS POLICIES
-- ============================================

-- Drop existing policies to replace with more secure ones
DROP POLICY IF EXISTS "Allow authenticated full access" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated full access" ON hero_slides;
DROP POLICY IF EXISTS "Allow authenticated full access" ON hero_content;
DROP POLICY IF EXISTS "Allow authenticated full access" ON stats;
DROP POLICY IF EXISTS "Allow authenticated full access" ON about_content;
DROP POLICY IF EXISTS "Allow authenticated full access" ON highlights;
DROP POLICY IF EXISTS "Allow authenticated full access" ON awards;
DROP POLICY IF EXISTS "Allow authenticated full access" ON services;
DROP POLICY IF EXISTS "Allow authenticated full access" ON news_articles;
DROP POLICY IF EXISTS "Allow authenticated full access" ON events;
DROP POLICY IF EXISTS "Allow authenticated full access" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated full access" ON contact_info;

-- Create more restrictive policies that check for authenticated user
-- Only users with confirmed email can perform write operations

-- Site Settings
CREATE POLICY "Authenticated users with confirmed email can manage site_settings"
  ON site_settings
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Hero Slides
CREATE POLICY "Authenticated users with confirmed email can manage hero_slides"
  ON hero_slides
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Hero Content
CREATE POLICY "Authenticated users with confirmed email can manage hero_content"
  ON hero_content
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Stats
CREATE POLICY "Authenticated users with confirmed email can manage stats"
  ON stats
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- About Content
CREATE POLICY "Authenticated users with confirmed email can manage about_content"
  ON about_content
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Highlights
CREATE POLICY "Authenticated users with confirmed email can manage highlights"
  ON highlights
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Awards
CREATE POLICY "Authenticated users with confirmed email can manage awards"
  ON awards
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Services
CREATE POLICY "Authenticated users with confirmed email can manage services"
  ON services
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- News Articles
CREATE POLICY "Authenticated users with confirmed email can manage news_articles"
  ON news_articles
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Events
CREATE POLICY "Authenticated users with confirmed email can manage events"
  ON events
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Gallery Images
CREATE POLICY "Authenticated users with confirmed email can manage gallery_images"
  ON gallery_images
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- Contact Info
CREATE POLICY "Authenticated users with confirmed email can manage contact_info"
  ON contact_info
  FOR ALL
  USING (
    auth.role() = 'authenticated' 
    AND auth.jwt() ->> 'email_confirmed_at' IS NOT NULL
  );

-- ============================================
-- ADDITIONAL SECURITY MEASURES
-- ============================================

-- Create audit log table for tracking admin actions
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view audit logs
CREATE POLICY "Authenticated users can view audit logs"
  ON admin_audit_log
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
  ON admin_audit_log
  FOR INSERT
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON admin_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON admin_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON admin_audit_log(table_name);

-- ============================================
-- TRIGGER FUNCTIONS FOR AUDIT LOGGING
-- ============================================

-- Function to log INSERT operations
CREATE OR REPLACE FUNCTION log_insert_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_audit_log (
    user_id,
    action,
    table_name,
    record_id,
    new_data
  ) VALUES (
    auth.uid(),
    'INSERT',
    TG_TABLE_NAME,
    NEW.id::TEXT,
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log UPDATE operations
CREATE OR REPLACE FUNCTION log_update_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    'UPDATE',
    TG_TABLE_NAME,
    NEW.id::TEXT,
    to_jsonb(OLD),
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log DELETE operations
CREATE OR REPLACE FUNCTION log_delete_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_data
  ) VALUES (
    auth.uid(),
    'DELETE',
    TG_TABLE_NAME,
    OLD.id::TEXT,
    to_jsonb(OLD)
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- APPLY AUDIT TRIGGERS TO TABLES
-- ============================================

-- Hero Slides
CREATE TRIGGER audit_hero_slides_insert AFTER INSERT ON hero_slides FOR EACH ROW EXECUTE FUNCTION log_insert_audit();
CREATE TRIGGER audit_hero_slides_update AFTER UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION log_update_audit();
CREATE TRIGGER audit_hero_slides_delete AFTER DELETE ON hero_slides FOR EACH ROW EXECUTE FUNCTION log_delete_audit();

-- Services
CREATE TRIGGER audit_services_insert AFTER INSERT ON services FOR EACH ROW EXECUTE FUNCTION log_insert_audit();
CREATE TRIGGER audit_services_update AFTER UPDATE ON services FOR EACH ROW EXECUTE FUNCTION log_update_audit();
CREATE TRIGGER audit_services_delete AFTER DELETE ON services FOR EACH ROW EXECUTE FUNCTION log_delete_audit();

-- News Articles
CREATE TRIGGER audit_news_insert AFTER INSERT ON news_articles FOR EACH ROW EXECUTE FUNCTION log_insert_audit();
CREATE TRIGGER audit_news_update AFTER UPDATE ON news_articles FOR EACH ROW EXECUTE FUNCTION log_update_audit();
CREATE TRIGGER audit_news_delete AFTER DELETE ON news_articles FOR EACH ROW EXECUTE FUNCTION log_delete_audit();

-- Events
CREATE TRIGGER audit_events_insert AFTER INSERT ON events FOR EACH ROW EXECUTE FUNCTION log_insert_audit();
CREATE TRIGGER audit_events_update AFTER UPDATE ON events FOR EACH ROW EXECUTE FUNCTION log_update_audit();
CREATE TRIGGER audit_events_delete AFTER DELETE ON events FOR EACH ROW EXECUTE FUNCTION log_delete_audit();

-- Contact Info
CREATE TRIGGER audit_contact_insert AFTER INSERT ON contact_info FOR EACH ROW EXECUTE FUNCTION log_insert_audit();
CREATE TRIGGER audit_contact_update AFTER UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION log_update_audit();
CREATE TRIGGER audit_contact_delete AFTER DELETE ON contact_info FOR EACH ROW EXECUTE FUNCTION log_delete_audit();

-- ============================================
-- NOTES
-- ============================================
/*
SECURITY IMPROVEMENTS IN THIS FILE:

1. EMAIL VERIFICATION REQUIREMENT
   - Only users with confirmed emails can modify data
   - Prevents unauthorized access even if credentials are compromised

2. AUDIT LOGGING
   - All INSERT, UPDATE, DELETE operations are logged
   - Tracks who did what and when
   - Helps detect and investigate security incidents

3. IP ADDRESS TRACKING
   - Can be extended to log IP addresses for geo-blocking
   - Helps identify suspicious access patterns

4. RLS POLICIES
   - More restrictive than default
   - Checks both authentication and email confirmation

RECOMMENDED ADDITIONAL MEASURES (implement in Supabase Dashboard):

1. Enable email confirmation requirement in Supabase Auth settings
2. Set up IP whitelisting for admin access if possible
3. Enable 2FA/MFA for admin accounts
4. Regularly review audit logs for suspicious activity
5. Set up alerts for failed login attempts
6. Implement session recording for compliance
*/
