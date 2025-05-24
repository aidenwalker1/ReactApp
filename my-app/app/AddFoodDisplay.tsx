import { useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { FoodData } from './DataInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export default function AddFoodDisplay({food, onEnded, removed, namedAlready} : {food:FoodData, onEnded:(newFood:FoodData) => void, removed:(food:FoodData) => void, namedAlready:(food:string) => boolean}) {
    const [name, setName] = useState(food.name)
    const [calories, setCalories] = useState(''+food.calories)
    const [grams, setGrams] = useState(''+food.grams)
    const [displaySearch, setDisplaySearch] = useState(false)

    const allFood = useSelector((state: RootState) => state.foodData.latest);

    const searchFood = (text:string) => {
      return allFood.filter((f) => f.item.toLowerCase().includes(text.toLowerCase())).slice(0,10)
    }

    return (
        <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50, position:'relative'}}>
          <Text style={styles.subTitle}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Food Name"
                value={name}
                onFocus={() => setDisplaySearch(true)}
                onBlur={() => {setTimeout(()=> setDisplaySearch(false),100)}}
                onChangeText={(t) => {
                  setName(t)
                }
                
              }
            /> 
            <View style={{zIndex:1000, position:'absolute', top:'30%'}}>
              { displaySearch && searchFood(name).map((food) => (
              <TouchableOpacity
                style={[styles.button, {minWidth:400, backgroundColor:namedAlready(food.item) ? 'red' : 'blue'}]}
                onPress={() => {
                  if (namedAlready(food.item)) {
                    setDisplaySearch(false)
                  }
                  setName(food.item)
                  let cals =  food.calories.replace(/\D/g,'')
                  let newCalories = Number(cals) * Number(grams) / 100
                  setCalories(newCalories+'')
                  onEnded({name:food.item, calories:newCalories, calsPer100:Number(cals), grams:Number(grams), category:food.category})
                }}
              >
                <Text style={styles.buttonText}>
                  {food.item +  ' | Calories per 100g: ' + food.calories.replace(/\D/g,'')}
                </Text>
              </TouchableOpacity>
            ))
            }
            </View>
            


            <Text style={styles.subTitle}>Calories</Text>
            <TextInput
                style={styles.input}
                placeholder="Calories"
                value={calories}
                onChangeText={(t) => {
                    const cal = Number(t)
                    if (Number.isNaN(cal)) {
                        return
                    }
                    setCalories(t)
                    const newWeight = cal / food.calsPer100 * 100
                    setGrams(''+newWeight)
                    onEnded({...food, calories:cal, grams:newWeight})
                  }
                }
            />

            <Text style={styles.subTitle}>Weight (g)</Text>
            <TextInput
                style={styles.input}
                placeholder="Grams"
                value={grams}
                onChangeText={(t) => {
                    const gram = Number(t)
                    if (Number.isNaN(gram)) {
                        return
                    }
                    setGrams(t)
                    const newCalories = food.calsPer100 * gram / 100
                    setCalories(newCalories+'')
                    onEnded({...food, calories:newCalories, grams:gram})
                  }
                }
            />

            <TouchableOpacity
                style={[styles.button]}
                onPress={() => removed(food)}
            >
                <Text style={styles.buttonText}>
                  Remove Food
                </Text>

            </TouchableOpacity>

        </View>
    )
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
