// tests/domain/useCases/FetchCityUseCase.test.js

//? -------------   Lancement du test :  npx jest hexago-meteo/domain/useCases/FetchCityUseCase.test.js

import MeteoRepositoryInterface from "../ports/MeteoRepositoryInterface";
import FetchCityUseCase from "./FetchCityUseCase";

jest.mock("../ports/MeteoRepositoryInterface");

describe("FetchCityUseCase", () => {
  let fetchCityUseCase;
  let mockMeteoRepository;

  beforeEach(() => {
    mockMeteoRepository = new MeteoRepositoryInterface();
    fetchCityUseCase = new FetchCityUseCase(mockMeteoRepository);
  });

  it("Récupération des données de la ville (useCase)", async () => {
    const coords = { lat: "48.85", lng: "2.35" };
    const expectedCity = "Paris";

    // Simuler la méthode fetchCityFromCoords
    mockMeteoRepository.fetchCityFromCoords = jest
      .fn()
      .mockResolvedValue(expectedCity);

    const result = await fetchCityUseCase.execute(coords);

    // Vérifier que fetchCityFromCoords a été appelée avec les bonnes coordonnées
    expect(mockMeteoRepository.fetchCityFromCoords).toHaveBeenCalledWith(
      coords
    );

    // Vérifier que le résultat est correct
    expect(result).toEqual(expectedCity);
  });
});
