"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
    LayoutDashboard,
    Tag,
    Newspaper,
    LogOut,
    Menu,
    X,
    Settings,
    Waves,
    Anchor,
    Ship,
    Loader2,
    Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Safaris", href: "/admin/safaris", icon: Anchor },
    { name: "Offers", href: "/admin/offers", icon: Tag },
    { name: "Updates", href: "/admin/updates", icon: Newspaper },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Setup / DB", href: "/admin/setup", icon: Wrench },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            if (pathname === "/admin/login") {
                setIsLoading(false);
                return;
            }

            // Safety timeout — never hang in loading state more than 5s
            const timeout = setTimeout(() => {
                console.warn("⏱️ Session check timed out — redirecting to login.");
                router.push("/admin/login");
            }, 5000);

            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                clearTimeout(timeout);
                if (error || !session) {
                    console.log("🚫 No session detected. Redirecting to login...");
                    router.push("/admin/login");
                } else {
                    setUser(session.user);
                    setIsLoading(false);
                }
            } catch (error) {
                clearTimeout(timeout);
                console.error("Auth check error:", error);
                router.push("/admin/login");
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("🔑 Auth state changed:", event);
            if (event === 'SIGNED_OUT') {
                setUser(null);
                router.push("/admin/login");
            } else if (event === 'SIGNED_IN' && session) {
                setUser(session.user);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary opacity-50" />
                <p className="text-gray-500 font-display text-[10px] font-black uppercase tracking-[0.3em]">Checking clearance...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-navy font-sans text-white flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-all"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 w-72 bg-[#020408] border-r border-white/5 z-50 transition-all duration-300 transform lg:translate-x-0 shadow-2xl",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="p-8 flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0">
                            <Waves className="w-6 h-6 text-brand-navy" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display text-xl font-black text-white leading-none tracking-tighter uppercase">MAKO</span>
                            <span className="font-body text-[8px] tracking-[0.4em] text-primary font-black ml-0.5 uppercase">ADMIN PORTAL</span>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-8">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden",
                                        isActive
                                            ? "bg-primary text-brand-navy font-bold shadow-lg shadow-primary/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "w-5 h-5 relative z-10 transition-colors",
                                        isActive ? "text-brand-navy" : "text-gray-500 group-hover:text-primary"
                                    )} />
                                    <span className="font-display text-sm uppercase tracking-widest relative z-10">{item.name}</span>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-90" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 mt-auto border-t border-white/5 bg-black/20">
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-gray-500 hover:text-red-400 hover:bg-red-400/10 gap-4 px-5 h-14 rounded-2xl transition-all group"
                        >
                            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span className="font-display text-[10px] font-black uppercase tracking-[0.2em]">Sign Out</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                {/* Header */}
                <header className="h-24 bg-[#020408]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 lg:px-12 relative z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-primary bg-primary/10 hover:bg-primary/20"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </Button>

                    <div className="hidden lg:block">
                        <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-1">Navigation / {pathname.split('/').pop()}</h2>
                        <div className="h-0.5 w-12 bg-primary/30" />
                    </div>

                    <div className="flex items-center gap-6 ml-auto">
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Administrator</span>
                            <span className="text-[10px] text-primary/60 font-medium">Logged in via Supabase</span>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-[1px] shadow-lg shadow-primary/10">
                            <div className="h-full w-full rounded-2xl bg-brand-navy flex items-center justify-center text-sm font-black text-primary">
                                {user?.email?.substring(0, 2).toUpperCase() || "AD"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10 scrollbar-hide">
                    {children}
                </main>
            </div>
        </div>
    );
}
