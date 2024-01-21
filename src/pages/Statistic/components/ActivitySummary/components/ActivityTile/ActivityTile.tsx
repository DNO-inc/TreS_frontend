import { FC } from "react";

import Box from "@mui/material/Box";

interface ActivityTileProps {
  icon: any;
  stat: number | string;
  title: string;
  percent: string;
  color: string;
}

const ActivityTile: FC<ActivityTileProps> = ({ icon, stat, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{ marginBottom: 12, width: 26, height: 26 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <div style={{ fontSize: 16 }}>{stat}</div>
        <div style={{ fontSize: 12 }}>{title}</div>
      </div>
    </Box>
  );
};

export { ActivityTile };
