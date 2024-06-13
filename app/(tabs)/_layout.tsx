import { Tabs } from 'expo-router'

import { TabBar } from '@/components'

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'TMR',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  )
}
