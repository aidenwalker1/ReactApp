import { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native'
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
      return allFood.filter((f) => !namedAlready(f.item) && f.item.toLowerCase().includes(text.toLowerCase())).slice(0,10)
    }

    return (
        <View>
            <TextInput
                style={styles.listContainer}
                placeholder="Food Name"
                value={name}
                onFocus={() => setDisplaySearch(true)}
                onBlur={() => {setTimeout(()=> setDisplaySearch(false),100)}}
                onChangeText={(t) => {
                  setName(t)
                }
                
              }
            /> 
            { displaySearch && searchFood(name).map((food) => (
              <Button 
                onPress={() => {
                  setName(food.item)
                  let cals =  food.calories.replace(/\D/g,'')
                  let newCalories = Number(cals) * Number(grams) / 100
                  setCalories(newCalories+'')
                  onEnded({name:food.item, calories:newCalories, calsPer100:Number(cals), grams:Number(grams), category:food.category})
                }}
                title={'Name: ' + food.item + '   Calories per 100g: ' + food.calories}
              />
            ))}

            <TextInput
                style={styles.listContainer}
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
            <TextInput
                style={styles.listContainer}
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

            <Button title='Remove Food' onPress={() => removed(food)} />
        </View>
    )
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
