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
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import * as SplashScreenExpo from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { TamaguiProvider } from 'tamagui'

import { SplashScreen } from '@/components'

import Router from '@/router'
import config from '~/tamagui.config'

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
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <TamaguiProvider config={config} defaultTheme="light">
        <StatusBar style="dark" />
        {!isReady && <SplashScreen setIsReady={setIsReady} />}
        {isReady && <Router />}
      </TamaguiProvider>
    </GestureHandlerRootView>
  )
}
