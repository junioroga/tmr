import { GradientButton } from '@/components'
import { useAppStore } from '@/store'
import {} from '@/utils/masks'
import { impactAsync } from 'expo-haptics'
import { useFormContext } from 'react-hook-form'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { XStack, YStack } from 'tamagui'
import ResultCard from '../ResultCard'

type Props = {
  setStep: (step: number) => void
}

const AnimatedXStack = Animated.createAnimatedComponent(XStack)

export default function ResultStep({ setStep }: Props) {
  const { result, setResult } = useAppStore()
  const { reset } = useFormContext()

  const handleBackButton = () => {
    impactAsync()
    setStep(1)
    setResult(undefined)
  }

  const handleResetButton = () => {
    impactAsync()
    reset()
    setStep(0)
  }

  return (
    <YStack f={1} gap="$4" px="$2" pt="$2">
      {result && <ResultCard result={result} />}
      <AnimatedXStack
        entering={FadeInUp.delay(300).duration(150).springify()}
        mb="$2"
        jc="center"
        columnGap="$2"
      >
        <GradientButton
          title="Anterior"
          theme="primaryOrange"
          onPress={handleBackButton}
          elevation={0}
        />
        <GradientButton title="Início" onPress={handleResetButton} elevation={0} />
      </AnimatedXStack>
    </YStack>
  )
}
