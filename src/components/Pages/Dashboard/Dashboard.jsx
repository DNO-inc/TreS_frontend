import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CreateTicketForm } from "./components/CreateTicketForm";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("dashboard.heading")}</Typography>
      <CreateTicketForm />
    </Grid>
  );
};

Dashboard.propTypes = {};

export { Dashboard };
