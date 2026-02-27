"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Clear any stale local sessions first
            await supabase.auth.signOut();

            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            console.log("Attempting login with:", trimmedEmail);

            const { error, data } = await supabase.auth.signInWithPassword({
                email: trimmedEmail,
                password: trimmedPassword,
            });

            if (error) {
                console.error("Supabase Auth Error:", error.message);
                throw error;
            }

            if (!data.user) throw new Error("Authentication failed - no user found.");

            toast.success("Logged in successfully");
            router.refresh();
            router.push("/admin/dashboard");
        } catch (error: any) {
            console.error("Login catch block:", error);
            toast.error(error.message || "Failed to log in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020408] relative overflow-hidden p-6">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Branding Above Card */}
                <div className="flex flex-col items-center mb-10 group">
                    <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/20 rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110 mb-6">
                        <Shield className="w-10 h-10 text-brand-navy" strokeWidth={2.5} />
                    </div>
                    <h1 className="font-display text-4xl font-black text-white tracking-tighter uppercase mb-2">MAKO <span className="text-primary italic">ADMIN</span></h1>
                    <div className="h-1 w-12 bg-primary/40 rounded-full" />
                </div>

                <Card className="border-white/5 bg-brand-navy/50 backdrop-blur-2xl text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="space-y-4 pt-10 px-10 text-center">
                        <CardTitle className="text-3xl font-display font-bold tracking-tight">Secure Access</CardTitle>
                        <CardDescription className="text-gray-400 text-base font-light font-body">
                            Verify your identity to access the Mako Divers control center.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-8 px-10 py-6">
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/80 ml-1">Command Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@makodivers.club"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-16 bg-white/5 border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-[10px] uppercase font-black tracking-[0.3em] text-primary/80 ml-1">Access Key</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-16 bg-white/5 border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="px-10 pb-12 pt-4">
                            <Button
                                type="submit"
                                className="w-full h-16 bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-sm tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/10 transition-all active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? "Decrypting..." : "Launch Dashboard"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Footer Info */}
                <p className="text-center mt-10 text-gray-600 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                    <span className="w-8 h-[1px] bg-white/10" />
                    Proprietary Control System v2.0
                    <span className="w-8 h-[1px] bg-white/10" />
                </p>
            </div>
        </div>
    );
}
