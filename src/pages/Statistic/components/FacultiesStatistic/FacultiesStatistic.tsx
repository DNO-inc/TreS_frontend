import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { StatisticCard } from "components/StatisticCard";

import { Bar } from "react-chartjs-2";

import { scopes } from "constants/scopes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface IFacultyStat {
  faculty_id: number;
  name: string;
  qa_count: number;
  reports_count: number;
  suggestion: number;
}

interface FacultiesStatisticProps {
  facultiesStatistic: IFacultyStat[];
}

const FacultiesStatistic: FC<FacultiesStatisticProps> = ({
  facultiesStatistic,
}) => {
  const { t } = useTranslation();

  const colors = {
    [scopes.QA]: "#12DB87",
    [scopes.REPORTS]: "#D94B44",
    [scopes.SUGGESTION]: "#03A2E8",
  };

  const data = {
    labels: facultiesStatistic.map(facultyStat => facultyStat.name),
    datasets: [
      {
        label: t(`common.${scopes.SUGGESTION.toLowerCase()}`),
        data: facultiesStatistic.map(facultyStat => facultyStat.suggestion),
        backgroundColor: colors[scopes.SUGGESTION],
      },
      {
        label: t(`common.${scopes.QA.toLowerCase()}`),
        data: facultiesStatistic.map(facultyStat => facultyStat.qa_count),
        backgroundColor: colors[scopes.QA],
      },
      {
        label: t(`common.${scopes.REPORTS.toLowerCase()}`),
        data: facultiesStatistic.map(facultyStat => facultyStat.reports_count),
        backgroundColor: colors[scopes.REPORTS],
      },
    ],
  };

  const options = {
    type: "bar",
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "transparent",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        border: {
          width: 0,
        },
        ticks: {
          padding: 10,
        },
      },
    },
  };

  return (
    <StatisticCard
      title={"mentionedFaculties"}
      width={690}
      styles={{ gridArea: "faculties" }}
    >
      <Bar data={data} options={options} />
    </StatisticCard>
  );
};

export { FacultiesStatistic };
