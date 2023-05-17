import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const VerticalDivider = ({ height = 22 }) => {
  const { palette } = useTheme();

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
