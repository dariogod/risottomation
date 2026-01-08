import { Dish, SpritzOption, AppetizerOption, RisottoBase, Topping, OrderStep } from "./types";

export const favorites: Dish[] = [
  {
    id: "1",
    name: "Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, parmesan, and truffle oil",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "2",
    name: "Seafood Risotto",
    description: "Fresh seafood medley with arborio rice, white wine, and herbs",
    allergens: ["Fish", "Shellfish"],
  },
  {
    id: "3",
    name: "Truffle Risotto",
    description: "Luxurious black truffle risotto with parmesan and butter",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "4",
    name: "Asparagus & Pea Risotto",
    description: "Spring vegetables with creamy risotto and lemon zest",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "5",
    name: "Saffron Risotto",
    description: "Classic Milanese-style risotto with saffron and bone marrow",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "6",
    name: "Butternut Squash Risotto",
    description: "Roasted butternut squash with sage and crispy pancetta",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "7",
    name: "Tomato & Basil Risotto",
    description: "Fresh tomatoes and basil with mozzarella and olive oil",
    allergens: ["Lactose", "Gluten"],
  },
  {
    id: "8",
    name: "Porcini Risotto",
    description: "Dried porcini mushrooms with garlic, white wine, and parmesan",
    allergens: ["Lactose", "Gluten"],
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
