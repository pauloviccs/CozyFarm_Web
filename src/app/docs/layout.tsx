"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/context/LanguageContext";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useLanguage();
    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Docs Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
                <GlassCard className="p-4 bg-white/5 backdrop-blur-sm sticky top-24">
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 px-2">{t("docs.documentation")}</h4>
                    <nav className="space-y-1">
                        <DocsLink href="/docs" active>{t("docs.introduction")}</DocsLink>
                        <DocsLink href="#">{t("docs.installation")}</DocsLink>
                        <DocsLink href="#">{t("docs.configuration")}</DocsLink>

                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mt-6 mb-4 px-2">{t("docs.apiReference")}</h4>
                        <DocsLink href="#">{t("docs.itemIds")}</DocsLink>
                        <DocsLink href="#">{t("docs.lootTables")}</DocsLink>
                        <DocsLink href="#">{t("docs.eventTriggers")}</DocsLink>
                    </nav>
                </GlassCard>
            </aside>

            {/* Docs Content */}
            <div className="lg:col-span-3">
                <GlassCard className="p-8 min-h-[60vh]">
                    <article className="prose prose-invert prose-slate max-w-none">
                        {children}
                    </article>
                </GlassCard>
            </div>
        </div>
    );
}

function DocsLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
    return (
        <a href={href} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-white/10 text-white font-medium' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            {children}
        </a>
    )
}
