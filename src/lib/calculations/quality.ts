export type QualityTier = 'regular' | 'silver' | 'gold' | 'iridium';

export interface QualityInputs {
    playerLevel: number; // 0-10
    fertilizerTier: 0 | 1 | 2 | 3; // 0=None, 1=Basic, 2=Quality, 3=Deluxe/Magic
    workbenchTier: 0 | 1 | 2 | 3; // 0=Rustic, 1=Iron, 2=Golden, 3=Ethereal
    essenceCollected: number; // 0-100
}

export interface QualityProbabilities {
    regular: number;
    silver: number;
    gold: number;
    iridium: number;
}

/**
 * Calculates the probability of each crop quality tier based on inputs.
 * The formula adapts Stardew mechanics but adds Hytale-specific 'Essence' and 'Workbench' modifiers.
 */
export const calculateQualityProbabilities = (inputs: QualityInputs): QualityProbabilities => {
    const { playerLevel, fertilizerTier, workbenchTier, essenceCollected } = inputs;

    // Base Score Calculation
    // Player Level: Up to 100 points (10 per level)
    // Fertilizer: Up to 150 points (50 per tier)
    // Workbench: Acts as a multiplier for high-tier potential
    // Essence: Flat luck bonus (0-100 points)

    const score = (playerLevel * 5) + (fertilizerTier * 40) + (essenceCollected * 0.5);

    // Bench Tier caps the maximum quality technically possible, but also boosts lower tier conversion
    // 0: max Gold (very hard)
    // 1: max Gold
    // 2: max Iridium (hard)
    // 3: max Iridium (normal)

    // Normalize score to probabilities
    // Logic: We determine chance for Gold+, Silver+, then fill Regular.

    // Chance for Gold
    let goldChance = Math.min(0.7, Math.max(0, (score - 50) / 200));

    // Chance for Silver (remaining)
    let silverChance = Math.min(0.9, Math.max(0, (score) / 150));

    // Iridium requires passing Gold check AND having high bench/essence
    let iridiumChance = 0;

    if (workbenchTier >= 2) {
        const iridiumThreshold = 100; // Score needed to start seeing iridium
        if (score > iridiumThreshold) {
            iridiumChance = (score - iridiumThreshold) / 200; // Scaling factor
            // Workbench T3 boosts iridium significantly
            if (workbenchTier === 3) iridiumChance *= 1.5;
        }
    }

    // Cap probabilities
    iridiumChance = Math.min(0.4, iridiumChance);

    // Adjust Gold calculation to exclude Iridium share
    goldChance = Math.max(0, goldChance - iridiumChance);

    // Adjust Silver calculation to exclude Gold/Iridium share
    silverChance = Math.max(0, silverChance - goldChance - iridiumChance);

    // Regular is what's left
    let regularChance = 1 - (silverChance + goldChance + iridiumChance);

    // Safety rounding
    regularChance = Math.max(0, regularChance);

    return {
        regular: regularChance,
        silver: silverChance,
        gold: goldChance,
        iridium: iridiumChance
    };
};

export const getQualityColor = (tier: QualityTier): string => {
    switch (tier) {
        case 'silver': return 'text-slate-300';
        case 'gold': return 'text-amber-400';
        case 'iridium': return 'text-purple-400';
        default: return 'text-white/60';
    }
};
