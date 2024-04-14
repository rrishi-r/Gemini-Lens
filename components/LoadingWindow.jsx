import { View, StyleSheet, Button } from "react-native"
import React, { useEffect, useRef } from 'react'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from 'react-native-reanimated';


export default function LoadingWindow() {
  const heightShared = useSharedValue(0);
  const duration = 3000;

  const animatedStyles = useAnimatedStyle(() => ({
    height: heightShared.value,
  }));

  useEffect(() => {
    heightShared.value = withRepeat(
      withTiming(750, {
        duration,
        easing: Easing.linear,
      }), -1, true
    );
  }, []);

  return (
    <Animated.View style={[styles.loadingWindow, animatedStyles]}/>
  )
}


const styles = StyleSheet.create({
  loadingWindow: {
    position: 'absolute',
    zIndex: 100,
    width: 400,
    height: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    borderStyle: 'solid',
    borderColor: '#6393F2',
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: -5,
  },
})
