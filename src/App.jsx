import { Suspense } from "react";
import "./App.css";
import { Router } from "./Router";
import { ColorModeContext } from "./theme";
import { useMode } from "./theme/hooks";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Loader } from "./components/Loader";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
