import { FC } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
          gap: 32,
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
        <div>
          <div>{title}</div>
          <div>
            <span style={{ color: palette.semantic.info }}>{ticketsCount}</span>{" "}
            <span style={{ fontSize: 12, color: palette.whiteAlpha.default }}>
              tickets
            </span>
          </div>
        </div>
      </div>
      <IconButton>
        <MoreHorizIcon
          fontSize="small"
          sx={{ color: palette.whiteAlpha.text }}
        />
      </IconButton>
    </Box>
  );
};

export { ScopeTile };
