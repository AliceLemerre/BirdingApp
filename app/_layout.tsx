
import { BirdProvider } from "@/providers/BirdProvider";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="bird/[id]" options={{ title: "Détail" }} />
      </Stack>
  );
}