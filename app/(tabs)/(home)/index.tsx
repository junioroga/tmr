import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, H3, ScrollView } from 'tamagui'

import Form from './Form'
import ResultCard from './ResultCard'

const AnimatedTitle = Animated.createAnimatedComponent(H3)

export default function Home() {
  const { bottom } = useSafeAreaInsets()

  const calculateTMR = () => {}

  return (
    <ScrollView
      contentContainerStyle={{
        fg: 1,
        p: '$4',
        pb: bottom + getTokens().space[12].val,
      }}>
      <AnimatedTitle
        als="center"
        col="$primaryPurple100"
        entering={FadeInUp.delay(50).duration(150).springify()}
        pb="$3">
        TMR
      </AnimatedTitle>
      <Form onSubmit={calculateTMR} />
      <ResultCard />
    </ScrollView>
  )
}
