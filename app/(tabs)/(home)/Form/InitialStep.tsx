import { AnimatedInput, GradientButton, RadioGroupItem, Text } from '@/components'
import { conditions } from '@/utils/options'
import { impactAsync } from 'expo-haptics'
import { Controller, useFormContext } from 'react-hook-form'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { RadioGroup, YStack } from 'tamagui'

const AnimatedStack = Animated.createAnimatedComponent(YStack)

type Props = {
  setStep: (step: number) => void
}

export default function InitialStep({ setStep }: Props) {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext()

  const { isDirty: isDirtyName } = getFieldState('name')
  const { isDirty: isDirtyCondition } = getFieldState('condition')
  const error = Object.keys(errors).some((value) => value === 'name' || 'condition')

  return (
    <YStack rowGap="$3" pt="$4">
      <Controller
        {...register('name')}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            ref={ref}
            entering={FadeInUp.delay(50).duration(150).springify()}
            label="Nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="next"
            clearButtonMode="always"
            inputMode="text"
            error={error?.message}
          />
        )}
      />
      <Controller
        {...register('condition')}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange } }) => (
          <AnimatedStack gap="$2" pt="$2" entering={FadeInUp.delay(150).duration(150).springify()}>
            <Text fos="$5" fow="$5" col="$primaryPurple100">
              Condição
            </Text>
            <RadioGroup value={value} fw="wrap" gap="$2" fd="row" onValueChange={onChange}>
              <RadioGroupItem size="$3" value={conditions[0].value} label={conditions[0].name} />
              <RadioGroupItem size="$3" value={conditions[1].value} label={conditions[1].name} />
              <RadioGroupItem size="$3" value={conditions[2].value} label={conditions[2].value} />
              <RadioGroupItem size="$3" value={conditions[3].value} label={conditions[3].value} />
            </RadioGroup>
          </AnimatedStack>
        )}
      />
      <AnimatedStack entering={FadeInUp.delay(300).duration(150).springify()} my="$2">
        <GradientButton
          title="Próximo"
          onPress={() => {
            impactAsync()
            setStep(1)
          }}
          elevation={0}
          disabled={error || !isDirtyName || !isDirtyCondition}
        />
      </AnimatedStack>
    </YStack>
  )
}
