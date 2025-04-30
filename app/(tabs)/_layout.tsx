import { Tabs } from 'expo-router'

import { TabBar } from '@/components'

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(home)/index',
}

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'TMR',
        }}
      />
      <Tabs.Screen
        name="(history)"
        options={{
          title: 'Histórico',
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  )
}
