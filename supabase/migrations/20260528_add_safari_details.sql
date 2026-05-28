-- ============================================================
-- SAFARIS TABLE - ADD DETAILS & IMAGES SUPPORT
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Add images column for trip image gallery URLs
ALTER TABLE public.safaris ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';

-- Add custom details column for flexible detail sections
-- Each section has: { header: string, items: string[] }
ALTER TABLE public.safaris ADD COLUMN IF NOT EXISTS "customDetails" JSONB DEFAULT '[]';

-- Create storage bucket for trip images (public)
-- Note: This must be run via Supabase dashboard or API.
-- Go to: https://supabase.com/dashboard/project/logewufqgmgxufkovpuw/storage/buckets
-- Create a new public bucket named "trip-images" with the following policies:
--  - Allow public SELECT (read) access
--  - Allow authenticated INSERT (upload) access
--  - Allow authenticated DELETE access

-- Alternatively, use the SQL API to create the bucket:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('trip-images', 'trip-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public can read, authenticated can upload/delete
DROP POLICY IF EXISTS "Public can read trip images" ON storage.objects;
CREATE POLICY "Public can read trip images" ON storage.objects
    FOR SELECT USING (bucket_id = 'trip-images');

DROP POLICY IF EXISTS "Authenticated users can upload trip images" ON storage.objects;
CREATE POLICY "Authenticated users can upload trip images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'trip-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete trip images" ON storage.objects;
CREATE POLICY "Authenticated users can delete trip images" ON storage.objects
    FOR DELETE USING (bucket_id = 'trip-images' AND auth.role() = 'authenticated');

SELECT 'Safari details migration complete! Added images, customDetails columns + trip-images bucket.' AS status;
