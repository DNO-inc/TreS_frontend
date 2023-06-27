import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 200px)",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">{t("common.loading")}</Typography>
    </Grid>
  );
};

export { Loader };