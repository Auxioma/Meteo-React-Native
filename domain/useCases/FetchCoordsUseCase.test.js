// tests/domain/useCases/FetchCoordsUseCase.test.js

import MeteoRepositoryInterface from '../ports/MeteoRepositoryInterface';
import FetchCoordsUseCase from './FetchCoordsUseCase';


//? -------------   Lancement du test :  npx jest hexago-meteo/domain/useCases/FetchCoordsUseCase.test.js

jest.mock('../ports/MeteoRepositoryInterface');

describe('FetchCoordsUseCase', () => {
  let fetchCoordsUseCase;
  let mockMeteoRepository;

  beforeEach(() => {
    mockMeteoRepository = new MeteoRepositoryInterface();
    fetchCoordsUseCase = new FetchCoordsUseCase(mockMeteoRepository);
  });

  it('fetches coordinates correctly for a given city', async () => {
    const city = 'Paris';
    const expectedCoords = { lat: 48.85, lng: 2.35 };

    // Simuler la méthode fetchCoordsFromCity
    mockMeteoRepository.fetchCoordsFromCity = jest.fn().mockResolvedValue(expectedCoords);

    const result = await fetchCoordsUseCase.execute(city);

    // Vérifier que fetchCoordsFromCity a été appelée avec le bon nom de ville
    expect(mockMeteoRepository.fetchCoordsFromCity).toHaveBeenCalledWith(city);

    // Vérifier que le résultat est correct
    expect(result).toEqual(expectedCoords);
  });
});
