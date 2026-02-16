"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LogOut, User, ChevronDown, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/components/auth/AuthModal";

export function Header() {
    const { user, signOut } = useAuth();
    const { t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const main = document.querySelector('main');
            if (main) {
                setScrolled(main.scrollTop > 20);
            }
        };

        const main = document.querySelector('main');
        if (main) {
            main.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (main) {
                main.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-40 w-full px-8 py-4 flex items-center justify-between gap-4 transition-all duration-300",
                    scrolled ? "bg-slate-950/50 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
                )}
            >
                <LanguageToggle />

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:border-white/20 group"
                            >
                                {user.user_metadata.avatar_url ? (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt={user.user_metadata.full_name}
                                        className="w-8 h-8 rounded-full border border-white/10 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-300 text-xs font-bold">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col items-start mr-1">
                                    <span className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors">
                                        {user.user_metadata.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                                    </span>
                                </div>
                                <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform duration-300", isProfileOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-56 p-2 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden origin-top-right z-50"
                                    >
                                        <div className="px-3 py-2 border-b border-white/5 mb-2">
                                            <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">
                                                {t("auth.logged_in")}
                                            </p>
                                            <p className="text-sm text-white truncate font-medium">
                                                {user.user_metadata.full_name || "User"}
                                            </p>
                                            <p className="text-xs text-white/50 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>{t("auth.logout")}</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="group relative px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-all border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                            <div className="flex items-center gap-2">
                                <LogIn className="w-4 h-4 text-purple-300 group-hover:text-purple-200" />
                                <span className="text-sm">{t("auth.login")}</span>
                            </div>
                        </button>
                    )}
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
