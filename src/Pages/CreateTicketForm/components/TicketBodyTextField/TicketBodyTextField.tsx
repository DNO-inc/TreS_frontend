import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";

import { Box, TextField, Typography, useTheme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface TicketBodyTextFieldProps {
  register: UseFormRegister<ICreateTicketRequestBody>;
}

const TicketBodyTextField: FC<TicketBodyTextFieldProps> = ({ register }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const placeholderText: string = t("createTicket.ticketBodyPlaceholder");

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.ticketBody")}</Typography>
      <TextField
        id="ticket-body"
        placeholder={placeholderText}
        required
        multiline
        rows={12}
        variant="outlined"
        fullWidth
        {...register("body")}
        sx={{
          bgcolor: palette.grey.card,
          "& > .MuiOutlinedInput-root": {
            p: "0 0 24px",
          },
          "& > .MuiOutlinedInput-root > textarea": {
            p: "12px 16px 0",
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: palette.grey.border,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.36)",
              borderRadius: 4,
            },
          },
        }}
      />
    </Box>
  );
};

export { TicketBodyTextField };