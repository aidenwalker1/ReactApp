import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View, Button } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

interface CalendarDietDisplayProps {
  habits:HabitData[]
  date:Date
  onComplete : (old:HabitData, habit:HabitData) => void
}

export default function HabitDisplaySimple({habits, date, onComplete} : CalendarDietDisplayProps) {
  const today = new Date()  
  return (
        <View>
          {
            habits.map((habit) => (
              <View>
                { date.toDateString() === today.toDateString() && 
                  <Button 
                    onPress={() => onComplete(habit, {...habit, completedDays: habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? habit.completedDays.filter((h) => h.toDateString() != date.toDateString()) : [...habit.completedDays, date]})}
                    title={habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? 'Completed' : 'Incomplete'}
                  />
                }
                { date.toDateString() != today.toDateString() && 
                  <Text>
                    {habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? 'Completed' : 'Incomplete'}
                  </Text>
                }

                
                <Text>
                    {habit.name}
                </Text>
                <Text>
                    {habit.category}
                </Text>
                <Text>
                {habit.completedDays.map((v) => v.toDateString() + ' ')}
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
