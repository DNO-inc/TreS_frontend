import { FC, CSSProperties } from "react";
import { DefaultTFuncReturn } from "i18next";

import Box from "@mui/material/Box";

interface BadgeProps {
  customStyle?: CSSProperties;
  text?: string | DefaultTFuncReturn;
}

const Badge: FC<BadgeProps> = ({ customStyle, text }) => {
  const badgeStyle = {
    p: "0px 12px",
    borderRadius: 1,
    textAlign: "center",
    lineHeight: "24px",
    textTransform: "capitalize",
    fontSize: "14px",
    ...customStyle,
  };

  return <Box sx={{ ...badgeStyle }}>{text}</Box>;
};

export { Badge };
