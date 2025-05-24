import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, Dimensions, TouchableOpacity } from 'react-native';

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
import {v4 as uuidv4} from 'uuid';
//FoodCategory,FoodItem,per100grams,Cals_per100grams,KJ_per100grams

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

export default function DietScreen() { 
    const user = useSelector((state: RootState) => state.user.latest);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)

    const loadCSV = async () => {
      if (loaded) {
        return
      }
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
      setLoaded(true)
      dispatch(saveFoodData(data))
    };

    const [diets, setDiets] = useState<DietData[]>(user.diets)
    const [selected, setSelected] = useState(user.selectedDiet)
    
    useEffect(() => {
      if (user) {
        console.log('also here')
        setDiets(user.diets)
        setSelected(user.selectedDiet)
        if (user.diets.length > 0) {
          console.log(user.diets[0].meals.length)
        }
      }

      loadCSV()

    }, [user]);

    const addDiet = (diet:DietData) => {
      dispatch(saveUser({...user, diets:[...diets, diet]}))
    }

    const removeDiet = (diet:DietData) => {
      dispatch(saveUser({...user, diets:diets.filter(d => d.id != diet.id)}))
    }

    const editDiet = (newData:DietData) => {
      console.log('here')
      console.log(newData.meals.length)
      dispatch(saveUser({...user, diets:diets.map(d => d.id != newData.id ? d : newData)}))
    }

    const setSelectedDiet = (diet:DietData|null) => {
      dispatch(saveUser({...user, selectedDiet:diet}))
    }

    return (
      <View style={{flex:1, alignItems:'center',gap:20, backgroundColor:'#303030',minHeight:screenHeight}}>
        <Text style = {[styles.titleContainer, {alignSelf:'flex-start', paddingHorizontal:20}]}>Diets</Text>

        <View style={styles.habitsBackground}>
          <Text style = {styles.subTitle}>Your Diets</Text>
          <ScrollView contentContainerStyle={{flexGrow:1,gap:20}}>
          
            {diets.map((diet) => (
                <View>
                  <AddDietScreen isSelected={selected?.id === diet.id} diet={diet} onChange={editDiet} onClose={removeDiet} setSelected={(d) => setSelectedDiet(d)}/>
                </View>
                ))
            }
           
        </ScrollView>
         <TouchableOpacity
          style={styles.button}
          onPress={() => {
              addDiet({
                id:uuidv4(), name: 'diet' + diets.length, meals: [], duration: 0, totalCalories: 0,
                completedDays: []
              })}
            }
          >
            <Text style={styles.button}>Add Diet</Text>
        </TouchableOpacity>
        </View>

        
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
  button: {
    backgroundColor: '#e00b0b',
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
    minHeight: screenHeight / 2,
    minWidth: screenHeight / 1.5,
    maxHeight: (3 *screenHeight) / 4,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    fontSize: 58,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222', // or white if on dark background
    textAlign: 'center',
    fontFamily:'Roboto'
  },
});
