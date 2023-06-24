import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

const ErrorPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("common.error")}</Typography>
    </Grid>
  );
};

export { ErrorPage };
