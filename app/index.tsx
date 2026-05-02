import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View>
        <Text >birding</Text>
        <Text>
          Enregistrez tous vos oiseaux observés ! Cherchez les espèces dans l'onglet Tous les oiseaux et ajoutez-les à votre profil.
        </Text>
      </View>
    </SafeAreaView>
  );
}
