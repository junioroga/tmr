import { AnimatedInput, GradientButton, RadioGroupItem, Text } from '@/components'
import { useAppStore } from '@/store'
import { FieldType, maskDecimal, maskHandler } from '@/utils/masks'
import { Condition, genres, levels } from '@/utils/options'
import { impactAsync } from 'expo-haptics'
import { ReactNode, useCallback, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Keyboard } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { RadioGroup, XStack, YStack } from 'tamagui'

const AnimatedStack = Animated.createAnimatedComponent(YStack)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)

type Props = {
  setStep: (step: number) => void
  handleSubmitForm: () => void
}

export default function SecondStep({ setStep, handleSubmitForm }: Props) {
  const { isCalculating, setIsCalculating } = useAppStore()
  const {
    register,
    setFocus,
    watch,
    formState: { isDirty, isValid },
  } = useFormContext()
  const enableSubmit = isDirty && isValid
  const condition = watch('condition') as Condition

  const onSubmitForm = useCallback(() => {
    impactAsync()
    setIsCalculating(true)

    setTimeout(() => {
      setIsCalculating(false)
      setStep(2)
      handleSubmitForm()
    }, 1500)
  }, [setIsCalculating, setStep, handleSubmitForm])

  const renderFatFreeMass = useCallback(
    () => (
      <Controller
        {...register('fatFreeMass')}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            ref={ref}
            label="Massa livre de gordura (em kg)"
            entering={FadeInUp.delay(50).duration(150).springify()}
            onBlur={onBlur}
            onChangeText={(value) => onChange(maskDecimal(value))}
            value={value}
            returnKeyType="done"
            clearButtonMode="always"
            inputMode="numeric"
            error={error?.message}
            mb="$4"
          />
        )}
      />
    ),
    [register]
  )

  const renderBodyMass = useCallback(
    () => (
      <Controller
        {...register('bodyMass')}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            ref={ref}
            label="Massa corporal (em kg)"
            entering={FadeInUp.delay(condition === Condition.Athletic ? 50 : 150)
              .duration(150)
              .springify()}
            onBlur={onBlur}
            onChangeText={(value) => onChange(maskDecimal(value))}
            value={value}
            returnKeyType={condition !== Condition.FatFreeMass ? 'next' : 'done'}
            clearButtonMode="always"
            inputMode="numeric"
            error={error?.message}
            onSubmitEditing={() =>
              condition !== Condition.FatFreeMass ? setFocus('height') : Keyboard.dismiss()
            }
          />
        )}
      />
    ),
    [register, condition, setFocus]
  )

  const renderLevelOfActivity = useCallback(
    () => (
      <Controller
        {...register('levelOfActivity')}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange } }) => (
          <AnimatedStack
            gap="$2"
            entering={FadeInUp.delay(condition === Condition.Athletic ? 150 : 600)
              .duration(150)
              .springify()}
            py="$2"
          >
            <Text fos="$5" fow="$5" col="$primaryPurple100">
              Nível de atividade física
            </Text>
            <RadioGroup value={value} fw="wrap" gap="$2" fd="row" onValueChange={onChange}>
              <RadioGroupItem size="$3" value={levels[0].value} label={levels[0].name} />
              <RadioGroupItem size="$3" value={levels[1].value} label={levels[1].name} />
              <RadioGroupItem size="$3" value={levels[2].value} label={levels[2].name} />
              <RadioGroupItem size="$3" value={levels[3].value} label={levels[3].name} />
            </RadioGroup>
          </AnimatedStack>
        )}
      />
    ),
    [register, condition]
  )

  const renderFatAndEutrophic = useCallback(
    () => (
      <YStack rowGap="$3" pt="$4">
        {renderBodyMass()}
        <Controller
          {...register('height')}
          rules={{
            required: true,
          }}
          render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(150).duration(150).springify()}
              label="Altura (em cm)"
              onBlur={onBlur}
              onChangeText={(value) => onChange(maskDecimal(value))}
              value={value}
              returnKeyType="next"
              clearButtonMode="always"
              inputMode="numeric"
              error={error?.message}
              onSubmitEditing={() => setFocus('age')}
            />
          )}
        />
        <Controller
          {...register('age')}
          rules={{
            required: true,
          }}
          render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(300).duration(150).springify()}
              label="Idade"
              onBlur={onBlur}
              onChangeText={onChange}
              value={
                value
                  ? maskHandler({
                      fieldType: FieldType.NUMBERS,
                      value: String(value),
                    })
                  : ''
              }
              returnKeyType="done"
              clearButtonMode="always"
              inputMode="numeric"
              error={error?.message}
            />
          )}
        />
        <Controller
          {...register('genre')}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <AnimatedStack gap="$2" entering={FadeInUp.delay(450).duration(150).springify()}>
              <Text fos="$5" fow="$5" col="$primaryPurple100">
                Gênero
              </Text>
              <RadioGroup value={value} fw="wrap" gap="$2" fd="row" onValueChange={onChange}>
                <RadioGroupItem size="$3" value={genres[0].value} label={genres[0].name} />
                <RadioGroupItem size="$3" value={genres[1].value} label={genres[1].name} />
              </RadioGroup>
            </AnimatedStack>
          )}
        />
        {renderLevelOfActivity()}
      </YStack>
    ),
    [renderBodyMass, renderLevelOfActivity, register, setFocus]
  )

  const renderFieldsByCondition = useMemo(
    (): { [key in Condition]: ReactNode } => ({
      [Condition.FatFreeMass]: renderFatFreeMass(),
      [Condition.Athletic]: (
        <YStack rowGap="$3">
          {renderBodyMass()}``
          {renderLevelOfActivity()}
        </YStack>
      ),
      [Condition.Fat]: renderFatAndEutrophic(),
      [Condition.Eutrophic]: renderFatAndEutrophic(),
    }),
    [renderFatFreeMass, renderBodyMass, renderLevelOfActivity, renderFatAndEutrophic]
  )

  return (
    <YStack rowGap="$2">
      {renderFieldsByCondition[condition]}
      <AnimatedXStack
        entering={FadeInUp.delay(
          condition === Condition.FatFreeMass ? 150 : condition === Condition.Athletic ? 450 : 750
        )
          .duration(150)
          .springify()}
        mb="$2"
        jc="space-between"
        columnGap="$4"
      >
        <GradientButton
          title="Anterior"
          theme="primaryOrange"
          onPress={() => {
            impactAsync()
            setStep(0)
          }}
          elevation={0}
        />
        <GradientButton
          title="Calcular"
          onPress={onSubmitForm}
          loading={isCalculating}
          disabled={!enableSubmit}
          elevation={0}
        />
      </AnimatedXStack>
    </YStack>
  )
}
