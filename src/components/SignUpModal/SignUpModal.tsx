import { FormEvent, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ISignUpModal {
  open: boolean;
  setOpen: (param: boolean) => void;
}

const SignUpModal = ({ open, setOpen }: ISignUpModal) => {
  const { t } = useTranslation();
  const handleClose = () => setOpen(false);
  const { palette }: IPalette = useTheme();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
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
            {t("common.signup")}
          </Typography>
          <TextField
            label="Login"
            value={login}
            onChange={event => setLogin(event.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            label="Faculty"
            value={faculty}
            onChange={event => setFaculty(event.target.value)}
            fullWidth
          />
          <TextField
            label="Group"
            value={group}
            onChange={event => setGroup(event.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </Grid>
      </form>
    </Modal>
  );
};

SignUpModal.propTypes = {};

export { SignUpModal };
