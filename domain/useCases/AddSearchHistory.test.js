// domain/useCase/AddSearchHistory.test.js
import AddSearchHistory from './AddSearchHistory';
import History from './../Entities/History';

//? -------------   Lancement du test :  npx jest hexago-meteo/domain/useCases/AddSearchHistory.test.js

// Création d'un mock pour HistoryRepositoryInterface
const mockHistoryRepo = {
  addSearchHistory: jest.fn()
};

describe('AddSearchHistory', () => {
  let useCase;

  beforeEach(() => {
    useCase = new AddSearchHistory(mockHistoryRepo);
    mockHistoryRepo.addSearchHistory.mockClear();
  });

  test("Rajoute la recherche dans l'historique", async () => {
    const ville = 'Paris';
    await useCase.execute(ville);

    // Vérifiez que le repository a été appelé avec un objet History correct
    expect(mockHistoryRepo.addSearchHistory).toHaveBeenCalledWith(expect.any(History));
    expect(mockHistoryRepo.addSearchHistory).toHaveBeenCalledTimes(1);

    // Vous pouvez également vérifier les propriétés de l'objet History passé si nécessaire
    const historiqueArg = mockHistoryRepo.addSearchHistory.mock.calls[0][0];
    expect(historiqueArg.ville).toBe(ville);
    expect(historiqueArg.date).toBeInstanceOf(Date);
  });

  test('Gére les erreurs correctement', async () => {
    // Simuler une erreur lors de l'ajout de l'historique
    mockHistoryRepo.addSearchHistory.mockRejectedValue(new Error('Test error'));

    await expect(useCase.execute('Paris')).resolves.toBeUndefined();

    // Vérifiez que le repository a été appelé
    expect(mockHistoryRepo.addSearchHistory).toHaveBeenCalledWith(expect.any(History));
  });
});
