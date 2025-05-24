import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { HabitData, User } from '../DataInterfaces';
import HabitDisplay from '../HabitDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';
import {MAX, v4 as uuidv4} from 'uuid';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

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
        dispatch(saveUser({...user, habits:habits.filter((item) => item.id != habit.id)}))
    };

    const editHabit = (old:HabitData, newHabit:HabitData) => {
        dispatch(saveUser({...user, habits:habits.map((val) => val.id == old.id ? newHabit : val)}))
    }

    return (
        
        <View style={{flex:1, alignItems:'center',gap:20, backgroundColor:'#303030',minHeight:screenHeight}}>
            <DataFormModal 
            visible={showPopup}
            onClose={() => setPopup(false)}
            onSubmit={(habit) => {
                addHabit(habit)
            }}
            />
            <Text style = {[styles.titleContainer, {alignSelf:'flex-start', paddingHorizontal:20}]}>Habits</Text>
           
             <View style={styles.habitsBackground}>
                  <Text style = {styles.subTitle}>Your Habits</Text>
                  <ScrollView contentContainerStyle={{flexGrow:1,gap:20}}>
                    {user.habits.map((item,index) => (
                      <HabitDisplay key={index} habit={item} onClose={removeHabit} onSubmit={(newHabit) => editHabit(item, newHabit)}/>
                    ))
                   }

                  </ScrollView>
                   <TouchableOpacity
                        style={styles.button}
                        onPress={() =>addHabit({id:uuidv4(), name:'habit'+habits.length, habitDays:[], startDay:new Date(), completedDays:[], category:'None'})}
                    >
                      <Text style={styles.buttonText}>
                        Add Habit
                      </Text>
                    </TouchableOpacity>
              </View>

            
            
        </View>
  );
}

const styles = StyleSheet.create({
   button: {
    backgroundColor: '#e00b0b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  habitsBackground: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    minHeight: screenHeight / 2,
    minWidth: screenHeight / 1.5,
    maxHeight: (3 *screenHeight) / 4,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
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
    fontSize: 58,
    color: '#ffffff', // or white if on dark background
    borderColor:'#00000',
    textShadowColor:'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    fontFamily:'Roboto'
  },
  subTitle: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
  },
});
