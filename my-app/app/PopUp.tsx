import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import DropdownExample from './Dropdown';
import { Frequency } from './DataInterfaces';

interface DataFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}

export default function DataFormModal({ visible, onClose, onSubmit }: DataFormProps) {
  const [input, setInput] = useState('');
  const frequencies = {'Hourly': Frequency.Hourly, 'Weekly': Frequency.Weekly};
  const [selFreq, setFreq] = useState('Weekly');

  const handleSubmit = () => {
    onSubmit(input);
    setInput('');
    onClose();
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