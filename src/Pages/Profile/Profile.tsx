import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import { ComingSoon } from "../../components/ComingSoon";

const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("profile.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

export { Profile };
