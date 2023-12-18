//Récupération du weathercode pour afficher une icone selon le temps qu'il fait( voir plus)
export const WEATHER_INTERPRATIONS = [
    {
      codes: [0],
      label: "Ensoleillé",
      image: require("../assets/sun.png"),
    },
    {
      codes: [1, 2, 3, 45, 48],
      label: "Nuageux",
      image: require("../assets/clouds.png"),
    },
    {
      codes: [
        51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86,
      ],
      label: "Pluvieux",
      image: require("../assets/rain.png"),
    },
    {
      codes: [71, 73, 75, 77],
      label: "Neigeux",
      image: require("../assets/snow.png"),
    },
    {
      codes: [96, 99],
      label: "Orageux",
      image: require("../assets/thunder.png"),
    },
  ];
  
  //Fonction afin de récupérer le code de l'interprétation.
  export function getWeatherInterpretation(code) {
    return WEATHER_INTERPRATIONS.find((interpretation) =>
      interpretation.codes.includes(code)
    );
  }

  /*
  https://open-meteo.com/en/docs
  
  
Weather variable documentation
WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
(*) Thunderstorm forecast with hail is only available in Central Europe
  
  
  */ 