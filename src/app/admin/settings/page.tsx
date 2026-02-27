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
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary opacity-50" />
                <p className="text-gray-500 font-display text-[10px] font-black uppercase tracking-[0.3em]">Accessing System Config...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                    SYSTEM <span className="text-primary italic">CONFIG</span>
                </h1>
                <p className="text-gray-400 font-body text-base">
                    Calibrate site-wide variables and broadcast high-priority announcements.
                </p>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
                <CardHeader className="p-10 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Megaphone className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-display font-black text-white uppercase tracking-tighter">ANNOUNCEMENT BEACON</CardTitle>
                            <CardDescription className="text-gray-400 text-base font-light font-body mt-1">
                                High-visibility broadcast at the apex of the homepage.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="space-y-1">
                            <Label className="text-sm font-display font-black uppercase tracking-widest text-white">Broadcast Status</Label>
                            <p className="text-xs text-gray-500 font-body">Toggle the visibility of the global announcement.</p>
                        </div>
                        <Switch
                            checked={bannerActive}
                            onCheckedChange={setBannerActive}
                            className="data-[state=checked]:bg-primary"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="banner-text" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Payload Message</Label>
                        <Input
                            id="banner-text"
                            placeholder="e.g., North Expedition Mini Safari • 24 Dec '25 • Limited Spots"
                            value={bannerText}
                            onChange={(e) => setBannerText(e.target.value)}
                            className="h-16 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20 font-body text-base"
                        />
                        <div className="flex justify-between items-center px-1">
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Optimum: &lt; 80 Characters</p>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{bannerText.length}/80</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="banner-link" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Navigation Vector (Optional Link)</Label>
                        <Input
                            id="banner-link"
                            placeholder="e.g., /mini-safaris"
                            value={bannerLink}
                            onChange={(e) => setBannerLink(e.target.value)}
                            className="h-16 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20 font-body text-base"
                        />
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black italic ml-1">Defaults to Global Reservation System if omitted.</p>
                    </div>
                </CardContent>
                <CardFooter className="p-10 border-t border-white/5 bg-black/40 justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-16 px-12 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-primary/20 transition-all gap-3"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Commit Configuration
                    </Button>
                </CardFooter>
            </Card>

            {/* Preview Section */}
            <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-600 ml-1 flex items-center gap-3">
                    <span className="w-12 h-px bg-gray-800"></span>
                    Live Deployment Preview
                    <span className="w-12 h-px bg-gray-800"></span>
                </h3>
                <div className={`p-6 rounded-[2rem] border transition-all duration-700 relative overflow-hidden ${bannerActive ? 'bg-primary border-primary/20 shadow-2xl shadow-primary/10' : 'bg-[#020408] border-white/5 opacity-40 grayscale'}`}>
                    <div className="flex items-center justify-center gap-4 relative z-10">
                        <div className={`w-2 h-2 rounded-full ${bannerActive ? 'bg-brand-navy animate-pulse' : 'bg-gray-800'}`}></div>
                        <p className={`font-display font-black text-[11px] md:text-xs tracking-[0.25em] uppercase text-center ${bannerActive ? 'text-brand-navy' : 'text-gray-500'}`}>
                            {bannerText || "SIGNAL DEPLETED - STANDBY FOR INPUT"}
                        </p>
                    </div>
                    {bannerActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
