import { cloneElement } from 'react'

import { Button as TButton, GetProps, styled, useTheme, withStaticProperties } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'

const ButtonFrame = styled(TButton, {
  size: '$4',
  bg: 'transparent',
  bw: '$0.5',
  br: '$3',
  pressStyle: {
    bc: '$primaryPurple100',
    bg: 'transparent',
  },

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
    disabled: {
      false: {
        o: 1,
      },
      true: {
        o: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'full',
    disabled: false,
  },
})

const ButtonText = styled(TButton.Text, {
  fos: '$5',
  fow: '$6',
  col: '$primaryPurple100',
  ls: 0,
})

const ButtonIcon = (props: { children: any }) => {
  return cloneElement(props.children)
}

const Button = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
  Icon: ButtonIcon,
})

export type GradientButtonProps = GetProps<typeof ButtonFrame> & { title: string }

export const GradientButton = ({ title, ...rest }: GradientButtonProps) => {
  const theme = useTheme()

  return (
    <LinearGradient
      animation="bouncy2"
      o={1}
      y={0}
      enterStyle={{
        o: 0,
        y: -50,
      }}
      colors={[
        theme.primaryPurple20.val,
        theme.primaryOrange20.val,
        theme.primaryPurple30.val,
        theme.primaryOrange30.val,
      ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      br="$3"
      bw="$0.5"
      bc="$primaryPurple70">
      <Button {...rest}>
        <Button.Text>{title}</Button.Text>
      </Button>
    </LinearGradient>
  )
}
