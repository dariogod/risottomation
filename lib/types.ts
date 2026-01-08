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

export interface AppetizerOption {
  id: string;
  name: string;
  description?: string;
}

export interface RisottoBase {
  id: string;
  name: string;
  description?: string;
}

export interface Topping {
  id: string;
  name: string;
  description?: string;
}

export interface Order {
  spritz?: SpritzOption;
  appetizer?: AppetizerOption;
  risottoBase?: RisottoBase;
  toppings: Topping[];
}

export interface OrderStep {
  id: number;
  title: string;
  icon?: string;
}
