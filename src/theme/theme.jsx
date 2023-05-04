import { getColors } from ".";

const themeSettings = mode => {
  const colors = getColors(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.cerulean.DEFAULT,
            },
            secondary: {
              main: colors.mercury.DEFAULT,
            },
            neutral: {
              dark: colors.codGray[100],
              light: colors.codGray[100],
            },
          }
        : {
            primary: {
              main: colors.cerulean.DEFAULT,
            },
            secondary: {
              main: colors.codGray.DEFAULT,
            },
            neutral: {
              dark: colors.codGray[100],
              light: colors.codGray[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "san-serif"].join(","),
      fontSize: 14,
      fontWeight: 400,
      h1: {
        fontSize: 28,
        fontWeight: 600,
      },
      h2: {
        fontSize: 20,
        fontWeight: 600,
      },
      h3: {
        fontSize: 18,
        fontWeight: 600,
      },
      p: {
        fontSize: 14,
        fontWeight: 400,
      },
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: "4px 16px",
          },
        },
      },
    },
  };
};

export { themeSettings };
