import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
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
      style={{ padding: 16}}
    >
      <View style={{ flex: 1 }}>
        <Text>{obs.sciName}</Text>
        <Text>{obs.locName}</Text>
        <Text>{obs.obsDate}</Text>

      </View>
      <TouchableOpacity
        onPress={handleAdd}
        disabled={already}
        style={{
          backgroundColor: "blue",
          padding: 16,
        }}
      >
        <Text>
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
      <View style={{ flex: 1}}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={refresh}>
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
      <SafeAreaView style={{ flex: 1 }}>
        <BirdListContent />
      </SafeAreaView>
    </ApiProvider>
  );
}
