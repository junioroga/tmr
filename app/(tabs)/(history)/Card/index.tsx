import { Platform } from 'react-native'

import { Button, Card as TamaguiCard, getTokens, XStack, YStack } from 'tamagui'

import { SwipeableDelete, Text } from '@/components'
import { FieldType, maskHandler } from '@/utils/masks'
import { Condition } from '@/utils/options'
import { Calculation } from '@/store'

type CardProps = {
  item: Calculation
  onRemove: () => void
}

const itemHeightConditions: Record<Condition, number> = {
  [Condition.Athletic]: Platform.OS === 'ios' ? 148 : 153,
  [Condition.FatFreeMass]: Platform.OS === 'ios' ? 113 : 117,
  [Condition.Eutrophic]: Platform.OS === 'ios' ? 200 : 208,
  [Condition.Fat]: Platform.OS === 'ios' ? 200 : 208,
}

export const Card = ({ item, onRemove }: CardProps) => {
  const itemHeight = itemHeightConditions[item.condition as Condition]

  return (
    <SwipeableDelete
      onRemove={onRemove}
      itemHeight={itemHeight}
      paddingHorizontal={getTokens().space[4].val}>
      <TamaguiCard f={1} h={itemHeight} elevation={0.3}>
        <Button f={1} p="$3" unstyled>
          <YStack f={1} gap="$0.5">
            <Text fow="$6" fos="$5">
              {item.name}
            </Text>
            <XStack ai="center" gap="$1.5">
              <Text fow="$6" col="$primaryOrange100">
                Condição:
              </Text>
              <Text fow="$5">{item.condition}</Text>
            </XStack>
            {!!item.genre && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Gênero:
                </Text>
                <Text fow="$5">{item.genre}</Text>
              </XStack>
            )}
            {!!item.bodyMass && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Massa corporal:
                </Text>
                <Text fow="$5">
                  {maskHandler({
                    fieldType: FieldType.DECIMAL,
                    value: String(item.bodyMass),
                  })}{' '}
                  kg
                </Text>
              </XStack>
            )}
            {!!item.height && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Altura:
                </Text>
                <Text fow="$5">
                  {`${maskHandler({
                    fieldType: FieldType.DECIMAL,
                    value: String(item.height),
                  })} cm`}
                </Text>
              </XStack>
            )}
            {!!item.age && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Idade
                </Text>
                <Text fow="$5"> {item.age}</Text>
              </XStack>
            )}
            {!!item.levelOfActivity && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Nível de atividade física:
                </Text>
                <Text fow="$5">{item.levelOfActivity}</Text>
              </XStack>
            )}
            {!!item.fatFreeMass && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Massa livre de gordura:
                </Text>
                <Text fow="$5">
                  {maskHandler({
                    fieldType: FieldType.DECIMAL,
                    value: String(item.fatFreeMass),
                  })}{' '}
                  kg
                </Text>
              </XStack>
            )}
            <XStack ai="center" gap="$1.5">
              <Text fow="$6" col="$primaryOrange100">
                Taxa metabólica de repouso:
              </Text>
              <Text fow="$5">
                {maskHandler({
                  fieldType: FieldType.DECIMAL,
                  value: String(item.TMR?.toFixed(2)),
                })}
              </Text>
            </XStack>
            {!!item.NAF && (
              <XStack ai="center" gap="$1.5">
                <Text fow="$6" col="$primaryOrange100">
                  Calculo de atividade física:
                </Text>
                <Text fow="$5">
                  {maskHandler({
                    fieldType: FieldType.DECIMAL,
                    value: String(item.NAF?.toFixed(2)),
                  })}
                </Text>
              </XStack>
            )}
            <XStack ai="center" gap="$1.5">
              <Text fow="$6" col="$primaryOrange100">
                Criado em:
              </Text>
              <Text fow="$5">{item.createdAt}</Text>
            </XStack>
          </YStack>
        </Button>
      </TamaguiCard>
    </SwipeableDelete>
  )
}
