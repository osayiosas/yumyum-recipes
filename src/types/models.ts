import type { grocery_list_items, grocery_lists, ingredients, meal_plans, meals, recipes } from '@prisma/client';

/** Ingredients */

/** if this changes, the prisma schema needs to be updated as well */
export enum IngredientType {
  VOLUME = 'VOLUME',
  WEIGHT = 'WEIGHT',
  COUNT = 'COUNT',
}

/** Recipes */
export interface IRecipe extends recipes {
  ingredients: ingredients[];
}

/** Meal Plans */
export interface IMeal extends meals {
  recipe: IRecipe;
}

export interface IMealPlan extends meal_plans {
  meals: IMeal[];
}

/** Grocery Lists */
export interface IIngredientAmount {
  amount: number;
  unit?: string;
}

export interface IGroceryListItem extends grocery_list_items {
  amount?: IIngredientAmount;
}

export interface IGroceryList extends grocery_lists {
  items: IGroceryListItem[];
}

/** if this changes, the prisma schema needs to be updated as well */
export enum GroceryListStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

/** if this changes, the prisma schema needs to be updated as well */
export enum GroceryListItemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}