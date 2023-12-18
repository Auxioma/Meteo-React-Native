// domain/ports/MeteoRepositoryInterface.js
// Les ports sont les points d'entrée et de sortie de la couche de domaine.

class MeteoRepositoryInterface {
  // Récupérer les données météo à partir de coordonnées géographiques.
  async fetchWeatherFromCoords(coords) {
    throw new Error("fetchWeatherFromCoords method not implemented");
  }

  // Récupérer le nom de la ville à partir de coordonnées géographiques.
  async fetchCityFromCoords(coords) {
    throw new Error("fetchCityFromCoords method not implemented");
  }

  // Récupérer les coordonnées géographiques à partir du nom d'une ville.
  async fetchCoordsFromCity(city) {
    throw new Error("fetchCoordsFromCity method not implemented");
  }
}

export default MeteoRepositoryInterface;
