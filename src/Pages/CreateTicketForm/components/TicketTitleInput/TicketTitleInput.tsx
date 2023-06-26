import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Box, Typography, useTheme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface TicketTitleInputProps {
  register: UseFormRegister<ICreateTicketRequestBody>;
}

const TicketTitleInput: FC<TicketTitleInputProps> = ({ register }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const placeholderText: string = t("createTicket.ticketTitlePlaceholder");

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.ticketTitle")}</Typography>
      <TextField
        id="ticket-title"
        placeholder={placeholderText}
        required
        variant="outlined"
        fullWidth
        {...register("subject")}
        sx={{ bgcolor: palette.grey.card }}
      />
    </Box>
  );
};

export { TicketTitleInput };
