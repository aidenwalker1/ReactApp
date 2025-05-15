import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { HabitData, User } from '../DataInterfaces';
import HabitDisplay from '../HabitDisplay';

export default function HabitsScreen() { 
    const [showPopup, setPopup] = useState(false);

    const [user, setUser] = useState<User>({
        habits:[],
        username:"Name",
    });
    
    const addHabit = (habit:HabitData) => {
        setUser(prev => ({
            ...prev,
            habits: [...prev.habits, habit]
        }));
    };

    const removeHabit = (habit:HabitData) => {
        setUser(prev => ({
            ...prev,
            habits: prev.habits.filter((item) => item != habit)
        }));
    };

    const editHabit = (newHabit:HabitData, old:HabitData) => {
        setUser(prev => ({
            ...prev,
            habits: prev.habits.map((val) => val == old ? newHabit : val)
        }));
    }

    return (
        
        <View>
            <DataFormModal 
            visible={showPopup}
            onClose={() => setPopup(false)}
            onSubmit={(habit) => {
                addHabit(habit)
            }}
            />
            <Button
                title = "Add Habit"
                onPress={() =>setPopup(true)}

            />
            <Text style = {styles.titleContainer}>Habits</Text>
            <ScrollView style = {styles.listContainer}>
                {user.habits.map((item,index) => (
                    <View key={index} >
                        <HabitDisplay habit={item} onClose={removeHabit} onSubmit={editHabit}/>
                    </View>
                ))
                }
            </ScrollView>
        </View>
  );
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
