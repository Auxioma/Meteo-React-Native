//domain/useCase/GetAllSearchHistory

export default class GetAllSearchHistory {
    constructor(historiqueRepo) {
      this.historiqueRepo = historiqueRepo;
    }
  
    async execute() {
      return await this.historiqueRepo.getAllSearchHistory();
    }
  }
  