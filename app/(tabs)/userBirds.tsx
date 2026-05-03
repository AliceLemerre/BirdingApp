import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TBird, useBirdsContext } from "@/providers/BirdProvider";
import { router } from "expo-router";

function BirdRow({ bird }: { bird: TBird }) {
  const { deleteBird } = useBirdsContext();

  return (
    <View style={ styles.container } >
      <TouchableOpacity
        style={ styles.flex } 
        onPress={() => router.navigate(`/bird/${bird.id}`)}
      >
        <Text style={ styles.text } >{bird.name}</Text>
        <Text style={ styles.secondaryText } >{bird.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteBird(bird.id)}
        style={ styles.dangerText } 
      >
        <Text style={ styles.deleteText }>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function UserBirds() {
  const { birdList } = useBirdsContext();

  if (birdList.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={ styles.secondaryText }>
          Aucun oiseau enregistré.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ styles.flex }>
      <FlatList
        data={birdList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BirdRow bird={item} />}
      />
    </SafeAreaView>
  );
}


 const styles = StyleSheet.create({
     container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
     },
      text: {
         fontWeight: "bold", 
         fontSize: 15
     },
     secondaryText: {
         color: "grey", 
         marginTop: 12, 
     },
     dangerText: {
          backgroundColor: "darkred",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 8,
      },
      deleteText: {
          color: "white", 
          fontWeight: "bold"
      },
      flex: {
        flex: 1,
      }
 })