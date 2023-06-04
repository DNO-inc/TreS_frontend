import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../ComingSoon";

const Notifications = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("notification.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Notifications.propTypes = {};

export { Notifications };
