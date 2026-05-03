import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { TBird } from "@/providers/BirdProvider";

const BirdItem = ({ bird }: { bird: TBird }) => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/bird/bird/${bird.id}`)}
      style={ styles.container } 
    >
      <Text style={ styles.text }>{bird.name}</Text>
      <Text style={ styles.secondaryText }>{bird.description} </Text>
    </TouchableOpacity>
 );
};

 export default BirdItem;

 
 const styles = StyleSheet.create({
     container: {
         justifyContent: 'center',
         padding: 16,
         flex: 1, 
         alignItems: "center",
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
         fontSize: 12

     }
 })