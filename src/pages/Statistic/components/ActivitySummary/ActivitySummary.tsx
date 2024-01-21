import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import processingTime from "../../../../assets/processing_time.svg";
import ticketsCount from "../../../../assets//tickets_count.svg";
import usersCount from "../../../../assets/users_count.svg";

import { StatisticCard } from "components/StatisticCard";

import IPalette from "theme/IPalette.interface";
import { ActivityTile } from "./components/ActivityTile";

interface ActivitySummaryProps {
  summaryActivity: {
    average_process_time: number;
    tickets_processed: number;
    users_registered: number;
  };
}

const ActivitySummary: FC<ActivitySummaryProps> = ({ summaryActivity }) => {
  const { palette }: IPalette = useTheme();

  const { average_process_time, tickets_processed, users_registered } =
    summaryActivity;

  const activityList = [
    {
      icon: processingTime,
      stat: `${average_process_time} d`,
      title: "Processing time",
      percent: "+10% from yesterday",
      color: "#B59469",
    },
    {
      icon: ticketsCount,
      stat: tickets_processed,
      title: "Tickets",
      percent: "+8% from yesterday",
      color: "#A9DFD8",
    },
    {
      icon: usersCount,
      stat: users_registered,
      title: "Users",
      percent: "+3% from yesterday",
      color: "#20AEF3",
    },
  ];

  return (
    <StatisticCard
      title={"activitySummary"}
      width={320}
      styles={{ gridArea: "activities" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          ".MuiBox-root": {
            p: "10px",
            borderRadius: 2,
            bgcolor: palette.grey.divider,
            border: `1px solid ${palette.grey.active}`,
          },
        }}
      >
        {activityList.map((activity, index) => {
          const { icon, stat, title, percent, color } = activity;

          return (
            <ActivityTile
              icon={icon}
              stat={stat}
              title={title}
              percent={percent}
              color={color}
              key={index}
            />
          );
        })}
      </Box>
    </StatisticCard>
  );
};

export { ActivitySummary };
