"use client";

import { ProcessingSimulator } from "@/components/simulators/processing-simulator";
import { useLanguage } from "@/context/LanguageContext";

export default function IndustryPage() {
    const { t } = useLanguage();
    return (
        <div className="space-y-12 max-w-7xl mx-auto px-8 lg:px-12 pt-24 lg:pt-32">
            <section className="space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-light text-white tracking-tight">
                        {t("industry.pageTitle")}
                    </h1>
                    <p className="text-white/60 text-lg font-light max-w-3xl leading-relaxed">
                        {t("industry.intro")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-purple-400 font-medium mb-2">{t("industry.kegTitle")}</h3>
                        <p className="text-sm text-white/50">{t("industry.kegDesc")}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-emerald-400 font-medium mb-2">{t("industry.preservesTitle")}</h3>
                        <p className="text-sm text-white/50">{t("industry.preservesDesc")}</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-50" />
                    <ProcessingSimulator />
                </div>
            </section>
        </div>
    );
}
