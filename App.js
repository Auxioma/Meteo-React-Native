import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home/Home";
import MeteoContext from "./context/MeteoContext"; 
import ApiClient from "./infrastructure/api/ApiClient";
import ApiMeteoRepository from "./adapters/ApiMeteoRepository";
import FetchWeatherUseCase from "./domain/useCases/FetchWeatherUseCase";
import FetchCityUseCase from "./domain/useCases/FetchCityUseCase";
import FetchCoordsUseCase from "./domain/useCases/FetchCoordsUseCase";
import { Prevision } from "./screens/Prevision/Prevision";
import { Historique } from "./screens/Historique/Historique";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

// Supprime le thème (blanc) d'origine de react-navigation.
const navTheme = {
  colors: {
    background: "transparent",
  },
};

SplashScreen.preventAutoHideAsync(); // Empêche le splash screen de se cacher automatiquement

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const apiClient = new ApiClient(); // Instance de connexion à la BDD
  const meteoRepository = new ApiMeteoRepository(apiClient); // Interface
  const fetchWeather = new FetchWeatherUseCase(meteoRepository); // Récupération de la météo
  const fetchCity = new FetchCityUseCase(meteoRepository);
  const fetchCoords = new FetchCoordsUseCase(meteoRepository);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Ephesis-Regular': require('./assets/fonts/Ephesis-Regular.ttf'),
        'Regular': require('./assets/fonts/Regular.ttf'),
        // Ajoutez d'autres polices ici si nécessaire
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync(); // Cache le splash screen une fois les polices chargées
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Retourne null tant que les polices ne sont pas chargées
  }

  const meteoServices = {
    fetchWeather,
    fetchCity,
    fetchCoords,
  };

  return (
    <MeteoContext.Provider value={meteoServices}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: "fade" }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Prevision" component={Prevision} />
          <Stack.Screen name="Historique" component={Historique} />
        </Stack.Navigator>
      </NavigationContainer>
    </MeteoContext.Provider>
  );
}
