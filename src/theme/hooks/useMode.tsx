import { useMemo, useState } from "react";

import createTheme from "@mui/material/styles/createTheme";
import { Theme } from "@mui/material/styles";

import { themeSettings } from "../index";

const useMode = (): [Theme, { toggleColorMode: () => void }] => {
  const [mode, setMode] = useState<string>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode(prev => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

export { useMode };
