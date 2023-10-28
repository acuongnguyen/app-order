import { FoodCategories } from "../../types";
export let Categories: FoodCategories = [];
export const setCategories = (newCategories: FoodCategories) => {
    Categories = newCategories;
};