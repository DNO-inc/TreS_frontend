import { CssBaseline, ThemeProvider } from "@mui/material";

import { Router } from "./Router";

import { ColorModeContext } from "./theme";
import { useMode } from "./theme/hooks";
import "./App.css";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
