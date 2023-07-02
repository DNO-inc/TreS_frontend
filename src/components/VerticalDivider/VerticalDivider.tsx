import { FC } from "react";

import { Box, useTheme } from "@mui/material";

import IPalette from "../../theme/IPalette.interface";

interface VerticalDividerProps {
  height?: number;
}

const VerticalDivider: FC<VerticalDividerProps> = ({ height = 22 }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        width: 2,
        height: height,
        backgroundColor: palette.whiteAlpha.default,
        borderRadius: 1,
      }}
    ></Box>
  );
};

export { VerticalDivider };
