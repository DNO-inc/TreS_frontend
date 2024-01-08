import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";
import { general } from "../../../../constants";

interface TicketTitleInputProps {
  register: UseFormRegister<ICreateTicketRequestBody>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  errors: FieldErrors<ICreateTicketRequestBody>;
}

const TicketTitleInput: FC<TicketTitleInputProps> = ({
  register,
  title,
  setTitle,
  errors,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const placeholderText: string = t("createTicket.ticketTitlePlaceholder");

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", xl: "calc(100% / 3 - 16px)" },
      }}
    >
      <Typography variant="h3">{t("createTicket.ticketTitle")}</Typography>
      <TextField
        id="ticket-title"
        placeholder={placeholderText}
        variant="outlined"
        fullWidth
        {...register("subject", {
          required: true,
          maxLength: general.MAX_TITLE_LENGTH,
        })}
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
        error={!!errors.subject}
        sx={{
          bgcolor: palette.grey.card,
          "&  .MuiInputBase-input": { p: "13px 66px 13px 8.5px" },
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "70%",
          right: 8,
          fontSize: 12,
          color: palette.whiteAlpha.default,
        }}
      >
        {title.length} / {general.MAX_TITLE_LENGTH}
      </span>
    </Box>
  );
};

export { TicketTitleInput };
