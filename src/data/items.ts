/**
 * Item Database - Stardew Valley & Hytale
 * Extracted from: Stardew Valley Wiki, Hytale Guide, Hytale Modding docs
 */

export type GameSource = "stardew" | "hytale";
export type ItemCategory =
  | "crops"
  | "seeds"
  | "animal_products"
  | "processing_machines"
  | "artisan_goods"
  | "dishes"
  | "forage"
  | "materials";

export interface Item {
  id: string;
  name: string;
  namePt?: string;
  game: GameSource;
  category: ItemCategory;
  description?: string;
  descriptionPt?: string;
  source?: string; // e.g. "Pierre's", "Keg"
  value?: number;
  hytaleId?: string;
}

export const ITEMS: Item[] = [
  // ========== STARDEW VALLEY - CROPS ==========
  { id: "sv-parsnip", name: "Parsnip", namePt: "Pastinaca", game: "stardew", category: "crops", value: 35, source: "Pierre's" },
  { id: "sv-potato", name: "Potato", namePt: "Batata", game: "stardew", category: "crops", value: 80, source: "Pierre's" },
  { id: "sv-cauliflower", name: "Cauliflower", namePt: "Couve-flor", game: "stardew", category: "crops", value: 175, source: "Pierre's" },
  { id: "sv-green-bean", name: "Green Bean", namePt: "Vagem", game: "stardew", category: "crops", value: 40, source: "Pierre's" },
  { id: "sv-kale", name: "Kale", namePt: "Couve", game: "stardew", category: "crops", value: 110, source: "Pierre's" },
  { id: "sv-strawberry", name: "Strawberry", namePt: "Morango", game: "stardew", category: "crops", value: 120, source: "Egg Festival" },
  { id: "sv-blue-jazz", name: "Blue Jazz", namePt: "Jasmim Azul", game: "stardew", category: "crops", value: 50, source: "Pierre's" },
  { id: "sv-tulip", name: "Tulip", namePt: "Tulipa", game: "stardew", category: "crops", value: 30, source: "Pierre's" },
  { id: "sv-carrot", name: "Carrot", namePt: "Cenoura", game: "stardew", category: "crops", value: 35, source: "Pierre's" },
  { id: "sv-garlic", name: "Garlic", namePt: "Alho", game: "stardew", category: "crops", value: 60, source: "Pierre's (Y2+)" },
  { id: "sv-rhubarb", name: "Rhubarb", namePt: "Ruibarbo", game: "stardew", category: "crops", value: 220, source: "Oasis" },
  { id: "sv-coffee-bean", name: "Coffee Bean", namePt: "Grão de Café", game: "stardew", category: "crops", value: 15, source: "Traveling Cart" },
  { id: "sv-blueberry", name: "Blueberry", namePt: "Mirtilo", game: "stardew", category: "crops", value: 50, source: "Pierre's" },
  { id: "sv-corn", name: "Corn", namePt: "Milho", game: "stardew", category: "crops", value: 50, source: "Pierre's" },
  { id: "sv-hops", name: "Hops", namePt: "Lúpulo", game: "stardew", category: "crops", value: 25, source: "Pierre's" },
  { id: "sv-hot-pepper", name: "Hot Pepper", namePt: "Pimenta", game: "stardew", category: "crops", value: 40, source: "Pierre's" },
  { id: "sv-melon", name: "Melon", namePt: "Melão", game: "stardew", category: "crops", value: 250, source: "Pierre's" },
  { id: "sv-poppy", name: "Poppy", namePt: "Papoula", game: "stardew", category: "crops", value: 140, source: "Pierre's" },
  { id: "sv-radish", name: "Radish", namePt: "Rabanete", game: "stardew", category: "crops", value: 90, source: "Pierre's" },
  { id: "sv-red-cabbage", name: "Red Cabbage", namePt: "Repolho Roxo", game: "stardew", category: "crops", value: 260, source: "Pierre's (Y2+)" },
  { id: "sv-starfruit", name: "Starfruit", namePt: "Fruta Estrela", game: "stardew", category: "crops", value: 750, source: "Oasis" },
  { id: "sv-sunflower", name: "Sunflower", namePt: "Girassol", game: "stardew", category: "crops", value: 80, source: "Pierre's" },
  { id: "sv-tomato", name: "Tomato", namePt: "Tomate", game: "stardew", category: "crops", value: 60, source: "Pierre's" },
  { id: "sv-wheat", name: "Wheat", namePt: "Trigo", game: "stardew", category: "crops", value: 25, source: "Pierre's" },
  { id: "sv-amaranth", name: "Amaranth", namePt: "Amaranto", game: "stardew", category: "crops", value: 150, source: "Pierre's" },
  { id: "sv-artichoke", name: "Artichoke", namePt: "Alcachofra", game: "stardew", category: "crops", value: 160, source: "Pierre's" },
  { id: "sv-beet", name: "Beet", namePt: "Beterraba", game: "stardew", category: "crops", value: 100, source: "Oasis" },
  { id: "sv-bok-choy", name: "Bok Choy", namePt: "Bok Choy", game: "stardew", category: "crops", value: 80, source: "Pierre's" },
  { id: "sv-eggplant", name: "Eggplant", namePt: "Berinjela", game: "stardew", category: "crops", value: 60, source: "Pierre's" },
  { id: "sv-pumpkin", name: "Pumpkin", namePt: "Abóbora", game: "stardew", category: "crops", value: 320, source: "Pierre's" },
  { id: "sv-yam", name: "Yam", namePt: "Inhame", game: "stardew", category: "crops", value: 160, source: "Pierre's" },
  { id: "sv-ancient-fruit", name: "Ancient Fruit", namePt: "Fruta Antiga", game: "stardew", category: "crops", value: 550, source: "Seed Maker" },
  { id: "sv-grape", name: "Grape", namePt: "Uva", game: "stardew", category: "crops", value: 80, source: "Pierre's" },
  { id: "sv-cranberry", name: "Cranberry", namePt: "Cranberry", game: "stardew", category: "crops", value: 75, source: "Pierre's" },
  { id: "sv-rice", name: "Rice", namePt: "Arroz", game: "stardew", category: "crops", value: 100, source: "Rice Mill" },

  // ========== STARDEW VALLEY - SEEDS ==========
  { id: "sv-parsnip-seeds", name: "Parsnip Seeds", namePt: "Sementes de Pastinaca", game: "stardew", category: "seeds", value: 20, source: "Pierre's" },
  { id: "sv-potato-seeds", name: "Potato Seeds", namePt: "Sementes de Batata", game: "stardew", category: "seeds", value: 50, source: "Pierre's" },
  { id: "sv-cauliflower-seeds", name: "Cauliflower Seeds", namePt: "Sementes de Couve-flor", game: "stardew", category: "seeds", value: 80, source: "Pierre's" },
  { id: "sv-bean-starter", name: "Bean Starter", namePt: "Muda de Vagem", game: "stardew", category: "seeds", value: 60, source: "Pierre's" },
  { id: "sv-kale-seeds", name: "Kale Seeds", namePt: "Sementes de Couve", game: "stardew", category: "seeds", value: 70, source: "Pierre's" },
  { id: "sv-strawberry-seeds", name: "Strawberry Seeds", namePt: "Sementes de Morango", game: "stardew", category: "seeds", value: 100, source: "Egg Festival" },
  { id: "sv-jazz-seeds", name: "Jazz Seeds", namePt: "Sementes de Jasmim", game: "stardew", category: "seeds", value: 30, source: "Pierre's" },
  { id: "sv-tulip-bulb", name: "Tulip Bulb", namePt: "Bulbo de Tulipa", game: "stardew", category: "seeds", value: 20, source: "Pierre's" },
  { id: "sv-blueberry-seeds", name: "Blueberry Seeds", namePt: "Sementes de Mirtilo", game: "stardew", category: "seeds", value: 80, source: "Pierre's" },
  { id: "sv-corn-seeds", name: "Corn Seeds", namePt: "Sementes de Milho", game: "stardew", category: "seeds", value: 150, source: "Pierre's" },
  { id: "sv-hops-starter", name: "Hops Starter", namePt: "Muda de Lúpulo", game: "stardew", category: "seeds", value: 60, source: "Pierre's" },
  { id: "sv-pepper-seeds", name: "Pepper Seeds", namePt: "Sementes de Pimenta", game: "stardew", category: "seeds", value: 40, source: "Pierre's" },
  { id: "sv-melon-seeds", name: "Melon Seeds", namePt: "Sementes de Melão", game: "stardew", category: "seeds", value: 80, source: "Pierre's" },
  { id: "sv-tomato-seeds", name: "Tomato Seeds", namePt: "Sementes de Tomate", game: "stardew", category: "seeds", value: 50, source: "Pierre's" },
  { id: "sv-wheat-seeds", name: "Wheat Seeds", namePt: "Sementes de Trigo", game: "stardew", category: "seeds", value: 10, source: "Pierre's" },
  { id: "sv-sunflower-seeds", name: "Sunflower Seeds", namePt: "Sementes de Girassol", game: "stardew", category: "seeds", value: 200, source: "Pierre's" },
  { id: "sv-rice-shoot", name: "Rice Shoot", namePt: "Muda de Arroz", game: "stardew", category: "seeds", value: 40, source: "Pierre's" },
  { id: "sv-ancient-seeds", name: "Ancient Seeds", namePt: "Sementes Antigas", game: "stardew", category: "seeds", value: 0, source: "Museum/Artifact" },
  { id: "sv-grape-starter", name: "Grape Starter", namePt: "Muda de Uva", game: "stardew", category: "seeds", value: 60, source: "Pierre's" },
  { id: "sv-cranberry-seeds", name: "Cranberry Seeds", namePt: "Sementes de Cranberry", game: "stardew", category: "seeds", value: 240, source: "Pierre's" },

  // ========== STARDEW VALLEY - ANIMAL PRODUCTS ==========
  { id: "sv-egg", name: "Egg", namePt: "Ovo", game: "stardew", category: "animal_products", value: 50, source: "Chicken" },
  { id: "sv-large-egg", name: "Large Egg", namePt: "Ovo Grande", game: "stardew", category: "animal_products", value: 95, source: "Chicken" },
  { id: "sv-duck-egg", name: "Duck Egg", namePt: "Ovo de Pato", game: "stardew", category: "animal_products", value: 95, source: "Duck" },
  { id: "sv-void-egg", name: "Void Egg", namePt: "Ovo do Vazio", game: "stardew", category: "animal_products", value: 65, source: "Void Chicken" },
  { id: "sv-dinosaur-egg", name: "Dinosaur Egg", namePt: "Ovo de Dinossauro", game: "stardew", category: "animal_products", value: 350, source: "Dinosaur" },
  { id: "sv-ostrich-egg", name: "Ostrich Egg", namePt: "Ovo de Avestruz", game: "stardew", category: "animal_products", value: 600, source: "Ostrich" },
  { id: "sv-golden-egg", name: "Golden Egg", namePt: "Ovo Dourado", game: "stardew", category: "animal_products", value: 500, source: "Golden Chicken" },
  { id: "sv-milk", name: "Milk", namePt: "Leite", game: "stardew", category: "animal_products", value: 125, source: "Cow" },
  { id: "sv-large-milk", name: "Large Milk", namePt: "Leite Grande", game: "stardew", category: "animal_products", value: 190, source: "Cow" },
  { id: "sv-goat-milk", name: "Goat Milk", namePt: "Leite de Cabra", game: "stardew", category: "animal_products", value: 225, source: "Goat" },
  { id: "sv-large-goat-milk", name: "Large Goat Milk", namePt: "Leite de Cabra Grande", game: "stardew", category: "animal_products", value: 345, source: "Goat" },
  { id: "sv-wool", name: "Wool", namePt: "Lã", game: "stardew", category: "animal_products", value: 340, source: "Sheep" },
  { id: "sv-duck-feather", name: "Duck Feather", namePt: "Pena de Pato", game: "stardew", category: "animal_products", value: 250, source: "Duck" },
  { id: "sv-rabbits-foot", name: "Rabbit's Foot", namePt: "Pé de Coelho", game: "stardew", category: "animal_products", value: 565, source: "Rabbit" },
  { id: "sv-truffle", name: "Truffle", namePt: "Trufa", game: "stardew", category: "animal_products", value: 625, source: "Pig" },
  { id: "sv-slime", name: "Slime", namePt: "Slime", game: "stardew", category: "animal_products", value: 5, source: "Slime Hutch" },
  { id: "sv-roe", name: "Roe", namePt: "Ova", game: "stardew", category: "animal_products", value: 0, source: "Fish Pond" },
  { id: "sv-sturgeon-roe", name: "Sturgeon Roe", namePt: "Ova de Esturjão", game: "stardew", category: "animal_products", value: 120, source: "Fish Pond" },

  // ========== STARDEW VALLEY - PROCESSING MACHINES ==========
  { id: "sv-keg", name: "Keg", namePt: "Barril", game: "stardew", category: "processing_machines", source: "Farming Lv.8" },
  { id: "sv-preserves-jar", name: "Preserves Jar", namePt: "Pote de Geleia", game: "stardew", category: "processing_machines", source: "Farming Lv.4" },
  { id: "sv-cheese-press", name: "Cheese Press", namePt: "Prensa de Queijo", game: "stardew", category: "processing_machines", source: "Farming Lv.6" },
  { id: "sv-mayonnaise-machine", name: "Mayonnaise Machine", namePt: "Máquina de Maionese", game: "stardew", category: "processing_machines", source: "Farming Lv.2" },
  { id: "sv-oil-maker", name: "Oil Maker", namePt: "Fabricante de Óleo", game: "stardew", category: "processing_machines", source: "Farming Lv.8" },
  { id: "sv-bee-house", name: "Bee House", namePt: "Colmeia", game: "stardew", category: "processing_machines", source: "Farming Lv.3" },
  { id: "sv-loom", name: "Loom", namePt: "Tear", game: "stardew", category: "processing_machines", source: "Farming Lv.7" },
  { id: "sv-cask", name: "Cask", namePt: "Barril de Envelhecimento", game: "stardew", category: "processing_machines", source: "Cellar Upgrade" },
  { id: "sv-dehydrator", name: "Dehydrator", namePt: "Desidratador", game: "stardew", category: "processing_machines", source: "Pierre's" },
  { id: "sv-fish-smoker", name: "Fish Smoker", namePt: "Fumador de Peixe", game: "stardew", category: "processing_machines", source: "Fish Shop" },
  { id: "sv-mill", name: "Mill", namePt: "Moinho", game: "stardew", category: "processing_machines", source: "Carpenter's Shop" },
  { id: "sv-seed-maker", name: "Seed Maker", namePt: "Fabricante de Sementes", game: "stardew", category: "processing_machines", source: "Farming Lv.9" },

  // ========== STARDEW VALLEY - ARTISAN GOODS ==========
  { id: "sv-honey", name: "Honey", namePt: "Mel", game: "stardew", category: "artisan_goods", value: 100, source: "Bee House" },
  { id: "sv-wine", name: "Wine", namePt: "Vinho", game: "stardew", category: "artisan_goods", value: 0, source: "Keg" },
  { id: "sv-juice", name: "Juice", namePt: "Suco", game: "stardew", category: "artisan_goods", value: 0, source: "Keg" },
  { id: "sv-beer", name: "Beer", namePt: "Cerveja", game: "stardew", category: "artisan_goods", value: 200, source: "Keg" },
  { id: "sv-mead", name: "Mead", namePt: "Hidromel", game: "stardew", category: "artisan_goods", value: 300, source: "Keg" },
  { id: "sv-pale-ale", name: "Pale Ale", namePt: "Cerveja Pálida", game: "stardew", category: "artisan_goods", value: 300, source: "Keg" },
  { id: "sv-coffee", name: "Coffee", namePt: "Café", game: "stardew", category: "artisan_goods", value: 150, source: "Keg" },
  { id: "sv-green-tea", name: "Green Tea", namePt: "Chá Verde", game: "stardew", category: "artisan_goods", value: 100, source: "Keg" },
  { id: "sv-vinegar", name: "Vinegar", namePt: "Vinagre", game: "stardew", category: "artisan_goods", value: 100, source: "Keg" },
  { id: "sv-cheese", name: "Cheese", namePt: "Queijo", game: "stardew", category: "artisan_goods", value: 230, source: "Cheese Press" },
  { id: "sv-goat-cheese", name: "Goat Cheese", namePt: "Queijo de Cabra", game: "stardew", category: "artisan_goods", value: 400, source: "Cheese Press" },
  { id: "sv-mayonnaise", name: "Mayonnaise", namePt: "Maionese", game: "stardew", category: "artisan_goods", value: 190, source: "Mayonnaise Machine" },
  { id: "sv-duck-mayonnaise", name: "Duck Mayonnaise", namePt: "Maionese de Pato", game: "stardew", category: "artisan_goods", value: 375, source: "Mayonnaise Machine" },
  { id: "sv-dinosaur-mayonnaise", name: "Dinosaur Mayonnaise", namePt: "Maionese de Dinossauro", game: "stardew", category: "artisan_goods", value: 800, source: "Mayonnaise Machine" },
  { id: "sv-oil", name: "Oil", namePt: "Óleo", game: "stardew", category: "artisan_goods", value: 100, source: "Oil Maker" },
  { id: "sv-truffle-oil", name: "Truffle Oil", namePt: "Óleo de Trufa", game: "stardew", category: "artisan_goods", value: 1065, source: "Oil Maker" },
  { id: "sv-jelly", name: "Jelly", namePt: "Geleia", game: "stardew", category: "artisan_goods", value: 0, source: "Preserves Jar" },
  { id: "sv-pickles", name: "Pickles", namePt: "Pickles", game: "stardew", category: "artisan_goods", value: 0, source: "Preserves Jar" },
  { id: "sv-caviar", name: "Caviar", namePt: "Caviar", game: "stardew", category: "artisan_goods", value: 500, source: "Preserves Jar" },
  { id: "sv-aged-roe", name: "Aged Roe", namePt: "Ova Envelhecida", game: "stardew", category: "artisan_goods", value: 0, source: "Preserves Jar" },
  { id: "sv-cloth", name: "Cloth", namePt: "Tecido", game: "stardew", category: "artisan_goods", value: 470, source: "Loom" },
  { id: "sv-dried-fruit", name: "Dried Fruit", namePt: "Fruta Seca", game: "stardew", category: "artisan_goods", value: 0, source: "Dehydrator" },
  { id: "sv-dried-mushrooms", name: "Dried Mushrooms", namePt: "Cogumelos Secos", game: "stardew", category: "artisan_goods", value: 0, source: "Dehydrator" },
  { id: "sv-raisins", name: "Raisins", namePt: "Passas", game: "stardew", category: "artisan_goods", value: 600, source: "Dehydrator" },
  { id: "sv-smoked-fish", name: "Smoked Fish", namePt: "Peixe Defumado", game: "stardew", category: "artisan_goods", value: 0, source: "Fish Smoker" },
  { id: "sv-wheat-flour", name: "Wheat Flour", namePt: "Farinha de Trigo", game: "stardew", category: "artisan_goods", value: 50, source: "Mill" },
  { id: "sv-sugar", name: "Sugar", namePt: "Açúcar", game: "stardew", category: "artisan_goods", value: 50, source: "Mill" },
  { id: "sv-rice-milled", name: "Rice (Milled)", namePt: "Arroz (Moinho)", game: "stardew", category: "artisan_goods", value: 100, source: "Mill" },

  // ========== STARDEW VALLEY - DISHES (sample) ==========
  { id: "sv-fried-egg", name: "Fried Egg", namePt: "Ovo Frito", game: "stardew", category: "dishes", value: 35 },
  { id: "sv-omelet", name: "Omelet", namePt: "Omelete", game: "stardew", category: "dishes", value: 125 },
  { id: "sv-salad", name: "Salad", namePt: "Salada", game: "stardew", category: "dishes", value: 110 },
  { id: "sv-cheese-cauliflower", name: "Cheese Cauliflower", namePt: "Couve-flor com Queijo", game: "stardew", category: "dishes", value: 300 },
  { id: "sv-parsnip-soup", name: "Parsnip Soup", namePt: "Sopa de Pastinaca", game: "stardew", category: "dishes", value: 120 },
  { id: "sv-hashbrowns", name: "Hashbrowns", namePt: "Batata Rosti", game: "stardew", category: "dishes", value: 120 },
  { id: "sv-pancakes", name: "Pancakes", namePt: "Panquecas", game: "stardew", category: "dishes", value: 80 },
  { id: "sv-pizza", name: "Pizza", namePt: "Pizza", game: "stardew", category: "dishes", value: 300 },
  { id: "sv-bread", name: "Bread", namePt: "Pão", game: "stardew", category: "dishes", value: 60 },
  { id: "sv-tortilla", name: "Tortilla", namePt: "Tortilha", game: "stardew", category: "dishes", value: 50 },
  { id: "sv-bean-hotpot", name: "Bean Hotpot", namePt: "Feijoada de Vagem", game: "stardew", category: "dishes", value: 100 },
  { id: "sv-pepper-poppers", name: "Pepper Poppers", namePt: "Pimenta Recheada", game: "stardew", category: "dishes", value: 200 },
  { id: "sv-glazed-yams", name: "Glazed Yams", namePt: "Inhame Grelhado", game: "stardew", category: "dishes", value: 200 },
  { id: "sv-vegetable-medley", name: "Vegetable Medley", namePt: "Mix de Legumes", game: "stardew", category: "dishes", value: 120 },
  { id: "sv-salmon-dinner", name: "Salmon Dinner", namePt: "Jantar de Salmão", game: "stardew", category: "dishes", value: 300 },
  { id: "sv-fish-taco", name: "Fish Taco", namePt: "Taco de Peixe", game: "stardew", category: "dishes", value: 500 },
  { id: "sv-rhubarb-pie", name: "Rhubarb Pie", namePt: "Torta de Ruibarbo", game: "stardew", category: "dishes", value: 400 },
  { id: "sv-blueberry-tart", name: "Blueberry Tart", namePt: "Torta de Mirtilo", game: "stardew", category: "dishes", value: 150 },
  { id: "sv-pink-cake", name: "Pink Cake", namePt: "Bolo Rosa", game: "stardew", category: "dishes", value: 480 },
  { id: "sv-pumpkin-soup", name: "Pumpkin Soup", namePt: "Sopa de Abóbora", game: "stardew", category: "dishes", value: 300 },
  { id: "sv-autumns-bounty", name: "Autumn's Bounty", namePt: "Bênção do Outono", game: "stardew", category: "dishes", value: 350 },
  { id: "sv-fruit-salad", name: "Fruit Salad", namePt: "Salada de Frutas", game: "stardew", category: "dishes", value: 450 },
  { id: "sv-farmers-lunch", name: "Farmer's Lunch", namePt: "Almoço do Fazendeiro", game: "stardew", category: "dishes", value: 150 },
  { id: "sv-complete-breakfast", name: "Complete Breakfast", namePt: "Café da Manhã Completo", game: "stardew", category: "dishes", value: 350 },
  { id: "sv-rice-pudding", name: "Rice Pudding", namePt: "Pudim de Arroz", game: "stardew", category: "dishes", value: 260 },
  { id: "sv-ice-cream", name: "Ice Cream", namePt: "Sorvete", game: "stardew", category: "dishes", value: 120 },
  { id: "sv-stir-fry", name: "Stir Fry", namePt: "Refogado", game: "stardew", category: "dishes", value: 335 },
  { id: "sv-red-plate", name: "Red Plate", namePt: "Prato Vermelho", game: "stardew", category: "dishes", value: 400 },
  { id: "sv-eggplant-parmesan", name: "Eggplant Parmesan", namePt: "Berinjela à Parmesana", game: "stardew", category: "dishes", value: 200 },

  // ========== HYTALE - CROPS & PLANTS ==========
  { id: "hy-carrot", name: "Carrot", namePt: "Cenoura", game: "hytale", category: "crops", source: "Mature Carrot", hytaleId: "Plant_Crop_Carrot_Item" },
  { id: "hy-wheat", name: "Wheat", namePt: "Trigo", game: "hytale", category: "crops", source: "Mature Wheat", hytaleId: "Plant_Crop_Wheat_Item" },
  { id: "hy-tomato", name: "Tomato", namePt: "Tomate", game: "hytale", category: "crops", source: "Mature Tomato", hytaleId: "Plant_Crop_Tomato_Item" },
  { id: "hy-corn", name: "Corn", namePt: "Milho", game: "hytale", category: "crops", source: "Mature Corn", hytaleId: "Plant_Crop_Corn_Item" },
  { id: "hy-pumpkin", name: "Pumpkin", namePt: "Abóbora", game: "hytale", category: "crops", source: "Mature Pumpkin", hytaleId: "Plant_Crop_Pumpkin_Item" },
  { id: "hy-turnip", name: "Turnip", namePt: "Nabo", game: "hytale", category: "crops", source: "Mature Turnip", hytaleId: "Plant_Crop_Turnip_Item" },
  { id: "hy-potato", name: "Potato", namePt: "Batata", game: "hytale", category: "crops", source: "Mature Potatoes", hytaleId: "Plant_Crop_Potato_Item" },
  { id: "hy-chilli", name: "Chilli", namePt: "Pimenta", game: "hytale", category: "crops", source: "Mature Chilli", hytaleId: "Plant_Crop_Chilli_Item" },
  { id: "hy-lettuce", name: "Lettuce", namePt: "Alface", game: "hytale", category: "crops", source: "Mature Lettuce", hytaleId: "Plant_Crop_Lettuce_Item" },
  { id: "hy-onion", name: "Onion", namePt: "Cebola", game: "hytale", category: "crops", source: "Mature Onions", hytaleId: "Plant_Crop_Onion_Item" },
  { id: "hy-cauliflower", name: "Cauliflower", namePt: "Couve-flor", game: "hytale", category: "crops", source: "Mature Cauliflower", hytaleId: "Plant_Crop_Cauliflower_Item" },
  { id: "hy-aubergine", name: "Aubergine", namePt: "Berinjela", game: "hytale", category: "crops", source: "Mature Aubergine", hytaleId: "Plant_Crop_Aubergine_Item" },
  { id: "hy-cotton", name: "Cotton", namePt: "Algodão", game: "hytale", category: "crops", source: "Mature Cotton", hytaleId: "Plant_Crop_Cotton_Item" },
  { id: "hy-rice", name: "Rice", namePt: "Arroz", game: "hytale", category: "crops", source: "Mature Rice", hytaleId: "Plant_Crop_Rice_Item" },
  { id: "hy-apple", name: "Apple", namePt: "Maçã", game: "hytale", category: "crops", source: "Mature Apple", hytaleId: "Food_Apple" },
  { id: "hy-wild-berries", name: "Wild Berries", namePt: "Frutos Silvestres", game: "hytale", category: "forage", hytaleId: "Food_Berries_Wild" },
  { id: "hy-sunflower", name: "Sunflower", namePt: "Girassol", game: "hytale", category: "crops", hytaleId: "Plant_Flower_Sunflower" },
  { id: "hy-blood-rose", name: "Blood Rose", namePt: "Rosa Sangrenta", game: "hytale", category: "crops", hytaleId: "Plant_Flower_Rose_Blood" },
  { id: "hy-storm-thistle", name: "Storm Thistle", namePt: "Cardo da Tempestade", game: "hytale", category: "crops", hytaleId: "Plant_Flower_Thistle_Storm" },
  { id: "hy-azure-kelp", name: "Azure Kelp", namePt: "Alga Azul", game: "hytale", category: "crops", hytaleId: "Plant_Crop_Mana3" },
  { id: "hy-azure-fern", name: "Azure Fern", namePt: "Samambaia Azul", game: "hytale", category: "crops", hytaleId: "Plant_Crop_Mana1" },

  // ========== HYTALE - SEEDS ==========
  { id: "hy-carrot-seed", name: "Carrot Seed Bag", namePt: "Saco de Sementes de Cenoura", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Carrot" },
  { id: "hy-wheat-seed", name: "Wheat Seed Bag", namePt: "Saco de Sementes de Trigo", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Wheat" },
  { id: "hy-tomato-seed", name: "Tomato Seed Bag", namePt: "Saco de Sementes de Tomate", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Tomato" },
  { id: "hy-corn-seed", name: "Corn Seed Bag", namePt: "Saco de Sementes de Milho", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Corn" },
  { id: "hy-pumpkin-seed", name: "Pumpkin Seed Bag", namePt: "Saco de Sementes de Abóbora", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Pumpkin" },
  { id: "hy-turnip-seed", name: "Turnip Seed Bag", namePt: "Saco de Sementes de Nabo", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Turnip" },
  { id: "hy-chilli-seed", name: "Chilli Seed Bag", namePt: "Saco de Sementes de Pimenta", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Chilli" },
  { id: "hy-lettuce-seed", name: "Lettuce Seed Bag", namePt: "Saco de Sementes de Alface", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Lettuce" },
  { id: "hy-rice-seed", name: "Rice Seed Bag", namePt: "Saco de Sementes de Arroz", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Rice" },
  { id: "hy-onion-bulb", name: "Onion Bulb", namePt: "Bulbo de Cebola", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Onion" },
  { id: "hy-cauliflower-seed", name: "Cauliflower Seed Bag", namePt: "Saco de Sementes de Couve-flor", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Cauliflower" },
  { id: "hy-aubergine-seed", name: "Aubergine Seed Bag", namePt: "Saco de Sementes de Berinjela", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Aubergine" },
  { id: "hy-cotton-seed", name: "Cotton Seed Bag", namePt: "Saco de Sementes de Algodão", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Cotton" },
  { id: "hy-sunflower-seed", name: "Sunflower Seed Bag", namePt: "Saco de Sementes de Girassol", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Sunflower" },
  { id: "hy-blood-rose-seed", name: "Blood Rose Seed Bag", namePt: "Saco de Sementes de Rosa Sangrenta", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Rose_Blood" },
  { id: "hy-storm-thistle-seed", name: "Storm Thistle Seed Bag", namePt: "Saco de Sementes de Cardo", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Thistle_Storm" },
  { id: "hy-palm-seed", name: "Palm Seed Bag", namePt: "Saco de Sementes de Palmeira", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Palm" },
  { id: "hy-azure-kelp-seed", name: "Azure Kelp Seed Bag", namePt: "Saco de Sementes de Alga Azul", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Mana3" },
  { id: "hy-azure-fern-seed", name: "Azure Fern Seed Bag", namePt: "Saco de Sementes de Samambaia Azul", game: "hytale", category: "seeds", hytaleId: "Plant_Seeds_Mana1" },

  // ========== HYTALE - MATERIALS ==========
  { id: "hy-plant-fiber", name: "Plant Fiber", namePt: "Fibra Vegetal", game: "hytale", category: "materials", hytaleId: "StartGear_Scrap_Fiber" },
  { id: "hy-stick", name: "Stick", namePt: "Graveto", game: "hytale", category: "materials", hytaleId: "Stick" },
  { id: "hy-tree-sap", name: "Tree Sap", namePt: "Seiva de Árvore", game: "hytale", category: "materials", hytaleId: "Item_Sap" },
  { id: "hy-tree-bark", name: "Tree Bark", namePt: "Casca de Árvore", game: "hytale", category: "materials", hytaleId: "Item_Bark" },
  { id: "hy-moss", name: "Moss", namePt: "Musgo", game: "hytale", category: "materials", hytaleId: "Item_Moss" },
  { id: "hy-petals", name: "Petals", namePt: "Pétalas", game: "hytale", category: "materials", hytaleId: "Item_Petals_Red" },
  { id: "hy-hive", name: "Hive", namePt: "Colmeia", game: "hytale", category: "materials", hytaleId: "Block_Hive" },
  { id: "hy-pinecone", name: "Pinecone", namePt: "Pinha", game: "hytale", category: "materials", hytaleId: "Item_Pinecone" },
  { id: "hy-sap-glob", name: "Sap Glob", namePt: "Globo de Seiva", game: "hytale", category: "materials", hytaleId: "Item_Sap_Glob" },
  // Additional Food/Materials inferred
  { id: "hy-meat-pie", name: "Meat Pie", namePt: "Torta de Carne", game: "hytale", category: "dishes", hytaleId: "Food_Pie_Meat" },
];

