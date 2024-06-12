import { useMemo } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { selectionAsync } from 'expo-haptics';
import { Tabs } from 'expo-router';

import { useTheme } from 'tamagui';
import { Calculator, Settings } from '@tamagui/lucide-icons';

import { Text } from '@/components';
import { tokens } from '@tamagui/themes';

type TabLabelProps = {
  label: string;
  color: string;
};

const TabLabel = ({ label, color }: TabLabelProps) => (
  <Text col={color} fos="$1" fow="$6">
    {label}
  </Text>
);

export default function TabLayout() {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const bottomDistance = useMemo(() => (bottom > 0 ? bottom - 8 : 8), [bottom]);

  return (
    <Tabs
      backBehavior="initialRoute"
      screenListeners={() => ({
        tabPress: () => selectionAsync(),
      })}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.backgroundHover.val,
          position: 'absolute',
          paddingBottom: tokens.space[1].val,
          paddingTop: tokens.space[1.5].val,
          bottom: bottomDistance,
          left: tokens.space[3].val,
          right: tokens.space[3].val,
          elevation: 3,
          borderRadius: tokens.size[6].val,
          height: tokens.size[5].val,
          borderColor: theme.backgroundHover.val,
          borderTopWidth: 0,
          shadowColor: theme.color12.val,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
        },
        tabBarActiveTintColor: theme.blue10.val,
        tabBarInactiveTintColor: theme.gray11.val,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'TMR',
          tabBarIcon: ({ color, focused }) => (
            <Calculator
              size="$icon.sm"
              col={color}
              fill={focused ? theme.blue6.val : theme.background.val}
            />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="TMR" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused }) => (
            <Settings
              size="$icon.sm"
              col={color}
              fill={focused ? theme.blue6.val : theme.background.val}
            />
          ),
          tabBarLabel: ({ color }) => <TabLabel label="Configurações" color={color} />,
        }}
      />
    </Tabs>
  );
}
