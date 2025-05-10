import { View, Text } from "react-native";
import { HabitData } from "./DataInterfaces";

interface HabitDisplayProp {
    habit:HabitData
}

export default function HabitDisplay({habit} : HabitDisplayProp) {
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