import { StyleSheet, View } from 'react-native'

import { Stack } from 'expo-router'

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'TMR' }} />
      <View style={styles.container} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
})
