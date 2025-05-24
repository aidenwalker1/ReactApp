import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, Button, Dimensions, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { DietData, Frequency, HabitData, MealData, weekDays } from '../DataInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveUser } from '../store';
import MealDisplaySimple from '../DietDisplaySimple';
import Svg, { Line } from 'react-native-svg';
import HabitDisplaySimple from '../SimpleHabitDisplay';
import WheelDisplay from '../WheelDisplay';
import DashboardDisplay from '../DashboardDisplay';

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.user.latest);
  const dispatch = useDispatch()

  useEffect(() => {
            if (user) {
              setHabits(user.habits)
              setSelectedDiet(user.selectedDiet)
            }
  }, [user]);

  const today = new Date()
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [habits, setHabits] = useState<HabitData[]>(user.habits)
  const [selectedDiet, setSelectedDiet] = useState<DietData | null>(user.selectedDiet)

  const getHabs = () => {
    console.log(habits[0].habitDays)
    return habits.filter(h => h.habitDays.some(d => d.getDay() === today.getDay()))
  }

  return (
    <View style={{flex:1}}>
      { selectedDate == null && 
        <WheelDisplay selectedDay={selectedDate} onSelect={(d) => {
          setSelectedDate(d)
        }}/>
      }
      
      { selectedDate == null && 
        <DashboardDisplay 
          key={today.toDateString()}
          habits={getHabs()} 
          meals={selectedDiet ? selectedDiet.meals.filter(m => m.mealDays.some(d => d.getDay() === today.getDay())) : []}
          date={today}
          onComplete={(old, hab) => {
                dispatch(saveUser({...user, habits:habits.map((h) => h !== old ? h : hab)}))
          }}
        />
      }

      { selectedDate && 
        <View>
          <Button 
            title='back'
            onPress={() => setSelectedDate(null)}
          />
          <DashboardDisplay 
            key={selectedDate.toDateString()}
            habits={habits.filter(h => h.habitDays.some(d => d.getDay() === selectedDate.getDay()))} 
            meals={selectedDiet ? selectedDiet.meals.filter(m => m.mealDays.some(d => d.getDay() === selectedDate.getDay())) : []}
            date={selectedDate}
            onComplete={(old, hab) => {
                  dispatch(saveUser({...user, habits:habits.map((h) => h !== old ? h : hab)}))
            }}
          />
        </View>
      }
    </View>

  );
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


    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>