import Animated, { FadeInUp } from 'react-native-reanimated'

import { H3, XStack } from 'tamagui'

import { Image } from '@/components'

const AnimatedTitle = Animated.createAnimatedComponent(H3)

export default function Header() {
  return (
    <XStack bg="$background" pb="$4" jc="space-between">
      <AnimatedTitle
        entering={FadeInUp.delay(50).duration(150).springify()}
        col="$primaryPurple100"
      >
        TMR
      </AnimatedTitle>
      <Image
        testID="image-logo"
        entering={FadeInUp.delay(150).duration(150).springify()}
        source={require('../../../../src/assets/logo.png')}
        style={{
          height: 35,
          width: 35,
        }}
      />
    </XStack>
  )
}
