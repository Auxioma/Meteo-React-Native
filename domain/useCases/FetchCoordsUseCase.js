// domain/useCases/FetchCoordsUseCase.js

import MeteoRepositoryInterface from '../ports/MeteoRepositoryInterface';

class FetchCoordsUseCase {
  constructor(meteoRepository) {
    if (!(meteoRepository instanceof MeteoRepositoryInterface)) {
      throw new Error('A valid MeteoRepository is required');
    }
    this.meteoRepository = meteoRepository;
  }

  async execute(city) {
    return await this.meteoRepository.fetchCoordsFromCity(city);
  }
}

export default FetchCoordsUseCase;
