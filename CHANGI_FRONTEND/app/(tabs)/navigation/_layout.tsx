/**
 * Component: NavigationLayout
 * 
 * This component defines the layout for the navigation stack.
 * It includes a Stack with screen options to hide the header for all routes.
 * 
 * @returns {JSX.Element} The rendered navigation layout
 */
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
    );
}
