export interface ComfortInputs {
    uniqueCrops: number; // 0-20 (Variety penalty/bonus)
    decorValue: number; // 0-100 (Furniture/Lighting)
    hasWaterFeature: boolean; // Pond/Fountain
    isNight: boolean; // Spirits spawn mostly at night
}

export type SpiritMessageKey = 'msgMonoculture' | 'msgBarren' | 'msgWaterFeature' | 'msgElderSpirit';

export interface SpiritSpawnRate {
    comfortLevel: number; // 0-100%
    spawnChance: number; // e.g., 0.05% per minute
    maxSpirits: number;
    messages: SpiritMessageKey[];
}

export const calculateComfort = (inputs: ComfortInputs): SpiritSpawnRate => {
    const { uniqueCrops, decorValue, hasWaterFeature, isNight } = inputs;

    // 1. Variety Calculation (Diminishing returns after 10 types)
    const varietyScore = Math.min(10, uniqueCrops) * 3 + Math.max(0, uniqueCrops - 10) * 1;

    // 2. Decor Calculation
    const decorScore = Math.min(50, decorValue * 0.5); // Decor contributes up to 50%

    // 3. Water Bonus
    const waterBonus = hasWaterFeature ? 10 : 0;

    // Total Comfort (0-100)
    const paramsSum = varietyScore + decorScore + waterBonus;
    const comfortLevel = Math.min(100, Math.floor(paramsSum));

    // Spawn Logic
    // Base chance is 0.
    // Requires at least 20 Comfort to start spawning.
    let spawnChance = 0;
    let maxSpirits = 0;

    if (comfortLevel >= 20) {
        spawnChance = (comfortLevel - 20) * 0.002; // 0.16% at max per tick (approx)
        maxSpirits = Math.floor(comfortLevel / 20) + 1; // 1 to 6 spirits
    }

    // Night Modifier (Spirits love moonlight)
    if (isNight) {
        spawnChance *= 2.5;
        maxSpirits += 2;
    }

    // Messages for UI (keys for i18n)
    const messages: SpiritMessageKey[] = [];
    if (uniqueCrops < 5) messages.push("msgMonoculture");
    if (decorValue < 20) messages.push("msgBarren");
    if (hasWaterFeature) messages.push("msgWaterFeature");
    if (comfortLevel > 80 && isNight) messages.push("msgElderSpirit");

    return {
        comfortLevel,
        spawnChance: parseFloat((spawnChance * 100).toFixed(2)), // Convert to % for UI
        maxSpirits,
        messages
    };
};
