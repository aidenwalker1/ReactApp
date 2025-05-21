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
    username:string;
}

export type FoodData = {
    name:string
    calories:number
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