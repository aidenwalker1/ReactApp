import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

function HabitDisplaySimple({habit} : {habit:HabitData}) {
    return (
        <View>
            <Text>
                {habit.name}
            </Text>
            <Text>
                {habit.category}
            </Text>
            <Text>
                {habit.startDay.toDateString()}
            </Text>
            <Text>
                {habit.completedDays.length == 0 ? "Empty" : habit.completedDays.map((date) => date.toDateString()).reduce((prev, cur) => prev + ", " + cur)}
            </Text>


        </View>
    );
}

function MealDisplaySimple({meal} : {meal:MealData}) {
    return (
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
    );
}

interface CalendarDayProps {
    habit: HabitData
    meal:MealData
}

export default function CalendarDay({habit, meal} : CalendarDayProps) {
    return (
       <View>
            <HabitDisplaySimple habit={habit} />
            <MealDisplaySimple meal={meal} />
       </View>
    )
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
