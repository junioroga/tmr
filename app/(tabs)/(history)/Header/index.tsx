import React from 'react'
import { Pressable } from 'react-native'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { H3, useTheme, XStack } from 'tamagui'

import { useAppStore } from '@/store'

const AnimatedTitle = Animated.createAnimatedComponent(H3)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Header() {
  const theme = useTheme()
  const { setFiltersHistory, filtersHistory } = useAppStore()

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event

    if (!date) return

    if (type === 'set') {
      setFiltersHistory({ date })
    }
  }

  return (
    <XStack bg="$background" p="$4" jc="space-between">
      <AnimatedTitle
        entering={FadeInUp.delay(50).duration(150).springify()}
        col="$primaryPurple100">
        Histórico
      </AnimatedTitle>
      <AnimatedPressable entering={FadeInUp.delay(150).duration(150).springify()}>
        <DateTimePicker
          mode="date"
          display="inline"
          value={new Date(filtersHistory?.date)}
          textColor={theme.primaryPurple100.val}
          accentColor={theme.primaryPurple100.val}
          locale="pt-BR"
          themeVariant="light"
          maximumDate={new Date()}
          onChange={setDate}
        />
      </AnimatedPressable>
    </XStack>
  )
}
