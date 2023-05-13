import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Sent = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("sent.heading")}</Typography>
    </Grid>
  );
};

Sent.propTypes = {};

export { Sent };
