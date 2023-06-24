import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

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

export { ComingSoon };
