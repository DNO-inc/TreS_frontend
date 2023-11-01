import { FC } from "react";

import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";

interface LoaderProps {
  size?: "small" | "large";
}

const Loader: FC<LoaderProps> = ({ size = "large" }) => {
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
      <CircularProgress color="primary" />
    </Grid>
  );
};

export { Loader };
