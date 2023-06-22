import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../components/ComingSoon";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("settings.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Settings.propTypes = {};

export { Settings };
