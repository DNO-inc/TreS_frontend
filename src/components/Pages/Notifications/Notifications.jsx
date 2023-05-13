import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("notification.heading")}</Typography>
    </Grid>
  );
};

Notifications.propTypes = {};

export { Notifications };
