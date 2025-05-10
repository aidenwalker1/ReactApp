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

    return (
        
        <View>
            <DataFormModal 
            visible={showPopup}
            onClose={() => setPopup(false)}
            onSubmit={(name, frequency, startDay, category) => {
                addHabit({
                  name:name,
                  frequency:frequency,
                  startDay:startDay,
                  completedDays:[],
                  category:category
                })
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
                        <HabitDisplay habit={item}/>
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
