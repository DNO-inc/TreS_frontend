import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { Router } from "./Router";

import { ColorModeContext } from "./theme";
import { useMode } from "./theme/hooks";
import "./App.css";

import { useLocation } from "react-router-dom";

const App = () => {
  const [theme, colorMode] = useMode();

  // =========================================

  let adminWord = "";
  const { pathname } = useLocation();

  if (pathname !== "/tickets/create") {
    document.addEventListener("keydown", e => {
      if (adminWord.length > 5) {
        adminWord = "";
      }

      const keyPressed = e.key.toLowerCase();
      adminWord += keyPressed;

      if (adminWord === "admin") {
        localStorage.setItem("is-admin", "admin");
        adminWord = "";
      } else if (adminWord === "exit") {
        localStorage.removeItem("is-admin");
        adminWord = "";
      }
    });
  }

  // =========================================

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
