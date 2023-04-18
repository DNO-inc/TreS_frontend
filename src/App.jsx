import { useMemo, useState, createContext } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Router } from "./Router";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function App() {
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router mode={mode} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
