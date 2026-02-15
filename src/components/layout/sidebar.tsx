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
    Gamepad2,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

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
    const { language, toggleLanguage, t } = useLanguage();
    const { user, signInWithDiscord, signOut } = useAuth();

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

            {/* Status Footer */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-sm text-emerald-400 font-medium">
                            V 2.0 (Next.js)
                        </span>
                    </div>
                </div>

                <button
                    onClick={toggleLanguage}
                    className="w-full mt-4 flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <Languages className="w-4 h-4 text-purple-300" />
                        <span className="text-sm text-white/80 group-hover:text-white">
                            {language === 'pt' ? 'Português' : 'English'}
                        </span>
                    </div>
                    <div className="w-8 h-4 rounded-full bg-black/40 relative border border-white/10">
                        <div className={cn(
                            "absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
                            language === 'pt' ? "left-0.5 bg-emerald-400" : "left-4 bg-purple-400"
                        )} />
                    </div>
                </button>

                <div className="mt-4 pt-4 border-t border-white/5">
                    {user ? (
                        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2 overflow-hidden">
                                {user.user_metadata.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt={user.user_metadata.full_name}
                                        className="w-8 h-8 rounded-full border border-white/10"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-300 text-xs font-bold">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-white font-medium truncate">
                                        {user.user_metadata.full_name || user.email}
                                    </p>
                                    <p className="text-[10px] text-white/40 truncate">
                                        {t("auth.logged_in")}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={signOut}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                                title={t("auth.logout")}
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signInWithDiscord}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-all shadow-lg shadow-[#5865F2]/20"
                        >
                            <Gamepad2 className="w-5 h-5" />
                            <span>{t("auth.login_discord")}</span>
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
