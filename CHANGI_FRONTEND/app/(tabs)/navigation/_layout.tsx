import { Stack } from "expo-router";

export default function NavigationLayout() {
    return (
        <Stack
        screenOptions={{
            // Hide the header for all other routes.
            headerShown: false,
          }}

        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}