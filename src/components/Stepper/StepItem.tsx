import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Stack, XStack } from 'tamagui'
import { Text } from '../Text'
import { AnimatedLine } from './AnimatedLine'
import { StepperProps } from './Stepper'

interface StepItemProps {
  index: number
  isLastStep: boolean
  colors: StepperProps['colors']
  progress: SharedValue<number>
  width: number
}

const AnimatedStack = Animated.createAnimatedComponent(Stack)
const AnimatedText = Animated.createAnimatedComponent(Text)

export function StepItem({ index, isLastStep, colors, progress, width }: StepItemProps) {
  const animatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      [colors.marker.circle.normal, colors.marker.circle.active, colors.marker.circle.completed]
    )

    const borderColor = interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      [
        colors.marker.borderCircle.normal,
        colors.marker.borderCircle.active,
        colors.marker.borderCircle.completed,
      ]
    )

    const scale = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [1, 1.2, 1],
      Extrapolation.CLAMP
    )

    return {
      backgroundColor,
      borderColor,
      transform: [
        {
          scale,
        },
      ],
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      [colors.marker.text.normal, colors.marker.text.active, colors.marker.text.completed]
    )

    return { color }
  })

  return (
    <XStack ai="center">
      <AnimatedStack
        w="$3"
        h="$3"
        br={9999}
        bw="$1.5"
        ai="center"
        jc="center"
        style={animatedCircleStyle}
        ov="hidden"
      >
        <AnimatedText fow="$7" fos="$4" style={animatedTextStyle}>
          {index + 1}
        </AnimatedText>
      </AnimatedStack>

      {!isLastStep && (
        <Stack ai="center" jc="center" w={width}>
          <AnimatedLine
            progress={progress}
            index={index}
            activeColor={colors.marker.line.active}
            normalColor={colors.marker.line.normal}
            width={width}
          />
        </Stack>
      )}
    </XStack>
  )
}
