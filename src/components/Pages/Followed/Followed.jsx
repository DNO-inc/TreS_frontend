import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Followed = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("followed.heading")}</Typography>
    </Grid>
  );
};

Followed.propTypes = {};

export { Followed };
