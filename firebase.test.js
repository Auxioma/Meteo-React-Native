// firebase.test.js
import firebase from './firebase'; // Assurez-vous que le chemin est correct

describe('Tests Firebase', () => {

  it('La configuration Firebase doit être définie', () => {
    expect(firebase.apps.length).toBeGreaterThan(0);
  });

  it('Écriture et lecture dans Firestore', async () => {
    // Ajoutez un document de test
    const testDoc = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      testField: 'Test de Firebase'
    };
    const docRef = await firebase.firestore().collection('test').add(testDoc);
    expect(docRef.id).toBeTruthy();

    // Lisez le document ajouté
    const doc = await firebase.firestore().collection('test').doc(docRef.id).get();
    expect(doc.exists).toBe(true);
    expect(doc.data().testField).toEqual('Test de Firebase');
  }, 10000); // Augmentation du délai d'attente à 10 secondes pour ce test

});

