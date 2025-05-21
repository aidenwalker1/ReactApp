import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button } from 'react-native';

import {useEffect, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import DataFormModal from '../PopUp';
import DropDownPicker from 'react-native-dropdown-picker';
import { DietData, HabitData, MealData, User } from '../DataInterfaces';
import HabitDisplay from '../HabitDisplay';
import { useRouter} from 'expo-router'
import AddDietScreen from '../AddDietPage';
import { useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';
import { useDispatch } from 'react-redux';

export default function DietScreen() { 
    const user = useSelector((state: RootState) => state.user.latest);
    const [diets, setDiets] = useState<DietData[]>([])
    const dispatch = useDispatch();

    useEffect(() => {
      if (user) {
        setDiets(user.diets)
      }
    }, [user]);

    const addDiet = (diet:DietData) => {
      dispatch(saveUser({...user, diets:[...diets, diet]}))
    }

    const editMeal = (diet:DietData, newData:MealData[]) => {
      dispatch(saveUser({...user, diets:diets.map((d) => d != diet ? d : {...diet, meals:newData})}))
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
