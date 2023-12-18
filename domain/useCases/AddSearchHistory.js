// Domain/useCase/AddSearchHistory.js
import History from './../Entities/History';

class AddSearchHistory {
    constructor(historyRepo) {
      this.historyRepo = historyRepo;
    }
  
    async execute(ville) {
      try {
        //console.log('AddSearchHistory.execute called with ville:', ville);
        const date = new Date();
        const historique = new History(ville, date);
        //console.log('Adding to history:', historique);
        await this.historyRepo.addSearchHistory(historique);
        //console.log('Historique added successfully');
      } catch (error) {
        console.error('Error adding historique:', error);
      }
    }
  }

  export default AddSearchHistory;