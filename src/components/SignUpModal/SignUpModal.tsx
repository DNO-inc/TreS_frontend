import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Grid, Modal, useTheme } from "@mui/material";
import IPalette from "../../theme/IPalette.interface";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

import { PersonalInfoStep } from "./components/PersonalInfoStep";

import { useRegistrationMutation } from "../../store/api/api";
import { useAuth } from "../../context/AuthContext";
import { AccountDetailStep } from "./components/AccountDetailStep";
import { VerificationStep } from "./components/VerificationStep";
import { Actions } from "./components/Actions";

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

  const steps = [
    t("signUp.firstStep"),
    t("signUp.secondStep"),
    t("signUp.thirdStep"),
  ];

  const { loginUser } = useAuth();

  const [registration, { isError }] = useRegistrationMutation();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [faculty, setFaculty] = useState<number | null>(null);
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleClear = (): void => {
    setOpen(false);
    setActiveStep(0);
    setFirstname("");
    setLastname("");
    setFaculty(null);
    setLogin("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
    setIsVerified(false);
    setHasError(false);
  };

  const handleClose = (): void => setOpen(false);

  const handleOpenLogInModal = (): void => {
    handleClose();
    handleLogIn();
    handleClear();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const response: ApiResponse = await registration({
      body: JSON.stringify({
        firstname,
        lastname,
        login,
        email,
        password,
        faculty,
      }),
    });

    if (response.data) {
      loginUser({ login, password });

      handleClear();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
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
            gap: matches ? 3 : 4,
            width: matches ? "95vw" : 500,
            bgcolor: palette.grey.border,
            border: `2px solid ${palette.grey.active}`,
            p: "24px",
          }}
        >
          <Typography id="modal-signUp" variant="h6" component="h2">
            {t("signUp.header")}
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ width: "100%" }}
            alternativeLabel
          >
            {steps.map(label => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box
            sx={{
              width: "85%",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}
            >
              {activeStep === 0 && (
                <PersonalInfoStep
                  firstname={firstname}
                  setFirstname={setFirstname}
                  lastname={lastname}
                  setLastname={setLastname}
                  faculty={faculty}
                  setFaculty={setFaculty}
                  isError={hasError}
                />
              )}
              {activeStep === 1 && (
                <AccountDetailStep
                  login={login}
                  setLogin={setLogin}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmedPassword={confirmedPassword}
                  setConfirmedPassword={setConfirmedPassword}
                  isError={hasError}
                />
              )}
              {activeStep === 2 && (
                <VerificationStep
                  email={email}
                  isVerified={isVerified}
                  setIsVerified={setIsVerified}
                  isError={hasError}
                />
              )}
            </Box>
            <Actions
              firstname={firstname}
              lastname={lastname}
              faculty={faculty}
              login={login}
              email={email}
              password={password}
              confirmedPassword={confirmedPassword}
              isVerified={isVerified}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Box>
          <Typography
            fontSize={14}
            sx={{
              width: "100%",
              textAlign: "center",
              color: palette.whiteAlpha.default,
            }}
          >
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
