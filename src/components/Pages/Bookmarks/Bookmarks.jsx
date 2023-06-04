import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../ComingSoon";

const Bookmarks = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("bookmarks.heading")}</Typography>
      <ComingSoon />
    </Grid>
  );
};

Bookmarks.propTypes = {};

export { Bookmarks };
