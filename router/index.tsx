import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';

import { XStack } from 'tamagui';

export default function Router() {
  const insets = useSafeAreaInsets();

  return (
    <XStack f={1} bg="$background" pt={insets.top}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </XStack>
  );
}
