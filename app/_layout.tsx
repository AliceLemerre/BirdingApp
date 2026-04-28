import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
      <Tabs>
        <Tabs.Screen name='index' options={{ headerShown: false }} />
        <Tabs.Screen name='Birds' options={{ title: 'Tous les oiseaux' }} />
        <Tabs.Screen name='userBirds' options={{ title: 'Mes oiseaux' }} />
     </Tabs>
  )
}