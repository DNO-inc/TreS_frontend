import { useState, FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, useMediaQuery } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";
import { useSendEmailForResetMutation } from "../../../../store/api/auth/auth.api";

interface SendEmailStepProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const SendEmailStep: FC<SendEmailStepProps> = ({ setActiveStep }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 500px)");

  const [email, setEmail] = useState<string>("");

  const [sendEmailForReset] = useSendEmailForResetMutation({});

  const handleSendEmail = (): void => {
    sendEmailForReset(email);
    setActiveStep(2);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: 4,
        gap: matches ? 3 : 4,
        width: matches ? "90vw" : 450,
        bgcolor: palette.grey.border,
        border: `2px solid ${palette.grey.active}`,
        p: matches ? "24px" : "32px 56px",
      }}
    >
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
