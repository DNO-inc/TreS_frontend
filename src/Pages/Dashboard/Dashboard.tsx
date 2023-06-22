import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../components/ComingSoon";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("dashboard.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Dashboard.propTypes = {};

export { Dashboard };
