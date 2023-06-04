import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../ComingSoon";

const Followed = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("followed.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Followed.propTypes = {};

export { Followed };
