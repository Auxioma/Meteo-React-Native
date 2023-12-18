import { useEffect, useState } from "react";
import { nowToHHMM } from "../../services/date-service.js";
import { PersoText } from "../PersoText/PersoText.jsx";
import { s } from "./Horloge.style.js";

export function Horloge() {
  const [time, setTime] = useState(nowToHHMM());

  //Mise a jour de l'horloge toute les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(nowToHHMM());
    }, 1000);

    //Nettoyage du composant.
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <PersoText style={s.time}>{time}</PersoText>
    </>
  );
}