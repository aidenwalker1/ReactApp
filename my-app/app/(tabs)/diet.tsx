import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { DietData, FoodCSVData, HabitData, MealData, User } from '../DataInterfaces';
import HabitDisplay from '../HabitDisplay';
import { useRouter} from 'expo-router'
import AddDietScreen from '../AddDietPage';
import { useSelector } from 'react-redux';
import { RootState, saveFoodData, saveUser } from '../store';
import { useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs'; // may require setup
import Papa from "papaparse";
import {Asset} from 'expo-asset'
import * as FileSystem from 'expo-file-system';

//FoodCategory,FoodItem,per100grams,Cals_per100grams,KJ_per100grams



export default function DietScreen() { 
    const user = useSelector((state: RootState) => state.user.latest);
    const dispatch = useDispatch();

    const loadCSV = async () => {
      const asset = Asset.fromModule(require('../../assets/csv/calories.csv'));
      await asset.downloadAsync();
      const response = await fetch(asset.uri);
      const csvString = await response.text();

      const parsed = Papa.parse<Partial<FoodCSVData>>(csvString, {
        header: true,
        skipEmptyLines: true,
      });
      const data:FoodCSVData[] = (parsed.data as Partial<FoodCSVData>[]).map((row) => ({
            category: row.category ?? '',
            item: row.item ?? '',
            calories: row.calories ?? '',
      }));

      dispatch(saveFoodData(data))
    };

    const [foodData, setFoodData] = useState<FoodCSVData[]>([]);
    const [diets, setDiets] = useState<DietData[]>([])
    

    useEffect(() => {
      if (user) {
        setDiets(user.diets)
      }

      loadCSV()

    }, [user]);

    const addDiet = (diet:DietData) => {
      dispatch(saveUser({...user, diets:[...diets, diet]}))
    }

    const editMeal = (diet:DietData, newData:MealData[]) => {
      dispatch(saveUser({...user, diets:diets.map((d) => d != diet ? d : {...diet, meals:newData})}))
    }

    const setSelectedDiet = (name:string) => {
      dispatch(saveUser({...user, selectedDiet:name}))
    }

    return (
        <ScrollView>
           <Button 
                onPress={() => {
                  addDiet({name:'diet'+diets.length, meals:[],duration:0, totalCalories:0})
                }}
                title='Add Diet'
           />
           <Text>Diets</Text>
            {diets.map((diet) => (
                <View>
                  <AddDietScreen meals={diet.meals} onChange={(meals) =>editMeal(diet, meals)}/>
                  <Text>{diet.name}</Text>
                  <Button 
                    onPress={() => user.selectedDiet == diet.name ? setSelectedDiet('') : setSelectedDiet(diet.name)}
                    title={user.selectedDiet == diet.name ? 'Selected' : 'Click to Select'}
                  />
                  <Button 
                      onPress={() => setDiets(diets.filter((d) => d !== diet))}
                      title='Remove Diet'
                  />
                  <Button 
                      onPress={() => {}}
                      title='Edit Diet'
                  />
                </View>
                ))
            }
           
        </ScrollView>
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
