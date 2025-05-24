import { useEffect, useRef, useState } from "react";
import { Pressable, View, Text, Dimensions, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";

export default function WheelDisplay({selectedDay, onSelect} :{selectedDay:Date|null, onSelect:(d:Date) => void}) {
    const { width, height } = Dimensions.get('window');
    const centerX = width / 2;
    const centerY = height / 2 - 200;
    const weekDays:{[key:string]:number} = {'Sunday':0, 'Monday':1, 'Tuesday':2, 'Wednesday':3, 'Thursday':4, 'Friday':5, 'Saturday':6}
    const angleTime = useRef(0)
    const [holding, setHolding] = useState(false)

    const makeLocations = (offset:number) => {
      return Array.from({ length: 7 }, (_, i) => {
        const angle = (2 * Math.PI * i) / 7;

        const x = centerX + 200 * Math.cos(angle-(Math.PI/2) + offset) - 20; // offset for size
        const y = centerY + 200 * Math.sin(angle-(Math.PI/2) + offset) - 20;
        return { x, y };
    });
    }

    const [items, setItems] = useState(makeLocations(0))

    useEffect(() => {
      // Start a timer that updates count every second
      const interval = setInterval(() => {
        if (holding) {
          const s = angleTime
          //console.log('should be' + s.current)
          angleTime.current = (angleTime.current + 0.01) % 360
          setItems(makeLocations(angleTime.current))
        }
        
      }, 25);

      // Clean up the interval when component unmounts
      return () => clearInterval(interval);
    }, [holding])

    return(
        <View style={{flex:1}}>
            <Svg style={{flex:1,position:'absolute',zIndex:-10, width:'100%', height:'100%',pointerEvents:'none'}}>
                {items.map((pos, i) => (
                    
                        <Line 
                        
                        key={i}
                        x1={pos.x+45}
                        y1={pos.y+20}
                        x2={centerX+27.5}
                        y2={centerY}
                        stroke="blue"
                        strokeWidth="2"
                        />
                    
                ))}
            </Svg>
                  
            <View>
                {items.map((pos, i) => (
                    <Pressable
                        onPressIn={() => {
                          console.log('holding')
                          setHolding(true)
                        }}
                        onPressOut={() => {
                          console.log('not holding')
                          setHolding(false)
                        }}
                        
                        onPress={() => {

                            const d = new Date()
                            d.setDate(d.getDate() + i)
                            onSelect(d)
                        }}
                    >
                      <View
                          key={i}
                          style={[
                              styles.circle,
                              {
                              position: 'absolute',
                              left: pos.x,
                              top: pos.y,
                              },
                          ]}
                        >
                          <Text selectable={false}>{(Object.keys(weekDays).at((new Date().getDay() + i) % 7))+''}</Text>
                        </View>
                    </Pressable>
                ))} 
            </View>
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