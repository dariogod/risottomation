import { Dish, RisottoBase, Veggie, Protein } from "./types";

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

export const risottoBases: RisottoBase[] = [
  {
    id: "vegan",
    name: "Vegan",
    description: "Vegan risotto base",
  },
  {
    id: "veggie",
    name: "Veggie",
    description: "Vegetarian risotto base",
  },
  {
    id: "vlees",
    name: "Meat (bouillon)",
    description: "Meat-based risotto bouillon",
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


