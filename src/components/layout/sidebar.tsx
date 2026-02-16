"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Sprout,
    Factory,
    Bot,
    BookOpen,
    Languages,
    Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const NavItem = ({
    to,
    icon: Icon,
    label,
    active,
}: {
    to: string;
    icon: React.ElementType; // Better than any
    label: string;
    active: boolean;
}) => (
    <Link
        href={to}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
            active
                ? "bg-white/10 text-white shadow-lg border border-white/10 backdrop-blur-md"
                : "text-white/60 hover:text-white hover:bg-white/5 hover:translate-x-1"
        )}
    >
        {active && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50" />
        )}
        <Icon className={cn("w-5 h-5 transition-transform", active ? "scale-110" : "group-hover:scale-110")} />
        <span className="font-medium tracking-wide relative z-10">{label}</span>
    </Link>
);

export function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    return (
        <aside className="w-72 h-screen sticky top-0 border-r border-white/5 bg-slate-950/30 backdrop-blur-2xl p-6 flex flex-col z-20">
            <div className="mb-10 px-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20 animate-pulse" />
                <span className="text-xl font-bold tracking-tight text-white/90">
                    CozyTale <span className="text-purple-400 text-xs align-top">Next</span>
                </span>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem
                    to="/"
                    icon={Home}
                    label={t("nav.overview")}
                    active={pathname === "/"}
                />

                <div className="pt-6 pb-2 px-2 text-xs font-semibold text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-full h-px bg-white/5"></span>
                    {t("nav.system")}
                    <span className="w-full h-px bg-white/5"></span>
                </div>

                <NavItem
                    to="/farming"
                    icon={Sprout}
                    label={t("nav.farming")}
                    active={pathname === "/farming"}
                />
                <NavItem
                    to="/industry"
                    icon={Factory}
                    label={t("nav.industry")}
                    active={pathname === "/industry"}
                />
                <NavItem
                    to="/automation"
                    icon={Bot}
                    label={t("nav.automation")}
                    active={pathname === "/automation"}
                />
                <NavItem
                    to="/items"
                    icon={Package}
                    label={t("nav.items")}
                    active={pathname === "/items"}
                />

                <div className="pt-6 pb-2 px-2 text-xs font-semibold text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-full h-px bg-white/5"></span>
                    {t("nav.reference")}
                    <span className="w-full h-px bg-white/5"></span>
                </div>
                <NavItem
                    to="/docs"
                    icon={BookOpen}
                    label={t("nav.docs")}
                    active={pathname.startsWith("/docs")}
                />
            </nav>


        </aside>
    );
}
