import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        const supabase = await createClient();

        // Check auth session
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        // Test table connectivity
        const tableTests: Record<string, any> = {};

        // These tables have an 'id' column
        for (const table of ['safaris', 'offers', 'updates'] as const) {
            const { data, error } = await supabase.from(table).select('id').limit(1);
            tableTests[table] = {
                exists: !error,
                error: error?.message || null,
                rowCount: data?.length ?? 0,
            };
        }

        // site_settings uses 'key' as PK, not 'id'
        const { data: settingsData, error: settingsError } = await supabase
            .from('site_settings').select('key').limit(1);
        tableTests['site_settings'] = {
            exists: !settingsError,
            error: settingsError?.message || null,
            rowCount: settingsData?.length ?? 0,
        };

        return NextResponse.json({
            authenticated: !!user,
            user: user ? { id: user.id, email: user.email } : null,
            authError: authError?.message || null,
            tables: tableTests,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
