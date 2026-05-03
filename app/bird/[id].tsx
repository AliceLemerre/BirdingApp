import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useBirdsContext, TBird } from "@/providers/BirdProvider";

export default function Bird({ bird }: { bird: TBird }) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { birdList } = useBirdsContext();

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
         padding: 16
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