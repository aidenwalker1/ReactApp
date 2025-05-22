import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
import CalendarItem from "../CalendarItem";
import { DietData, Frequency, HabitData, MealData, User } from "../DataInterfaces";
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
    const [diets, setDiets] = useState<DietData[]>(user.diets)
    const [habits, setHabits] = useState<HabitData[]>(user.habits)
    const dispatch = useDispatch();

    useEffect(() => {
          if (user) {
            setDiets(user.diets)
            setHabits(user.habits)
          }
    }, [user]);

    const [value, setValue] = useState(new Date());
    const [lastDate, setLastDate] = useState<Date | null>(null)
    const startDateSelection = useRef<Date | null>(null)
    const [calendar, setCalendar] = useState(makeCalendar(new Date()))
    const [dateSelected, setDateSelected] = useState(false)
    
    const updateSelections = (date:Date) => {
      if (startDateSelection.current === null) {
        startDateSelection.current = date
        setLastDate(date)
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
          dispatch(saveUser({...user, habits:habits.map((h) => h != old ? h : habit)}))
       }}/>
      )
    }

    const selectedRenderMeal = ({item}:{item:SimpleMealDisplayProps}) => {
      return (
        <MealDisplaySimple meals={item.meals} date={item.date} />
      )
    }

    const [isOver, setIsOver] = useState(false);

    const habitInCalendarRange = (habit:HabitData, date:Date) => {
      const freq = habit.frequency
      if (freq === Frequency.Hourly || freq === Frequency.Daily) {
        return true
      }
      else if (freq === Frequency.Weekly) {
        return date.getDay() === habit.startDay.getDay()
      } 
      else if (freq === Frequency.Monthly) {
        return date.getUTCDate() === habit.startDay.getUTCDay()
      }

      return false
    }

    const getHabitDays = (habits:HabitData[], selected:CalendarItem[]) => {
      return selected.map((item) => ({habits:habits.filter((h) => habitInCalendarRange(h, item.date)), date:item.date}))
    }

    const getMealDays = (meals:MealData[], selected:CalendarItem[]):SimpleMealDisplayProps[] => {
      return selected.map((item) => ({meals:meals.filter((meal) => meal.mealDays.some((m) => dayOfWeek(m) == item.date.getDay())), date:item.date}))
    }

    const dayOfWeek = (day:string) => {
        switch(day) {
          case "Sunday" :
            return 0
          case "Monday" :
            return 1
          case "Tuesday" :
            return 2
          default:
            return -1
        }
    }

    const detectHabitStreaks = () => {
      return habits.map((habit) => {
        if (habit.completedDays.length == 0) {
          return {habit:habit, streak:0}
        }
        let reverseDays = habit.completedDays.toSorted((a,b) => b.getTime() - a.getTime())
        console.log(reverseDays.map((d)=>d.getUTCDate())+'')

        const getGap = () => {
          switch(habit.frequency) {
            case Frequency.Daily :
              return 1
            case Frequency.Hourly :
              return 1
            case Frequency.Weekly :
              return 7
            case Frequency.Monthly :
              return 0
            default:
              return -1
          }
        }

        const gap = getGap()
        let streak = 0
        let today = new Date().getUTCDate()
        let first = reverseDays.at(0)!
        if (today - first.getUTCDate() >= gap) {
          return {habit:habit, streak:streak} 
        }
        streak += 1
        
        for(let i = 1; i < reverseDays.length; i++) {
          if (first.getUTCDate() - reverseDays.at(i)!.getUTCDate() > gap) {
            return {habit:habit, streak:streak} 
          }
          streak += 1
          first = reverseDays.at(i)!
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
              data={getMealDays(diets.some((d) => d.name === user.selectedDiet) ? diets.find((d) => d.name === user.selectedDiet)!.meals : [], calendar.filter((c) => c.selected))}
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
