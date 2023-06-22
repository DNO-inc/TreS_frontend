import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "../../store/api/api";

interface ILogInModal {
  open: boolean;
  setOpen: (param: boolean) => void;
  setIsAuth: (param: boolean) => void;
}

const LogInModal = ({ open, setOpen, setIsAuth }: ILogInModal) => {
  const { t } = useTranslation();
  const handleClose = () => setOpen(false);
  const { palette }: IPalette = useTheme();

  const [loginPost, { data, isSuccess, isError }] = useLoginMutation();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    loginPost({ body: JSON.stringify({ login, password }) });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("jwt-token", data.access_token);
      localStorage.setItem("user-name", data.login);
      setIsAuth(true);
      setOpen(false);
    }

    if (isError) {
      setHasError(true);
    }
  }, [isSuccess, isError, data?.access_token, data?.login, setIsAuth, setOpen]);

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

LogInModal.propTypes = {};

export { LogInModal };
