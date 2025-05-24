import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
import CalendarItem from "../CalendarItem";
import { DietData, Frequency, HabitData, MealData, User, weekDays } from "../DataInterfaces";
import CalendarDay from "../CalendarDay";
import HabitDisplaySimple from "../SimpleHabitDisplay";
import MealDisplaySimple, { SimpleMealDisplayProps } from "../DietDisplaySimple";
import { useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';
import { useDispatch } from 'react-redux';

type CalendarItem = {
  date:Date
  selected:boolean
}

interface CalendarDietDisplayProps {
  habits:HabitData[]
  date:Date
}

type HabitStreak = {
  habit:HabitData
  streak:number
}

export default function CalendarDisplay() {
    const makeCalendar = (today:Date) => {
      const month = today.getMonth()
      const year = today.getFullYear()
      return Array.from({length:30}, (_, index) => ({date:new Date(year, month, index+1),selected:false}))
    }

    const user = useSelector((state: RootState) => state.user.latest);
    const [habits, setHabits] = useState<HabitData[]>(user.habits)
    const [selectedDiet, setSelectedDiet] = useState<DietData | null>(user.selectedDiet)
    const dispatch = useDispatch();

    useEffect(() => {
          if (user) {
            setHabits(user.habits)
            setSelectedDiet(user.selectedDiet)
          }
    }, [user]);

    const startDateSelection = useRef<Date | null>(null)
    const [calendar, setCalendar] = useState(makeCalendar(new Date()))
    const [dateSelected, setDateSelected] = useState(false)
    
    const updateSelections = (date:Date) => {
      if (startDateSelection.current === null) {
        startDateSelection.current = date
        return
      }
      let s = startDateSelection.current
      const start = s.getTime() < date.getTime() ? s : date
      const end = s.getTime() > date.getTime() ? s : date

      const inRange = (d:Date) => {
        return d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
      }

      setCalendar(calendar.map((item:CalendarItem) => inRange(item.date) ? {...item, selected:true} : {...item, selected:false}))
    }

    const renderItem = ({item}:{item:CalendarItem}) => {
      return (
       <CalendarItem item={item.date} mouseHeld={isOver} selected={item.selected}
          onSelect={updateSelections}
       />
      )
    }

    const selectedRenderItem = ({item}:{item:CalendarDietDisplayProps}) => {
      return (
       <HabitDisplaySimple habits={item.habits} date={item.date} onComplete={(old, habit) => {
          dispatch(saveUser({...user, habits:habits.map((h) => h.id != old.id ? h : habit)}))
       }}/>
      )
    }

    const selectedRenderMeal = ({item}:{item:SimpleMealDisplayProps}) => {
      return (
        <MealDisplaySimple meals={item.meals} date={item.date} />
      )
    }

    const [isOver, setIsOver] = useState(false);

    const getHabitDays = (habits:HabitData[], selected:CalendarItem[]) => {
      return selected.map((item) => ({habits:habits.filter((h) => h.habitDays.some(d => d.getDay()=== item.date.getDay())), date:item.date}))
    }

    const getMealDays = (meals:MealData[], selected:CalendarItem[]):SimpleMealDisplayProps[] => {
      return selected.map((item) => ({meals:meals.filter((meal) => meal.mealDays.some(d => d.getDay() == item.date.getDay())), date:item.date}))
    }

    const detectHabitStreaks = () => {
      return habits.map((habit) => {
        let streak = 0
        let today = new Date().getDate()
        let weekDay = new Date().getDay()
        console.log('today:' + today)

        for (let i = today; i >0; i--) {
          if (!habit.habitDays.some(d => d.getDay() === weekDay)) {
            weekDay = (weekDay - 1) % 7
            continue
          }
          weekDay = (weekDay - 1) % 7

          if (!habit.completedDays.some(d => d.getDate() === i)) {
            console.log('what' + i)
            break
          }

          streak += 1
        }

        return {habit:habit, streak:streak}
      })
    }

    return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <div
              onMouseDown={() => {
                  if (!dateSelected) {
                    startDateSelection.current = null
                    setCalendar(calendar.map((item:CalendarItem) => ({...item, selected:false})))
                    setDateSelected(true)
                  }
                  setIsOver(true)
                  
                }
              }

              onMouseUp={() => {
                setIsOver(false)
                setDateSelected(false)
              }}

            >
              <FlatList
              data={calendar}
              renderItem={renderItem}
              keyExtractor={item => item.date.toDateString()}
              numColumns={7}
            />
            </div>
            <View>
              {
                detectHabitStreaks().map((val:HabitStreak) => (
                  <Text>
                    {val.habit.name} streak: {val.streak}
                  </Text>
                ))
              }
            </View>
          </View>
          
          <ScrollView>
            <FlatList
            data={getHabitDays(habits, calendar.filter((c) => c.selected))}
            renderItem={selectedRenderItem}
            keyExtractor={item => item.date.toDateString()}
            scrollEnabled={true}
            />

            <FlatList
              data={getMealDays(selectedDiet ? selectedDiet.meals : [], calendar.filter((c) => c.selected))}
              renderItem={selectedRenderMeal}
              keyExtractor={item => item.date.toDateString()}
              scrollEnabled={true}
            />
          </ScrollView>
          
          
        </View>
    )
}

const styles = StyleSheet.create({
  container2: {
    flexDirection:'row',
    padding:10
  },
  container: {
    flex:1
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
