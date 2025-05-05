import { useEffect } from 'react'

import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { H3, YStack, useTheme } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Image } from '../Image'

const AnimatedText = Animated.createAnimatedComponent(H3)
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

type Props = {
  setIsReady: (value: boolean) => void
}

const SCALE_TARGET = 4
const DURATION = 1500
const DURATION_SCALE = 600
const TRANSLATE_TARGET = 0

export const SplashScreen = ({ setIsReady }: Props) => {
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)
  const scaleImage = useSharedValue(1)
  const theme = useTheme()

  const handleNavigate = () => {
    setTimeout(() => setIsReady(true), 300)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    translateYImage.value = withTiming(TRANSLATE_TARGET, {
      duration: DURATION,
      easing: Easing.out(Easing.exp),
    })

    translateYText.value = withTiming(
      TRANSLATE_TARGET,
      {
        duration: DURATION,
        easing: Easing.out(Easing.exp),
      },
      () => {
        runOnJS(handleNavigate)()
        scaleImage.value = withTiming(SCALE_TARGET, {
          duration: DURATION_SCALE,
          easing: Easing.linear,
        })
      }
    )
  }, [scaleImage, setIsReady])

  const animatedStackStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scaleImage.value, [1, 4], [1, 0], Extrapolation.CLAMP),
    transform: [{ scale: scaleImage.value }],
  }))

  const animatedImageStyle = useAnimatedStyle(() => ({
    height: 150,
    width: 150,
    transform: [{ translateY: translateYImage.value }],
    opacity: interpolate(translateYImage.value, [-100, 0], [0, 1], Extrapolation.CLAMP),
  }))

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYText.value }],
    opacity: interpolate(translateYText.value, [100, 0], [0, 1], Extrapolation.CLAMP),
  }))

  return (
    <LinearGradient
      f={1}
      colors={[
        theme.primaryPurple20.val,
        theme.primaryOrange20.val,
        theme.primaryPurple30.val,
        theme.primaryOrange30.val,
      ]}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0, y: 1 }}
      pos="absolute"
      t={0}
      l={0}
      b={0}
      r={0}
    >
      <AnimatedYStack f={1} ai="center" jc="center" style={animatedStackStyle}>
        <Image source={require('../../assets/logo.png')} style={animatedImageStyle} />
        <AnimatedText col="$primaryPurple100" style={animatedTextStyle}>
          TMR
        </AnimatedText>
      </AnimatedYStack>
    </LinearGradient>
  )
}
