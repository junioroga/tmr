import { cloneElement } from 'react'

import { GetProps, Button as TButton, styled, withStaticProperties } from 'tamagui'

const ButtonFrame = styled(TButton, {
  size: '$4',
  br: '$3',
  bw: '$0.5',
  p: 0,
  elevation: 3,

  variants: {
    variant: {
      small: {
        w: '$5',
      },
      medium: {
        w: '$10',
      },
      full: {
        fs: 1,
      },
    },
    disabled: {
      false: {
        o: 1,
      },
      true: {
        o: 0.5,
        pointerEvents: 'none',
      },
    },
    theme: {
      primaryPurple: {
        bc: '$primaryPurple70',
        pressStyle: {
          bc: '$primaryPurple100',
          bw: '$1',
        },
      },
      primaryOrange: {
        bc: '$primaryOrange70',
        pressStyle: {
          bc: '$primaryOrange100',
          bw: '$1',
        },
      },
    },
  } as const,

  defaultVariants: {
    variant: 'full',
    disabled: false,
    theme: 'primaryPurple',
  },
})

const ButtonText = styled(TButton.Text, {
  fos: '$5',
  fow: '$6',

  variants: {
    theme: {
      primaryPurple: {
        col: '$primaryPurple100',
      },
      primaryOrange: {
        col: '$primaryOrange100',
      },
    },
  } as const,

  defaultVariants: {
    theme: 'primaryPurple',
  },
})

const ButtonIcon = (props: { children: any }) => {
  return cloneElement(props.children)
}

export const Button = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
  Icon: ButtonIcon,
})

export type ButtonProps = GetProps<typeof Button>
