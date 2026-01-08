import { Dish, SpritzOption, AppetizerOption, RisottoBase, Veggie, Protein } from "./types";

export const favorites: Dish[] = [
  {
    id: "founder-special",
    name: "The Founder Special",
    description: "A normal Risotto intelligence layer with extra parmesan, crispy Guanciale, pumpkin and a lot of grinding & hustling (pepper & salt). Eat it like there is no tomorrow.",
    allergens: ["Lactose", "Gluten"],
    image: "/founders.png",
  },
  {
    id: "pitpat-risotto",
    name: "The Pitpat Risotto",
    description: "Dual-flavored contrast plate delivered with perfect balance. Contains earthy leek & truffle on one side, vibrant pumpkin & chorizo on the other, and zero middle ground.",
    allergens: ["Gluten"],
    image: "/pitpat.png",
  },
  {
    id: "gtm-shire",
    name: "The GTM Shire",
    description: "Comfort-driven sales classic straight from the GTM Shire. Built on a classic broth with earthy oyster mushrooms, sweet pumpkin, and crispy guanciale. Closing food deals has never looked this good.",
    allergens: ["Gluten"],
    image: "/sales.png",
  },
];

export const spritzes: SpritzOption[] = [
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
  {
    id: "aperol",
    name: "Aperol Spritz",
    description: "Aperol, prosecco, and soda water",
  },
  {
    id: "florence-machine",
    name: "Florence and the Machine (Aperol 0.0)",
    description: "Aperol 0.0, prosecco, and soda water",
  },
  {
    id: "no-spritz",
    name: "No spritz",
    description: "No spritz",
  },
];

export const appetizers: AppetizerOption[] = [
  {
    id: "panino-caprese-con-carne",
    name: "panino ITP (caprese con prosciutto)",
    description: "Panino IPT con prosciutto",
  },
  {
    id: "panino-caprese-sin-carne",
    name: "panino ITP (caprese vegetariano)",
    description: "Panino ITP vegano",
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
  {
    id: "no-veggies",
    name: "No veggies",
    description: "No vegetables",
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
  {
    id: "no-protein",
    name: "No protein",
    description: "No protein topping",
  },
];




