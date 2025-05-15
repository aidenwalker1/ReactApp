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
  const frequencies:{[key: string]:Frequency} = {"Hourly": Frequency.Hourly, "Weekly": Frequency.Weekly};
  const [selFreq, setFreq] = useState('Weekly');

  const [date, setDate] = useState(new Date());

  const categories:{[key: string]:string} = {'Health': "Health", 'Career': "Career"};
  const [selCat, setCat] = useState('Health');

  const handleSubmit = () => {
    onSubmit({name:input, frequency:frequencies[selFreq], startDay:date, completedDays:[], category: categories[selCat]});
    setInput('');
    onClose();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            value={input}
            onChangeText={setInput}
          />
          <DropdownExample
            title={'Frequency'}
            items={frequencies}
            selected={selFreq}
            onChanged={(value, key) => {
              setFreq(key);
            }}
          />
          <DropdownExample
            title={'Category'}
            items={categories}
            selected={selCat}
            onChanged={(value, key) => {
              setCat(key);
            }}
          />
          <DatePicker
            modal
            open={true}
            date={date}
            mode="date"
            onConfirm={(selectedDate) => {
              setDate(selectedDate)
            }}
          />
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