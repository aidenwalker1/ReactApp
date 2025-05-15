import { View, Text, Button } from "react-native";
import { Frequency, HabitData } from "./DataInterfaces";
import { useState } from "react";
import DataFormModal from "./PopUp";

interface HabitDisplayProp {
    habit:HabitData
    onClose: (habit:HabitData) => void
    onSubmit: (newHabit:HabitData, habit:HabitData) => void;
}

export default function HabitDisplay({habit, onClose, onSubmit} : HabitDisplayProp) {
    const [showPopup, setPopup] = useState(false);

    return (
        <View>
             <DataFormModal 
                visible={showPopup}
                onClose={() => setPopup(false)}
                onSubmit={(newHabit:HabitData) => {
                    onSubmit(newHabit, habit)
                }}
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
            <Text>
                {habit.completedDays.length == 0 ? "Empty" : habit.completedDays.map((date) => date.toDateString()).reduce((prev, cur) => prev + ", " + cur)}
            </Text>
             <Button
                title = "Remove Habit"
                onPress={() =>onClose(habit)}
            />
            <Button
                title = "Edit Habit"
                onPress={() => setPopup(true)}
            />
        </View>
    );
}