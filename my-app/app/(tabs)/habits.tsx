import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { HabitData, User } from '../DataInterfaces';
import HabitDisplay from '../HabitDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';

export default function HabitsScreen() { 
    const [showPopup, setPopup] = useState(false);

    const user = useSelector((state: RootState) => state.user.latest);
    const [habits, setHabits] = useState<HabitData[]>(user.habits)

    const dispatch = useDispatch();

    useEffect(() => {
          if (user) {
            setHabits(user.habits)
          }
    }, [user]);
    
    const addHabit = (habit:HabitData) => {
        dispatch(saveUser({...user, habits:[...habits, habit]}))
    };

    const removeHabit = (habit:HabitData) => {
        dispatch(saveUser({...user, habits:habits.filter((item) => item != habit)}))
    };

    const editHabit = (newHabit:HabitData, old:HabitData) => {
        dispatch(saveUser({...user, habits:habits.map((val) => val == old ? newHabit : val)}))
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
