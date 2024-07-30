import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { impactAsync, selectionAsync } from 'expo-haptics'

import { getTokens, useTheme } from 'tamagui'

import { TabBarButton } from '../TabBarButton'

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useTheme()
  const tokens = getTokens()
  const { bottom } = useSafeAreaInsets()
  const bottomDistance = useMemo(() => (bottom > 0 ? bottom - 8 : 8), [bottom])

  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: tokens.space.$4.val,
      paddingVertical: tokens.space.$3.val,
      backgroundColor: theme.background.val,
      position: 'absolute',
      bottom: bottomDistance,
      borderRadius: tokens.size['$0.75'].val,
      borderCurve: 'continuous',
      borderColor: theme.backgroundHover.val,
      elevation: 3,
      shadowColor: theme.shadowColor.val,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
  })

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        if (['_sitemap', '+not-found'].includes(route.name)) return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            selectionAsync()
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          impactAsync()
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? theme.primaryPurple100.val : theme.orange10Dark.val}
            label={label}
          />
        )
      })}
    </View>
  )
}
