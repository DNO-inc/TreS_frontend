import { Grid, Typography } from "@mui/material";

const Loader = () => {
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
      <Typography variant="h4">Loading...</Typography>
    </Grid>
  );
};

Loader.propTypes = {};

export { Loader };
