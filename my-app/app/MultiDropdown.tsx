import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const items = ['Option 1', 'Option 2', 'Option 3'];

interface DropdownProps<T> {
    title:string;
    items: {[key: string]: T};
    selected: string[];
    onChanged: (value:string) => void;
}

export default function MultiDropdown<T>({title, items, selected, onChanged} : DropdownProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e:MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isInside) {
            setShowDropdown(false)
        }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => setShowDropdown(true)}
            >
            <Text style={styles.buttonText}>
            Select Option
            </Text>
        </TouchableOpacity>
        {showDropdown && (
            <div ref={ref}>
                <View style={styles.dropdown}>
                    {Object.keys(items).map((item, index) => (
                        <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => onChanged(item)}
                        >
                        <Text>{item} {''+selected.includes(item)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </div>
            
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 150,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});