import { GetProps, Spinner, useTheme } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'

import { Button } from '../Button'

export type GradientButtonProps = GetProps<typeof Button> & {
  title: string
  loading?: boolean
}

export const GradientButton = ({
  title,
  loading,
  theme = 'primaryPurple',
  disabled,
  ...rest
}: GradientButtonProps) => {
  const globalTheme = useTheme()

  const linearGradient = {
    primaryPurple: [
      globalTheme.primaryPurple20.val,
      globalTheme.primaryOrange20.val,
      globalTheme.primaryPurple30.val,
      globalTheme.primaryOrange30.val,
    ],
    primaryOrange: [
      globalTheme.primaryOrange30.val,
      globalTheme.primaryPurple30.val,
      globalTheme.primaryOrange20.val,
      globalTheme.primaryPurple20.val,
    ],
  }

  return (
    <Button {...rest} theme={theme} disabled={disabled || loading}>
      <LinearGradient
        h="100%"
        w="100%"
        br="$3"
        colors={linearGradient[theme]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        ai="center"
        jc="center">
        {loading ? (
          <Spinner color="$primaryPurple100" />
        ) : (
          <Button.Text theme={theme}>{title}</Button.Text>
        )}
      </LinearGradient>
    </Button>
  )
}
