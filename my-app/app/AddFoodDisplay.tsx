import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { FoodData } from './DataInterfaces';

export default function AddFoodDisplay({food, onEnded, removed} : {food:FoodData, onEnded:(name:string, calories:string) => void, removed:(food:FoodData) => void}) {
    const [name, setName] = useState(food.name)
    const [calories, setCalories] = useState(''+food.calories)

    return (
        <View>
            <TextInput
                style={styles.listContainer}
                placeholder="Food Name"
                value={name}
                onChangeText={(t) => {
                  setName(t)
                  onEnded(t, calories)
                }
              }
            />
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
                    onEnded(name, t)
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
