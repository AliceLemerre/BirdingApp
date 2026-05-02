import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { TBird } from "@/providers/BirdProvider";

const BirdItem = ({ bird }: { bird: TBird }) => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate(`/bird/bird/${bird.id}`)}
      style={{
        padding: 16,
      }}
    >
      <Text>{bird.name}</Text>
      <Text>{bird.description} </Text>
    </TouchableOpacity>
 );
};

 export default BirdItem;
