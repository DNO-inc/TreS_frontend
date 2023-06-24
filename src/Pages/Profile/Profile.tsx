import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Box, Grid, Typography } from "@mui/material";

import { ComingSoon } from "../../components/ComingSoon";

const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("profile.heading")}</Typography>
      </Box>
      <Box></Box>
      <ComingSoon />
    </Grid>
  );
};

export { Profile };
