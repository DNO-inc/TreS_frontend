import { Grid, Typography } from "@mui/material";

const ComingSoon = () => {
  return (
    <Grid
      container
      sx={{ height: "70vh", justifyContent: "center", alignItems: "center" }}
    >
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: "90px",
          fontWeight: "bold",
        }}
      >
        <span>Coming</span>
        <br />
        <span>Soon...</span>
      </Typography>
    </Grid>
  );
};

ComingSoon.propTypes = {};

export { ComingSoon };
