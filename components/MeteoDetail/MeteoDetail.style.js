import { StyleSheet, View } from "react-native";
import { PersoText } from "../PersoText/PersoText";

const s = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#0000005c",
  },
});

export function StyledLabel({ children }) {
  return <PersoText style={{ fontSize: 15 }}>{children}</PersoText>;
}
export function StyledValue({ children }) {
  return <PersoText style={{ fontSize: 20 }}>{children}</PersoText>;
}

export function StyledContainer({ children }) {
  return <View style={{ alignItems: "center" }}>{children}</View>;
}
export { s };