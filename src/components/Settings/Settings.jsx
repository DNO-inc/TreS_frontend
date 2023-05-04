import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("settings.heading")}</Typography>
    </Grid>
  );
};

Settings.propTypes = {};

export { Settings };
