import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import orderBy from 'lodash/orderBy'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, Stack, useTheme, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation, useAppStore } from '@/store'

import { Card } from './Card'

export default function History() {
  const { history, removeHistory } = useAppStore()
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const sortedHistory = orderBy(history, 'createdAt', 'desc')

  const renderItem: ListRenderItem<Calculation> = useCallback(
    ({ item }) => <Card item={item} onRemove={() => removeHistory(item.id)} />,
    [removeHistory],
  )

  const renderSeparator = useCallback(() => <Stack my="$2" />, [])

  const renderEmpty = useCallback(
    () => (
      <YStack f={1} ai="center" jc="center">
        <Text>Sem histórico para listar 🍃</Text>
      </YStack>
    ),
    [],
  )

  const keyExtractor = useCallback((item: Calculation) => item.id, [])

  const onEndReached = useCallback(() => {}, [])

  const onRefresh = () => {}

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={sortedHistory}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      refreshing={false}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: getTokens().space[4].val,
        paddingTop: getTokens().space[2].val,
        paddingBottom: bottom + getTokens().space[12].val,
        backgroundColor: theme.background.val,
      }}
    />
  )
}
