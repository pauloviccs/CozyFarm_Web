"use client";

import { ComfortSimulator } from "@/components/simulators/comfort-simulator";
import { useLanguage } from "@/context/LanguageContext";

export default function AutomationPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-12 max-w-7xl mx-auto px-8 lg:px-12 pt-8 lg:pt-12">
            <section className="space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-light text-white tracking-tight">
                        {t("automation.pageTitle")}
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-3xl leading-relaxed">
                        {t("automation.intro")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-emerald-400 font-medium mb-2">{t("automation.biodiversityTitle")}</h3>
                        <p className="text-sm text-white/50">{t("automation.biodiversityDesc")}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-amber-400 font-medium mb-2">{t("automation.decorationTitle")}</h3>
                        <p className="text-sm text-white/50">{t("automation.decorationDesc")}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-purple-400 font-medium mb-2">{t("automation.nocturnalTitle")}</h3>
                        <p className="text-sm text-white/50">{t("automation.nocturnalDesc")}</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50" />
                    <ComfortSimulator />
                </div>
            </section>
        </div>
    );
}
