import { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet, View, FlatList } from "react-native";
import { DietData, HabitData, MealData } from "./DataInterfaces";

export interface SimpleMealDisplayProps {
    meals:MealData[]
    date:Date
}


export default function MealDisplaySimple({meals, date} : SimpleMealDisplayProps) {
    return (
        <View style={styles.habitsBackground}>
          <Text style={[styles.subTitle, {fontSize:30}]}> 
            Your Meals
          </Text>
          { meals.length == 0 ? 
            <Text style={[styles.subTitle, {fontSize:20}]}> 
              Nothing to do today!
            </Text>
            :
            <FlatList
              data={meals}
              renderItem={item => (
                <ShowMeal meal={item.item} />
              )}
              keyExtractor={item=>item.id}
            >
            </FlatList>
          }
           
        </View>
    );
}

function ShowMeal({meal} : {meal:MealData}) {
  return (
    <View style={{borderColor:'black',borderWidth:2, rowGap:3, padding:20, alignItems:'center', borderRadius:50}}>
      <Text style={[styles.subTitle, {fontSize:20}]}> 
        {meal.name}
      </Text>
      <Text style={[styles.subTitle, {fontSize:13}]}> 
        Calories:
      </Text>

      <Text style={[styles.subTitle, {fontSize:20}]}> 
          {''+meal.mealCalories}
      </Text>

      <Text style={[styles.subTitle, {fontSize:13}]}> 
        Included Items:
      </Text>

      <FlatList
        data={meal.food}
        renderItem={item => (
          <View style={{borderColor:'black',borderWidth:2, rowGap:3, alignItems:'center', borderRadius:10}}>
            <Text style={[styles.subTitle, {fontSize:13, padding:5}]}> 
              Item {item.index} : {item.item.name} with {item.item.calories} calories {meal.food.length}
            </Text>
          </View>
        )}
        keyExtractor={item=>item.name}
      >
      </FlatList>

      <Text style={[styles.subTitle, {fontSize:13}]}> 
        Planned for {''+meal.mealTime}
      </Text>
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
    fontSize: 30,
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