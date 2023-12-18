import { useNavigation } from "@react-navigation/native";
import { PersoText } from "../../components/PersoText/PersoText.jsx";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { s } from "./Historique.style.js";
import { Container } from "../../components/Container/Container.jsx";
import FirebaseHistoryAdapter from "../../adapters/FirebaseHistoryAdapter.js";
import GetAllSearchHistory from "./../../domain/useCases/GetAllSearchHistory";
import { useEffect, useState } from "react";


export function Historique() {
  //console.log("parametre recu ", params);
  const nav = useNavigation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Création d'une instance de l'adaptateur
    const firebaseHistoryAdapter = new FirebaseHistoryAdapter();
    // Création d'une instance du cas d'usage en passant l'adaptateur
    const getAllSearchHistory = new GetAllSearchHistory(firebaseHistoryAdapter);

    // Fonction pour charger l'historique
    const loadHistory = async () => {
      try {
        const historyList = await getAllSearchHistory.execute();
        setHistory(historyList); // Mise à jour de l'état avec l'historique récupéré
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'historique :",
          error
        );
      }
    };

    loadHistory(); // Appel de la fonction pour charger l'historique
  }, []);

  //Bouton de retour vers la page d'accueil
  const backButton = (
    <TouchableOpacity style={s.back_btn} onPress={() => nav.goBack()}>
      <PersoText>{"<"}</PersoText>
    </TouchableOpacity>
  );

  const header = (
    <>
      <View style={s.header}>
        {backButton}
        <View style={s.header_texts}>
          <PersoText>Historique</PersoText>
        </View>
      </View>
    </>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const historiqueListContent = history.length > 0 ? (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={s.historyItem}>
          <PersoText>Ville: {item.ville}</PersoText>
          <PersoText>Date: {formatDate(item.date)}</PersoText>
        </View>
      )}
    />
  ) : (
    <View style={s.emptyMessageContainer}>
      <PersoText style={s.emptyMessageText}>Aucune recherche dans l'historique.</PersoText>
    </View>
  );

  return (
    <Container>
      {header}
      {historiqueListContent}
    </Container>
  );
}
