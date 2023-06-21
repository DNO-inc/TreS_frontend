import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../components/ComingSoon";

const Received = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("received.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Received.propTypes = {};

export { Received };
