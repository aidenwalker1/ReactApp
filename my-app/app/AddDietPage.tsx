import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useLocalSearchParams, useRouter} from 'expo-router'
import { DietData, FoodData, MealData } from './DataInterfaces';
import AddFoodDisplay from './AddFoodDisplay';
import MealDisplayScreen from './MealDisplayPage';

export default function AddDietScreen({meals, onChange} : {meals:MealData[], onChange:(newData:MealData[]) => void }) { 
    const addMeal = (meal:MealData) => {
      onChange([...meals, meal])
    }
    
    const updateMeals = (prev:MealData, meal:MealData) => {
      onChange(meals.map((m) => m != prev ? m : meal))
    }

    const removeMeal = (meal:MealData) => {
      onChange(meals.filter((m) => m != meal))
    }

    return (
        <View>
           <Button 
                onPress={() => addMeal({name:`Meal ${meals.length}`, food:[], mealCalories:0, mealDays:[], mealTime:'3:00'})}
                title='Add Meal'

           />
           {
            meals.map((meal) =>(
              <MealDisplayScreen key={meal.name} meal={meal} updateMeals={updateMeals} removeMeal={removeMeal}/>
            ))
           }
           
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
