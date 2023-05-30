import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../ComingSoon";

const Sent = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("sent.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Sent.propTypes = {};

export { Sent };
