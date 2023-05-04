import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const GeneralTickets = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("generalTickets.heading")}</Typography>
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };
