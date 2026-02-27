-- ============================================================
-- MAKO DIVERS CLUB - ADMIN TOOL DATABASE SCHEMA
-- Run this entire script in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/logewufqgmgxufkovpuw/sql
-- ============================================================

-- 1. SAFARIS TABLE
-- Stores all liveaboard / mini-safari / hotel package trips
CREATE TABLE IF NOT EXISTS public.safaris (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Full Liveaboard',
    route TEXT,
    dates TEXT NOT NULL,
    port TEXT,
    yacht TEXT DEFAULT 'HH II',
    price TEXT,
    "earlyBird" TEXT,
    status TEXT DEFAULT 'Booking Now',
    itinerary JSONB DEFAULT '[]',
    included JSONB DEFAULT '[]',
    "notIncluded" JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. OFFERS TABLE
-- Special promotions and discounts shown on the homepage
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    discount TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'scheduled', 'expired')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. UPDATES TABLE
-- News, announcements and community updates
CREATE TABLE IF NOT EXISTS public.updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Mako Team',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SITE SETTINGS TABLE
-- Key-value store for site-wide config (e.g. homepage banner)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures only authenticated admins can modify data
-- Public users can READ active/published records
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.safaris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- SAFARIS: Public can read, authenticated users can do full CRUD
DROP POLICY IF EXISTS "Public can read safaris" ON public.safaris;
CREATE POLICY "Public can read safaris" ON public.safaris
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage safaris" ON public.safaris;
CREATE POLICY "Authenticated users can manage safaris" ON public.safaris
    FOR ALL USING (auth.role() = 'authenticated');

-- OFFERS: Public can read active offers, authenticated users can do full CRUD
DROP POLICY IF EXISTS "Public can read active offers" ON public.offers;
CREATE POLICY "Public can read active offers" ON public.offers
    FOR SELECT USING (status = 'active' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage offers" ON public.offers;
CREATE POLICY "Authenticated users can manage offers" ON public.offers
    FOR ALL USING (auth.role() = 'authenticated');

-- UPDATES: Public can read published, authenticated users do full CRUD
DROP POLICY IF EXISTS "Public can read published updates" ON public.updates;
CREATE POLICY "Public can read published updates" ON public.updates
    FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can manage updates" ON public.updates;
CREATE POLICY "Authenticated users can manage updates" ON public.updates
    FOR ALL USING (auth.role() = 'authenticated');

-- SITE SETTINGS: Public can read, authenticated users can manage 
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA - Default homepage banner setting
-- ============================================================
INSERT INTO public.site_settings (key, value)
VALUES (
    'homepage_banner',
    '{"text": "🤿 North Expedition Mini Safari • Limited Spots Available • Book Now!", "link": "/mini-safaris", "active": true}'
)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- UPDATED_AT TRIGGER (auto-updates the timestamp on edit)
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_safaris_updated ON public.safaris;
CREATE TRIGGER on_safaris_updated
    BEFORE UPDATE ON public.safaris
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_offers_updated ON public.offers;
CREATE TRIGGER on_offers_updated
    BEFORE UPDATE ON public.offers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_updates_updated ON public.updates;
CREATE TRIGGER on_updates_updated
    BEFORE UPDATE ON public.updates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_site_settings_updated ON public.site_settings;
CREATE TRIGGER on_site_settings_updated
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- SUCCESS CONFIRMATION
-- ============================================================
SELECT 'Migration complete! Tables created: safaris, offers, updates, site_settings' AS status;
