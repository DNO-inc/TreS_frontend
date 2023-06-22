import { createContext } from "react";

interface IColorModeContext {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export { ColorModeContext };
