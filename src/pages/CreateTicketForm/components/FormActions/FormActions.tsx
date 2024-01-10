import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";
import { endpoints } from "../../../../constants";

interface FormActionsProps {
  handleClear: () => void;
  ticketId: number | null;
}

const FormActions: FC<FormActionsProps> = ({ handleClear, ticketId }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    ticketId && navigate(`${endpoints.FULL_TICKET}/${ticketId}`);
  }, [ticketId]);

  return (
    <Grid
      container
      sx={{
        gap: 1,
        ".MuiButton-root": {
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
