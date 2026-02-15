export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type Biome = 'plains' | 'forest' | 'desert' | 'snow';

export interface SeasonConfig {
    name: string;
    growthMultiplier: number; // 1.0 = normal, 1.2 = 20% faster
    weatherEvents: string[];
    visualColor: string;
}

export const SEASONS: Record<Season, SeasonConfig> = {
    spring: {
        name: 'Spring',
        growthMultiplier: 1.0,
        weatherEvents: ['Rain', 'Pollen Breeze', 'Sun'],
        visualColor: 'text-emerald-400',
    },
    summer: {
        name: 'Summer',
        growthMultiplier: 1.2, // Solar boost
        weatherEvents: ['Heatwave', 'Clear Sky', 'Thunderstorm'],
        visualColor: 'text-amber-400',
    },
    autumn: {
        name: 'Autumn',
        growthMultiplier: 1.1,
        weatherEvents: ['Windy', 'Rain', 'Falling Leaves'],
        visualColor: 'text-orange-400',
    },
    winter: {
        name: 'Winter',
        growthMultiplier: 0.5, // Severe penalty without greenhouse
        weatherEvents: ['Snow', 'Blizzard', 'Cold Snap'],
        visualColor: 'text-cyan-400',
    },
};

export const BIOME_MODIFIERS: Record<Biome, Partial<Record<Season, number>>> = {
    plains: { spring: 0.1, summer: 0.0, autumn: 0.0, winter: -0.1 }, // Standard
    forest: { spring: 0.2, summer: -0.1, autumn: 0.2, winter: -0.2 }, // Better spring/autumn
    desert: { spring: 0.0, summer: 0.4, autumn: 0.1, winter: 0.1 }, // Heat bonus
    snow: { spring: -0.2, summer: -0.1, autumn: -0.3, winter: 0.3 }, // Cold adapted
};

export const calculateGrowthRate = (season: Season, biome: Biome, hasGreenhouse: boolean): number => {
    const baseRate = SEASONS[season].growthMultiplier;

    if (hasGreenhouse) {
        // Greenhouse normalizes winter and boosts others slightly
        return season === 'winter' ? 1.0 : baseRate * 1.1;
    }

    const biomeMod = BIOME_MODIFIERS[biome][season] || 0;
    return Math.max(0.1, baseRate + biomeMod);
};
