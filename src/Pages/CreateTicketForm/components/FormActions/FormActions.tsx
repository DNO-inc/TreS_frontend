import { useTheme } from "@emotion/react";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IFormActions {
  handleClear: () => void;
}

const FormActions = ({ handleClear }: IFormActions) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

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
        {t("createTicket.sentTicket")}
      </Button>
      <Button
        onClick={handleClear}
        variant="contained"
        sx={{
          color: palette.semantic.error,
          bgcolor: palette.grey.button,
          textTransform: "capitalize",
          "&:hover": {
            bgcolor: palette.grey.divider,
          },
        }}
      >
        {t("createTicket.clear")}
      </Button>
    </Grid>
  );
};

FormActions.propTypes = {};

export { FormActions };
