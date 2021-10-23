import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

import { AuthProvider } from './src/hooks/auth';
import { Home } from './src/screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <AuthProvider>
      <Home />
      <StatusBar style='light' translucent backgroundColor='transparent' />
    </AuthProvider>
  );
}