import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { HabitData } from "./DataInterfaces";

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
                {habit.frequency}
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

interface CalendarDayProps {
    habits: HabitData

}

export default function CalendarDay({habit} : {habit:HabitData}) {
    return (
       <View>
            <HabitDisplaySimple habit={habit}></HabitDisplaySimple>
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
