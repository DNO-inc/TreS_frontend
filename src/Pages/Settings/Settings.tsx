import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import { ComingSoon } from "../../components/ComingSoon";

const Settings: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("settings.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

export { Settings };
