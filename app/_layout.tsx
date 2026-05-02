import { Tabs } from "expo-router";
import { BirdProvider } from "@/providers/BirdProvider";

export default function _layout() {
  return (
    <BirdProvider>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Accueil" }} />
        <Tabs.Screen name="Birds" options={{ title: "Tous les oiseaux" }} />
        <Tabs.Screen name="userBirds" options={{ title: "Mes oiseaux" }} />
      </Tabs>
    </BirdProvider>
  );
}
