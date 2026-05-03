import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container} >
      <View>
        <Text style={styles.title}>birding</Text>
        <Text style={styles.text}>
          Enregistrez tous vos oiseaux observés cette année ! Cherchez les espèces dans l'onglet <strong>Tous les oiseaux</strong> et ajoutez-les à votre profil.
        </Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 16,
        alignItems: "center"
    },
    title: {
        fontSize: 24, 
        fontWeight: "bold",
        textAlign: "center"

    },
    text: {
        color: "grey", 
        marginTop: 8, 
        textAlign: "center"
    }
})