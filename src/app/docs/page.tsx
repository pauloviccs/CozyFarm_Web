"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function DocsPage() {
    const { t } = useLanguage();
    return (
        <div className="max-w-4xl mx-auto space-y-6 px-8 lg:px-12 pt-8 lg:pt-12">
            <h1 className="text-4xl font-light text-white tracking-tight">{t("docs.introTitle")}</h1>
            <p className="text-lg text-white/70 leading-relaxed">
                {t("docs.introText")}
            </p>

            <hr className="border-white/10 my-8" />

            <h2 className="text-2xl font-medium text-white mb-4">{t("docs.corePhilosophy")}</h2>
            <ul className="space-y-3 list-disc list-inside text-white/60">
                <li><strong className="text-white/90">{t("docs.interactivity")}</strong> {t("docs.interactivityDesc")}</li>
                <li><strong className="text-white/90">{t("docs.progression")}</strong> {t("docs.progressionDesc")}</li>
                <li><strong className="text-white/90">{t("docs.aesthetics")}</strong> {t("docs.aestheticsDesc")}</li>
            </ul>

            <h2 className="text-2xl font-medium text-white mt-8 mb-4">{t("docs.usingBlueprint")}</h2>
            <p className="text-white/60">
                {t("docs.usingBlueprintDesc")}
            </p>
        </div>
    );
}
