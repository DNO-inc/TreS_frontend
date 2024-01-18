import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";

interface VerticalDividerProps {
  color?: string;
  height?: number;
  width?: number;
}

const VerticalDivider: FC<VerticalDividerProps> = ({
  color,
  height = 22,
  width = 2,
}) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        display: "inline-block",
        width: width,
        height: height,
        backgroundColor: color ?? palette.grey.divider,
        borderRadius: 1,
      }}
    ></Box>
  );
};

export { VerticalDivider };
