import { useCallback } from 'react'
import { FlatList, ListRenderItem, useWindowDimensions } from 'react-native'

import { format } from 'date-fns/format'
import orderBy from 'lodash/orderBy'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Stack, YStack, getTokens, useTheme } from 'tamagui'

import Empty from '@/assets/svg/empty.svg'
import { Text } from '@/components'
import { Calculation, useAppStore } from '@/store'

import Card from './Card'
import Header from './Header'

export default function History() {
  const { history, removeHistory, filtersHistory } = useAppStore()
  const { width } = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const filteredHistory = history.filter(
    (item) =>
      item.createdAt.substring(0, 10) === format(new Date(filtersHistory?.date), 'dd/MM/yyyy')
  )
  const sortedHistory = orderBy(filteredHistory, 'createdAt', 'desc')

  const renderItem: ListRenderItem<Calculation> = useCallback(
    ({ item }) => <Card item={item} onRemove={() => removeHistory(item.id)} />,
    [removeHistory]
  )

  const renderSeparator = useCallback(() => <Stack my="$2" />, [])

  const renderEmpty = useCallback(
    () => (
      <YStack f={1} ai="center" jc="center" px="$2" gap="$4">
        <Empty height={width / 2} />
        <Text fos="$5" fow="$5" ta="center">
          Sem cálculos para listar em{' '}
          <Text fos="$5" fow="$5" col="$primaryOrange100">
            {format(new Date(filtersHistory?.date), 'dd/MM/yyyy')}
          </Text>
        </Text>
      </YStack>
    ),
    [filtersHistory?.date, width]
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
