import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getTokens, Spinner, Stack, useTheme, YStack } from 'tamagui'

import { Text } from '@/components'
import { Calculation, useAppStore } from '@/store'

import { Card } from './Card'

export default function History() {
  const { history } = useAppStore()
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()

  const onPressUser = useCallback((id: string) => {}, [])

  const renderItem: ListRenderItem<Calculation> = useCallback(
    ({ item }) => <Card item={item} onPressUser={() => onPressUser(item.id)} />,
    [onPressUser],
  )

  const renderSeparator = useCallback(() => <Stack my="$1.5" />, [])

  const renderEmpty = useCallback(
    () => (
      <YStack f={1} ai="center" jc="center">
        <Text>Sem histórico para listar 🍃</Text>
      </YStack>
    ),
    [],
  )

  const renderFooter = useCallback(() => {
    if (false) {
      return (
        <YStack ai="center" jc="center" my="$3">
          <Spinner />
        </YStack>
      )
    }

    return null
  }, [])

  const keyExtractor = useCallback((item: Calculation) => item.id, [])

  const onEndReached = useCallback(() => {}, [])

  const onRefresh = () => {}

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={history}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
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
