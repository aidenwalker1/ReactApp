export enum Frequency {
    Hourly = "Hourly",
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
}

export interface HabitData {
    id:string
    name:string;
    habitDays:Date[]
    startDay:Date;
    completedDays:Date[];
    category:string;
}

export interface User {
    id:string
    habits:HabitData[];
    diets:DietData[]
    selectedDiet:DietData | null
    username:string;
}

export const weekDays:{[key:string]:number} = {'Sunday':0, 'Monday':1, 'Tuesday':2, 'Wednesday':3, 'Thursday':4, 'Friday':5, 'Saturday':6}

export type FoodData = {
    name:string
    calories:number
    calsPer100:number
    grams:number
    category:string
}

export type MealData = {
    id:string
    name: string
    food: FoodData[]
    mealCalories:number
    mealDays:Date[]
    mealTime:string
}

export type DietData = {
    id:string
    name:string
    meals: MealData[]
    duration:number
    totalCalories:number
    completedDays:Date[]
}

export type FoodCSVData = {
  category:string
  item:string
  calories:string
}