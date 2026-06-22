-- ============================================================
-- PACKAGES & COURSES - ADD RICH DETAIL PAGE SUPPORT
-- Mirrors the safari detail page fields so packages and courses
-- each get their own editable detail page.
-- Run this in your Supabase SQL Editor.
-- ============================================================

-- ── PACKAGES ──
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]';
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS included JSONB DEFAULT '[]';
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS not_included JSONB DEFAULT '[]';
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';
ALTER TABLE public.packages ADD COLUMN IF NOT EXISTS "customDetails" JSONB DEFAULT '[]';

-- ── COURSES ──
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS included JSONB DEFAULT '[]';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS not_included JSONB DEFAULT '[]';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS "customDetails" JSONB DEFAULT '[]';

SELECT 'Packages & courses detail migration complete!' AS status;
