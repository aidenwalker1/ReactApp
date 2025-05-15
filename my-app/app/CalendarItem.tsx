import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function CalendarItem({item, mouseHeld} : {item:Date, mouseHeld:boolean}) {
    const [value, setValue] = useState(new Date());
    const [highLight, setHighlight] = useState(false)
    const [isOver, setIsOver] = useState(false);

    return (
        <div
            onMouseLeave={() => {}}
            onMouseDown={() => {setHighlight(true)}}
            onMouseEnter = {() => {
                console.log("??")
                if (mouseHeld) {
                    setHighlight(true)
                }
            }}
        >

            <Pressable
            onPressIn={() => {}}
            onPressOut={() => {}}
            >
            <Text style = {highLight ? styles.listContainer : styles.list2Container}>{item.toDateString()}</Text>
            </Pressable>
        </div>
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
