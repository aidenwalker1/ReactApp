import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View, Button } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

interface CalendarDietDisplayProps {
  habits:HabitData[]
  date:Date
  onComplete : (old:HabitData, habit:HabitData) => void
}

export default function HabitDisplaySimple({habits, date, onComplete} : CalendarDietDisplayProps) {
    return (
        <View>
          {
            habits.map((habit) => (
              <View>
                <Button 
                  onPress={() => onComplete(habit, {...habit, completedDays: habit.completedDays.includes(date) ? habit.completedDays.filter((h) => h != date) : [...habit.completedDays, date]})}
                  title={habit.completedDays.includes(date) ? 'Completed' : 'Incomplete'}
                />
                <Text>
                    {habit.name}
                </Text>
                <Text>
                    {habit.category}
                </Text>
                <Text>
                    {habit.frequency}
                </Text>
                <Text>
                    {habit.startDay.toDateString()}
                </Text>
              </View>
            ))
          }
        </View>
    );
}
interface CalendarDayProps {
    habit: HabitData
    meal:MealData
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
  },
  list2Container: {
    backgroundColor: '#fff',
    color: '#808080',
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
