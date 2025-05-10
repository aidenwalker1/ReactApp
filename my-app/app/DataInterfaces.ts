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
    username:string;
}