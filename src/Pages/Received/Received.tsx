import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

import { ComingSoon } from "../../components/ComingSoon";

const Received: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("received.heading")}</Typography>
      </Box>
      <Box></Box>

      <ComingSoon />
    </Grid>
  );
};

export { Received };