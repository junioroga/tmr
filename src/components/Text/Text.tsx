import { GetProps, Text as TText, styled } from 'tamagui'

export const Text = styled(TText, {
  name: 'Text',
  ff: '$body',
  fow: '$4',
  fos: '$3',
  col: '$primaryPurple100',
})

export type TextProps = GetProps<typeof Text>
