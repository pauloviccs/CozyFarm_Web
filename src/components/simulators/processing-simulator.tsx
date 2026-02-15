"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { calculateProcessingOutput, type ProcessingInput, type InputQuality } from '@/lib/calculations/processing';
import { Factory, Timer, TrendingUp, Coins, FlaskConical, Cylinder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const QUALITY_KEYS: Record<InputQuality, string> = {
    regular: 'simulators.qualityRegular',
    silver: 'simulators.qualitySilver',
    gold: 'simulators.qualityGold',
    iridium: 'simulators.qualityIridium',
};

export function ProcessingSimulator() {
    const { t } = useLanguage();
    const [inputs, setInputs] = useState<ProcessingInput>({
        processor: 'keg',
        inputBaseValue: 50,
        inputQuality: 'regular',
        hasArtisanPerk: false,
    });

    const output = calculateProcessingOutput(inputs);

    const updateInput = <K extends keyof ProcessingInput>(key: K, value: ProcessingInput[K]) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <GlassCard className="p-6 space-y-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Factory className="w-5 h-5 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-light text-white tracking-wide">{t("simulators.productionLine")}</h3>
                </div>

                {/* Processor Type */}
                <div className="space-y-3">
                    <label className="text-sm text-white/70">{t("simulators.machineType")}</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => updateInput('processor', 'keg')}
                            className={cn(
                                "p-4 rounded-xl border transition-all flex flex-col items-center gap-3 group relative overflow-hidden",
                                inputs.processor === 'keg'
                                    ? "bg-purple-500/20 border-purple-500 text-white shadow-lg"
                                    : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                            )}
                        >
                            <Cylinder className={cn("w-8 h-8 transition-colors", inputs.processor === 'keg' ? "text-amber-400" : "text-white/20")} />
                            <span className="text-xs uppercase tracking-wider font-medium">{t("simulators.keg")}</span>
                            {inputs.processor === 'keg' && <div className="absolute inset-0 bg-purple-500/10 blur-xl" />}
                        </button>
                        <button
                            onClick={() => updateInput('processor', 'preserves_jar')}
                            className={cn(
                                "p-4 rounded-xl border transition-all flex flex-col items-center gap-3 group relative overflow-hidden",
                                inputs.processor === 'preserves_jar'
                                    ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg"
                                    : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                            )}
                        >
                            <FlaskConical className={cn("w-8 h-8 transition-colors", inputs.processor === 'preserves_jar' ? "text-emerald-400" : "text-white/20")} />
                            <span className="text-xs uppercase tracking-wider font-medium">{t("simulators.preservesJar")}</span>
                            {inputs.processor === 'preserves_jar' && <div className="absolute inset-0 bg-emerald-500/10 blur-xl" />}
                        </button>
                    </div>
                </div>

                {/* Input Base Value */}
                <div className="space-y-4">
                    <div className="flex justify-between text-sm items-center">
                        <label className="text-white/70">{t("simulators.cropBaseValue")}</label>
                        <span className="text-amber-300 font-mono bg-amber-500/10 px-2 py-1 rounded text-xs border border-amber-500/20">
                            {inputs.inputBaseValue}g
                        </span>
                    </div>
                    <input
                        type="range" min="10" max="1000" step="10"
                        value={inputs.inputBaseValue}
                        onChange={(e) => updateInput('inputBaseValue', Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                    />
                </div>

                {/* Input Quality */}
                <div className="space-y-3">
                    <label className="text-sm text-white/70">{t("simulators.inputQuality")}</label>
                    <div className="grid grid-cols-4 gap-2">
                        {(['regular', 'silver', 'gold', 'iridium'] as InputQuality[]).map((q) => (
                            <button
                                key={q}
                                onClick={() => updateInput('inputQuality', q)}
                                className={cn(
                                    "px-2 py-2 rounded-lg text-xs capitalize transition-all border font-medium",
                                    inputs.inputQuality === q
                                        ? "bg-white/10 border-white/30 text-white shadow-lg backdrop-blur-md"
                                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                                )}
                            >
                                {t(QUALITY_KEYS[q])}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Artisan Perk */}
                <div
                    onClick={() => updateInput('hasArtisanPerk', !inputs.hasArtisanPerk)}
                    className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group",
                        inputs.hasArtisanPerk
                            ? "bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                            : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <TrendingUp className={cn("w-5 h-5", inputs.hasArtisanPerk ? "text-amber-400" : "text-white/30")} />
                        <div className="flex flex-col">
                            <span className={cn("text-sm font-medium", inputs.hasArtisanPerk ? "text-amber-100" : "text-white/50")}>
                                {t("simulators.artisanPerk")}
                            </span>
                            <span className="text-xs text-white/30">{t("simulators.artisanBonus")}</span>
                        </div>
                    </div>
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        inputs.hasArtisanPerk ? "bg-amber-500 border-amber-500" : "border-white/30 group-hover:border-white/50"
                    )}>
                        {inputs.hasArtisanPerk && <span className="text-xs text-black font-bold">✓</span>}
                    </div>
                </div>
            </GlassCard>

            {/* Analytics */}
            <div className="space-y-6">
                <GlassCard className="p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden h-full">
                    <div className={cn(
                        "absolute inset-0 opacity-10 transition-colors duration-500",
                        output.profitRatio > 1 ? 'bg-emerald-500' : 'bg-red-500'
                    )} />

                    <div className="relative z-10 text-center space-y-8 w-full flex flex-col justify-center h-full">
                        <div className="space-y-2">
                            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">{inputs.processor === 'keg' ? t("simulators.wineJuice") : t("simulators.jellyPickles")}</p>
                            <div className="flex items-center justify-center gap-3">
                                <Coins className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                <span className="text-7xl font-thin tracking-tighter text-white">{output.value}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10 w-full">
                            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-white/40 text-xs uppercase mb-1">{t("simulators.timeToBrew")}</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Timer className="w-4 h-4 text-blue-300" />
                                    <span className="text-xl font-light text-blue-100">{(output.processingTimeMinutes / 1440).toFixed(1)} {t("simulators.days")}</span>
                                </div>
                            </div>

                            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                                {output.profitRatio < 1 && (
                                    <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                                )}
                                <p className="text-white/40 text-xs uppercase mb-1">{t("simulators.roiMultiplier")}</p>
                                <div className="flex items-center justify-center gap-2">
                                    <TrendingUp className={cn("w-4 h-4", output.profitRatio > 1 ? "text-emerald-400" : "text-red-400")} />
                                    <span className={cn("text-xl font-light", output.profitRatio > 1 ? "text-emerald-100" : "text-red-300")}>
                                        {output.profitRatio}x
                                    </span>
                                </div>
                            </div>
                        </div>

                        {output.profitRatio < 1 && (
                            <p className="text-red-300 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 w-full animate-pulse">
                                {t("simulators.warningRawCrop")}
                            </p>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
