import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity, Dimensions } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useLocalSearchParams, useRouter} from 'expo-router'
import { DietData, FoodData, MealData } from './DataInterfaces';
import AddFoodDisplay from './AddFoodDisplay';
import MealDisplayScreen from './MealDisplayPage';
import {v4 as uuidv4} from 'uuid';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

export default function AddDietScreen({isSelected, diet, onChange, onClose, setSelected} : {isSelected:boolean, diet:DietData, onChange:(newData:DietData) => void, onClose:(diet:DietData) => void, setSelected:(diet:DietData|null) => void}) { 
    const meals = diet.meals

    const addMeal = (meal:MealData) => {
      onChange({...diet, meals:[...meals, meal]})
    }
    
    const updateMeals = (meal:MealData) => {
      onChange({...diet, meals: meals.map((m) => m.id != meal.id ? m : meal)})
    }

    const removeMeal = (meal:MealData) => {
      onChange({...diet, meals:meals.filter((m) => m.id != meal.id)})
    }

    const [name, setName] = useState(diet.name)

    return (
        <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50, minWidth: screenWidth / 3}}>
          <TextInput
            style={styles.input}
            placeholder="Diet Name"
            value={diet.name}
            onChangeText={() => {
                setName(name)
                onChange({...diet, name:name})
            }}
          />
         
           {
            meals.map((meal) =>(
              <MealDisplayScreen key={meal.name} meal={meal} updateMeals={updateMeals} removeMeal={removeMeal}/>
            ))
           }
          <View style={styles.buttonRow}>
             <TouchableOpacity
              style={[styles.button,{backgroundColor:'blue'}]}
              onPress={() => addMeal({id:uuidv4(), name:`Meal ${meals.length}`, food:[], mealCalories:0, mealDays:[], mealTime:'3:00'})}
          >
            <Text style={[styles.buttonText]}>
                Add Meal
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={[styles.button, {backgroundColor: isSelected ? 'blue' : '#e72525'}]}
              onPress={() => setSelected(isSelected ? null : diet)}
          >
              <Text style={styles.buttonText}>
                {isSelected ? 'Selected' : 'Select Diet'}
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => onClose(diet)}
          >
              <Text style={styles.buttonText}>
                Remove Diet
              </Text>
          </TouchableOpacity>
          </View>
         
        </View>
  );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:2,
        alignItems:'center',
    },
    buttonRow2: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:2,
        alignItems:'center',
        zIndex:10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
   button: {
    backgroundColor: '#e00b0b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  habitsBackground: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
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
    fontSize: 58,
    fontWeight: 'bold',
    color: '#ffffff', // or white if on dark background
    borderColor:'#00000',
    textShadowColor:'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    fontFamily:'Roboto'
  },
  subTitle: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
  },
});

