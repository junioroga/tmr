import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

import { RadioGroup, YStack } from 'tamagui'

import { AnimatedInput, GradientButton, RadioGroupItem, Text } from '@/components'
import { FieldType, maskHandler } from '@/utils/masks'
import { Condition, conditions, genres, levels } from '@/utils/options'
import { useAppStore } from '@/store'

import { schema } from './schema'

const AnimatedStack = Animated.createAnimatedComponent(YStack)

export interface FormProps {
  name: string
  condition: string
  genre?: string
  bodyMass?: number
  height?: number
  age?: number
  levelOfActivity?: string
  fatFreeMass?: number
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
      fatFreeMass: undefined,
    },
    resolver: yupResolver(schema),
  })
  const enableSubmit = isDirty && isValid
  const condition = watch('condition')
  const isAthletic = condition === Condition.Athletic
  const isFatFreeMass = condition === Condition.FatFreeMass

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
        name="condition"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange } }) => (
          <AnimatedStack gap="$2" pt="$2" entering={FadeInUp.delay(150).duration(150).springify()}>
            <Text fos="$5" col="$primaryPurple100">
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
      {!isAthletic && !isFatFreeMass && (
        <Controller
          name="genre"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <AnimatedStack
              gap="$2"
              entering={FadeInUp.delay(300).duration(150).springify()}
              exiting={FadeOutUp.delay(50).duration(150).springify()}>
              <Text fos="$5" col="$primaryPurple100">
                Gênero
              </Text>
              <RadioGroup value={value} fw="wrap" gap="$2" fd="row" onValueChange={onChange}>
                <RadioGroupItem size="$3" value={genres[0].value} label={genres[0].name} />
                <RadioGroupItem size="$3" value={genres[1].value} label={genres[1].name} />
              </RadioGroup>
            </AnimatedStack>
          )}
        />
      )}
      {!isFatFreeMass && (
        <Controller
          name="bodyMass"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
            <AnimatedInput
              ref={ref}
              label="Massa corporal (em kg)"
              entering={FadeInUp.delay(450).duration(150).springify()}
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
              error={error?.message}
              onSubmitEditing={() => (!isAthletic ? setFocus('height') : undefined)}
            />
          )}
        />
      )}
      {!isAthletic && !isFatFreeMass && (
        <>
          <Controller
            name="height"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
              <AnimatedInput
                ref={ref}
                entering={FadeInUp.delay(600).duration(150).springify()}
                exiting={FadeOutUp.delay(50).duration(150).springify()}
                label="Altura (em cm)"
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
                error={error?.message}
                onSubmitEditing={() => setFocus('age')}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
              <AnimatedInput
                ref={ref}
                entering={FadeInUp.delay(750).duration(150).springify()}
                exiting={FadeOutUp.delay(50).duration(150).springify()}
                label="Idade"
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
                error={error?.message}
              />
            )}
          />
        </>
      )}
      {!isFatFreeMass && (
        <Controller
          name="levelOfActivity"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
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
      )}
      {isFatFreeMass && (
        <Controller
          name="fatFreeMass"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
            <AnimatedInput
              ref={ref}
              label="Massa livre de gordura (em kg)"
              entering={FadeInUp.delay(50).duration(150).springify()}
              exiting={FadeOutUp.delay(50).duration(150).springify()}
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
              error={error?.message}
              mb="$2"
            />
          )}
        />
      )}
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
