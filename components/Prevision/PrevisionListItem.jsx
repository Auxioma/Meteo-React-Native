import { Image, View } from "react-native";
import { s } from "./PrevisionListItem.style";
import { PersoText } from "../PersoText/PersoText";


//Composant prévision pour la page de prévision à 7 jours.
export function PrevisionListItem({ image, day, date, temperature }) {
  return (
    <View style={s.container}>
      <Image style={s.image} source={image} />
      <PersoText style={s.day}>{day}</PersoText>
      <PersoText style={s.date}>{date}</PersoText>
      <PersoText style={s.temperature}>{temperature}°</PersoText>
    </View>
  );
}