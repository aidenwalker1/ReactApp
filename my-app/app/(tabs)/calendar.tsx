import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FlatList, Pressable } from "react-native-gesture-handler";
import CalendarItem from "../CalendarItem";
import { DietData, Frequency, HabitData, MealData, User } from "../DataInterfaces";
import CalendarDay from "../CalendarDay";
import HabitDisplaySimple from "../SimpleHabitDisplay";
import MealDisplaySimple from "../DietDisplaySimple";
import { useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';
import { useDispatch } from 'react-redux';

type CalendarItem = {
  date:Date
  selected:boolean
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

    const selectedRenderItem = ({item}:{item:HabitData}) => {
      return (
       <HabitDisplaySimple habit={item}/>
      )
    }

    const selectedRenderMeal = ({item}:{item:MealData}) => {
      return (
        <MealDisplaySimple meal={item} />
      )
    }

    const [isOver, setIsOver] = useState(false);

    const inCalendarSelectedRange = (date:Date) => {
      return calendar.some((val) => val.selected && (val.date.toDateString() === date.toDateString()))
    }

    const mealInCalendarRange = (meal:MealData) => {
      const dayOfWeek = (day:string) => {
        switch(day) {
          case "Monday" :
            return 0
          case "Tuesday" :
            return 1
          default:
            return -1
        }
      }

      const days:number[] = meal.mealDays.map(dayOfWeek)

      return calendar.some((val) => val.selected && days.includes(val.date.getDay()))
    }

    return (
        <View>
          <Text style={styles.listContainer}>Selected:{value.toDateString()}</Text>
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
          {<FlatList
            data={habits.filter((val) => inCalendarSelectedRange(val.startDay))}
            renderItem={selectedRenderItem}
            keyExtractor={item => item.name}
          />}

          {<FlatList
            data={diets.flatMap((diet) => diet.meals).filter(mealInCalendarRange) }
            renderItem={selectedRenderMeal}
            keyExtractor={item => item.name}
          />}
          
        </View>
    )
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
