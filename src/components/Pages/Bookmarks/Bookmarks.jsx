import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Bookmarks = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h4">{t("bookmarks.heading")}</Typography>
    </Grid>
  );
};

Bookmarks.propTypes = {};

export { Bookmarks };
