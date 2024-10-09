import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useColorScheme } from '@/hooks/useColorScheme';

import fonts from '@/constants/fonts';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
        retryDelay: 1000
      },
    }
  }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false
          }}
          />
        </Stack>
      </GestureHandlerRootView>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
