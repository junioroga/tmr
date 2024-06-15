import React from 'react'

import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { Separator, YGroup, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation } from '@/store'

const AnimatedStack = Animated.createAnimatedComponent(YStack)

export default function ResultCard({ result }: { result: Calculation }) {
  return (
    <AnimatedStack
      entering={FadeInUp.delay(50).duration(150).springify()}
      exiting={FadeOutUp.delay(50).duration(150).springify()}>
      <YGroup separator={<Separator />} pt="$4" elevation={0.5}>
        <YGroup.Item>
          <YStack p="$4" py="$3" bg="white" gap="$1">
            <Text fos="$5" fow="$6" col="$primaryPurple100">
              TMR
            </Text>
            <Text fos="$4" fow="$5" col="$primaryOrange100">
              {result.TMR}
            </Text>
          </YStack>
        </YGroup.Item>
        <YGroup.Item>
          <YStack p="$4" py="$3" bg="white" gap="$1">
            <Text fos="$5" fow="$6" col="$primaryPurple100">
              Nível de atividade física
            </Text>
            <Text fos="$4" fow="$5" col="$primaryOrange100">
              {result.NAF}
            </Text>
          </YStack>
        </YGroup.Item>
      </YGroup>
    </AnimatedStack>
  )
}
