import { Theme } from "@mui/material";

interface Palette {
  palette: {
    mode: "dark" | "light";
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    neutral: {
      dark: string;
      light: string;
    };
    grey: {
      active: string;
      checkbox: string;
      button: string;
      border: string;
      divider: string;
      card: string;
      background: string;
      sidebar: string;
    };
    whiteAlpha: {
      default: string;
      border: string;
      text: string;
    };
    semantic: {
      info: string;
      success: string;
      warning: string;
      error: string;
      waiting: string;
      new: string;
    };

    typography: {
      fontFamily: string;
      fontSize: number;
      fontWeight: number;
      h1: {
        fontSize: number;
        fontWeight: number;
      };
      h2: {
        fontSize: number;
        fontWeight: number;
      };
      h3: {
        fontSize: number;
        fontWeight: number;
      };
      p: {
        fontSize: number;
        fontWeight: number;
      };
    };
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px";
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.1)";
            };
            "&.Mui-selected:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)";
            };
          };
        };
      };
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: "4px 12px";
            "& > a > div > div:first-of-type": {
              minWidth: "40px";
            };
            "& >  div > div:first-of-type": {
              minWidth: "40px";
            };
          };
        };
      };
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 14;
            padding: "8px 12px";
            // backgroundColor: colors.grey[300],
          };
          arrow: {
            // color: colors.grey[300],
          };
        };
      };
    };
  };
}

type IPalette = Palette & Theme;

export default IPalette;
