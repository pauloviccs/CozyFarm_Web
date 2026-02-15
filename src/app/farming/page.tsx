"use client";

import { SeasonsSimulator } from "@/components/simulators/seasons-simulator";
import { QualitySimulator } from "@/components/simulators/quality-simulator";
import { useLanguage } from "@/context/LanguageContext";

export default function FarmingPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-16 max-w-7xl mx-auto">
            <section className="space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-light text-white tracking-tight">
                        {t("farming.pageTitle")}
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-3xl leading-relaxed">
                        {t("farming.intro")}
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-50" />
                    <QualitySimulator />
                </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-light text-white tracking-tight">
                        {t("farming.seasonsTitle")}
                    </h2>
                    <p className="text-white/60 text-base font-light max-w-2xl">
                        {t("farming.seasonsDesc")}
                    </p>
                </div>
                <SeasonsSimulator />
            </section>
        </div>
    );
}
