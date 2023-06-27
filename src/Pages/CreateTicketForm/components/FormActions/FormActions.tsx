import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, Grid, useTheme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface FormActionsProps {
  handleClear: () => void;
}

const FormActions: FC<FormActionsProps> = ({ handleClear }) => {
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

export { FormActions };
