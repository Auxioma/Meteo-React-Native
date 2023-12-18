// domain/useCases/FetchWeatherUseCase.js

import MeteoRepositoryInterface from '../ports/MeteoRepositoryInterface';

class FetchWeatherUseCase {
  constructor(meteoRepository) {
    if (!(meteoRepository instanceof MeteoRepositoryInterface)) {
      throw new Error('A valid MeteoRepository is required');
    }
    this.meteoRepository = meteoRepository;
  }

  async execute(coords) {
    return await this.meteoRepository.fetchWeatherFromCoords(coords);
  }
}

export default FetchWeatherUseCase;
