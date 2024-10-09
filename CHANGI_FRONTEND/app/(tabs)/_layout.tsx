import { Stack, Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
    screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    >
        <Stack.Screen name="index" 
        options={{ 
            headerShown: false
         }} />
    </Stack>
    // <Tabs
    // screenOptions={{
    //     headerShown: false,
    // }}
    // >
    //     <Tabs.Screen redirect 
    //     name="index"
    //     options={{
    //         href: null,
    //       }}
    //     />
    // </Tabs>
  );
};