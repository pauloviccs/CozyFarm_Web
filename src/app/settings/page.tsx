"use client";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { AccountForm } from "@/components/settings/AccountForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    const { user, isLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-8 px-8 lg:px-12">
            <header className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-light text-white tracking-tight">
                        Configurações
                    </h1>
                </div>
                <p className="text-white/60 text-lg font-light max-w-2xl leading-relaxed ml-1">
                    Gerencie seu perfil, preferências e segurança da conta em um só lugar.
                </p>
            </header>

            <div className="space-y-8">
                <section>
                    <ProfileForm />
                </section>

                <section>
                    <AccountForm />
                </section>
            </div>
        </div>
    );
}
