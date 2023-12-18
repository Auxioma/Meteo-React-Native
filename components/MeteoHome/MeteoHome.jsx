import { Image, TouchableOpacity, View } from "react-native";
import { Horloge } from "../Horloge/Horloge.jsx";
import { PersoText } from "../PersoText/PersoText.jsx";
import { s } from "./MeteoHome.style.js";

//Composant d'affichage de la météo sur le screen d'accueil de l'app.
export function MeteoHome({ onPress, temperature, city, interpretation }) {
  return (
    <>
      <View style={s.clock}>
        <Horloge />
      </View>
      <PersoText>{city}</PersoText>
      {/* <PersoText style={s.weather_label}>{interpretation?.label}</PersoText> */}
      <View style={s.temperature_box}>
        <TouchableOpacity onPress={onPress}>
          <PersoText style={s.temperature}>{temperature}°</PersoText>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation?.image} />
      </View>
    </>
  );
}
