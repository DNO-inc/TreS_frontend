import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface ScopeTileProps {
  icon: JSX.Element;
  title: string;
  ticketsCount: number;
  color: string;
}

const ScopeTile: FC<ScopeTileProps> = ({
  icon,
  title,
  ticketsCount,
  color,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            color: palette.grey.checkbox,
            borderRadius: 4,
            padding: "10px 10px 4px",
          }}
        >
          {icon}
        </div>
        <div>{t(`common.${title.toLowerCase()}`)}</div>
      </div>
      <div>
        <span style={{ color: palette.semantic.info }}>{ticketsCount}</span>{" "}
        <span style={{ fontSize: 12, color: palette.whiteAlpha.default }}>
          {t("common.tickets").toLowerCase()}
        </span>
      </div>
    </Box>
  );
};

export { ScopeTile };
