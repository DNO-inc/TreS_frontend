import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { StatusesStatistic } from "./components/StatusesStatistic";
import { ActivitySummary } from "./components/ActivitySummary";
import { ScopesStatistic } from "./components/ScopesStatistic";
import { FacultiesStatistic } from "./components/FacultiesStatistic";

import {
  useGetFacultyStatisticQuery,
  useGetGeneralStatisticMutation,
  useGetSummaryActivityQuery,
} from "api/statistic.api";

export interface IPeriodStatus {
  date: string;
  status_id: number;
  status_name: string;
  tickets_count: number;
}

const Statistic: FC = () => {
  const { t } = useTranslation();

  const { data: summaryActivity } = useGetSummaryActivityQuery({});
  const { data: facultiesStatistic } = useGetFacultyStatisticQuery({});
  const [getStatistics, { data: generalStatistic }] =
    useGetGeneralStatisticMutation();

  useEffect(() => {
    getStatistics(JSON.stringify({}));
  }, []);

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("statistic.heading")}</Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateAreas: `"statuses activities faculties" 
                              "statuses scopes     faculties"
                              "statuses none       none"`,
          pt: "100px !important",
        }}
      >
        {generalStatistic && (
          <StatusesStatistic statusesStatistic={generalStatistic.statuses} />
        )}
        {generalStatistic && (
          <ScopesStatistic calendarStatistic={generalStatistic.scopes} />
        )}
        {facultiesStatistic && (
          <FacultiesStatistic
            facultiesStatistic={facultiesStatistic.faculties_data}
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
