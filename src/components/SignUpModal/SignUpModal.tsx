import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, useMediaQuery } from "@mui/material";

import { FacultySelect } from "./components/FacultySelect";

import IPalette from "../../theme/IPalette.interface";
import { useRegistrationMutation } from "../../store/api/api";
import { useAuth } from "../../context/AuthContext";
import { SignUpTextField } from "./components/SignUpTextField";

interface SignUpModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleLogIn: () => void;
}

type ApiResponse = {
  data?: object;
  error?: FetchBaseQueryError | SerializedError;
};

const SignUpModal: FC<SignUpModalProps> = ({ open, setOpen, handleLogIn }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 500px)");

  const { loginUser } = useAuth();

  const [registration, { isError }] = useRegistrationMutation();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [faculty, setFaculty] = useState<number | null>(null);
  const [isCaptchaDone, setIsCaptchaDone] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClose = (): void => setOpen(false);

  const handleOpenLogInModal = (): void => {
    handleClose();
    handleLogIn();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const response: ApiResponse = await registration({
      body: JSON.stringify({ firstname, lastname, login, password, faculty }),
    });

    if (response.data) {
      loginUser({ login, password });

      setOpen(false);
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handleChange = async (token: string) => {
    const secret = import.meta.env.VITE_SECRET_CAPTCHA_KEY;

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        { method: "POST" }
      );

      const data = await response.json();

      console.log("racptcha data", data.success);
    } catch (err) {
      console.log(err);
    } finally {
      if (token) {
        setIsCaptchaDone(true);
      }
    }
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
            gap: matches ? 2 : 3,
            width: matches ? "90vw" : 450,
            bgcolor: palette.grey.border,
            border: `2px solid ${palette.grey.active}`,
            p: matches ? "24px" : "32px 56px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("signUp.header")}
          </Typography>
          <SignUpTextField
            type={"firstname"}
            value={firstname}
            setValue={setFirstname}
            hasError={hasError}
          />
          <SignUpTextField
            type={"lastname"}
            value={lastname}
            setValue={setLastname}
            hasError={hasError}
          />
          <SignUpTextField
            type={"login"}
            value={login}
            setValue={setLogin}
            hasError={hasError}
          />
          <SignUpTextField
            type={"password"}
            value={password}
            setValue={setPassword}
            hasError={hasError}
          />
          <FacultySelect
            faculty={faculty}
            setFaculty={setFaculty}
            isError={hasError}
          />
          <Box
            sx={{
              transform: matches ? "scale(0.80)" : "scale(0.9)",
              filter: "brightness(1.1)",
            }}
          >
            <ReCAPTCHA
              theme="dark"
              sitekey={import.meta.env.VITE_PUBLIC_CAPTCHA_KEY}
              onChange={handleChange}
            />
          </Box>
          <Button
            disabled={!faculty || !login || !password || !isCaptchaDone}
            variant="contained"
            color="primary"
            type="submit"
          >
            {t("signUp.button")}
          </Button>
          <Typography fontSize={14} sx={{ width: "100%", textAlign: "center" }}>
            {t("signUp.question")}
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
