import { FC } from "react";
import { DefaultTFuncReturn } from "i18next";

import Box from "@mui/material/Grid";

interface BadgeProps {
  customStyle?: object;
  text?: string | DefaultTFuncReturn;
}

const Badge: FC<BadgeProps> = ({ customStyle, text }) => {
  return (
    <Box
      sx={{
        ...customStyle,
        textAlign: "center",
        lineHeight: "24px",
        p: "0px 12px",
        borderRadius: 1,
        textTransform: "capitalize",
        fontSize: "14px",
      }}
    >
      {text}
    </Box>
  );
};

export { Badge };
