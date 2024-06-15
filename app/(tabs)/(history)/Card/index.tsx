import { Button, Card as TamaguiCard, XStack, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation } from '@/store'

type CardProps = {
  item: Calculation
  onPressUser: () => void
}

export const Card = ({ item, onPressUser }: CardProps) => (
  <TamaguiCard elevation={0.3}>
    <Button p="$3" unstyled onPress={onPressUser}>
      <YStack f={1} gap="$0.5">
        <Text fow="$6" fos="$5">
          {item.name}
        </Text>
        <XStack ai="center" gap="$1.5">
          <Text fow="$6" col="$primaryOrange100">
            Massa corporal (em kg):
          </Text>
          <Text fow="$5">{item.bodyMass}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fow="$6" col="$primaryOrange100">
            Taxa metabólica de repouso:
          </Text>
          <Text fow="$5">{item.TMR}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fow="$6" col="$primaryOrange100">
            Nível de atividade física:
          </Text>
          <Text fow="$5">{item.NAF}</Text>
        </XStack>
        <XStack ai="center" gap="$1.5">
          <Text fow="$6" col="$primaryOrange100">
            Criado em:
          </Text>
          <Text fow="$5">{item.createdAt}</Text>
        </XStack>
      </YStack>
    </Button>
  </TamaguiCard>
)
