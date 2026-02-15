"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { calculateQualityProbabilities, type QualityInputs } from '@/lib/calculations/quality';
import { motion } from 'framer-motion';
import { Sparkles, Sprout, Hammer, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const FERTILIZER_LABELS = ['simulators.fertilizerNone', 'simulators.fertilizerBasic', 'simulators.fertilizerQuality', 'simulators.fertilizerDeluxe'] as const;
const WORKBENCH_LABELS = ['simulators.workbenchRustic', 'simulators.workbenchIron', 'simulators.workbenchGold', 'simulators.workbenchEthereal'] as const;

export function QualitySimulator() {
    const { t } = useLanguage();
    const [inputs, setInputs] = useState<QualityInputs>({
        playerLevel: 1,
        fertilizerTier: 0,
        workbenchTier: 0,
        essenceCollected: 0,
    });

    const [probs, setProbs] = useState(calculateQualityProbabilities(inputs));

    useEffect(() => {
        setProbs(calculateQualityProbabilities(inputs));
    }, [inputs]);

    const updateInput = (key: keyof QualityInputs, value: number) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Controls Panel */}
                <GlassCard className="p-6 space-y-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Sparkles className="w-5 h-5 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-light text-white tracking-wide">{t("simulators.simulationControls")}</h3>
                    </div>

                    {/* Player Level Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm items-center">
                            <label className="text-white/70 flex items-center gap-2">
                                <Sprout className="w-4 h-4 text-emerald-400" />
                                {t("simulators.farmingLevel")}
                            </label>
                            <span className="text-purple-300 font-mono bg-purple-500/10 px-2 py-1 rounded text-xs border border-purple-500/20">
                                Lvl {inputs.playerLevel}
                            </span>
                        </div>
                        <input
                            type="range" min="0" max="10"
                            value={inputs.playerLevel}
                            onChange={(e) => updateInput('playerLevel', Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                            aria-label="Farming Level"
                        />
                    </div>

                    {/* Essence Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm items-center">
                            <label className="text-white/70 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                {t("simulators.naturesEssence")}
                            </label>
                            <span className="text-emerald-300 font-mono bg-emerald-500/10 px-2 py-1 rounded text-xs border border-emerald-500/20">
                                {inputs.essenceCollected} pts
                            </span>
                        </div>
                        <input
                            type="range" min="0" max="100"
                            value={inputs.essenceCollected}
                            onChange={(e) => updateInput('essenceCollected', Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                            aria-label="Nature's Essence Amount"
                        />
                    </div>

                    {/* Fertilizer Selection */}
                    <div className="space-y-3">
                        <label className="text-sm text-white/70 flex items-center gap-2 mb-2">
                            <FlaskConical className="w-4 h-4 text-amber-400" />
                            {t("simulators.fertilizerTier")}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {FERTILIZER_LABELS.map((key, idx) => (
                                <button
                                    key={key}
                                    onClick={() => updateInput('fertilizerTier', idx as 0 | 1 | 2 | 3)}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-xs transition-all border font-medium",
                                        inputs.fertilizerTier === idx
                                            ? "bg-amber-500/20 border-amber-500 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                            : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                                    )}
                                >
                                    {t(key)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Workbench Selection */}
                    <div className="space-y-3">
                        <label className="text-sm text-white/70 flex items-center gap-2 mb-2">
                            <Hammer className="w-4 h-4 text-blue-400" />
                            {t("simulators.workbenchTier")}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {WORKBENCH_LABELS.map((key, idx) => (
                                <button
                                    key={key}
                                    onClick={() => updateInput('workbenchTier', idx as 0 | 1 | 2 | 3)}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-xs transition-all border font-medium",
                                        inputs.workbenchTier === idx
                                            ? "bg-blue-500/20 border-blue-500 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                            : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                                    )}
                                >
                                    {t(key)}
                                </button>
                            ))}
                        </div>
                    </div>
                </GlassCard>

                {/* Results Visualization */}
                <div className="h-full">
                    {/* Crop Output Preview */}
                    <GlassCard className="p-8 h-full flex flex-col items-center justify-center relative overflow-hidden group">

                        {/* Dynamic Background Glow */}
                        <div className={cn(
                            "absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000",
                            probs.iridium > 0.1 ? "bg-purple-600" :
                                probs.gold > 0.3 ? "bg-amber-600" :
                                    "bg-blue-900"
                        )} />

                        <div className="relative z-10 w-full space-y-8">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-thin text-white tracking-widest uppercase">{t("simulators.yieldForecast")}</h2>
                                <p className="text-white/40 text-xs tracking-wide">{t("simulators.yieldForecastDesc")}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <ProbabilityCard
                                    tier={t("simulators.qualityRegular")}
                                    percent={probs.regular}
                                    barColor="bg-slate-500"
                                    textColor="text-slate-300"
                                />
                                <ProbabilityCard
                                    tier={t("simulators.qualitySilver")}
                                    percent={probs.silver}
                                    barColor="bg-slate-300"
                                    textColor="text-slate-100"
                                    glow="shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                />
                                <ProbabilityCard
                                    tier={t("simulators.qualityGold")}
                                    percent={probs.gold}
                                    barColor="bg-amber-400"
                                    textColor="text-amber-300"
                                    glow="shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                                />
                                <ProbabilityCard
                                    tier={t("simulators.qualityIridium")}
                                    percent={probs.iridium}
                                    barColor="bg-purple-500"
                                    textColor="text-purple-300"
                                    glow="shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                                />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

const ProbabilityCard = ({ tier, percent, barColor, textColor, glow }: { tier: string, percent: number, barColor: string, textColor: string, glow?: string }) => (
    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center gap-2 border border-white/5 relative overflow-hidden group/card hover:border-white/10 transition-colors">
        {/* Animated Bar */}
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percent * 100}%` }}
            transition={{ type: "spring", stiffness: 40, damping: 10 }}
            className={cn("absolute bottom-0 left-0 right-0 opacity-20 group-hover/card:opacity-30 transition-opacity", barColor)}
        />

        <span className={cn("text-sm font-bold tracking-widest uppercase z-10 transition-all duration-300", textColor, glow)}>
            {tier}
        </span>
        <span className="text-3xl font-thin text-white z-10 font-mono tracking-tighter">
            {(percent * 100).toFixed(0)}<span className="text-sm text-white/30 ml-0.5">%</span>
        </span>
    </div>
);
