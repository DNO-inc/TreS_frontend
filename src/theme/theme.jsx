import { getColors } from ".";

const themeSettings = mode => {
  const colors = getColors(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blue.primary,
            },
            secondary: {
              main: colors.grey[100],
            },
            neutral: {
              dark: colors.grey[100],
              light: colors.grey[100],
            },
            grey: {
              active: colors.grey[50],
              checkbox: colors.grey[200],
              button: colors.grey[300],
              border: colors.grey[400],
              divider: colors.grey[500],
              card: colors.grey[600],
              background: colors.grey[700],
              sidebar: colors.grey[800],
            },
            whiteAlpha: {
              600: colors.whiteAlpha[600],
            },
            semantic: {
              info: colors.semantic.info,
              success: colors.semantic.success,
              warning: colors.semantic.warning,
              error: colors.semantic.error,
            },
          }
        : {
            primary: {
              main: colors.blue.primary,
            },
            secondary: {
              main: colors.grey[100],
            },
            neutral: {
              dark: colors.grey[100],
              light: colors.grey[100],
            },
            grey: {
              active: colors.grey[50],
              border: colors.grey[400],
              button: colors.grey[300],
              card: colors.grey[100],
              background: colors.grey[50],
            },
            whiteAlpha: {
              600: colors.whiteAlpha[600],
            },
            semantic: {
              info: colors.semantic.info,
              success: colors.semantic.success,
              warning: colors.semantic.warning,
              error: colors.semantic.error,
            },
          }),
    },
    typography: {
      fontFamily: ["Inter"].join(","),
      fontSize: 14,
      fontWeight: 400,
      h1: {
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontSize: 20,
        fontWeight: 600,
      },
      h3: {
        fontSize: 16,
        fontWeight: 400,
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
            padding: "4px 12px",
            "& > a > div > div:first-of-type": {
              minWidth: "40px",
            },
            "& >  div > div:first-of-type": {
              minWidth: "40px",
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 14,
            padding: "8px 12px",
            // backgroundColor: colors.grey[300],
          },
          arrow: {
            // color: colors.grey[300],
          },
        },
      },
    },
  };
};

export { themeSettings };
