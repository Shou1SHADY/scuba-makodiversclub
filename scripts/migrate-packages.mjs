import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const { Client } = pg;

const DATABASE_URL = 'postgresql://postgres:27%40866821koS@db.logewufqgmgxufkovpuw.supabase.co:5432/postgres';
const SUPABASE_URL = 'https://logewufqgmgxufkovpuw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZ2V3dWZxZ21neHVma292cHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTE4OTksImV4cCI6MjA4MjMyNzg5OX0.RxqyoU3IXefl-a9XPtPiNZoxx21SzcFHuSO_h5vha0I';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const packagesData = [
    {
        city: "Hurghada",
        details: "Experience Hurghada",
        duration: "Two Diving Days with Accommodation & Transport.",
        description: "Explore the legendary house reefs and iconic boat sites of Hurghada. A perfect blend of comfort and world-class diving with early 6:00 am check-in available.",
        highlights: ["4 Professional Dives", "New Ivory Suites Hotel", "Resident Rate Available"],
        dates: ["13 February 2026", "11 September 2026"],
        featured: false,
        accent: "from-blue-600/20",
        image: "https://img1.wsimg.com/isteam/ip/85d1d1ee-4c9b-406c-a490-18375363bbb1/7-b80e618.jpg/:/rs=w:1000,h:1000,cg:true"
    },
    {
        city: "Dahab",
        details: "Explore Dahab",
        duration: "Three Diving Days with Accommodation & Transport.",
        description: "Dive the world-famous Blue Hole and Canyon. Experience the unique, laid-back nomadic vibe of Dahab's shore diving.",
        highlights: ["6 Guided Shore Dives", "Boutique Hotel Stay", "Scenic Desert Transfers"],
        dates: ["10 April 2026", "2 July 2026", "6 November 2026"],
        featured: true,
        accent: "from-primary/20",
        image: "https://img1.wsimg.com/isteam/ip/85d1d1ee-4c9b-406c-a490-18375363bbb1/9-ca9a65e.jpg/:/rs=w:1000,h:1000,cg:true"
    },
    {
        city: "Sharm El-Sheikh",
        details: "Experience Sharm",
        duration: "Three Diving Days with Accommodation & Transport.",
        description: "The crown jewel of Red Sea diving. Explore Ras Mohammed National Park and the historic Straits of Tiran.",
        highlights: ["6 Boat Dives", "Premium Resort Stay", "Full Equipment Rental"],
        dates: ["1 May 2026"],
        featured: false,
        accent: "from-emerald-600/20",
        image: "https://img1.wsimg.com/isteam/ip/85d1d1ee-4c9b-406c-a490-18375363bbb1/8-232ccd8.jpg/:/rs=w:1000,h:1000,cg:true"
    }
];

async function migrateAndSeed() {
    console.log('📦 Starting Packages Migration...\n');

    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();

    try {
        console.log('🛠️ Creating packages table if it does not exist...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.packages (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                city TEXT NOT NULL,
                details TEXT NOT NULL,
                duration TEXT NOT NULL,
                description TEXT NOT NULL,
                highlights JSONB DEFAULT '[]',
                dates JSONB DEFAULT '[]',
                featured BOOLEAN DEFAULT false,
                accent TEXT,
                image TEXT,
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );

            -- Enable RLS
            ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

            -- Public can read packages
            DROP POLICY IF EXISTS "Public can read packages" ON public.packages;
            CREATE POLICY "Public can read packages" ON public.packages
                FOR SELECT USING (true);

            -- Authenticated users can manage packages
            DROP POLICY IF EXISTS "Authenticated users can manage packages" ON public.packages;
            CREATE POLICY "Authenticated users can manage packages" ON public.packages
                FOR ALL USING (auth.role() = 'authenticated');

            -- Trigger for updated_at
            DROP TRIGGER IF EXISTS on_packages_updated ON public.packages;
            CREATE TRIGGER on_packages_updated
                BEFORE UPDATE ON public.packages
                FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
        `);
        console.log('✅ Table and policies created successfully.');

        console.log('\n🗑️ Clearing existing packages to prevent duplicates...');
        const { error: deleteError } = await supabase.from('packages').delete().gt('created_at', '2000-01-01');
        if (deleteError) throw deleteError;

        console.log('\n📅 Inserting standard packages...');
        const { data, error: insertError } = await supabase.from('packages').insert(packagesData).select();
        if (insertError) throw insertError;

        console.log(`✅ Inserted ${data.length} packages into the database!`);
        console.log('Done! 🚀');

    } catch (e) {
        console.error('❌ Error during migration/seeding:', e.message);
    } finally {
        await client.end();
    }
}

migrateAndSeed();
