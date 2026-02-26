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
    Ship
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Safaris", href: "/admin/safaris", icon: Anchor },
    { name: "Offers", href: "/admin/offers", icon: Tag },
    { name: "Updates", href: "/admin/updates", icon: Newspaper },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 transform lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Waves className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Mako Admin</span>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                                    pathname === item.href
                                        ? "bg-blue-600 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5",
                                    pathname === item.href ? "text-white" : "text-zinc-400 group-hover:text-zinc-100"
                                )} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 mt-auto">
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-400/10 gap-3 px-4"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 lg:px-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-zinc-400"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </Button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">
                            AD
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
