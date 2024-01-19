import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { StatisticCard } from "components/StatisticCard";
import { FacultyTile } from "./components/FacultyTile";

import IPalette from "theme/IPalette.interface";

interface IFacultyStat {
  faculty_id: number;
  name: string;
  registered_users: number;
  created_tickets_percent: number;
}

interface FacultiesStatisticProps {
  facultiesStatistic: IFacultyStat[];
}

const FacultiesStatistic: FC<FacultiesStatisticProps> = ({
  facultiesStatistic,
}) => {
  const { palette }: IPalette = useTheme();
  return (
    <StatisticCard
      title={"mentionedFaculties"}
      width={300}
      styles={{ gridArea: "faculties" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pr: 3,
          height: 343,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: palette.grey.border,
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.36)",
            borderRadius: 4,
          },
        }}
      >
        {facultiesStatistic.map(facultyStat => {
          const {
            faculty_id,
            name,
            registered_users,
            created_tickets_percent,
          } = facultyStat;
          return (
            <FacultyTile
              title={name}
              usersCount={registered_users}
              ticketsPercent={created_tickets_percent}
              key={faculty_id}
            />
          );
        })}
      </Box>
    </StatisticCard>
  );
};

export { FacultiesStatistic };
