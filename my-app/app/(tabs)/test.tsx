import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { HabitData, User } from '../DataInterfaces';

const allData = ['Wall', 'Glass', 'Food']
const dats = {'Wall': ['Item1', 'Item2'], 'Glass' : ['Item3', 'Item4'], 'Food' : ['Item5']}

export default function TestScreen() { 
    const [showPopup, setPopup] = useState(false);

    

    const [user, setUser] = useState<User>({
        habits:[],
        username:"Name",
    });
    
    const addHabit = (habit:HabitData) => {
        setUser(prev => ({
            ...prev,
            habits: [...prev.habits, habit]
        }));
    };

    return (
        
        <View>
            <DataFormModal 
            visible={showPopup}
            onClose={() => setPopup(false)}
            onSubmit={(data) => {
                
            }}
            />
            <Button
                title = "Add Habit"
                onPress={() =>setPopup(true)}

            />
            <Text style = {styles.titleContainer}>List</Text>
            <ScrollView style = {styles.listContainer}>
                {Object.values(dats).map((item,index) => (
                    <View key={index} >
                        <Text style = {styles.titleContainer}>{item}</Text>
                    </View>
                ))
                }
            </ScrollView>
        </View>
  );
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
