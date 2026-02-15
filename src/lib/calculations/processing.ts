export type ProcessorType = 'keg' | 'preserves_jar';
export type InputQuality = 'regular' | 'silver' | 'gold' | 'iridium';

export interface ProcessingInput {
    processor: ProcessorType;
    inputBaseValue: number; // Base sell price of the fruit/veg
    inputQuality: InputQuality;
    hasArtisanPerk: boolean;
}

export interface ProcessingOutput {
    name: string;
    value: number;
    processingTimeMinutes: number; // In-game minutes (approx)
    profitRatio: number;
}

const QUALITY_MULTIPLIER: Record<InputQuality, number> = {
    regular: 1.0,
    silver: 1.25,
    gold: 1.5,
    iridium: 2.0,
};

export const calculateProcessingOutput = (input: ProcessingInput): ProcessingOutput => {
    const { processor, inputBaseValue, inputQuality, hasArtisanPerk } = input;

    let outputValue = 0;
    let outputName = '';
    let time = 0;

    // Hytale Twist: Quality of input affects processing speed slightly, 
    // but output value is standard Stardew logic (usually relies on base value, ignores input quality for value).
    // However, for this mod, let's say "High Quality Inputs" produce "High Quality Artisan Goods" directly if perk is active.

    if (processor === 'keg') {
        // Wine/Juice: 3x base value
        outputValue = inputBaseValue * 3;
        outputName = 'Wine / Juice';
        time = 10000; // ~7 days
    } else {
        // Jelly/Pickles: 2x + 50
        outputValue = inputBaseValue * 2 + 50;
        outputName = 'Jelly / Pickles';
        time = 4000; // ~2-3 days
    }

    // Artisan Perk (+40%)
    if (hasArtisanPerk) {
        outputValue *= 1.4;
    }

    // Profit Calculation
    // Profit = Output Value - (Input Base Value * Quality Multiplier)
    // (Assuming you could have sold the raw crop)
    const opportunityCost = inputBaseValue * QUALITY_MULTIPLIER[inputQuality];
    const profitRatio = outputValue / opportunityCost;

    return {
        name: outputName,
        value: Math.floor(outputValue),
        processingTimeMinutes: time,
        profitRatio: parseFloat(profitRatio.toFixed(2)),
    };
};
