-- ============================================================
-- FIX RLS POLICIES WITH EXPLICIT WITH CHECK FOR INSERTS
-- Run this in your Supabase SQL Editor
-- ============================================================

DO $$
BEGIN
    -- Drop and recreate safaris policy with WITH CHECK
    IF EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'safaris' AND policyname = 'Authenticated users can manage safaris'
    ) THEN
        DROP POLICY IF EXISTS "Authenticated users can manage safaris" ON public.safaris;
    END IF;

    CREATE POLICY "Authenticated users can manage safaris" ON public.safaris
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

    -- Drop and recreate offers policy with WITH CHECK
    IF EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'offers' AND policyname = 'Authenticated users can manage offers'
    ) THEN
        DROP POLICY IF EXISTS "Authenticated users can manage offers" ON public.offers;
    END IF;

    CREATE POLICY "Authenticated users can manage offers" ON public.offers
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

    -- Drop and recreate updates policy with WITH CHECK
    IF EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'updates' AND policyname = 'Authenticated users can manage updates'
    ) THEN
        DROP POLICY IF EXISTS "Authenticated users can manage updates" ON public.updates;
    END IF;

    CREATE POLICY "Authenticated users can manage updates" ON public.updates
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

    -- Drop and recreate site_settings policy with WITH CHECK
    IF EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'site_settings' AND policyname = 'Authenticated users can manage site settings'
    ) THEN
        DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;
    END IF;

    CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings
        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
END $$;

SELECT 'RLS policies updated with WITH CHECK for INSERT support' AS status;
