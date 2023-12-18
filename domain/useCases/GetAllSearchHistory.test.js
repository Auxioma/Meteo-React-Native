// domain/useCase/GetAllSearchHistory.test.js
import GetAllSearchHistory from './GetAllSearchHistory';

//? -------------   Lancement du test :  npx jest hexago-meteo/domain/useCases/GetAllSearchHistory.test.js

// Création d'un mock pour HistoryRepositoryInterface
const mockHistoryRepo = {
  getAllSearchHistory: jest.fn()
};

describe('GetAllSearchHistory', () => {
  let useCase;

  beforeEach(() => {
    useCase = new GetAllSearchHistory(mockHistoryRepo);
    mockHistoryRepo.getAllSearchHistory.mockClear();
  });

  test("Récupération de l'historique OK", async () => {
    const expectedHistory = [
      { ville: 'Paris', date: '2024-01-01' },
      { ville: 'Lyon', date: '2024-01-02' }
    ];

    mockHistoryRepo.getAllSearchHistory.mockResolvedValue(expectedHistory);

    const history = await useCase.execute();

    // Vérifiez que le repository a été appelé
    expect(mockHistoryRepo.getAllSearchHistory).toHaveBeenCalledTimes(1);

    // Vérifiez que l'historique récupéré est correct
    expect(history).toEqual(expectedHistory);
  });

  test('Gestion des erreurs OK', async () => {
    // Simuler une erreur lors de la récupération de l'historique
    mockHistoryRepo.getAllSearchHistory.mockRejectedValue(new Error('Test error'));

    await expect(useCase.execute()).rejects.toThrow('Test error');

    // Vérifiez que le repository a été appelé
    expect(mockHistoryRepo.getAllSearchHistory).toHaveBeenCalledTimes(1);
  });
});
