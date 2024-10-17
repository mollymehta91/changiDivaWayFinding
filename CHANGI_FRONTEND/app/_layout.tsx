import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';
import fonts from '@/constants/fonts';
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Component: RootLayout
 * 
 * Purpose:
 * This component serves as the root layout for the application. It handles font loading, 
 * splash screen management, and sets up the query client for data fetching. Additionally, 
 * it configures the navigation stack without displaying headers for the routes.
 * 
 * @returns {JSX.Element | null} The rendered layout or null if fonts are not yet loaded
 */
export default function RootLayout() {

  // Load custom fonts and handle any loading errors
  const [loaded, error] = useFonts(fonts);

  // Use effect to hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Return null to render nothing until fonts are loaded
  if (!loaded && !error) {
    return null;
  }

  // Initialize query client with default options for retry behavior
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5, // Retry failed queries up to 5 times
        retryDelay: 1000 // Wait 1 second between retries
      },
    }
  });

  // Return the layout with query provider and gesture handler
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen 
            name="(tabs)"
            options={{
              headerShown: false // Hide header for this screen
            }}
          />
        </Stack>
      </GestureHandlerRootView>
      {/* Uncomment the following line to enable React Query Devtools */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

