import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useBirdsContext } from "@/providers/BirdProvider";

export default function Bird() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { birdList } = useBirdsContext();
  const bird = birdList.find((b) => b.id === id);

  if (!bird) {
    return (
      <SafeAreaView style={ styles.container } >
        <Text style={ styles.secondaryText } >Oiseau introuvable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ styles.birdContainer } >
      <Text style={ styles.text } >{bird.name}</Text>
      <Text style={ styles.secondaryText } >{bird.description}</Text>
    </SafeAreaView>
  );
}


 
 const styles = StyleSheet.create({
     container: {
         flex: 1, 
         alignItems: "center",
         justifyContent: "center",
     },
     birdContainer: {
         flex: 1, 
         padding: 20
     },
      text: {
         fontWeight: "bold", 
         fontSize: 22
     },
     secondaryText: {
         color: "grey", 
         marginTop: 8, 
     }
 })