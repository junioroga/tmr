import { GetProps, Label, RadioGroup, XStack } from 'tamagui'

import { Text } from '../Text'

type RadioGroupItemProps = GetProps<typeof RadioGroup.Item> & {
  label: string
}

export const RadioGroupItem = ({ value, size, label }: RadioGroupItemProps) => {
  return (
    <XStack ai="center" gap="$2" py="$2">
      <RadioGroup.Item value={value} size={size}>
        <RadioGroup.Indicator bg="$primaryPurple100" />
      </RadioGroup.Item>
      <Text fos="$4" col="$primaryOrange100">
        {label}
      </Text>
    </XStack>
  )
}
