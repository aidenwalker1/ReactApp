import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const items = ['Option 1', 'Option 2', 'Option 3'];

interface DropdownProps<T> {
    title:string;
    items: {[key: string]:T};
    selected: string;
    onChanged: (value:T, key:string) => void;
}

export default function DropdownExample<T>({title, items, selected, onChanged} : DropdownProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (item: string) => {
    setShowDropdown(false);
    onChanged(items[item], item);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.buttonText}>{title}:{selected}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => setShowDropdown(!showDropdown)}
            >
            <Text style={styles.buttonText}>
            {selected ? selected : 'Select Option'}
            </Text>
        </TouchableOpacity>
        {showDropdown && (
            <View style={styles.dropdown}>
            {Object.keys(items).map((item, index) => (
                <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
                >
                <Text>{item}</Text>
                </TouchableOpacity>
            ))}
            </View>
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