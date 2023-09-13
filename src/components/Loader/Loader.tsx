import { FC } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface LoaderProps {
  size?: "small" | "large";
}

const Loader: FC<LoaderProps> = ({ size = "large" }) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        height: size === "small" ? "none" : "calc(100vh - 200px)",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant={size === "small" ? "h5" : "h4"}>
        {t("common.loading")}
      </Typography>
    </Grid>
  );
};

export { Loader };
