import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container} >
      <View>
        <Image
        source={require('../../assets/images/web-bird-id.webp')}
        style={styles.img}
        />
       
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
        textAlign: "center",
        padding: 16
    },
    img: {
        width: "100%",
      height: 200
    }
})