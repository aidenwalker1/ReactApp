export enum Frequency {
    Hourly,
    Daily,
    Weekly,
    Monthly,
}

export interface HabitData {
    name:string;
    frequency: Frequency;
    startDay:Date;
    completedDays:Date[];
    missedDays:Date[];
    category:string;
}

export interface User {
    habits:HabitData[];
    username:string;
}