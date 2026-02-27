"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, XCircle, Loader2, Database, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const MIGRATION_SQL = `
-- SAFARIS TABLE
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

-- OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    discount TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'scheduled', 'expired')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- UPDATES TABLE
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

-- SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE RLS
ALTER TABLE public.safaris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR SAFARIS
DROP POLICY IF EXISTS "Public can read safaris" ON public.safaris;
CREATE POLICY "Public can read safaris" ON public.safaris FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can manage safaris" ON public.safaris;
CREATE POLICY "Authenticated users can manage safaris" ON public.safaris FOR ALL USING (auth.role() = 'authenticated');

-- RLS POLICIES FOR OFFERS
DROP POLICY IF EXISTS "Public can read active offers" ON public.offers;
CREATE POLICY "Public can read active offers" ON public.offers FOR SELECT USING (status = 'active' OR auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can manage offers" ON public.offers;
CREATE POLICY "Authenticated users can manage offers" ON public.offers FOR ALL USING (auth.role() = 'authenticated');

-- RLS POLICIES FOR UPDATES
DROP POLICY IF EXISTS "Public can read published updates" ON public.updates;
CREATE POLICY "Public can read published updates" ON public.updates FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can manage updates" ON public.updates;
CREATE POLICY "Authenticated users can manage updates" ON public.updates FOR ALL USING (auth.role() = 'authenticated');

-- RLS POLICIES FOR SITE SETTINGS
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- SEED DEFAULT BANNER
INSERT INTO public.site_settings (key, value)
VALUES ('homepage_banner', '{"text": "North Expedition Mini Safari - Limited Spots Available - Book Now!", "link": "/mini-safaris", "active": true}')
ON CONFLICT (key) DO NOTHING;
`;

interface TestResult {
    table: string;
    status: 'ok' | 'error' | 'testing';
    message: string;
}

export default function AdminSetupPage() {
    const [testing, setTesting] = useState(false);
    const [results, setResults] = useState<TestResult[]>([]);
    const supabase = createClient();

    const TABLES = ['safaris', 'offers', 'updates', 'site_settings'];

    const runDiagnostics = async () => {
        setTesting(true);
        setResults([]);
        const newResults: TestResult[] = [];

        for (const table of TABLES) {
            newResults.push({ table, status: 'testing', message: 'Checking...' });
            setResults([...newResults]);

            const { data, error } = await supabase.from(table).select('id').limit(1);

            const idx = newResults.findIndex(r => r.table === table);
            if (error) {
                newResults[idx] = { table, status: 'error', message: error.message };
            } else {
                newResults[idx] = { table, status: 'ok', message: `Connected. ${data?.length ?? 0} rows sampled.` };
            }
            setResults([...newResults]);
        }

        setTesting(false);
    };

    const copyMigration = () => {
        navigator.clipboard.writeText(MIGRATION_SQL.trim());
        toast.success("SQL copied to clipboard! Paste it in your Supabase SQL Editor.");
    };

    const allOk = results.length > 0 && results.every(r => r.status === 'ok');
    const hasErrors = results.some(r => r.status === 'error');

    return (
        <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                    SYSTEM <span className="text-primary italic">SETUP</span>
                </h1>
                <p className="text-gray-400 font-body text-base max-w-lg">
                    Database diagnostics and migration tools. Run this once to initialize the Mako admin schema.
                </p>
            </div>

            {/* Step 1: Diagnose */}
            <div className="bg-[#020408]/40 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Database className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Step 1: Run Diagnostics</h2>
                        <p className="text-gray-400 text-sm font-body mt-1">Check which tables exist and are accessible.</p>
                    </div>
                </div>

                <Button
                    onClick={runDiagnostics}
                    disabled={testing}
                    className="h-14 px-10 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-primary/20 gap-3"
                >
                    {testing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                    {testing ? 'Scanning...' : 'Run Database Scan'}
                </Button>

                {results.length > 0 && (
                    <div className="space-y-3">
                        {results.map((r) => (
                            <div key={r.table} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                {r.status === 'testing' && <Loader2 className="w-5 h-5 animate-spin text-primary opacity-60 shrink-0" />}
                                {r.status === 'ok' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                                {r.status === 'error' && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                                <div className="flex-1 min-w-0">
                                    <p className="font-display font-black text-xs uppercase tracking-widest text-white">{r.table}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">{r.message}</p>
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${r.status === 'ok' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                                        r.status === 'error' ? 'text-red-400 border-red-400/20 bg-red-400/5' :
                                            'text-gray-500 border-white/10'
                                    }`}>
                                    {r.status === 'testing' ? 'Checking' : r.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {allOk && (
                    <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-emerald-400 font-display font-black text-sm uppercase tracking-widest">✅ All systems operational. Admin tool is fully connected.</p>
                    </div>
                )}
            </div>

            {/* Step 2: Run Migration (only show if there are errors or no results yet) */}
            {(hasErrors || results.length === 0) && (
                <div className="bg-[#020408]/40 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                            <ExternalLink className="w-7 h-7 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Step 2: Apply Migration</h2>
                            <p className="text-gray-400 text-sm font-body mt-1">
                                One or more tables are missing. Copy the SQL below and run it in your Supabase dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={copyMigration}
                            className="h-14 px-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-black uppercase text-[10px] tracking-[0.2em] gap-3 flex-1"
                        >
                            <Copy className="w-5 h-5" />
                            Copy Migration SQL
                        </Button>
                        <a
                            href="https://supabase.com/dashboard/project/logewufqgmgxufkovpuw/sql"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <Button className="w-full h-14 px-8 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.2em] gap-3">
                                <ExternalLink className="w-5 h-5" />
                                Open Supabase SQL Editor
                            </Button>
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">How to apply:</p>
                        <ol className="space-y-2">
                            {[
                                '1. Click "Copy Migration SQL" above',
                                '2. Click "Open Supabase SQL Editor"',
                                '3. Paste the SQL into the editor',
                                '4. Click "Run" (or press Ctrl+Enter)',
                                '5. Come back and click "Run Database Scan" to verify'
                            ].map((step, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
}
