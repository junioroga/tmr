import { GetProps, Input as TInput, styled, withStaticProperties } from 'tamagui'

import { Text } from '../Text'

const InputText = styled(TInput, {
  size: '$5',
  bw: '$1',
  bc: '$primaryPurple70',
  bg: 'white',
  br: '$3',
  pl: '$3',
  placeholderTextColor: '$primaryOrange100',
  focusStyle: {
    bc: '$primaryOrange100',
  },
  fow: '$4',
  col: '$primaryPurple100',

  variants: {
    variant: {
      small: {
        w: '$5',
      },
      medium: {
        w: '$10',
      },
      full: {
        w: '100%',
      },
    },
    editable: {
      true: {
        o: 1,
      },
      false: {
        o: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'full',
    editable: true,
  },
})

export type InputProps = GetProps<typeof Input>

type ErrorProps = GetProps<typeof Text> & {
  error?: string
}

const Error = ({ error }: ErrorProps) => {
  return error ? <Text col="$primaryOrange70">{error}</Text> : <></>
}

export const Input = withStaticProperties(InputText, {
  Error,
})
