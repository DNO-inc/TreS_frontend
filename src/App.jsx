import "./App.css";
import { Router } from "./Router";
import { ColorModeContext } from "./theme";
import { useMode } from "./theme/hooks";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
