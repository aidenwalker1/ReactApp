import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import DropdownExample from './Dropdown';
import { Frequency, HabitData } from './DataInterfaces';
import DatePicker from 'react-native-date-picker';

interface DataFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (habit:HabitData) => void;
}

export default function DataFormModal({ visible, onClose, onSubmit }: DataFormProps) {
  const [input, setInput] = useState('');
  const weekDays:{[key:string]:number} = {'Sunday':0, 'Monday':1, 'Tuesday':2, 'Wednesday':3, 'Thursday':4, 'Friday':5, 'Saturday':6}
  const [days, setDays] = useState<string[]>([]);

  const categories:{[key: string]:string} = {'Health': "Health", 'Career': "Career"};
  const [selCat, setCat] = useState('Health');

  const handleSubmit = () => {
    //onSubmit({name:input, habitDays:days, startDay:new Date(), completedDays:[], category: categories[selCat]});
    setInput('');
    setCat('Health')
    setDays([])
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Habit Name"
            value={input}
            onChangeText={setInput}
          />
          <DropdownExample
            title={'Category'}
            items={categories}
            selected={selCat}
            onChanged={(value, key) => {
              setCat(key);
            }}
          />
          <View style={styles.buttonRow}>
            { Object.keys(weekDays).map((day) => (
              <Button
                title={days.includes(day) ? day + ' x' : day}
                onPress={() => {
                  const newDays = days.includes(day) ? days.filter(d => d != day) : [...days, day]
                  setDays(newDays)
                }}
              />
            ))
              
            }
          </View>
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});