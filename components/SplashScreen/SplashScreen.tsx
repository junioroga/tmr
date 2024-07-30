import { useEffect } from 'react'

import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { H3, useTheme } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { Image } from '../Image'

const AnimatedText = Animated.createAnimatedComponent(H3)

type Props = {
  setIsReady: (value: boolean) => void
}

export const SplashScreen = ({ setIsReady }: Props) => {
  const insets = useSafeAreaInsets()
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)
  const theme = useTheme()

  const navigateToHome = () => {
    setTimeout(() => setIsReady(true), 1000)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    translateYImage.value = withDelay(
      1100,
      withTiming(insets.bottom ? 15.5 : 12.5, {
        duration: 700,
        easing: Easing.linear,
      })
    )

    translateYText.value = withDelay(
      1200,
      withTiming(
        5.5,
        {
          duration: 700,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            runOnJS(navigateToHome)()
          }
        }
      )
    )
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [runOnJS, navigateToHome, insets.bottom])

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
      ai="center"
      jc="center"
    >
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
        entering={FadeIn.delay(1200).duration(700)}
        style={{
          transform: [{ translateY: translateYText }],
        }}
      >
        TMR
      </AnimatedText>
    </LinearGradient>
  )
}
