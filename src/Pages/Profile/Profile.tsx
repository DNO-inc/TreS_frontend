import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../components/ComingSoon";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("profile.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Profile.propTypes = {};

export { Profile };
