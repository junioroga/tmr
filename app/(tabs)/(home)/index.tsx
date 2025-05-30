import { useCallback, useRef } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { format } from 'date-fns/format'
import uniqueId from 'lodash/uniqueId'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, useTheme } from 'tamagui'

import { useAppStore } from '@/store'
import {
  getLevelOfPhysicalActivity,
  getTMRAthletic,
  getTMREutrophic,
  getTMRFatFreeMass,
  getTRMFat,
} from '@/utils/calculations'
import { Condition } from '@/utils/options'

import TMRForm, { FormProps } from './Form'
import Header from './Header'

const TMRFunctions = (
  condition: Condition,
  bodyMass: number,
  height: number,
  age: number,
  genre: string,
  fatFreeMass: number
): number => {
  switch (condition) {
    case Condition.Fat:
      return getTRMFat(bodyMass, height, age, genre)
    case Condition.Eutrophic:
      return getTMREutrophic(bodyMass, height, age, genre)
    case Condition.Athletic:
      return getTMRAthletic(bodyMass)
    case Condition.FatFreeMass:
      return getTMRFatFreeMass(fatFreeMass)

    default:
      return 0
  }
}

export default function Home() {
  const { bottom } = useSafeAreaInsets()
  const { addToHistory, history, setResult } = useAppStore()
  const tokens = getTokens()
  const theme = useTheme()
  const lastCalculation = history[history.length - 1]
  const ref = useRef<ScrollView>(null)

  const calculateTMR = useCallback(
    (formData: FormProps) => {
      const id = uniqueId(lastCalculation?.id || '0')
      const TMR = TMRFunctions(
        formData.condition as Condition,
        formData.bodyMass || 0,
        formData.height || 0,
        formData.age || 0,
        formData.genre || '',
        formData.fatFreeMass || 0
      )
      const data = {
        ...formData,
        id,
        TMR,
        NAF:
          formData.condition !== Condition.FatFreeMass
            ? getLevelOfPhysicalActivity(TMR, formData.levelOfActivity || '')
            : 0,
        createdAt: format(new Date(), 'dd/MM/yyyy HH:mm'),
      }
      addToHistory(data)
      setResult(data)
      setTimeout(() => ref.current?.scrollToEnd())
    },
    [addToHistory, lastCalculation?.id, setResult]
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={{ flex: 1 }}
    >
      <ScrollView
        ref={ref}
        contentContainerStyle={{
          flexGrow: 1,
          padding: tokens.space[4].val,
          paddingBottom: bottom + tokens.space[12].val,
          backgroundColor: theme.background.val,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <TMRForm onSubmit={calculateTMR} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
