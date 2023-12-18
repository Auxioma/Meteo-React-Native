// domain/useCases/FetchCityUseCase.js

import MeteoRepositoryInterface from '../ports/MeteoRepositoryInterface';

class FetchCityUseCase {
  constructor(meteoRepository) {
    if (!(meteoRepository instanceof MeteoRepositoryInterface)) {
      throw new Error('A valid MeteoRepository is required');
    }
    this.meteoRepository = meteoRepository;
  }

  async execute(coords) {
    return await this.meteoRepository.fetchCityFromCoords(coords);
  }
}

export default FetchCityUseCase;
