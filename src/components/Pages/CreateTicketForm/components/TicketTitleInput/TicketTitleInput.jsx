import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TicketTitleInput = ({ register }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.ticketTitle")}</Typography>
      <TextField
        id="ticket-title"
        placeholder={t("createTicket.ticketTitlePlaceholder")}
        required
        variant="outlined"
        fullWidth
        {...register("subject")}
        sx={{ bgcolor: palette.grey.card }}
      />
    </Box>
  );
};

TicketTitleInput.propTypes = {};

export { TicketTitleInput };
