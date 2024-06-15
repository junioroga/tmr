import { useCallback, useState } from 'react'

import { format } from 'date-fns/format'
import uniqueId from 'lodash/uniqueId'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, H3, ScrollView } from 'tamagui'

import { useAppStore } from '@/store'

import Form, { FormProps } from './Form'
import ResultCard from './ResultCard'

const AnimatedTitle = Animated.createAnimatedComponent(H3)

export default function Home() {
  const { bottom } = useSafeAreaInsets()
  const { addToHistory, history, isCalculating } = useAppStore()
  const [historyId, setHistoryId] = useState('')
  const result = history.find((item) => item.id === historyId)
  const lastCalculation = history[history.length - 1]

  const calculateTMR = useCallback(
    (formData: FormProps) => {
      const id = uniqueId(lastCalculation?.id || '0')
      const data = {
        ...formData,
        id,
        TMR: 10,
        NAF: 30,
        createdAt: format(new Date(), 'dd/MM/yyyy HH:mm'),
      }
      addToHistory(data)
      setHistoryId(id)
    },
    [addToHistory, lastCalculation],
  )

  return (
    <ScrollView
      contentContainerStyle={{
        fg: 1,
        p: '$4',
        pb: bottom + getTokens().space[12].val,
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
    </ScrollView>
  )
}
