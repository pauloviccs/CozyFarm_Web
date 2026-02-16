"use client";

import type { ElementType } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Sprout, Factory, Bot, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { HeroSequence } from "@/components/home/HeroSequence";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full">
        <HeroSequence />
      </div>

      {/* Content wrapper for the rest of the page */}
      <div className="max-w-7xl mx-auto space-y-12 px-8 lg:px-12 pb-20 w-full relative z-10">

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <ModuleCard
            href="/farming"
            title={t("overview.farmingModuleTitle")}
            description={t("overview.farmingModuleDesc")}
            icon={Sprout}
            color="text-emerald-400"
            gradient="from-emerald-500/20 to-transparent"
          />
          <ModuleCard
            href="/industry"
            title={t("overview.industryModuleTitle")}
            description={t("overview.industryModuleDesc")}
            icon={Factory}
            color="text-amber-400"
            gradient="from-amber-500/20 to-transparent"
          />
          <ModuleCard
            href="/automation"
            title={t("overview.automationModuleTitle")}
            description={t("overview.automationModuleDesc")}
            icon={Bot}
            color="text-blue-400"
            gradient="from-blue-500/20 to-transparent"
          />
        </section>

        {/* Stats / Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-light text-white mb-4">{t("overview.whyBlueprint")}</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              {t("overview.blueprintDesc")}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {t("overview.liveLogic")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                {t("overview.reactiveUI")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                TypeScript
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-slate-900/20 transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white mb-2">{t("overview.technicalRef")}</h3>
              <p className="text-white/60 mb-6">
                {t("overview.technicalRefDesc")}
              </p>
              <Link href="/docs" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors group-hover:translate-x-1 duration-300">
                {t("overview.exploreDocs")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}

function ModuleCard({ href, title, description, icon: Icon, color, gradient }: { href: string, title: string, description: string, icon: ElementType, color: string, gradient: string }) {
  return (
    <Link href={href}>
      <GlassCard variant="hoverable" className="p-6 h-full flex flex-col relative overflow-hidden group">
        <div className={cn("absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500", gradient)} />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className={cn("p-3 rounded-lg bg-white/5 border border-white/5", color)}>
            <Icon className="w-6 h-6" />
          </div>
          <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>

        <h3 className="text-xl font-medium text-white mb-2 relative z-10">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed relative z-10">
          {description}
        </p>
      </GlassCard>
    </Link>
  )
}
