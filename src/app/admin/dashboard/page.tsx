"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Tag,
    Newspaper,
    Users,
    TrendingUp,
    ArrowUpRight,
    Plus,
    Facebook,
    Waves,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacebookSyncModal } from "@/components/admin/facebook-sync-modal";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
    { name: "Active Offers", value: "3", icon: Tag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Recent Updates", value: "12", icon: Newspaper, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "New Reviews", value: "8", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function AdminDashboard() {
    const [fbModalOpen, setFbModalOpen] = useState(false);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none">
                        COMMAND <span className="text-primary italic">CENTER</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Welcome back, Admin. System operational. Monitoring Mako Divers Club metrics in real-time.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setFbModalOpen(true)}
                        className="bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-primary/50 gap-3 h-14 px-6 rounded-2xl transition-all shadow-xl"
                    >
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                        <span className="font-display text-[10px] font-black uppercase tracking-[0.2em]">Sync Reviews</span>
                    </Button>
                    <Link href="/admin/offers">
                        <Button className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em]">
                            <Plus className="w-5 h-5" />
                            Launch Mission
                        </Button>
                    </Link>
                </div>
            </div>

            <FacebookSyncModal open={fbModalOpen} onOpenChange={setFbModalOpen} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                    <Card key={stat.name} className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:translate-y-[-4px] shadow-2xl relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon size={80} />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-8 px-8">
                            <CardTitle className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">{stat.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="text-5xl font-display font-black text-white mb-2">{stat.value}</div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[10px] font-black text-emerald-400">+12.4%</span>
                                </div>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Growth Factor</span>
                            </div>
                        </CardContent>
                        <div className="h-1.5 w-full bg-white/5 relative">
                            <div className={`absolute left-0 top-0 h-full ${stat.bg} w-[65%]`} />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3 bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between bg-black/20">
                        <div className="space-y-1">
                            <CardTitle className="font-display font-black text-xl text-white tracking-widest">RECENT ACTIVITIES</CardTitle>
                            <CardDescription className="text-gray-500 text-xs uppercase tracking-widest">LOG DATA / LAST 24 HOURS</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white">View Full Logs</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {[
                                { title: "Dahab Spring Special published", time: "2 hours ago", icon: Tag, color: "text-primary" },
                                { title: "System migration completed", time: "5 hours ago", icon: Waves, color: "text-blue-400" },
                                { title: "Facebook reviews synchronized", time: "12 hours ago", icon: Facebook, color: "text-[#1877F2]" },
                                { title: "Hero backup generated", time: "1 day ago", icon: Shield, color: "text-emerald-400" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center gap-6 p-8 hover:bg-white/[0.02] transition-colors group">
                                    <div className={cn("p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all", activity.color)}>
                                        <activity.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white uppercase tracking-wider">{activity.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{activity.time}</p>
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="text-gray-700 hover:text-white group-hover:translate-x-1 transition-all">
                                        <ArrowUpRight size={18} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
                    <CardHeader className="p-8 border-b border-white/5 bg-black/20">
                        <CardTitle className="font-display font-black text-xl text-white tracking-widest">SYSTEM PULSE</CardTitle>
                        <CardDescription className="text-gray-500 text-xs uppercase tracking-widest">INFRASTRUCTURE STATUS</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8 flex-1">
                        <PulseItem label="Database Cluster" status="Operational" level={98} />
                        <PulseItem label="Authentication Core" status="Secure" level={100} />
                        <PulseItem label="Content API Gateway" status="Active" level={92} />
                        <PulseItem label="Media Storage Unit" status="82% Capacity" level={82} />
                    </CardContent>
                    <div className="p-8 mt-auto bg-primary/5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Shield className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-widest">Security Level</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">MAXIMUM / SSL ENCRYPTED</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

const PulseItem = ({ label, status, level }: { label: string, status: string, level: number }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-end">
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{status}</p>
            </div>
            <span className="text-xs font-black text-primary/60">{level}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000"
                style={{ width: `${level}%` }}
            />
        </div>
    </div>
);
