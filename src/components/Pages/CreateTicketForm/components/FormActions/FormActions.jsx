import { useTheme } from "@emotion/react";
import { Button, Grid, Typography, darken } from "@mui/material";
import { useTranslation } from "react-i18next";

const FormActions = ({ reset, setQueue, setOption }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const handleDelete = () => {
    reset();
    setQueue("none");
    setOption(false);
  };

  return (
    <Grid
      container
      sx={{
        gap: 1,
        "& > .MuiButton-root": {
          width: "100%",
        },
      }}
    >
      <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
        Sent ticket
      </Button>
      <Button
        onClick={handleDelete}
        variant="contained"
        sx={{
          color: palette.semantic.error,
          bgcolor: palette.grey.button,
          "&:hover": {
            bgcolor: palette.grey.divider,
          },
        }}
      >
        Clear
      </Button>
    </Grid>
  );
};

FormActions.propTypes = {};

export { FormActions };
