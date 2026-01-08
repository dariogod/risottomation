import { Dish, SpritzOption, RisottoBase, Veggie, Protein } from "./types";

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

export const risottoBases: RisottoBase[] = [
  {
    id: "vegan",
    name: "Vegan - without cheese",
    description: "Plant-based risotto without cheese",
  },
  {
    id: "normal",
    name: "Classic - with parmesan cheese",
    description: "Classic risotto with parmesan cheese",
  },
];

export const veggies: Veggie[] = [
  {
    id: "pompoen",
    name: "Pumpkin",
    description: "Pumpkin",
  },
  {
    id: "oesterzwam",
    name: "Oyster Mushroom",
    description: "Oyster mushroom",
  },
  {
    id: "prei",
    name: "Leek",
    description: "Leek",
  },
];

export const proteins: Protein[] = [
  {
    id: "truffel",
    name: "Truffle",
    description: "Truffle",
  },
  {
    id: "pompoenzaden",
    name: "Pumpkin Seeds",
    description: "Pumpkin seeds",
  },
  {
    id: "chorizo",
    name: "Chorizo",
    description: "Chorizo sausage",
  },
  {
    id: "guanciale",
    name: "Guanciale",
    description: "Guanciale",
  },
];




