import React from 'react'

import { Separator, YGroup, YStack } from 'tamagui'

import { Text } from '@/components'

export default function ResultCard() {
  return (
    <YGroup separator={<Separator />} pt="$4" elevation={0.5}>
      <YGroup.Item>
        <YStack p="$4" py="$3" bg="white" gap="$1">
          <Text fos="$5" fow="$6" col="$primaryPurple100">
            TMR
          </Text>
          <Text fos="$4" fow="$5" col="$primaryOrange100">
            1.788,75
          </Text>
        </YStack>
      </YGroup.Item>
      <YGroup.Item>
        <YStack p="$4" py="$3" bg="white" gap="$1">
          <Text fos="$5" fow="$6" col="$primaryPurple100">
            Nível de atividade física
          </Text>
          <Text fos="$4" fow="$5" col="$primaryOrange100">
            Moderado
          </Text>
        </YStack>
      </YGroup.Item>
      <YGroup.Item>
        <YStack p="$4" py="$3" bg="white" gap="$1">
          <Text fos="$5" fow="$6" col="$primaryPurple100">
            TMR
          </Text>
          <Text fos="$4" fow="$5" col="$primaryOrange100">
            1.788,75
          </Text>
        </YStack>
      </YGroup.Item>
    </YGroup>
  )
}
