import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface ScopeTileProps {
  icon: JSX.Element;
  title: string;
  ticketsCount: number;
}

const ScopeTile: FC<ScopeTileProps> = ({ icon, title, ticketsCount }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: palette.grey.active,
            borderRadius: 4,
            padding: "10px 10px 4px",
          }}
        >
          {icon}
        </div>
        <div>{title}</div>
      </div>
      <div>
        <span style={{ color: palette.semantic.info }}>{ticketsCount}</span>{" "}
        <span style={{ fontSize: 12, color: palette.whiteAlpha.default }}>
          tickets
        </span>
      </div>
    </Box>
  );
};

export { ScopeTile };
