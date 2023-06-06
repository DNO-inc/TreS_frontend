import { useTheme } from "@emotion/react";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TicketBodyTextField = ({ register }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <Box>
      <Typography variant="h3">Ticket body</Typography>
      <TextField
        id="ticket-body"
        placeholder="Start typing..."
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

TicketBodyTextField.propTypes = {};

export { TicketBodyTextField };
