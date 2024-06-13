import { useCallback } from 'react'

import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts,
} from '@expo-google-fonts/montserrat'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { TamaguiProvider } from 'tamagui'

import Router from '@/router'

import config from '@/tamagui.config'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <StatusBar style="light" />
      <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onLayoutRootView}>
        <Router />
      </SafeAreaProvider>
    </TamaguiProvider>
  )
}
