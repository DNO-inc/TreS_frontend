import { FC, useEffect, useState } from "react";
import { useGetStatisticsMutation } from "../../store/api/statistics/statistics.api";
import { GlobalStatistic } from "./components/GlobalStatistic";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetStatusesQuery } from "../../store/api/api";

export interface IGlobalStatus {
  status_id: number;
  status_name: string;
  count: number;
}

export interface IPeriodStatus {
  date: string;
  status_id: number;
  status_name: string;
  tickets_count: number;
}

export interface IStatus {
  status_id: number;
  name: string;
}

type ApiResponse = {
  data?: {
    global: IGlobalStatus[];
    period: IPeriodStatus[];
  };
  error?: any;
};

const Statistic: FC = () => {
  const { t } = useTranslation();

  const [getStatistics] = useGetStatisticsMutation();
  const { data: statuses, isSuccess } = useGetStatusesQuery({});

  const [global, setGlobal] = useState([]);

  useEffect(() => {
    getStatistics(JSON.stringify({})).then((res: ApiResponse) => {
      if (res?.data) {
        const statistics = JSON.parse(res.data as any);

        setGlobal(statistics.global.statuses);
      }
    });
  }, []);

  return (
    <Grid container sx={{ width: "100%" }}>
      <Box>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          {t("statistic.heading")}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        {global.length > 0 && isSuccess && (
          <GlobalStatistic
            globalStatistic={global}
            statuses={statuses.statuses_list}
          />
        )}
      </Box>
    </Grid>
  );
};

export { Statistic };
