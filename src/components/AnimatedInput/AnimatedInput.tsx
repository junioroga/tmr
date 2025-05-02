import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from 'react-native'

import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { YStack } from 'tamagui'

import { forwardRef } from 'react'
import { Input, InputProps } from '../Input'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedInputComponent = Animated.createAnimatedComponent(Input)

export type AnimatedInputProps = AnimatedProps<InputProps> & {
  label: string
  error?: string
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

export const AnimatedInput = forwardRef<TextInput, AnimatedInputProps>(
  (
    { error, label, value, entering, onFocus, onBlur, ...rest }: AnimatedInputProps,
    ref: React.LegacyRef<TextInput>
  ) => {
    const topAnimated = useSharedValue(value ? -11 : 15)
    const leftAnimated = useSharedValue(value ? 6 : 14)
    const backgroundAnimated = useSharedValue(value ? '#fff' : 'transparent')

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onFocus) {
        onFocus(e)
      }

      topAnimated.value = withTiming(-11, {
        duration: 200,
        easing: Easing.linear,
      })

      leftAnimated.value = withTiming(6, {
        duration: 200,
        easing: Easing.linear,
      })

      backgroundAnimated.value = withTiming('#fff', {
        duration: 200,
        easing: Easing.linear,
      })
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onBlur) {
        onBlur(e)
      }

      if (!value) {
        topAnimated.value = withTiming(15, {
          duration: 200,
          easing: Easing.linear,
        })

        leftAnimated.value = withTiming(14, {
          duration: 200,
          easing: Easing.linear,
        })

        backgroundAnimated.value = withTiming('transparent', {
          duration: 100,
          easing: Easing.linear,
        })
      }
    }

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: backgroundAnimated.value,
        top: topAnimated.value,
        left: leftAnimated.value,
      }
    })

    return (
      <YStack mt="$2">
        <AnimatedInputComponent
          ref={ref}
          value={value}
          entering={entering}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {label && (
          <View style={{ position: 'absolute', alignSelf: 'flex-start', pointerEvents: 'none' }}>
            <AnimatedText
              entering={entering}
              col="$primaryPurple100"
              fos="$5"
              fow="$5"
              style={animatedStyle}
              pe="none"
            >
              {label}
            </AnimatedText>
          </View>
        )}
        {error && (
          <AnimatedText pt="$2" col="$primaryOrange70">
            {error}
          </AnimatedText>
        )}
      </YStack>
    )
  }
)
