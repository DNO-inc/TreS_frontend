import { FC } from "react";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../theme/IPalette.interface";

interface VerticalDividerProps {
  height?: number;
  width?: number;
}

const VerticalDivider: FC<VerticalDividerProps> = ({
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
        backgroundColor: palette.grey.divider,
        borderRadius: 1,
      }}
    ></Box>
  );
};

export { VerticalDivider };
