import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Received = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("received.heading")}</Typography>
    </Grid>
  );
};

Received.propTypes = {};

export { Received };
