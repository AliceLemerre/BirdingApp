import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiProvider, useApi, TObservation } from "../../providers/apiProvider";
import { useBirdsContext } from "@/providers/BirdProvider";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeIn, FadeInDown} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { useState, useMemo } from "react";


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

  const scale = useSharedValue(1);
   const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));


  //désolée c'est moins bien mais il n'y pas de bonne api pour oiseaux avec des photos
  return (
      <Animated.View entering={FadeInDown.delay(60).duration(300)} style={styles.container}>
        <View style={styles.flex}>
          <Text style={ styles.text }>{obs.sciName}</Text>
          <Text style={ styles.secondaryText }>{obs.locName}</Text>
          <Text style={ styles.secondaryText }>{obs.obsDate}</Text>

        </View>

        <Pressable
          disabled={already}
          style={{
            backgroundColor: already ? "#ccc" : "green",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
          }}
          onPressIn={() => { scale.value = withSpring(0.9); }}
          onPressOut={() => { scale.value = withSpring(1); }}
          onPress={handleAdd}
        >

        <Animated.View style={animStyle}>
          <Text style={styles.deleteText}>
            {already ? "Ajouté" : "Ajouter"}
          </Text>
        </Animated.View>
        </Pressable>
      </Animated.View>
  );
}

function BirdListContent() {
  const { observations, error, refresh } = useApi();

    const [query, setQuery] = useState("");
 
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return observations;
    return observations.filter(
      (obs) =>
        obs.comName.toLowerCase().includes(q) ||
        obs.sciName.toLowerCase().includes(q) ||
        obs.locName.toLowerCase().includes(q)
    );
  }, [query, observations]);
 


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


  const header = (
    <View style={[styles.flex, styles.padding]}>

      <Text style={styles.text}>Voici la liste des oiseaux récemment observés dans votre région. </Text>
      <Text style={styles.secondaryText}> Vous pouvez ici rechercher par nom ou par lieu pour ajouter vos observations. </Text>

    <View>

      <TextInput
          style={styles.searchBar}
          placeholder="Rechercher"
          placeholderTextColor='#878787'
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          multiline={false}
      />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Text style={styles.dangerText}>✕</Text>
          </TouchableOpacity>
        )}
    </View>
 
      <Text>
        {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        {query.length > 0 ? ` pour "${query}"` : ""}
      </Text>
    </View>
  );
  
  return (



    <FlatList
        data={filtered}
      keyExtractor={(item) => item.speciesCode}
      ListHeaderComponent={header}
      renderItem={({ item }) => 
      <Animated.View entering={FadeInDown.delay(60).duration(300)}>
        <ObservationCard obs={item} />
        </Animated.View>}
    />
  );
}

export default function Birds() {
  return (
    //trouver le code idf ?
    <ApiProvider regionCode="FR"> 
      <SafeAreaView style={styles.flex}>
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
          backgroundColor: "red",
          paddingVertical: 8,
          borderRadius: 8,
          width: 30,
          textAlign: 'center',
          color: 'white'
      },
      deleteText: {
          color: "white", 
          fontWeight: "bold"
      },
      validateText: 
      { color: 'blue', 
        marginTop: 8 
      },
      errorText: {
        color: "red"
      },
      flex: {
        flex: 1,
      },
      searchBar: {
        flex: 1,
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 4,
        marginTop: 8,
        marginBottom: 8,
      },
      padding: {
        padding: 12,
      }
 })