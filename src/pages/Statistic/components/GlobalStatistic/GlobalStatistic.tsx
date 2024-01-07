import { FC } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useTheme } from "@mui/material";

import { IGlobalStatus, IStatus } from "../../Statistic";
import IPalette from "../../../../theme/IPalette.interface";
import { useTranslation } from "react-i18next";

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface GlobalStatisticProps {
  globalStatistic: IGlobalStatus[];
  statuses: IStatus[];
}

const GlobalStatistic: FC<GlobalStatisticProps> = ({
  globalStatistic,
  statuses,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const statistic = {
    labels: statuses.map(status =>
      t(`statusesFilter.${status.name.toLowerCase()}`)
    ),
    datasets: [
      {
        label: "Global statistic",
        backgroundColor: [
          palette.common.white,
          palette.semantic.warning,
          palette.semantic.info,
          palette.semantic.waiting,
          palette.semantic.success,
          palette.semantic.error,
        ],
        data: globalStatistic.map(status => status.count),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={statistic} options={options} />
    </div>
  );
};

export { GlobalStatistic };
