import { useCallback, useState } from 'react'

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

import * as SplashScreenExpo from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { TamaguiProvider } from 'tamagui'

import { SplashScreen } from '@/components'
import Router from '@/router'

import config from '@/tamagui.config'

SplashScreenExpo.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState(false)
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
      await SplashScreenExpo.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <StatusBar style="dark" />
      <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onLayoutRootView}>
        {isReady ? <Router /> : <SplashScreen setIsReady={setIsReady} />}
      </SafeAreaProvider>
    </TamaguiProvider>
  )
}
