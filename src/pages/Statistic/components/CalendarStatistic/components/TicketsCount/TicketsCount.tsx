import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface TicketsCountProps {
  ticketsCount: number;
}

const TicketsCount: FC<TicketsCountProps> = ({ ticketsCount }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "fit-content",
        borderRadius: 2,
        p: "10px",
        mx: "auto",
        bgcolor: palette.grey.divider,
        border: `1px solid ${palette.grey.active}`,
      }}
    >
      <span
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: palette.semantic.info,
        }}
      >
        {ticketsCount}
      </span>
      <span
        style={{
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Tickets
      </span>
    </Box>
  );
};

export { TicketsCount };
