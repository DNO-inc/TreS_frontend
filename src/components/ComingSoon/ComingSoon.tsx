import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{ height: "70vh", justifyContent: "center", alignItems: "center" }}
    >
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        {t("common.comingSoon")}
      </Typography>
    </Grid>
  );
};

ComingSoon.propTypes = {};

export { ComingSoon };
