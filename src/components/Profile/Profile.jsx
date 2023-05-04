import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("profile.heading")}</Typography>
    </Grid>
  );
};

Profile.propTypes = {};

export { Profile };
