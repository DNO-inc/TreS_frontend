import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface FacultyTileProps {
  title: string;
  usersCount: number;
  ticketsPercent: number;
}

ChartJS.register(ArcElement, Tooltip);

const FacultyTile: FC<FacultyTileProps> = ({
  title,
  usersCount,
  ticketsPercent,
}) => {
  const { palette }: IPalette = useTheme();

  const data = {
    labels: ["Created at this faculty", "Created at other faculties"],
    datasets: [
      {
        data: [ticketsPercent, 100 - ticketsPercent],
        backgroundColor: [palette.semantic.info, palette.common.white],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const doughnutLabel = {
    id: "doughnutLabel",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;

      ctx.save();
      const xCoord = chart.getDatasetMeta(0).data[0].x;
      const yCoord = chart.getDatasetMeta(0).data[0].y;
      ctx.font = "600 18px san-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${ticketsPercent}%`, xCoord, yCoord);
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: 10,
        fontWeight: 500,
        backgroundColor: palette.grey.divider,
      }}
    >
      <div>
        <div>{title}</div>
        <div style={{ fontSize: 12, color: palette.whiteAlpha.default }}>
          {usersCount} Registered
        </div>
      </div>
      <div style={{ width: 65 }}>
        <Doughnut data={data} options={options} plugins={[doughnutLabel]} />
      </div>
    </div>
  );
};

export { FacultyTile };
