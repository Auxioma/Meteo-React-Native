// adapter/FirebaseHistoryAdapter.test.js
import FirebaseHistoryAdapter from './FirebaseHistoryAdapter';
import firebase from '../firebase'; 

//? -------------   Lancement du test :  npx jest hexago-meteo/adapters/FirebaseHistoryAdapter.test.js  ---------------

jest.mock('../firebase'); // Mock the firebase module

describe('FirebaseHistoryAdapter', () => {
  let adapter;
  let mockAdd;
  let mockGet;

  beforeEach(() => {
    // Recréer le mock pour chaque test pour s'assurer qu'il est réinitialisé
    mockAdd = jest.fn();
    mockGet = jest.fn(() => Promise.resolve({ docs: [{ id: '1', data: () => ({ ville: 'Paris', date: '2024-01-01' }) }] }));
    firebase.firestore = jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        add: mockAdd,
        get: mockGet,
      }),
    });

    adapter = new FirebaseHistoryAdapter();
  });

  test('addSearchHistory rajoute un document à Firebase', async () => {
    const historique = { ville: 'Paris', date: new Date() };
    await adapter.addSearchHistory(historique);
    expect(mockAdd).toHaveBeenCalledWith(expect.any(Object));
  });

  test('getAllSearchHistory récupére les documents de Firebase', async () => {
    const history = await adapter.getAllSearchHistory();
    expect(mockGet).toHaveBeenCalled();
    expect(history).toEqual([{ id: '1', ville: 'Paris', date: '2024-01-01' }]);
  });
});