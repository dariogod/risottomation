export interface Dish {
  id: string;
  name: string;
  description: string;
  allergens?: string[];
  image?: string;
}

export interface SpritzOption {
  id: string;
  name: string;
  description?: string;
}

export interface RisottoBase {
  id: string;
  name: string;
  description?: string;
}

export interface Veggie {
  id: string;
  name: string;
  description?: string;
}

export interface Protein {
  id: string;
  name: string;
  description?: string;
}

export interface Order {
  name?: string;
  mealType?: "grown-ups" | "kids";
  spritz?: SpritzOption;
  base?: RisottoBase;
  veggies: Veggie[];
  proteins: Protein[];
  kidsMeal?: boolean;
}

export interface OrderStep {
  id: number;
  title: string;
  icon?: string;
}
