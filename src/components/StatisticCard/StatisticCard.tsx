import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface StatisticCardProps {
  title: string;
  width: number;
  children: JSX.Element;
  styles?: CSSProperties;
}

const StatisticCard: FC<StatisticCardProps> = ({
  title,
  width,
  children,
  styles,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        ...styles,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        p: "15px 20px",
        minWidth: `${width}px`,
        height: `fit-content`,
        borderRadius: 1,
        bgcolor: palette.grey.card,
        border: `1px solid ${palette.grey.active}`,
      }}
    >
      <Typography sx={{ fontSize: 20 }}>
        {t(`statistic.${title}.heading`)}
      </Typography>
      {children}
    </Box>
  );
};

export { StatisticCard };
