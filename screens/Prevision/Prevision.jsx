
import { s } from "./Prevision.style.js";
import { Container } from '../../components/Container/Container';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { getWeatherInterpretation } from "../../services/meteo-service.js";
import { DAYS, dateToDDMM } from "../../services/date-service.js";
import { PrevisionListItem } from "../../components/Prevision/PrevisionListItem.jsx";
import { PersoText } from "../../components/PersoText/PersoText.jsx";


export function Prevision() {

  const { params } = useRoute();
  //console.log("parametre recu ", params);
  const nav = useNavigation();

  //Bouton de retour vers la page d'accueil
  const backButton = (
    <TouchableOpacity style={s.back_btn} onPress={() => nav.goBack()}>
      <PersoText>{"<"}</PersoText>
    </TouchableOpacity>
  );
  const header = (
    <>
      <View style={s.header}>
        {backButton}
        <View style={s.header_texts}>
          <PersoText>{params.city}</PersoText>
          <PersoText style={s.subtitle}>Prévision sur 7 jours</PersoText>
        </View>
      </View>
    </>
  );

  const forecastList = (
    <View style={s.forecastList}>
      {params.time.map((time, index) => {
        const code = params.weathercode[index]; // récupération du code pour afficher l'image du temps qu'il prévu.
        const image = getWeatherInterpretation(code).image;
        const date = new Date(time);
        const day = DAYS[date.getDay()]; // récupére le jour de la semaine.
        const temperature = params.temperature_2m_max[index]; //
        //const d = `${date.getDate()}/${date.getMonth() + 1}`;
        return (
          <PrevisionListItem
            image={image}
            day={day}
            key={time}
            date={dateToDDMM(date)}
            temperature={temperature.toFixed(0) // aucun chiffre après la virgule.
            }
          />
        );
      })}
    </View>
  );
  return (
    <Container>
      {header}
      {forecastList}
    </Container>
  );
}
