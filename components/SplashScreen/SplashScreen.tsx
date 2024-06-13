import React, { useEffect } from 'react'

import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { YStack } from 'tamagui'

import { Image } from '../Image'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)

type Props = {
  setIsReady: (value: boolean) => void
}

export const SplashScreen = ({ setIsReady }: Props) => {
  const insets = useSafeAreaInsets()
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)

  const navigateToHome = () => {
    setTimeout(() => setIsReady(true), 1000)
  }

  useEffect(() => {
    translateYImage.value = withDelay(
      1100,
      withTiming(insets.bottom ? 15.5 : 12.5, {
        duration: 700,
        easing: Easing.linear,
      }),
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
        },
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runOnJS, navigateToHome, insets.bottom])

  return (
    <YStack f={1} ai="center" bg="white">
      <YStack f={1} ai="center" jc="center">
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
          fos="$8"
          fow="$6"
          ls="$3"
          entering={FadeIn.delay(1200).duration(700)}
          style={{
            transform: [{ translateY: translateYText }],
          }}>
          TMR
        </AnimatedText>
      </YStack>
    </YStack>
  )
}
