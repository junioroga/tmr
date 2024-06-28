import { useCallback, useRef, useState } from 'react'

import { format } from 'date-fns/format'
import uniqueId from 'lodash/uniqueId'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, useTheme } from 'tamagui'

import {
  getLevelOfPhysicalActivity,
  getTMRAthletic,
  getTMREutrophic,
  getTRMFat,
} from '@/utils/calculations'
import { Condition } from '@/utils/options'
import { useAppStore } from '@/store'

import Form, { FormProps } from './Form'
import Header from './Header'
import ResultCard from './ResultCard'

const TMRFunctions: Record<
  Condition,
  (bodyMass: number, height: number, age: number, genre: string) => number
> = {
  [Condition.Fat]: getTRMFat,
  [Condition.Eutrophic]: getTMREutrophic,
  [Condition.Athletic]: getTMRAthletic,
}

export default function Home() {
  const { bottom } = useSafeAreaInsets()
  const { addToHistory, history, isCalculating } = useAppStore()
  const tokens = getTokens()
  const theme = useTheme()
  const [historyId, setHistoryId] = useState('')
  const result = history.find((item) => item.id === historyId)
  const lastCalculation = history[history.length - 1]
  const ref = useRef<KeyboardAwareScrollView>(null)

  const calculateTMR = useCallback(
    (formData: FormProps) => {
      const id = uniqueId(lastCalculation?.id || '0')
      const TMR = TMRFunctions[formData.condition as Condition](
        formData.bodyMass,
        formData.height || 0,
        formData.age || 0,
        formData.genre || '',
      )
      const data = {
        ...formData,
        id,
        TMR,
        NAF: getLevelOfPhysicalActivity(TMR, formData.levelOfActivity),
        createdAt: format(new Date(), 'dd/MM/yyyy HH:mm'),
      }
      addToHistory(data)
      setHistoryId(id)
      setTimeout(() => ref.current?.scrollToEnd(true))
    },
    [addToHistory, lastCalculation],
  )

  return (
    <KeyboardAwareScrollView
      ref={ref}
      contentContainerStyle={{
        flexGrow: 1,
        padding: tokens.space[4].val,
        paddingBottom: bottom + tokens.space[12].val,
        backgroundColor: theme.background.val,
      }}>
      <Header />
      <Form onSubmit={calculateTMR} />
      {!isCalculating && result && <ResultCard result={result} />}
    </KeyboardAwareScrollView>
  )
}
