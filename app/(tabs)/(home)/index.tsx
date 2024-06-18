import { useCallback, useRef, useState } from 'react'

import { format } from 'date-fns/format'
import uniqueId from 'lodash/uniqueId'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, H3, useTheme } from 'tamagui'

import {
  getLevelOfPhysicalActivity,
  getTMRAthletic,
  getTMREutrophic,
  getTRMFat,
} from '@/utils/calculations'
import { Condition } from '@/utils/options'
import { useAppStore } from '@/store'

import Form, { FormProps } from './Form'
import ResultCard from './ResultCard'

const AnimatedTitle = Animated.createAnimatedComponent(H3)

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
        padding: getTokens().space[4].val,
        paddingBottom: bottom + getTokens().space[12].val,
        backgroundColor: theme.background.val,
      }}>
      <AnimatedTitle
        als="center"
        col="$primaryPurple100"
        entering={FadeInUp.delay(50).duration(150).springify()}
        pb="$3">
        TMR
      </AnimatedTitle>
      <Form onSubmit={calculateTMR} />
      {!isCalculating && result && <ResultCard result={result} />}
    </KeyboardAwareScrollView>
  )
}
