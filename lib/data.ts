import { Dish, SpritzOption, AppetizerOption, RisottoBase, Topping, OrderStep } from "./types";

export const favorites: Dish[] = [
  {
    id: "wouter-special",
    name: "The Wouter Special",
    description: "Truffle risotto with extra parmesan, crispy pancetta, a touch of chaos, and 'just one more quick fix' before serving",
    allergens: ["Lactose", "Gluten", "Perfectionism"],
  },
  {
    id: "sprint-risotto",
    name: "The Sprint Risotto",
    description: "Fast-paced mushroom medley delivered in exactly two weeks. Contains wild mushrooms, agile methodology, and zero scope creep",
    allergens: ["Gluten", "Deadlines"],
  },
  {
    id: "debugging-delight",
    name: "The Debugging Delight",
    description: "Comfort food for late-night coding sessions. Creamy arborio with console.log(cheese) and a stack trace of herbs",
    allergens: ["Lactose", "Gluten", "Caffeine"],
  },
];

export const spritzes: SpritzOption[] = [
  {
    id: "aperol",
    name: "Aperol Spritz",
    description: "Aperol, prosecco, and soda water",
  },
  {
    id: "limoncello",
    name: "Limoncello Spritz",
    description: "Limoncello, prosecco, and soda water",
  },
  {
    id: "hugo",
    name: "Hugo Spritz",
    description: "Elderflower syrup, prosecco, mint, and lime",
  },
];

export const appetizers: AppetizerOption[] = [
  {
    id: "bruschetta",
    name: "Bruschetta",
    description: "Toasted bread with fresh tomatoes, basil, and garlic",
  },
  {
    id: "caprese",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil with balsamic",
  },
  {
    id: "antipasto",
    name: "Antipasto Platter",
    description: "Selection of cured meats, cheeses, and olives",
  },
  {
    id: "arancini",
    name: "Arancini",
    description: "Crispy risotto balls with mozzarella center",
  },
  {
    id: "prosciutto",
    name: "Prosciutto & Melon",
    description: "Thinly sliced prosciutto with fresh cantaloupe",
  },
];

export const risottoBases: RisottoBase[] = [
  {
    id: "arborio",
    name: "Arborio",
    description: "Classic Italian short-grain rice",
  },
  {
    id: "carnaroli",
    name: "Carnaroli",
    description: "Premium risotto rice with excellent texture",
  },
  {
    id: "mushroom-base",
    name: "Mushroom Base",
    description: "Risotto cooked with mushroom stock",
  },
  {
    id: "seafood-base",
    name: "Seafood Base",
    description: "Risotto cooked with seafood stock",
  },
  {
    id: "vegetable-base",
    name: "Vegetable Base",
    description: "Risotto cooked with vegetable stock",
  },
];

export const toppings: Topping[] = [
  {
    id: "parmesan",
    name: "Parmesan",
    description: "Freshly grated parmesan cheese",
  },
  {
    id: "truffle",
    name: "Truffle",
    description: "Black truffle shavings",
  },
  {
    id: "mushrooms",
    name: "Mushrooms",
    description: "Sautéed wild mushrooms",
  },
  {
    id: "seafood-mix",
    name: "Seafood Mix",
    description: "Shrimp, scallops, and mussels",
  },
  {
    id: "peas",
    name: "Peas",
    description: "Fresh green peas",
  },
  {
    id: "asparagus",
    name: "Asparagus",
    description: "Grilled asparagus spears",
  },
  {
    id: "pancetta",
    name: "Pancetta",
    description: "Crispy pancetta bits",
  },
  {
    id: "sun-dried-tomatoes",
    name: "Sun-Dried Tomatoes",
    description: "Marinated sun-dried tomatoes",
  },
  {
    id: "artichokes",
    name: "Artichokes",
    description: "Marinated artichoke hearts",
  },
  {
    id: "basil",
    name: "Fresh Basil",
    description: "Fresh basil leaves",
  },
  {
    id: "lemon-zest",
    name: "Lemon Zest",
    description: "Fresh lemon zest",
  },
  {
    id: "crispy-onions",
    name: "Crispy Onions",
    description: "Fried crispy onions",
  },
];

export const orderSteps: OrderStep[] = [
  {
    id: 1,
    title: "Choose your spritz",
  },
  {
    id: 2,
    title: "Choose your appetizer",
  },
  {
    id: 3,
    title: "Compose your risotto",
  },
];
