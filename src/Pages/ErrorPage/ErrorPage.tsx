import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("common.error")}</Typography>
      </Box>
    </Grid>
  );
};

export { ErrorPage };
