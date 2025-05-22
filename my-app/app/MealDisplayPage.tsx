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
        const updatedFoods = [...meal.food, food]
        updateMeals(meal, {...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
    }

    const setMealName = (name:string) => {
        updateMeals(meal, {...meal, name:name})
    }

    const calculateCalories = (foods:FoodData[]) => {
        return foods.reduce((p, c) => p+c.calories,0)
    }

    const updateFood = (food:FoodData, newFood:FoodData) => {
        const updatedFoods = meal.food.map((f) => f != food ? f : newFood)
        updateMeals(meal, {...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
    }

    const removeFood = (food:FoodData) => {
        const updatedFoods = meal.food.filter((f) => f != food)
        updateMeals(meal, {...meal, food:updatedFoods, mealCalories:calculateCalories(updatedFoods)})
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
                <AddFoodDisplay key={item.name+item.category} food={item} onEnded={(f) => {
                    updateFood(item, f)
                }}
                removed={(food) => removeFood(food)}
                namedAlready={(food) => meal.food.some((f) => f.name === food)}
                />
            </View>
            ))
            }
            
            <Button 
                onPress={() => {
                    addFood({name:'Food'+meal.food.length,calories:300, calsPer100:150,grams:200,category:'None'})

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
