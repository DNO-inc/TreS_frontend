import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";

import { FacultySelect } from "./components/FacultySelect";

import IPalette from "../../theme/IPalette.interface";
import { useRegistrationMutation } from "../../store/api/api";
import { GroupSelect } from "./components/GroupSelect";

interface SignUpModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleLogIn: () => void;
}

const SignUpModal: FC<SignUpModalProps> = ({ open, setOpen, handleLogIn }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 500px)");

  const [registration, { isError }] = useRegistrationMutation();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [faculty, setFaculty] = useState<number | null>(null);
  const [group, setGroup] = useState<number | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClose = (): void => setOpen(false);

  const handleOpenLogInModal = (): void => {
    handleClose();
    handleLogIn();
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    console.log(faculty, group);

    registration({ body: JSON.stringify({ login, password, faculty, group }) });
  };

  useEffect(() => {
    if (isError) {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  }, [isError]);

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
            gap: matches ? 3 : 4,
            width: matches ? "90vw" : 450,
            bgcolor: palette.grey.border,
            border: `2px solid ${palette.grey.active}`,
            p: matches ? "24px" : "32px 56px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("common.signUp")}
          </Typography>
          <TextField
            label={t("common.loginInput")}
            value={login}
            onChange={event => setLogin(event.target.value)}
            error={hasError}
            required
            fullWidth
          />
          <TextField
            label={t("common.password")}
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            error={hasError}
            required
            fullWidth
          />
          <FacultySelect
            faculty={faculty}
            setFaculty={setFaculty}
            isError={hasError}
          />
          <GroupSelect group={group} setGroup={setGroup} isError={hasError} />
          <Button variant="contained" color="primary" type="submit">
            {t("common.signUpButton")}
          </Button>
          <Typography fontSize={14}>
            {t("common.signUpQuestion")}
            <span
              onClick={handleOpenLogInModal}
              style={{
                marginLeft: 8,
                color: palette.semantic.info,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {t("common.loginButton")}
            </span>
          </Typography>
        </Grid>
      </form>
    </Modal>
  );
};

export { SignUpModal };
