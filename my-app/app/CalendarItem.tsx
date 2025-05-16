import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface CalendarItemProps {
  item:Date
  mouseHeld:boolean
  selected:boolean
  onSelect: (date:Date) => void
}

export default function CalendarItem({item, mouseHeld, selected, onSelect} : CalendarItemProps) {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (isInside && mouseHeld) {
          onSelect(item)
        }
      };

      const handleMouseDown = (e: MouseEvent) => {
        
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (isInside && mouseHeld) {
          onSelect(item)
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
      };
    }, [mouseHeld]);

    return (
        <div ref={boxRef}>

            <Pressable
            onPressIn={() => {}}
            onPressOut={() => {}}
            >
            <Text style = {selected ? styles.listContainer : styles.list2Container}>{item.toDateString()}</Text>
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
