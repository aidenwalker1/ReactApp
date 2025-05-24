import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, Dimensions, Pressable, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { DietData, HabitData, MealData } from './DataInterfaces';
import HabitDisplaySimple from './SimpleHabitDisplay';
import MealDisplaySimple from './DietDisplaySimple';

interface DashboardProps {
    habits:HabitData[]
    meals:MealData[]
    date:Date
    onComplete:(old:HabitData, newHabit:HabitData) => void
}

export default function DashboardDisplay({habits, meals, date, onComplete} : DashboardProps) {
    return (
        <View>
            <Text>
              {date.toDateString()} xx 
               {habits.length}
            </Text>
            <ScrollView>
                <HabitDisplaySimple habits={habits} date={date} onComplete={onComplete}/>

                <MealDisplaySimple meals={meals} date={date}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  item: {
    width: 40,
    height: 40,
    backgroundColor: '#4e91fc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50, // Half of width/height
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor:'black'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});