import { useCallback, useState } from 'react'
import { Pressable } from 'react-native'

import { format } from 'date-fns/format'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { getTokens, H3, useTheme, XStack } from 'tamagui'

import { DatePicker, Text } from '@/components'
import { useAppStore } from '@/store'

const AnimatedTitle = Animated.createAnimatedComponent(H3)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Header() {
  const theme = useTheme()
  const tokens = getTokens()
  const { setFiltersHistory, filtersHistory } = useAppStore()
  const [showDate, setShowDate] = useState(false)

  const setDate = (date: Date) => {
    setFiltersHistory({ date })
  }

  const toggleDatePicker = useCallback(() => setShowDate((old) => !old), [])

  return (
    <>
      <XStack bg="$background" p="$4" jc="space-between" ai="center">
        <AnimatedTitle
          entering={FadeInUp.delay(50).duration(150).springify()}
          col="$primaryPurple100"
        >
          Histórico
        </AnimatedTitle>
        <AnimatedPressable
          onPress={() => setShowDate(true)}
          entering={FadeInUp.delay(150).duration(150).springify()}
          style={{
            backgroundColor: theme.primaryPurple10.val,
            padding: tokens.space['$1.5'].val,
            borderRadius: tokens.radius.$1.val,
          }}
        >
          <Text fos="$4" fow="$5">
            {format(filtersHistory.date, 'dd/MM/yyyy')}
          </Text>
        </AnimatedPressable>
      </XStack>
      <DatePicker
        onConfirm={(date?: Date) => {
          toggleDatePicker()

          if (date) {
            setDate(date)
          }
        }}
        isVisible={showDate}
        date={new Date(filtersHistory?.date)}
        onCancel={toggleDatePicker}
      />
    </>
  )
}
