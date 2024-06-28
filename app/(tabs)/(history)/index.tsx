import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import { format } from 'date-fns/format'
import orderBy from 'lodash/orderBy'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, Stack, useTheme, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation, useAppStore } from '@/store'

import { Card } from './Card'
import Header from './Header'

export default function History() {
  const { history, removeHistory, filtersHistory } = useAppStore()
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const filteredHistory = history.filter(
    (item) =>
      item.createdAt.substring(0, 10) === format(new Date(filtersHistory?.date), 'dd/MM/yyyy'),
  )
  const sortedHistory = orderBy(filteredHistory, 'createdAt', 'desc')

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
    <>
      <Header />
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
    </>
  )
}
