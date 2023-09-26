import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { Router } from "./Router";

import { ColorModeContext } from "./theme";
import { useMode } from "./theme/hooks";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <AuthProvider>
      <WebSocketProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </WebSocketProvider>
    </AuthProvider>
  );
};

export default App;
