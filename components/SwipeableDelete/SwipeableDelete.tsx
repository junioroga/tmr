import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { impactAsync } from 'expo-haptics'

import { Trash2 } from '@tamagui/lucide-icons'

interface IFieldSwipe {
  children: ReactNode
  onRemove: () => void
  itemHeight: number
}
export const SwipeableDelete: React.FC<IFieldSwipe> = ({ children, onRemove, itemHeight }) => {
  const swipeTranslateX = useSharedValue(0)
  const itemHeightAnimated = useSharedValue(itemHeight)
  const isLongPressed = useSharedValue(false)
  const { width } = useWindowDimensions()

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart((_event) => {
      isLongPressed.value = true
    })

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (isLongPressed.value) {
        stateManager.activate()
      } else {
        stateManager.fail()
      }
    })
    .onChange((event) => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX
      }
    })
    .onFinalize(() => {
      const isShouldDismiss = swipeTranslateX.value < -width * 0.3
      if (isShouldDismiss) {
        itemHeightAnimated.value = withTiming(0)
        swipeTranslateX.value = withTiming(-width, undefined, (isDone) => {
          if (isDone) {
            runOnJS(onRemove)()
            runOnJS(impactAsync)()
          }
        })
      } else {
        swipeTranslateX.value = withSpring(0)
      }
      isLongPressed.value = false
    })

  const composed = Gesture.Simultaneous(longPress, pan)

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeTranslateX.value },
      { scale: withTiming(isLongPressed.value ? 1.05 : 1) },
    ],
  }))

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(swipeTranslateX.value < -width * 0.7 ? 0 : 1),
  }))

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeightAnimated.value,
  }))

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={itemHeightStyle}>
        <Animated.View
          style={[
            { position: 'absolute', height: '100%', right: '10%', justifyContent: 'center' },
            opacityStyle,
          ]}>
          <Trash2 col="$primaryOrange100" />
        </Animated.View>
        <Animated.View style={[{ flex: 1 }, transformStyle]}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}
