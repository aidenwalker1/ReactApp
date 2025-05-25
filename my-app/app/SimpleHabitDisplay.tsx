import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View, Button, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

interface CalendarDietDisplayProps {
  habits:HabitData[]
  date:Date
  onComplete : (habit:HabitData) => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

export default function HabitDisplaySimple({habits, date, onComplete} : CalendarDietDisplayProps) {
  const today = new Date()  
  return (
        <View style={styles.habitsBackground}>
          <Text style={styles.subTitle}> 
            Your Habits
          </Text>

          { habits.length == 0 ? 
            <Text style={[styles.subTitle, {fontSize:20}]}> 
              Nothing to do today!
            </Text>
            :
            <FlatList
              data={habits}
              renderItem={(item) => (
                <ShowHabit habit={item.item} date={date} onComplete={onComplete} />
                
              )}
              keyExtractor={item=>item.id}
              numColumns={4}
            >
            </FlatList>
          }
        </View>
    );
}

function ShowHabit({habit, date, onComplete} : {habit:HabitData, date:Date, onComplete:(h:HabitData) => void}) {
  const today = new Date()
  return (
    <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50}}>
      
      <Text style={[styles.subTitle2, {fontSize:11, textDecorationLine:'underline'}]}>
          Name
      </Text>
      <Text style={styles.subTitle2}>
          {habit.name}
      </Text>

      <Text style={[styles.subTitle2, {fontSize:11, textDecorationLine:'underline'}]}>
          Category
      </Text>
      <Text style={styles.subTitle2}>
          {habit.category}
      </Text>

    { date.toDateString() === today.toDateString() && 
        <TouchableOpacity
          style={[styles.button, {backgroundColor: habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? 'green' : 'red'}]}
          onPress={() => onComplete({...habit, completedDays: habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? habit.completedDays.filter((h) => h.toDateString() != date.toDateString()) : [...habit.completedDays, date]})}
        >
          <Text style={styles.buttonText}>
            {habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? 'Completed' : 'Incomplete'}
          </Text>
        </TouchableOpacity>
      }
      { date.toDateString() != today.toDateString() && 
        <Text style={styles.subTitle2}>
          {habit.completedDays.some((h) => h.toDateString() === date.toDateString()) ? 'Completed' : 'Incomplete'}
        </Text>
      }
  </View>
  )
}

interface CalendarDayProps {
    habit: HabitData
    meal:MealData
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
    minWidth: screenWidth / 2
  },
  subTitle2: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
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