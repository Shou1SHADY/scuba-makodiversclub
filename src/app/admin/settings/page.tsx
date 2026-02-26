"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Megaphone, Save, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [bannerText, setBannerText] = useState("");
    const [bannerLink, setBannerLink] = useState("");
    const [bannerActive, setBannerActive] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .eq('key', 'homepage_banner')
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                setBannerText(data.value.text || "");
                setBannerLink(data.value.link || "");
                setBannerActive(data.value.active ?? true);
            }
        } catch (error: any) {
            console.error("Error fetching settings:", error);
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'homepage_banner',
                    value: {
                        text: bannerText,
                        link: bannerLink,
                        active: bannerActive
                    },
                    updated_at: new Date().toISOString()
                }, { onConflict: 'key' });

            if (error) throw error;
            toast.success("Settings saved successfully");
        } catch (error: any) {
            console.error("Error saving settings:", error);
            toast.error(error.message || "Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white font-display">Global Settings</h1>
                <p className="text-zinc-400 mt-1">Manage site-wide configurations and announcement banners.</p>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Megaphone className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-white">Homepage Announcement Banner</CardTitle>
                            <CardDescription className="text-zinc-500">
                                This banner appears at the very top of the homepage for all visitors.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-medium text-zinc-300">Banner Visibility</Label>
                            <p className="text-xs text-zinc-500 italic">Toggle the display of the announcement banner.</p>
                        </div>
                        <Switch
                            checked={bannerActive}
                            onCheckedChange={setBannerActive}
                            className="data-[state=checked]:bg-blue-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner-text" className="text-sm font-medium text-zinc-300">Banner Message</Label>
                        <Input
                            id="banner-text"
                            placeholder="e.g., North Expedition Mini Safari • 24 Dec '25 • Limited Spots"
                            value={bannerText}
                            onChange={(e) => setBannerText(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-blue-500 h-12"
                        />
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Recommended length: under 80 characters</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="banner-link" className="text-sm font-medium text-zinc-300">Redirect Link (Optional)</Label>
                        <Input
                            id="banner-link"
                            placeholder="e.g., /mini-safaris or external URL"
                            value={bannerLink}
                            onChange={(e) => setBannerLink(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-blue-500 h-12"
                        />
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold italic">Leave empty to use default booking form link</p>
                    </div>
                </CardContent>
                <CardFooter className="border-t border-zinc-800 bg-zinc-900/50 justify-end py-4">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-bold uppercase tracking-widest text-[11px] px-8 h-11"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>

            {/* Preview Section */}
            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Live Preview</h3>
                <div className={`p-3 rounded-xl border border-white/5 text-center transition-all ${bannerActive ? 'bg-zinc-800 opacity-100' : 'bg-zinc-950 opacity-40 grayscale'}`}>
                    <p className="font-body text-[10px] md:text-xs font-bold text-white/50 tracking-[0.2em] uppercase flex items-center justify-center gap-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${bannerActive ? 'bg-primary animate-pulse' : 'bg-zinc-600'}`}></span>
                        {bannerText || "Sample Announcement Message"}
                    </p>
                </div>
            </div>
        </div>
    );
}
