import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { DietData, FoodData, MealData, weekDays } from './DataInterfaces';
import AddFoodDisplay from './AddFoodDisplay';
import MultiDropdown from './MultiDropdown';

interface MealDisplayProps {
    meal:MealData
    updateMeals: (meal:MealData) => void
    removeMeal: (meal:MealData) => void
}

export default function MealDisplayScreen({meal, updateMeals, removeMeal} : MealDisplayProps ) { 
    const [input, setInput] = useState('')

    const addFood = (food:FoodData) => {
        const updatedFoods = [...meal.food, food]
        updateMeals({...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
    }

    const setMealName = (name:string) => {
        updateMeals({...meal, name:name})
    }

    const calculateCalories = (foods:FoodData[]) => {
        return foods.reduce((p, c) => p+c.calories,0)
    }

    const updateFood = (food:FoodData, newFood:FoodData) => {
        const updatedFoods = meal.food.map((f) => f != food ? f : newFood)
        updateMeals({...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
    }

    const removeFood = (food:FoodData) => {
        const updatedFoods = meal.food.filter((f) => f != food)
        updateMeals({...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
    }

    const makeNewDay = (day:string) => {
      const days = meal.mealDays
      const newDay = days.find(d => d.getDay() === weekDays[day])
      if (newDay) {
        const newDays = days.filter(d => d.getDay() !== newDay.getDay())
        updateMeals({...meal, mealDays:newDays})
      }
      else {
        const d = new Date()
        const diff = d.getDay() - weekDays[day]
        d.setDate(d.getDate() - diff)

        const newDays = [...days, d]
        updateMeals({...meal, mealDays:newDays})
      }
    }
    
    return (
        <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50}}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={input}
                onChangeText={setInput}
                onEnded={() => setMealName(input)}
            />
            
            <Text style={styles.subTitle}>Total Calories: {meal.mealCalories}</Text>
            <Text style={styles.subTitle}>Meal time: {meal.mealTime}</Text>
            <Text style={styles.subTitle}>Scheduled Days: {meal.mealDays.map(m=>m.toDateString() + ' ')}</Text>

            <View style={styles.buttonRow}>
                { Object.keys(weekDays).map((day) => (
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor:meal.mealDays.some(d => d.getDay() === weekDays[day]) ? '#0caa4c' : '#e72525'}]}
                        onPress={() => makeNewDay(day)}

                    >
                        <Text style={styles.buttonText}>
                        {day}
                        </Text>
                    </TouchableOpacity>
                ))
                    
                }
            </View>

            <FlatList
                data={meal.food}
                renderItem={(item) => (
                     <AddFoodDisplay key={item.item.name} food={item.item} onEnded={(f) => {
                            updateFood(item.item, f)
                        }}
                        removed={(food) => removeFood(food)}
                        namedAlready={(food) => meal.food.some((f) => f.name === food)}
                    />
                )}
                keyExtractor={item => item.name}
                numColumns={2}
            >

            </FlatList>
            
            <TouchableOpacity
                style={[styles.button, {backgroundColor:'blue'}]}
                onPress={() => addFood({name:'Food'+meal.food.length,calories:300, calsPer100:150,grams:200,category:'None'})}
            >
                <Text style={styles.buttonText}>
                Add Food
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {backgroundColor:'blue'}]}
                onPress={() => removeMeal(meal)}
            >
                <Text style={styles.buttonText}>
                Remove Meal
                </Text>

            </TouchableOpacity>

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
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
  },
});
