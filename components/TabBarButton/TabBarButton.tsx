import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { LabelPosition } from '@react-navigation/bottom-tabs/src/types'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { useTheme } from 'tamagui'
import { Calculator, History, Settings } from '@tamagui/lucide-icons'

import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)

type Props = {
  onPress: () => void
  onLongPress: () => void
  isFocused: boolean
  label:
    | string
    | ((props: {
        focused: boolean
        color: string
        position: LabelPosition
        children: string
      }) => React.ReactNode)
  routeName: string
  color: string
}

type Icon = {
  color: string
  isFocused: boolean
}

type Icons = {
  [key: string]: (props: { isFocused: boolean; color: string }) => React.ReactNode
}

export const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
  color,
}: Props) => {
  const scale = useSharedValue(0)
  const theme = useTheme()

  const icons: Icons = {
    '(home)': ({ color, isFocused }: Icon) => (
      <Calculator
        size="$icon.sm"
        col={color}
        fill={isFocused ? theme.primaryPurple20.val : theme.backgroundTransparent.val}
      />
    ),
    '(history)': ({ color, isFocused }: Icon) => (
      <History
        size="$icon.sm"
        col={color}
        fill={isFocused ? theme.primaryPurple20.val : theme.backgroundTransparent.val}
      />
    ),
    '(settings)': ({ color, isFocused }: Icon) => (
      <Settings
        size="$icon.sm"
        col={color}
        fill={isFocused ? theme.primaryPurple20.val : theme.backgroundTransparent.val}
      />
    ),
  }

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    })
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      opacity,
    }
  })

  return (
    <Pressable style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({
          color,
          isFocused,
        })}
      </Animated.View>
      <AnimatedText col={color} fos="$2" fow="$6" style={animatedTextStyle}>
        {label}
      </AnimatedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})
