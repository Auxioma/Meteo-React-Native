import { Text, useWindowDimensions } from "react-native";
import { s } from "./PersoText.style";

export function PersoText({ children, style }) {
  //Récupération des informations sur les dimensions de l'ecran pour adapter la taille des polices d'écriture responsive.
  const { height } = useWindowDimensions();
  const fontSize = style?.fontSize || s.text.fontSize;

  return (
    <Text style={[s.text, style, { fontSize: fontSize * 0.00128 * height }]}>
      {children}
    </Text>
  );
}
