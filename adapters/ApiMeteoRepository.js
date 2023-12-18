// adapters/ApiMeteoRepository.js
//Les adaptateurs vont implémenter les interfaces définies par les ports et interagir avec l'infrastructure.
//Pour les appels API

import ApiClient from "./../infrastructure/api/ApiClient";
import MeteoRepositoryInterface from "./../domain/ports/MeteoRepositoryInterface";

class ApiMeteoRepository extends MeteoRepositoryInterface {
  constructor(apiClient) {
    super();
    if (!(apiClient instanceof ApiClient)) {
      throw new Error("An instance of ApiClient is required");
    }
    this.apiClient = apiClient;
  }

  //Récupération de la météo de la ville.
  async fetchWeatherFromCoords(coords) {
    return (
      await this.apiClient.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      )
    ).data;
  }

  //Récupération des informations de la ville selon les récupéré par le GPS.
  async fetchCityFromCoords(coords) {
    try {
      const response = await this.apiClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
  
      // Verifier que la réponse contient les données nécessaires
      if (response.data && response.data.address) {
        const { address: { city, village, town } } = response.data;
        const cityName = city || village || town;
        if (cityName) {
          //console.log("fetchCityFromCoords - Ville trouvée:", cityName);
          return cityName;
        }
      }
      throw new Error("Aucune ville trouvée");
    } catch (error) {
      console.error("fetchCityFromCoords - Erreur lors de la récupération des informations de la ville:", error);
      throw error;
    }
  }
  
  async fetchCoordsFromCity(city) {
    try {
      const response = await this.apiClient.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=fr&count=1`
      );
      const { latitude: lat, longitude: lng } = response.data.results[0];
      return { lat, lng };
    } catch (e) {
      throw new Error(
        "Pas de coordonnées trouvées pour la recherche : " + city
      );
    }
  }
}

export default ApiMeteoRepository;
