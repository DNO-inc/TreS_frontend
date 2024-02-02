import { FC } from "react";

import Box from "@mui/material/Box";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

import { StatisticCard } from "components/StatisticCard";

import { scopes } from "constants/scopes";
import { ScopeTile } from "./components/ScopeTile";

interface IScope {
  date: string;
  scope: string;
  tickets_count: number;
}

interface ScopesStatisticProps {
  calendarStatistic: IScope[];
}

const ScopesStatistic: FC<ScopesStatisticProps> = ({ calendarStatistic }) => {
  const icons = {
    [scopes.QA]: <HelpOutlineIcon fontSize="small" />,
    [scopes.REPORTS]: <FlagOutlinedIcon fontSize="small" />,
    [scopes.SUGGESTION]: <HandshakeOutlinedIcon fontSize="small" />,
  };

  const colors = {
    [scopes.QA]: "#12DB87",
    [scopes.REPORTS]: "#D94B44",
    [scopes.SUGGESTION]: "#03A2E8",
  };

  return (
    <StatisticCard
      title={"scopeStatistic"}
      width={320}
      styles={{ gridArea: "scopes" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {calendarStatistic.map(scopeStat => {
          const { scope, tickets_count } = scopeStat;

          return (
            <ScopeTile
              icon={icons[scope]}
              title={scope}
              ticketsCount={tickets_count || 0}
              color={colors[scope]}
              key={scope}
            />
          );
        })}
      </Box>
    </StatisticCard>
  );
};

export { ScopesStatistic };
