import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { Button, Divider, Typography } from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

import IPalette from "theme/IPalette.interface";
import { IScope } from "../../CalendarStatistic";
import { scopes } from "constants/scopes";
import { ScopeTile } from "./components/ScopeTile";

interface ScopesStatisticProps {
  calendarStatistic: IScope[];
}

const ScopesStatistic: FC<ScopesStatisticProps> = ({ calendarStatistic }) => {
  const { palette }: IPalette = useTheme();

  const icons = {
    [scopes.QA]: <HelpOutlineIcon fontSize="small" />,
    [scopes.REPORTS]: <FlagOutlinedIcon fontSize="small" />,
    [scopes.SUGGESTION]: <HandshakeOutlinedIcon fontSize="small" />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <Divider sx={{ ml: "-14px", width: "110%" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          Tickets processed
        </Typography>
        <Button
          color="inherit"
          sx={{
            fontSize: 14,
            color: palette.whiteAlpha.default,
            textTransform: "initial",
          }}
        >
          View all
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {calendarStatistic.map(scopeStat => {
          const { scope, tickets_count } = scopeStat;

          return (
            <ScopeTile
              icon={icons[scope]}
              title={scope}
              ticketsCount={tickets_count}
              key={scope}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export { ScopesStatistic };
