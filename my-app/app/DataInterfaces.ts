export enum Frequency {
    Hourly = "Hourly",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
}

export interface HabitData {
    name:string;
    frequency: Frequency;
    startDay:Date;
    completedDays:Date[];
    category:string;
}

export interface User {
    habits:HabitData[];
    diets:DietData[]
    selectedDiet:string
    username:string;
}

export type FoodData = {
    name:string
    calories:number
    calsPer100:number
    grams:number
    category:string
}

export type MealData = {
    name: string
    food: FoodData[]
    mealCalories:number
    mealDays:string[]
    mealTime:string
}

export type DietData = {
    name:string
    meals: MealData[]
    duration:number
    totalCalories:number
}

export type FoodCSVData = {
  category:string
  item:string
  calories:string
}