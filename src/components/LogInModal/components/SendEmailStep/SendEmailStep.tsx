import { useState, FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Theme, SxProps } from "@mui/material/styles";

import IPalette from "theme/IPalette.interface";
import { useSendEmailForAccessMutation } from "api/profile.api";

interface SendEmailStepProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  wrapperStyle: SxProps<Theme>;
}

const SendEmailStep: FC<SendEmailStepProps> = ({
  setActiveStep,
  wrapperStyle,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [email, setEmail] = useState<string>("");

  const [sendEmailForAccess] = useSendEmailForAccessMutation({});

  const handleSendEmail = (): void => {
    sendEmailForAccess(email);
    setActiveStep(2);
  };

  return (
    <Grid container sx={wrapperStyle}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t("login.restore.header")}
      </Typography>
      <Typography
        id="modal-modal-title"
        sx={{
          fontSize: 16,
          color: palette.whiteAlpha.default,
          textAlign: "center",
        }}
      >
        {t("login.restore.description")}
      </Typography>
      <TextField
        type="email"
        label={t("login.restore.input")}
        value={email}
        onChange={event => setEmail(event.target.value)}
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          ".Mui-Box": { width: "100%" },
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setActiveStep(0)}
        >
          {t("login.restore.return")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendEmail}
          disabled={email === ""}
        >
          {t("login.restore.send")}
        </Button>
      </Box>
    </Grid>
  );
};

export { SendEmailStep };
