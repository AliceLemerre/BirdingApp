import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TBird, useBirdsContext } from "@/providers/BirdProvider";
import { router } from "expo-router";

function BirdRow({ bird }: { bird: TBird }) {
  const { deleteBird } = useBirdsContext();

  return (
    <View>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => router.navigate(`/bird/bird/${bird.id}`)}
      >
        <Text>{bird.name}</Text>
        <Text>{bird.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteBird(bird.id)}
        style={{
          backgroundColor: "red",
          padding: 16,
        }}
      >
        <Text>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function UserBirds() {
  const { birdList } = useBirdsContext();

  if (birdList.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>
          Aucun oiseau enregistré.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={birdList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BirdRow bird={item} />}
      />
    </SafeAreaView>
  );
}
