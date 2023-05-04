import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("dashboard.heading")}</Typography>
    </Grid>
  );
};

Dashboard.propTypes = {};

export { Dashboard };
