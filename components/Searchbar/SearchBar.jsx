import { TextInput } from "react-native";
import { s } from "./SearchBar.style.js";

//Composant de barre de recherche d'une ville pour la page Home
export function Searchbar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={s.input}
      placeholder="Chercher une ville..."
    />
  );
}