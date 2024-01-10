import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../../theme/IPalette.interface";

const useStyles = () => {
  const { palette }: IPalette = useTheme();

  const formControlStyles = {
    flexDirection: "row",
    gap: 3,
    "& > label": {
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      borderRadius: 1,
      border: `3px solid ${palette.grey.divider}`,
      m: 0,
      p: "16px 16px 16px 8px",
      width: { xs: "100%", md: "calc(100% / 2 - 12px)" },
      ".MuiCheckbox-root": {
        position: "absolute",
        top: 40,
        left: 0,
        color: palette.common.white,
      },
      ".MuiButtonBase-root": {
        mt: -4,
      },
    },
  };

  return [formControlStyles];
};

export { useStyles };
