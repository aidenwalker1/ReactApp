import { View, Text, StyleSheet } from "react-native";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function CalendarDisplay() {
    const [value, setValue] = useState(new Date());

    return (
        <View>
            <Text style={styles.listContainer}>Selected:{value.toDateString()}</Text>
            <Calendar onChange={(val, event) => {
                if (val instanceof Date) {
                    setValue(val)
                }
            }}/>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
