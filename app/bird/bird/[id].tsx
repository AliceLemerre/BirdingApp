import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useBirdsContext } from "@/providers/BirdProvider";

export default function Bird() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { birdList } = useBirdsContext();
  const bird = birdList.find((b) => b.id === id);

  if (!bird) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16}}>
        <Text>Oiseau introuvable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16}}>
      <Text>{bird.name}</Text>
      <Text>{bird.description}</Text>
    </SafeAreaView>
  );
}
