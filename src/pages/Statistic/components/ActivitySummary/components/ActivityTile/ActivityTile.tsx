import { FC } from "react";

import Box from "@mui/material/Box";

interface ActivityTileProps {
  icon: any;
  stat: number | string;
  title: string;
  percent: string;
  color: string;
}

const ActivityTile: FC<ActivityTileProps> = ({
  icon,
  stat,
  title,
  percent,
  color,
}) => {
  return (
    <Box>
      <img src={icon} alt={title} style={{ marginBottom: 12 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 16 }}>{stat}</div>
        <div style={{ fontSize: 12 }}>{title}</div>
        <div style={{ fontSize: 10, color: color }}>{percent}</div>
      </div>
    </Box>
  );
};

export { ActivityTile };
