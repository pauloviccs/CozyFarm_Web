"use client";

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { SEASONS, BIOME_MODIFIERS, calculateGrowthRate, type Season, type Biome } from '@/lib/calculations/seasons';
import { ThermometerSun, Leaf, CloudSun, Wind, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export function SeasonsSimulator() {
    const { t } = useLanguage();
    const [season, setSeason] = useState<Season>('spring');
    const [biome, setBiome] = useState<Biome>('plains');
    const [greenhouse, setGreenhouse] = useState(false);

    const growthRate = calculateGrowthRate(season, biome, greenhouse);
    const currentConfig = SEASONS[season];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <GlassCard className="p-6 space-y-8 h-fit">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <ThermometerSun className="w-5 h-5 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-light text-white tracking-wide">{t("simulators.environment")}</h3>
                </div>

                <div className="space-y-3">
                    <label className="text-sm text-white/70 flex items-center gap-2">
                        <CloudSun className="w-4 h-4 text-amber-400" /> {t("simulators.season")}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(SEASONS) as Season[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSeason(s)}
                                className={cn(
                                    "px-3 py-2 rounded-lg text-sm capitalize transition-all border font-medium",
                                    season === s
                                        ? "bg-white/10 border-white/30 text-white shadow-lg backdrop-blur-md"
                                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm text-white/70 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-400" /> {t("simulators.biome")}
                    </label>
                    <select
                        value={biome}
                        onChange={(e) => setBiome(e.target.value as Biome)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all [&>option]:bg-slate-900"
                    >
                        {Object.keys(BIOME_MODIFIERS).map(b => (
                            <option key={b} value={b} className="capitalize">{b}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => setGreenhouse(!greenhouse)}
                    className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 group",
                        greenhouse
                            ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            : "bg-white/5 border-white/5 hover:bg-white/10"
                    )}
                >
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        greenhouse ? "bg-emerald-500 border-emerald-500" : "border-white/30 group-hover:border-white/50"
                    )}>
                        {greenhouse && <span className="text-xs text-black font-bold">✓</span>}
                    </div>
                    <span className={cn("text-sm font-medium", greenhouse ? "text-emerald-300" : "text-white/60")}>{t("simulators.greenhouseActive")}</span>
                </button>
            </GlassCard>

            {/* Visualization */}
            <GlassCard className="lg:col-span-2 p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px] group transition-all duration-500">
                {/* Atmospheric Background */}
                <div className={cn(
                    "absolute inset-0 opacity-20 transition-colors duration-1000",
                    season === 'spring' && "bg-emerald-400",
                    season === 'summer' && "bg-amber-500",
                    season === 'autumn' && "bg-orange-500",
                    season === 'winter' && "bg-cyan-500"
                )} />

                <div className="relative z-10 text-center space-y-4">
                    <div className="flex flex-col items-center">
                        <h2 className={cn("text-7xl font-thin tracking-tighter transition-colors duration-500 drop-shadow-2xl", currentConfig.visualColor)}>
                            {(growthRate * 100).toFixed(0)}<span className="text-3xl align-top opacity-50">%</span>
                        </h2>
                        <p className="text-white/50 uppercase tracking-[0.2em] text-xs font-semibold mt-2">{t("simulators.growthEfficiency")}</p>
                    </div>
                </div>

                {/* Weather Events */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                    {currentConfig.weatherEvents.map(event => (
                        <div key={event} className="px-4 py-1.5 rounded-full bg-black/30 text-xs text-white/80 border border-white/5 backdrop-blur-md shadow-lg flex items-center gap-2">
                            {event === 'Sun' || event === 'Heatwave' || event === 'Clear Sky' ? <CloudSun className="w-3 h-3 text-amber-400" /> :
                                event === 'Rain' || event === 'Thunderstorm' ? <div className="w-3 h-3 text-blue-400">💧</div> :
                                    event === 'Snow' || event === 'Blizzard' || event === 'Cold Snap' ? <Snowflake className="w-3 h-3 text-cyan-200" /> :
                                        <Wind className="w-3 h-3 text-slate-400" />}
                            {event}
                        </div>
                    ))}
                </div>

                {/* Multiplier Detail */}
                <div className="absolute top-6 right-6 text-right space-y-1">
                    <p className="text-xs text-white/30 font-mono">BASE x{currentConfig.growthMultiplier.toFixed(1)}</p>
                    {greenhouse
                        ? <p className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">GREENHOUSE</p>
                        : (BIOME_MODIFIERS[biome][season] || 0) !== 0 && (
                            <p className={cn(
                                "text-xs font-mono",
                                (BIOME_MODIFIERS[biome][season] || 0) > 0 ? "text-emerald-400" : "text-red-400"
                            )}>
                                BIOME {(BIOME_MODIFIERS[biome][season] || 0) > 0 ? '+' : ''}{BIOME_MODIFIERS[biome][season]}
                            </p>
                        )
                    }
                </div>
            </GlassCard>
        </div>
    );
};
