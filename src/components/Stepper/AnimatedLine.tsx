import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Stack } from 'tamagui'

const AnimatedStack = Animated.createAnimatedComponent(Stack)

interface AnimatedLineProps {
  progress: SharedValue<number>
  index: number
  activeColor: string
  normalColor: string
  width: number
}

export function AnimatedLine({
  progress,
  index,
  activeColor,
  normalColor,
  width,
}: AnimatedLineProps) {
  const animatedLineStyle = useAnimatedStyle(() => ({
    width: `${Math.min(Math.max((progress.value - index) * 100, 0), 100)}%`,
    backgroundColor: activeColor,
  }))

  return (
    <Stack h="$0.25" w={width} br={2} style={{ backgroundColor: normalColor }}>
      <AnimatedStack h={2} w="100%" style={animatedLineStyle} />
    </Stack>
  )
}
