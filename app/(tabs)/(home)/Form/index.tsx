import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { yupResolver } from '@hookform/resolvers/yup'
import ProgressSteps, { Content } from '@joaosousa/react-native-progress-steps'

import { useAppStore } from '@/store'
import { Condition } from '@/utils/options'
import { YStack, useTheme } from 'tamagui'
import InitialStep from './InitialStep'
import ResultStep from './ResultStep'
import SecondStep from './SecondStep'
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
  const { setResult } = useAppStore()
  const [step, setStep] = useState(0)
  const theme = useTheme()

  const formMethods = useForm({
    mode: 'all',
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

  const { watch, resetField, handleSubmit } = formMethods
  const condition = watch('condition') as Condition

  const resetFields = useCallback(() => {
    resetField('bodyMass')
    resetField('height')
    resetField('age')
    resetField('fatFreeMass')
    resetField('levelOfActivity')
    resetField('genre')
  }, [resetField])

  useEffect(() => {
    if (condition) {
      resetFields()
      setResult(undefined)
    }
  }, [condition, resetFields, setResult])

  return (
    <FormProvider {...formMethods}>
      <AnimatedStack entering={FadeInUp.delay(150).duration(150).springify()}>
        <ProgressSteps
          orientation="horizontal"
          currentStep={step}
          steps={[
            {
              id: 0,
              title: <></>,
              content: <Content>{step === 0 ? <InitialStep setStep={setStep} /> : <></>}</Content>,
            },
            {
              id: 1,
              title: <></>,
              content: (
                <Content>
                  {step === 1 ? (
                    <SecondStep setStep={setStep} handleSubmitForm={handleSubmit(onSubmit)} />
                  ) : (
                    <></>
                  )}
                </Content>
              ),
            },
            {
              id: 2,
              title: <></>,
              content: <Content>{step === 2 ? <ResultStep setStep={setStep} /> : <></>}</Content>,
            },
          ]}
          colors={{
            marker: {
              text: {
                normal: theme.primaryPurple40.val,
                active: theme.primaryPurple80.val,
                completed: theme.primaryPurple100.val,
              },
              line: {
                normal: theme.primaryOrange20.val,
                active: theme.primaryOrange50.val,
                completed: theme.primaryOrange100.val,
              },
            },
          }}
        />
      </AnimatedStack>
    </FormProvider>
  )
}
