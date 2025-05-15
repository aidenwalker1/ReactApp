import { View, Text, StyleSheet } from "react-native";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FlatList, Pressable } from "react-native-gesture-handler";
import CalendarItem from "../CalendarItem";


export default function CalendarDisplay() {
    const [value, setValue] = useState(new Date());
    const [highLight, setHighlight] = useState(false)

    const getCalendar = (today:Date) => {
      const month = today.getMonth()
      const year = today.getFullYear()
      return Array.from({length:30}, (_, index) => new Date(year, month, index+1))
    }

    const renderItem = ({item}:{item:Date}) => {
      return (
       <CalendarItem item={item} mouseHeld={isOver}/>
      )
    }

    const [isOver, setIsOver] = useState(false);

    return (
        <View>
          <Text style={styles.listContainer}>Selected:{value.toDateString()}</Text>
          <div
            onMouseDown={() => setIsOver(true)}
            onMouseUp={() => {
              console.log("?");
              setIsOver(false);
            }}
          >
            <FlatList
            data={getCalendar(new Date())}
            renderItem={renderItem}
            keyExtractor={item => item.toDateString()}
            numColumns={7}
          />
          </div>
          
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
