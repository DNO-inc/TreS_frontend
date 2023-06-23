import { Box, useTheme } from "@mui/material";

import IPalette from "../../theme/IPalette.interface";

const VerticalDivider = ({ height = 22 }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        width: 2,
        height: height,
        backgroundColor: palette.grey.divider,
        borderRadius: 1,
      }}
    ></Box>
  );
};

VerticalDivider.propTypes = {};

export { VerticalDivider };
