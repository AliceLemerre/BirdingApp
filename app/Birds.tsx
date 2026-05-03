import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiProvider, useApi, TObservation } from "../providers/apiProvider";
import { useBirdsContext } from "@/providers/BirdProvider";


function ObservationCard({ obs }: { obs: TObservation }) {
  const { addBird, hasBird } = useBirdsContext();
  const already = hasBird(obs.speciesCode);


  const handleAdd = () => {
    addBird({
      id: obs.speciesCode,
      name: obs.comName,
      description: obs.sciName,
    });
  };


  return (
    <View
      style={styles.container}
    >
      <View style={styles.flex}>
        <Text style={ styles.text }>{obs.sciName}</Text>
        <Text style={ styles.secondaryText }>{obs.locName}</Text>
        <Text style={ styles.secondaryText }>{obs.obsDate}</Text>

      </View>
      <TouchableOpacity
        onPress={handleAdd}
        disabled={already}
        style={{
          backgroundColor: already ? "#ccc" : "#2e7d32",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 8,
        }}
      >
        <Text style={styles.deleteText}>
          {already ? "Ajouté" : "Ajouter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function BirdListContent() {
  const { observations, loading, error, refresh } = useApi();

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={refresh} style={styles.validateText}>
          <Text >Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={observations}
      keyExtractor={(item) => item.speciesCode}
      renderItem={({ item }) => <ObservationCard obs={item} />}
    />
  );
}

export default function Birds() {
  return (
    //trouver le code idf ?
    <ApiProvider regionCode="FR"> 
      <SafeAreaView style={styles.container}>
        <BirdListContent />
      </SafeAreaView>
    </ApiProvider>
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
          backgroundColor: "#c62828",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 8,
      },
      deleteText: {
          color: "white", 
          fontWeight: "bold"
      },
      validateText: 
      { color: "blue", 
        marginTop: 8 
      },
      errorText: {
        color: "red"
      },
      flex: {
        flex: 1,
      }
 })