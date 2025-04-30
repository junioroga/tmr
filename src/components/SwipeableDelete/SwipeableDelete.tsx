import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
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
  paddingHorizontal?: number
}
export const SwipeableDelete: React.FC<IFieldSwipe> = ({
  children,
  onRemove,
  itemHeight,
  paddingHorizontal = 0,
}) => {
  const swipeTranslateX = useSharedValue(0)
  const itemHeightAnimated = useSharedValue(itemHeight)
  const { width } = useWindowDimensions()
  const finalWidth = width - paddingHorizontal * 2

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX
      }
    })
    .onFinalize(() => {
      const isShouldDismiss = swipeTranslateX.value < -finalWidth * 0.5
      if (isShouldDismiss) {
        itemHeightAnimated.value = withTiming(0)
        swipeTranslateX.value = withTiming(-finalWidth, undefined, (isDone) => {
          if (isDone) {
            runOnJS(onRemove)()
            runOnJS(impactAsync)()
          }
        })
      } else {
        swipeTranslateX.value = withSpring(0)
      }
    })

  const transformStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: swipeTranslateX.value }],
  }))

  const iconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(swipeTranslateX.value < -finalWidth * 0.5 ? 0 : 1),
    transform: [
      {
        scale: interpolate(
          swipeTranslateX.value,
          [-finalWidth * 0.3, 1],
          [1, 0.3],
          Extrapolation.CLAMP
        ),
      },
    ],
  }))

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeightAnimated.value,
  }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={itemHeightStyle}>
        <Animated.View
          style={[
            { position: 'absolute', height: '100%', right: '10%', justifyContent: 'center' },
            iconStyle,
          ]}
        >
          <Trash2 col="$primaryOrange100" />
        </Animated.View>
        <Animated.View style={[{ flex: 1 }, transformStyle]}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  )
}
