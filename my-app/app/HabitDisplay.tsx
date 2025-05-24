import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Frequency, HabitData, weekDays } from "./DataInterfaces";
import { useState } from "react";
import DataFormModal from "./PopUp";
import DropdownExample from "./Dropdown";

interface HabitDisplayProp {
    habit:HabitData
    onClose: (habit:HabitData) => void
    onSubmit: (newHabit:HabitData) => void;
}

export default function HabitDisplay({habit, onClose, onSubmit} : HabitDisplayProp) {
    const [name, setName] = useState(habit.name);
    const [category, setCategory] = useState(habit.category)
    const [days, setDays] = useState(habit.habitDays)
    const categories:{[key: string]:string} = {'None':'None','Health': "Health", 'Career': "Career"};

    const makeNewDay = (day:string) => {
      const newDay = days.find(d => d.getDay() === weekDays[day])
      if (newDay) {
        const newDays = days.filter(d => d.getDay() !== newDay.getDay())
        setDays(newDays)
        onSubmit({...habit, habitDays:newDays})
        console.log(habit.habitDays)
      }
      else {
        const d = new Date()
        const diff = d.getDay() - weekDays[day]
        d.setDate(d.getDate() - diff)

        const newDays = [...days, d]
        setDays(newDays)
        console.log(habit.habitDays)
        onSubmit({...habit, habitDays:newDays})
      }
    }

    return (
        <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50}}>
            <View style={styles.buttonRow2}>
                <TextInput
                    style={styles.input}
                    placeholder="Habit Name"
                    value={name}
                    onChangeText={() => {
                        setName(name)
                        onSubmit({...habit, name:name})
                    }}
                />
                <DropdownExample
                        title={'Category'}
                        items={categories}
                        selected={category}
                        onChanged={(value, key) => {
                          setCategory(key);
                        }}
                 />
                
            </View>
            
            <Text style={styles.subTitle}>
                Created on {habit.startDay.toDateString()}
            </Text>

            <View style={styles.buttonRow}>
                { Object.keys(weekDays).map((day) => (
                    <TouchableOpacity
                      style={[styles.button, {backgroundColor:days.some(d => d.getDay() === weekDays[day]) ? '#0caa4c' : '#e72525'}]}
                      onPress={() => makeNewDay(day)}

                    >
                      <Text style={styles.buttonText}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                ))
                    
                }
            </View>
            
            <Text>
                {habit.completedDays.length == 0 ? "No Completed Days" : habit.completedDays.map((date) => date.toDateString()).reduce((prev, cur) => prev + ", " + cur)}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onClose(habit)}
            >
              <Text style={styles.buttonText}>
                Remove Habit
              </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:2,
        alignItems:'center',
    },
    buttonRow2: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:2,
        alignItems:'center',
        zIndex:10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
   button: {
    backgroundColor: '#e00b0b',
    paddingVertical: 8,
    paddingHorizontal: 15,
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
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
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
    fontWeight: 'bold',
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
  },
});
