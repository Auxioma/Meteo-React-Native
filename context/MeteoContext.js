// MeteoContext.js

import { createContext, useContext } from "react";

const MeteoContext = createContext(null);

export const useMeteo = () => useContext(MeteoContext);

export default MeteoContext;
