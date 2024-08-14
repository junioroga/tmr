import Animated, { FadeInUp } from 'react-native-reanimated'

import { Separator, YGroup, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation } from '@/store'
import { FieldType, maskHandler } from '@/utils/masks'

const AnimatedStack = Animated.createAnimatedComponent(YGroup)

export default function ResultCard({ result }: { result: Calculation }) {
  return (
    <AnimatedStack
      entering={FadeInUp.delay(50).duration(150).springify()}
      separator={<Separator />}
      elevation={0.5}
      elevationAndroid={0.5}
    >
      <YGroup.Item>
        <YStack p="$4" py="$3" bg="white" gap="$1">
          <Text fos="$5" fow="$6" col="$primaryPurple100">
            TMR
          </Text>
          <Text fos="$4" fow="$5" col="$primaryOrange100">
            {maskHandler({
              fieldType: FieldType.DECIMAL,
              value: String(result.TMR?.toFixed(2)),
            })}
          </Text>
        </YStack>
      </YGroup.Item>
      <YGroup.Item>
        <YStack p="$4" py="$3" bg="white" gap="$1">
          <Text fos="$5" fow="$6" col="$primaryPurple100">
            Nível de atividade física
          </Text>
          <Text fos="$4" fow="$5" col="$primaryOrange100">
            {maskHandler({
              fieldType: FieldType.DECIMAL,
              value: String(result.NAF?.toFixed(2)),
            })}
          </Text>
        </YStack>
      </YGroup.Item>
    </AnimatedStack>
  )
}
