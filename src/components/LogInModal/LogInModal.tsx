import { FormEvent, useState, FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import IPalette from "../../theme/IPalette.interface";
import { useAuth } from "../../context/AuthContext";

interface LogInModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LogInModal: FC<LogInModalProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const { loginUser } = useAuth();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClose = (): void => setOpen(false);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    loginUser({ login, password })
      .then(() => setOpen(false))
      .catch(() => setHasError(true));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
            borderRadius: 4,
            gap: 4,
            width: 450,
            bgcolor: palette.grey.border,
            p: "32px 56px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("common.login")}
          </Typography>
          <TextField
            label={t("common.loginInput")}
            value={login}
            onChange={event => setLogin(event.target.value)}
            error={hasError}
            fullWidth
          />
          <TextField
            label={t("common.password")}
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            error={hasError}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            {t("common.loginButton")}
          </Button>
        </Grid>
      </form>
    </Modal>
  );
};

export { LogInModal };
