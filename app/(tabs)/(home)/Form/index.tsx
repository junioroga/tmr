import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { RadioGroup, YStack } from 'tamagui'

import { GradientButton, Input, RadioGroupItem, Text } from '@/components'
import { FieldType, maskHandler } from '@/utils/masks'
import { Condition, conditions, genres, levels } from '@/utils/options'
import { useAppStore } from '@/store'

import { schema } from './schema'

const AnimatedInput = Animated.createAnimatedComponent(Input)
const AnimatedStack = Animated.createAnimatedComponent(YStack)

export interface FormProps {
  name: string
  condition: string
  genre?: string
  bodyMass: number
  height?: number
  age?: number
  levelOfActivity: string
}

interface TMRFormProps {
  onSubmit: (data: FormProps) => void
}

export default function TMRForm({ onSubmit }: TMRFormProps) {
  const { isCalculating, setIsCalculating } = useAppStore()
  const {
    control,
    watch,
    setFocus,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      condition: '',
      genre: '',
      bodyMass: undefined,
      height: undefined,
      age: undefined,
      levelOfActivity: '',
    },
    resolver: yupResolver(schema),
  })
  const enableSubmit = isDirty && isValid
  const condition = watch('condition')
  const notIsAthletic = condition !== Condition.Athletic

  const handleSubmitForm = (data: FormProps) => {
    setIsCalculating(true)

    setTimeout(() => {
      setIsCalculating(false)
      onSubmit(data)
    }, 1500)
  }

  return (
    <YStack rowGap="$2">
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack gap="$2">
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(50).duration(150).springify()}
              placeholder="Nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="off"
              returnKeyType="next"
              clearButtonMode="always"
              inputMode="text"
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
      <Controller
        name="condition"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AnimatedStack gap="$2" pt="$2" entering={FadeInUp.delay(150).duration(150).springify()}>
            <Text fos="$5" col="$primaryPurple100">
              Condição
            </Text>
            <RadioGroup value={value} gap="$2" fd="row" onValueChange={onChange}>
              <RadioGroupItem size="$3" value={conditions[0].value} label={conditions[0].name} />
              <RadioGroupItem size="$3" value={conditions[1].value} label={conditions[1].name} />
              <RadioGroupItem size="$3" value={conditions[2].value} label={conditions[2].value} />
            </RadioGroup>
          </AnimatedStack>
        )}
      />
      {notIsAthletic && (
        <Controller
          name="genre"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <AnimatedStack
              gap="$2"
              entering={FadeInUp.delay(300).duration(150).springify()}
              exiting={FadeOutUp.delay(50).duration(150).springify()}>
              <Text fos="$5" col="$primaryPurple100">
                Gênero
              </Text>
              <RadioGroup value={value} gap="$2" fd="row" onValueChange={onChange}>
                <RadioGroupItem size="$3" value={genres[0].value} label={genres[0].name} />
                <RadioGroupItem size="$3" value={genres[1].value} label={genres[1].name} />
              </RadioGroup>
            </AnimatedStack>
          )}
        />
      )}
      <Controller
        name="bodyMass"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack gap="$2">
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(450).duration(150).springify()}
              placeholder="Massa corporal (em kg)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={
                value
                  ? maskHandler({
                      fieldType: FieldType.DECIMAL,
                      value: String(value),
                    })
                  : ''
              }
              returnKeyType="done"
              clearButtonMode="always"
              inputMode="numeric"
              onSubmitEditing={() => (notIsAthletic ? setFocus('height') : undefined)}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
      {notIsAthletic && (
        <>
          <Controller
            name="height"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack gap="$2">
                <AnimatedInput
                  ref={ref}
                  entering={FadeInUp.delay(600).duration(150).springify()}
                  exiting={FadeOutUp.delay(50).duration(150).springify()}
                  placeholder="Altura (em cm)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={
                    value
                      ? maskHandler({
                          fieldType: FieldType.DECIMAL,
                          value: String(value),
                        })
                      : ''
                  }
                  returnKeyType="done"
                  clearButtonMode="always"
                  inputMode="numeric"
                  onSubmitEditing={() => setFocus('age')}
                />
                <Input.Error error={error?.message} />
              </YStack>
            )}
          />
          <Controller
            name="age"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
              <YStack gap="$2">
                <AnimatedInput
                  ref={ref}
                  entering={FadeInUp.delay(750).duration(150).springify()}
                  exiting={FadeOutUp.delay(50).duration(150).springify()}
                  placeholder="Idade"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={
                    value
                      ? maskHandler({
                          fieldType: FieldType.NUMBERS,
                          value: String(value),
                        })
                      : undefined
                  }
                  returnKeyType="done"
                  clearButtonMode="always"
                  inputMode="numeric"
                />
                <Input.Error error={error?.message} />
              </YStack>
            )}
          />
        </>
      )}
      <Controller
        name="levelOfActivity"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <AnimatedStack
            gap="$2"
            entering={FadeInUp.delay(900).duration(150).springify()}
            exiting={FadeOutUp.delay(50).duration(150).springify()}
            py="$2">
            <Text fos="$5" col="$primaryPurple100">
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
      <AnimatedStack entering={FadeInUp.delay(1050).duration(150).springify()}>
        <GradientButton
          title="Calcular"
          onPress={handleSubmit(handleSubmitForm)}
          disabled={!enableSubmit}
          loading={isCalculating}
        />
      </AnimatedStack>
    </YStack>
  )
}
