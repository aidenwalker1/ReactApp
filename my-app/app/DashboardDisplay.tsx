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
    onComplete:(newHabit:HabitData) => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

export default function DashboardDisplay({habits, meals, date, onComplete} : DashboardProps) {
  const centerY = screenHeight / 2 - 200;
  const y = centerY + 200 * (-1) - 20;

    return (
        <View style={{flex:1, alignItems:'center',gap:20, backgroundColor:'#303030', maxHeight:y+200}}>
            <Text style={styles.titleContainer}>
              Today's Agenda
            </Text>
            <ScrollView contentContainerStyle={{flexGrow:1,gap:20}}>
                <HabitDisplaySimple habits={habits} date={date} onComplete={onComplete}/>

                <MealDisplaySimple meals={meals} date={date}/>
            </ScrollView>
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