import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

export interface SimpleMealDisplayProps {
    meals:MealData[]
    date:Date
}


export default function MealDisplaySimple({meals, date} : SimpleMealDisplayProps) {
    return (
        <View>
          {meals.map((meal) => (
            <View>
              <Text>
              {meal.name}
              </Text>
              <Text>
                  {''+meal.mealCalories}
              </Text>
              <Text>
                  {''+meal.mealDays}
              </Text>
              <Text>
                  {''+meal.mealTime}
              </Text>
            </View>
          ))}
           
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
