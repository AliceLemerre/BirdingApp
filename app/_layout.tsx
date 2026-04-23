import { TaskProvider } from "@/provider/taskProvider";
import { Stack, Tabs } from "expo-router";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
      <Tabs>
        <Tabs.Screen name='index' options={{ headerShown: false }} />
        <Tabs.Screen name='plantsList' options={{ title: 'Toutes les plantes' }} />
        <Tabs.Screen name='userPlants' options={{ title: 'Mes plantes' }} />
     </Tabs>
  )

}

