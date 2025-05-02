import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { Stack, XStack } from 'tamagui'
import { StepItem } from './StepItem'

interface Step {
  content: React.ReactNode
}

interface Color {
  normal: string
  active: string
  completed: string
}

export interface StepperProps {
  currentStep: number
  steps: Step[]
  colors: {
    marker: {
      circle: Color
      borderCircle: Color
      text: Color
      line: Color
    }
  }
}

export const Stepper = ({ currentStep, steps, colors }: StepperProps) => {
  const progress = useSharedValue(0)
  const { width } = useWindowDimensions()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    progress.value = withTiming(currentStep, { duration: 300 })
  }, [currentStep])

  return (
    <>
      <XStack ai="center" jc="center" my="$2">
        {steps.map((_, index) => (
          <StepItem
            key={index}
            index={index}
            isLastStep={index === steps.length - 1}
            colors={colors}
            progress={progress}
            width={width / (steps.length + 1)}
          />
        ))}
      </XStack>

      <Stack f={1} mt="$3">
        {steps[currentStep].content}
      </Stack>
    </>
  )
}
