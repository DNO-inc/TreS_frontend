import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { Router } from "./router";

import { ColorModeContext } from "theme";
import { useMode } from "theme/hooks";
import "./App.css";

import { AuthProvider } from "context/AuthContext/AuthContext";
import { NotificationProvider } from "context/NotificationContext/NotificationContext";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <AuthProvider>
      <NotificationProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
