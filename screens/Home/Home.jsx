//Home.jsx
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container } from "../../components/Container/Container";
import { Image, TouchableOpacity, View } from "react-native";
import { PersoText } from "../../components/PersoText/PersoText";
import { s } from "./Home.style";
import { Searchbar } from "./../../components/Searchbar/SearchBar";
import { getWeatherInterpretation } from "../../services/meteo-service";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useMeteo } from "../../context/MeteoContext.js";
import { MeteoHome } from "../../components/MeteoHome/MeteoHome";
import { MeteoDetail } from "./../../components/MeteoDetail/MeteoDetail";
import historyImage from "../../assets/history.png";
import FirebaseHistoryAdapter from "./../../adapters/FirebaseHistoryAdapter";
import AddSearchHistory from "./../../domain/useCases/AddSearchHistory";

//Screen de la page d'accueil de l'application.
export const Home = () => {
  const firebaseHistoryAdapter = new FirebaseHistoryAdapter();
  const addSearchHistory = new AddSearchHistory(firebaseHistoryAdapter);

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const nav = useNavigation();
  const currentWeather = weather?.current_weather; // récupére la clé currentweather de l'api
  //console.log(currentWeather);
  const { fetchWeather, fetchCity, fetchCoords } = useMeteo();

  useEffect(() => {
    getUserCoords();
  }, []); // tableau vide pour effectuer cette action une seule fois au lancement de la page.

  useEffect(() => {
    if (coords) {
      fetchWeatherData(coords);
      fetchCityData(coords);
    }
  }, [coords]); // se lance a chaque fois que coords change.

  //Récupération des coordonnées GPS de l'utilisateur.
  async function getUserCoords() {
    //Demande la permission d'accéder aux coordonnées GPS de l'utilisateur.
    let { status } = await requestForegroundPermissionsAsync();
    //L'utilisateur à donnée son autorisation pour récupérer ses coordonnées GPS.
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      //Si l'utilisateur refuse la permission de reécupérer ses coordonnées gps, on affiche la ville de Paris.
      setCoords({ lat: "48.85", lng: "2.35" });
    }
  }
  //console.log(coords);

  //Récupération des données météo.
  const fetchWeatherData = async (coords) => {
    try {
      const weatherResponse = await fetchWeather.execute(coords);
      setWeather(weatherResponse);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météo :",
        error
      );
    }
  };

  //Récupération des données de la ville.
  const fetchCityData = async (coordinates) => {
    try {
      const cityResponse = await fetchCity.execute(coordinates);
      //console.log("Ville response " + cityResponse);
      setCity(cityResponse);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de la ville :",
        error
      );
    }
  };

  // Fonction pour chercher des coordonnées par nom de ville dans l'input
  const handleSearch = async (cityName) => {
    try {
      const newCoords = await fetchCoords.execute(cityName);
      setCoords(newCoords);
      // Ajoute la ville recherchée à l'historique Firebase après avoir récupéré les coordonnées.
      await addSearchHistory.execute(cityName);
    } catch (error) {
      console.error("Erreur lors de la recherche des coordonnées :", error);
    }
  };

  //Fonction de navigation vers la page des prevision à 7 jours
  function goToPrevisionScreen() {
    //lien de navigation + les données transmises
    nav.navigate("Prevision", { city, ...weather.daily });
  }

  function goToHistoriqueScreen() {
    //lien de navigation + les données transmises
    nav.navigate("Historique");
  }

  return currentWeather ? (
    <Container>
      <View style={{marginTop:50}}>
        <PersoText>Hegaxo-Meteo-App</PersoText>
      </View>
      <View style={s.meteo_basic}>
        <MeteoHome
          temperature={Math.round(currentWeather?.temperature)}
          city={city}
          interpretation={getWeatherInterpretation(currentWeather?.weathercode)}
          onPress={goToPrevisionScreen}
        />
      </View>

      <View style={s.searchbar_container}>
        <Searchbar onSubmit={handleSearch} />
      </View>
      {/* <View style={s.meteo_advanced}>
        <MeteoDetail
          wind={currentWeather.windspeed}
          //decoupe la donnée récupéré en 2 tableaux. 1 avant la lettre T et l'autre après.[1] on afiche la 2eme partie récupérée.
          dawn={weather.daily.sunset[0].split("T")[1]}
          dusk={weather.daily.sunrise[0].split("T")[1]}
        />
      </View> */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={goToHistoriqueScreen}>
          <Image source={historyImage} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
    </Container>
  ) : null;
};
