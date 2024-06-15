import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { YStack } from 'tamagui'

import { GradientButton, Input } from '@/components'
import { useAppStore } from '@/store'

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]+$/, 'O nome pode conter apenas letras e espaços')
      .min(2, 'O nome deve ter pelo menos 2 letras')
      .required('Nome é obrigatório'),
    age: yup
      .number()
      .positive()
      .integer()
      .min(10, 'A idade deve ser maior que 10')
      .required('Idade é obrigatória'),
    genre: yup.string().required('Gênero é obrigatório'),
    bodyMass: yup.number().positive().required('Massa corporal é obrigatória'),
    height: yup.number().positive().required('Altura é obrigatória'),
  })
  .required()

const AnimatedInput = Animated.createAnimatedComponent(Input)
const AnimationStack = Animated.createAnimatedComponent(YStack)

export interface FormProps {
  name: string
  genre: string
  bodyMass: number
  height: number
  age: number
}

interface TMRFormProps {
  onSubmit: (data: FormProps) => void
}

export default function TMRForm({ onSubmit }: TMRFormProps) {
  const { isCalculating, setIsCalculating } = useAppStore()
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      genre: '',
      bodyMass: undefined,
      height: undefined,
      age: undefined,
    },
    resolver: yupResolver(schema),
  })
  const enableSubmit = isDirty && isValid

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
              onSubmitEditing={() => setFocus('genre')}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
      <Controller
        name="genre"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <YStack gap="$2">
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(150).duration(150).springify()}
              placeholder="Gênero"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="off"
              returnKeyType="next"
              clearButtonMode="always"
              inputMode="text"
              onSubmitEditing={() => setFocus('bodyMass')}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
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
              entering={FadeInUp.delay(300).duration(150).springify()}
              placeholder="Massa corporal (em kg)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? String(value) : undefined}
              returnKeyType="done"
              clearButtonMode="always"
              inputMode="numeric"
              onSubmitEditing={() => setFocus('height')}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
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
              entering={FadeInUp.delay(450).duration(150).springify()}
              placeholder="Altura (em cm)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? String(value) : undefined}
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
          <YStack gap="$2" pb="$2">
            <AnimatedInput
              ref={ref}
              entering={FadeInUp.delay(600).duration(150).springify()}
              placeholder="Idade"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? String(value) : undefined}
              returnKeyType="done"
              clearButtonMode="always"
              inputMode="numeric"
              onSubmitEditing={handleSubmit(handleSubmitForm)}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
      <AnimationStack entering={FadeInUp.delay(750).duration(150).springify()}>
        <GradientButton
          title="Calcular"
          onPress={handleSubmit(handleSubmitForm)}
          disabled={!enableSubmit}
          loading={isCalculating}
        />
      </AnimationStack>
    </YStack>
  )
}
