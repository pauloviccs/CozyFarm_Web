"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { calculateComfort, type ComfortInputs } from '@/lib/calculations/comfort';
import { Ghost, Sprout, Lamp, Droplets, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export function ComfortSimulator() {
    const { t } = useLanguage();
    const [inputs, setInputs] = useState<ComfortInputs>({
        uniqueCrops: 5,
        decorValue: 20,
        hasWaterFeature: false,
        isNight: true,
    });
    const [particles, setParticles] = useState<{ left: number; top: number; delay: number }[]>([]);

    const result = calculateComfort(inputs);

    React.useEffect(() => {
        if (result.maxSpirits > 0) {
            setParticles(Array.from({ length: result.maxSpirits }).map(() => ({
                left: 20 + Math.random() * 60,
                top: 30 + Math.random() * 40,
                delay: Math.random() * 2
            })));
        } else {
            setParticles([]);
        }
    }, [result.maxSpirits]);

    const updateInput = <K extends keyof ComfortInputs>(key: K, value: ComfortInputs[K]) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualizer Panel (Left - 1 Col) */}
                <GlassCard className="p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    {/* Spirit Aura Background */}
                    <div className={cn(
                        "absolute inset-0 opacity-20 transition-all duration-1000",
                        result.comfortLevel > 80 ? "bg-purple-500" :
                            result.comfortLevel > 50 ? "bg-blue-500" :
                                "bg-slate-800"
                    )} />

                    {/* Particles (CSS Simulated) */}
                    {particles.length > 0 && (
                        <div className="absolute inset-0">
                            {particles.map((p, i) => (
                                <div key={i}
                                    className="absolute w-2 h-2 bg-white rounded-full animate-float opacity-50 blur-[1px]"
                                    style={{
                                        left: `${p.left}%`,
                                        top: `${p.top}%`,
                                        animationDelay: `${p.delay}s`,
                                        boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.5)"
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="relative z-10 text-center space-y-6">
                        <div>
                            <Ghost className={cn(
                                "w-16 h-16 mx-auto mb-4 transition-all duration-500",
                                result.comfortLevel > 80 ? "text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" : "text-white/20"
                            )} />
                            <h2 className="text-6xl font-thin tracking-tighter text-white">
                                {result.comfortLevel}<span className="text-2xl opacity-50">/100</span>
                            </h2>
                            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-2">{t("simulators.areaComfortScore")}</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-4 border border-white/5 backdrop-blur-md">
                            <p className="text-xs text-white/50 uppercase mb-1">{t("simulators.spawnChance")}</p>
                            <p className="text-2xl font-light text-emerald-300">{result.spawnChance}% <span className="text-xs text-white/30">{t("simulators.perTick")}</span></p>
                            <p className="text-xs text-white/40 mt-1">{t("simulators.maxSpirits")}: {result.maxSpirits}</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Controls Panel (Right - 2 Cols) */}
                <GlassCard className="lg:col-span-2 p-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Ghost className="w-5 h-5 text-purple-300" />
                        </div>
                        <h3 className="text-xl font-light text-white tracking-wide">{t("simulators.environmentFactors")}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Crop Diversity */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-white/70 flex items-center gap-2">
                                    <Sprout className="w-4 h-4 text-emerald-400" /> {t("simulators.biodiversity")}
                                </label>
                                <span className={cn("font-mono text-xs px-2 py-1 rounded border",
                                    inputs.uniqueCrops >= 10 ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" : "text-white/50 border-white/10"
                                )}>
                                    {inputs.uniqueCrops} {t("simulators.species")}
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="20"
                                value={inputs.uniqueCrops}
                                onChange={(e) => updateInput('uniqueCrops', Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                                aria-label="Biodiversity Count"
                            />
                            <p className="text-xs text-white/30">{t("simulators.varietyHint")}</p>
                        </div>

                        {/* Decoration */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-white/70 flex items-center gap-2">
                                    <Lamp className="w-4 h-4 text-amber-400" /> {t("simulators.decorValue")}
                                </label>
                                <span className="font-mono text-xs px-2 py-1 rounded border text-amber-200 border-amber-500/30 bg-amber-500/10">
                                    {inputs.decorValue} pts
                                </span>
                            </div>
                            <input
                                type="range" min="0" max="100"
                                value={inputs.decorValue}
                                onChange={(e) => updateInput('decorValue', Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
                                aria-label="Decoration Value"
                            />
                            <p className="text-xs text-white/30">{t("simulators.decorHint")}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        {/* Water Feature Toggle */}
                        <button
                            onClick={() => updateInput('hasWaterFeature', !inputs.hasWaterFeature)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left",
                                inputs.hasWaterFeature
                                    ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-lg transition-colors",
                                inputs.hasWaterFeature ? "bg-blue-500/20 text-blue-200" : "bg-white/10 text-white/30"
                            )}>
                                <Droplets className="w-5 h-5" />
                            </div>
                            <div>
                                <span className={cn("block text-sm font-medium", inputs.hasWaterFeature ? "text-blue-100" : "text-white/60")}>
                                    {t("simulators.waterFeature")}
                                </span>
                                <span className="text-xs text-white/30">{t("simulators.attractsHydroSpirits")}</span>
                            </div>
                        </button>

                        {/* Night Toggle */}
                        <button
                            onClick={() => updateInput('isNight', !inputs.isNight)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left",
                                inputs.isNight
                                    ? "bg-purple-900/40 border-purple-500/50 shadow-[0_0_15px_rgba(88,28,135,0.3)]"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-lg transition-colors",
                                inputs.isNight ? "bg-purple-500/20 text-purple-200" : "bg-white/10 text-white/30"
                            )}>
                                <Moon className="w-5 h-5" />
                            </div>
                            <div>
                                <span className={cn("block text-sm font-medium", inputs.isNight ? "text-purple-100" : "text-white/60")}>
                                    {t("simulators.nightTime")}
                                </span>
                                <span className="text-xs text-white/30">{t("simulators.spiritsActiveNight")}</span>
                            </div>
                        </button>
                    </div>

                    {/* Messages */}
                    {result.messages.length > 0 && (
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-2">
                            {result.messages.map((msg, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    {t(`simulators.${msg}`)}
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
}
