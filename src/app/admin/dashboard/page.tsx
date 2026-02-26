"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tag,
    Newspaper,
    Users,
    TrendingUp,
    ArrowUpRight,
    Plus,
    Facebook
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacebookSyncModal } from "@/components/admin/facebook-sync-modal";
import Link from "next/link";

const stats = [
    { name: "Active Offers", value: "3", icon: Tag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Recent Updates", value: "12", icon: Newspaper, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "New Reviews", value: "8", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function AdminDashboard() {
    const [fbModalOpen, setFbModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h1>
                    <p className="text-zinc-400 mt-1">Here's what's happening with Mako Divers today.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setFbModalOpen(true)}
                        className="bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2"
                    >
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                        Sync Facebook Review
                    </Button>
                    <Link href="/admin/offers">
                        <Button className="bg-blue-600 hover:bg-blue-500 gap-2">
                            <Plus className="w-4 h-4" />
                            New Offer
                        </Button>
                    </Link>
                </div>
            </div>

            <FacebookSyncModal open={fbModalOpen} onOpenChange={setFbModalOpen} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400">{stat.name}</CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">+12%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                    <div>
                                        <p className="text-sm font-medium">New Offer: "Dahab Spring Special" published</p>
                                        <p className="text-xs text-zinc-500 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Database Connection</span>
                                <span className="text-emerald-500 font-medium">Connected</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Auth Service</span>
                                <span className="text-emerald-500 font-medium">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Storage Usage</span>
                                <span className="text-zinc-100 font-medium">12.4 GB / 50 GB</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
