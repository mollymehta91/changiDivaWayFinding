import { Stack } from "expo-router";
import React from "react";

/**
 * Component: TabsLayout
 * 
 * This component defines the layout for the tabs stack.
 * It includes a Stack with screen options to hide the header for all routes.
 * 
 * @returns {JSX.Element} The rendered tabs layout
 */
export default function TabsLayout(): JSX.Element {
  return (
    <Stack
      // Hide the header for all other routes.
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" 
        options={{ 
          // Hide the header for the index route.
          headerShown: false
        }} 
      />
    </Stack>
  );
}
