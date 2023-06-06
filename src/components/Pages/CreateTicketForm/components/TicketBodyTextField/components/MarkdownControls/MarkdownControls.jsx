import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const MarkdownControls = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return <Box>markdown</Box>;
};

MarkdownControls.propTypes = {};

export { MarkdownControls };
