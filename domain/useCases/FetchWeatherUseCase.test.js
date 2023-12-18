// tests/domain/useCases/FetchWeatherUseCase.test.js
import MeteoRepositoryInterface from '../ports/MeteoRepositoryInterface';
import FetchWeatherUseCase from './FetchWeatherUseCase';

//? -------------   Lancement du test :  npx jest hexago-meteo/domain/useCases/FetchWeatherUseCase.test.js

jest.mock('../ports/MeteoRepositoryInterface');

describe('FetchWeatherUseCase', () => {
  let fetchWeatherUseCase;
  let mockMeteoRepository;

  beforeEach(() => {
    mockMeteoRepository = new MeteoRepositoryInterface();
    fetchWeatherUseCase = new FetchWeatherUseCase(mockMeteoRepository);
  });

  //! récupère correctement les données météorologiques pour les coordonnées données
  it('récupère correctement les données météorologiques pour les coordonnées', async () => {
    const coords = { lat: 48.85, lng: 2.35 };
    const expectedWeatherData = { /* mock weather data */ };

    // Simuler la méthode fetchWeatherFromCoords
    mockMeteoRepository.fetchWeatherFromCoords = jest.fn().mockResolvedValue(expectedWeatherData);

    const result = await fetchWeatherUseCase.execute(coords);

    // Vérifier que fetchWeatherFromCoords a été appelée avec les bonnes coordonnées
    expect(mockMeteoRepository.fetchWeatherFromCoords).toHaveBeenCalledWith(coords);

    // Vérifier que le résultat est correct
    expect(result).toEqual(expectedWeatherData);
  });
});
