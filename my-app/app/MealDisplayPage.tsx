import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useLocalSearchParams, useRouter} from 'expo-router'
import { DietData, FoodData, MealData } from './DataInterfaces';
import AddFoodDisplay from './AddFoodDisplay';
import DropdownExample from './Dropdown';
import MultiDropdown from './MultiDropdown';

interface MealDisplayProps {
    meal:MealData
    updateMeals: (prev:MealData, meal:MealData) => void
    removeMeal: (meal:MealData) => void
}

export default function MealDisplayScreen({meal, updateMeals, removeMeal} : MealDisplayProps ) { 
    const [input, setInput] = useState('')
    const [dateInput, setDateInput] = useState<string[]>([])

    const addFood = (food:FoodData) => {
        updateMeals(meal, {...meal, food:[...meal.food, food]})
    }

    const setMealName = (name:string) => {
        updateMeals(meal, {...meal, name:name})
    }

    const updateFood = (food:FoodData, newFood:FoodData) => {
        updateMeals(meal, {...meal, food:meal.food.map((f) => f != food ? f : newFood), mealCalories:meal.mealCalories+newFood.calories-food.calories})
    }

    const removeFood = (food:FoodData) => {
        updateMeals(meal, {...meal, food:meal.food.filter((f) => f != food), mealCalories:meal.mealCalories-food.calories})
    }

    const days:{[key: string]:string} =  {'Monday':'Monday', 'Tuesday':'Tuesday'}

    return (
        <View>
            <TextInput
                style={styles.listContainer}
                placeholder="Name"
                value={input}
                onChangeText={setInput}
                onEnded={() => setMealName(input)}
            />
            
            <Text>Total Calories: {meal.mealCalories}</Text>
            <Text>Meal time: {meal.mealTime}</Text>
            <Text>Scheduled Days: {meal.mealDays}</Text>

            <MultiDropdown
                        title={'Dates'}
                        items={days}
                        selected={dateInput}
                        onChanged={(item) => {
                            if (dateInput.includes(item)) {
                                setDateInput(dateInput.filter((d) => d != item))
                                updateMeals(meal, {...meal, mealDays:dateInput.filter((d) => d != item)})
                                
                            }
                            else {
                                setDateInput([...dateInput, item])
                                updateMeals(meal, {...meal, mealDays:[...dateInput, item]})
                            }
                        }}
            />

            { meal.food.map((item) => (
            <View>
                <AddFoodDisplay food={item} onEnded={(name, calories) => {
                    const food = {name:name, calories:Number(calories)}
                    updateFood(item, food)
                }}
                removed={(food) => removeFood(food)}
                />
            </View>
            ))
            }
            
            <Button 
                onPress={() => {
                    addFood({name:'food'+meal.food.length,calories:0})

                }}
                title='Add Food'
            />
            <Button
                onPress={() => removeMeal(meal)}
                title='Remove Meal'
            />

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
