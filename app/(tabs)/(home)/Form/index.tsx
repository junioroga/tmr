import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { YStack } from 'tamagui'

import { GradientButton, Input } from '@/components'

const schema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),
    age: yup.number().positive().integer().required('A idade é obrigatória'),
    genre: yup.string().required('O sexo é obrigatório'),
    bodyMass: yup.number().positive().integer().required('A massa corporal é obrigatória'),
    height: yup.number().positive().integer().required('A altura é obrigatória'),
  })
  .required()

const AnimatedInput = Animated.createAnimatedComponent(Input)

interface FormProps {
  name: string
  genre: string
  bodyMass: number | undefined
  height: number | undefined
  age: number | undefined
}

interface TMRFormProps {
  onSubmit: (data: FormProps) => void
}

export default function TMRForm({ onSubmit }: TMRFormProps) {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      genre: '',
      bodyMass: undefined,
      height: undefined,
      age: undefined,
    },
    resolver: yupResolver(schema),
  })

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
              placeholder="Sexo"
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
              value={value ? String(value) : ''}
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
              value={value ? String(value) : ''}
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
              value={value ? String(value) : ''}
              returnKeyType="done"
              clearButtonMode="always"
              inputMode="numeric"
              onSubmitEditing={() => handleSubmit(onSubmit)}
            />
            <Input.Error error={error?.message} />
          </YStack>
        )}
      />
      <GradientButton title="Calcular" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
    </YStack>
  )
}
