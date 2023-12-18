// tests/adapters/ApiMeteoRepository.test.js

//? -------------   Lancement du test :  npx jest hexago-meteo/adapters/ApiMeteoRepository.test.js  ---------------
import ApiClient from "../infrastructure/api/ApiClient";
import ApiMeteoRepository from "./ApiMeteoRepository";

// Simuler ApiClient
jest.mock("../infrastructure/api/ApiClient.js");

describe("ApiMeteoRepository", () => {
  let apiMeteoRepository;
  let mockApiClient;

  beforeEach(() => {
    mockApiClient = new ApiClient();
    apiMeteoRepository = new ApiMeteoRepository(mockApiClient);
  });


  //! ----------- Récupération des données météo de l'API ----------------
  it("Récupération des données météo de l'API", async () => {
    const coords = { lat: "48.85", lng: "2.35" };
    const mockData = {
      /* données simulées pour le test */
    };

    // Simuler la réponse de ApiClient
    mockApiClient.get.mockResolvedValue({ data: mockData });

    const result = await apiMeteoRepository.fetchWeatherFromCoords(coords);

    // Vérifier que la méthode get de ApiClient a été appelée correctement
    expect(mockApiClient.get).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
    );

    // Vérifier que le résultat est correct
    expect(result).toEqual(mockData);
  });

  //! -------------- Récupération des données de la ville avec ses coordonnées -------------------
  it("Récupération des données de la ville avec ses coordonnées", async () => {
    const coords = { lat: "48.85", lng: "2.35" };
    const mockCityData = {
      address: {
        city: "Paris",
        village: "",
        town: "",
      },
    };

    mockApiClient.get.mockResolvedValue({ data: mockCityData });

    const result = await apiMeteoRepository.fetchCityFromCoords(coords);

    expect(mockApiClient.get).toHaveBeenCalledWith(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
    );

    expect(result).toEqual(mockCityData.address.city);
  });

  //! --------- Récupération des coordonnées de la ville recherché ----------------
  it("Récupération des coordonnées de la ville recherché", async () => {
    const city = "Paris";
    const mockCoordsData = {
      results: [
        {
          latitude: 48.85,
          longitude: 2.35,
        },
      ],
    };

    mockApiClient.get.mockResolvedValue({ data: mockCoordsData });

    const result = await apiMeteoRepository.fetchCoordsFromCity(city);

    expect(mockApiClient.get).toHaveBeenCalledWith(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=fr&count=1`
    );

    expect(result).toEqual({
      lat: mockCoordsData.results[0].latitude,
      lng: mockCoordsData.results[0].longitude,
    });
  });
});
