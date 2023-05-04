import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Deleted = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("deleted.heading")}</Typography>
    </Grid>
  );
};

Deleted.propTypes = {};

export { Deleted };
