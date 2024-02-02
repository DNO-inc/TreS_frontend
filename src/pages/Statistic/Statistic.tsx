import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { StatusesStatistic } from "./components/StatusesStatistic";
import { ActivitySummary } from "./components/ActivitySummary";
import { ScopesStatistic } from "./components/ScopesStatistic";
import { FacultiesStatistic } from "./components/FacultiesStatistic";

import {
  useGetPeriodStatisticQuery,
  useGetSummaryActivityQuery,
} from "api/statistic.api";
import IPalette from "theme/IPalette.interface";

export interface IPeriodStatus {
  date: string;
  status_id: number;
  name: string;
  tickets_count: number;
}

const Statistic: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const { data: summaryActivity } = useGetSummaryActivityQuery({});
  const { data: generalStatistic } = useGetPeriodStatisticQuery({});

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("statistic.heading")}</Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateAreas: `"statuses faculties faculties" 
                              "statuses scopes     activities"`,
          pt: "100px !important",
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: palette.grey.divider,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "&": {
            scrollbarWidth: "thin",
            scrollbarColor: "#555 #212125",
          },
          "&:hover": {
            scrollbarColor: "#555 #212125",
          },
        }}
      >
        {generalStatistic?.statuses && (
          <StatusesStatistic statusesStatistic={generalStatistic.statuses} />
        )}
        {generalStatistic?.scopes && (
          <ScopesStatistic calendarStatistic={generalStatistic.scopes} />
        )}
        {generalStatistic?.faculty_scopes && (
          <FacultiesStatistic
            facultiesStatistic={generalStatistic?.faculty_scopes}
          />
        )}
        {summaryActivity && (
          <ActivitySummary summaryActivity={summaryActivity} />
        )}
        <div style={{ gridArea: "none" }}></div>
      </Box>
    </Grid>
  );
};

export { Statistic };
