import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../components/ComingSoon";

const Deleted = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("deleted.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Deleted.propTypes = {};

export { Deleted };
