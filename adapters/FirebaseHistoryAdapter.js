//adapter/FirebaseHistoryAdapter.js
import firebase from "../firebase"; 

export default class FirebaseHistoryAdapter {
  constructor() {
    this.ref = firebase.firestore().collection("historiques");
  }

  async addSearchHistory(historique) {
    await this.ref.add({
      ville: historique.ville,
      date: historique.date.toISOString(),
    });
  }

  async getAllSearchHistory() {
    const snapshot = await this.ref.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
