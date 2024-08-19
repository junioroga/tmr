import { useEffect } from 'react'

import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { H3, YStack, useTheme } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Image } from '../Image'

const AnimatedText = Animated.createAnimatedComponent(H3)
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

type Props = {
  setIsReady: (value: boolean) => void
}

export const SplashScreen = ({ setIsReady }: Props) => {
  const insets = useSafeAreaInsets()
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)
  const scaleImage = useSharedValue(1)
  const theme = useTheme()

  const navigationToHome = () => {
    setTimeout(() => setIsReady(true), 1800)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    translateYImage.value = withDelay(
      700,
      withTiming(insets.bottom ? 15.5 : 12.5, {
        duration: 700,
        easing: Easing.linear,
      })
    )

    translateYText.value = withDelay(
      700,
      withTiming(
        5.5,
        {
          duration: 700,
          easing: Easing.linear,
        },
        () => {
          runOnJS(navigationToHome)()
          scaleImage.value = withDelay(
            1500,
            withTiming(4, {
              duration: 700,
              easing: Easing.linear,
            })
          )
        }
      )
    )
  }, [runOnJS, insets.bottom])

  const animatedStackStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scaleImage.value, [1, 4], [1, 0], Extrapolation.CLAMP),
      transform: [{ scale: scaleImage.value }],
    }
  })

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
        <Image
          entering={FadeIn.delay(300).duration(700)}
          source={require('../../assets/logo.png')}
          style={{
            height: 150,
            width: 150,
            transform: [{ translateY: translateYImage }],
          }}
        />
        <AnimatedText
          col="$primaryPurple100"
          entering={FadeIn.delay(300).duration(700)}
          style={{
            transform: [{ translateY: translateYText }],
          }}
        >
          TMR
        </AnimatedText>
      </AnimatedYStack>
    </LinearGradient>
  )
}
