import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("common.error")}</Typography>
    </Grid>
  );
};

ErrorPage.propTypes = {};

export { ErrorPage };
