import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Grid, Modal, useTheme } from "@mui/material";
import IPalette from "../../theme/IPalette.interface";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

import { PersonalInfoStep } from "./components/PersonalInfoStep";

import { AccountDetailStep } from "./components/AccountDetailStep";
import { VerificationStep } from "./components/VerificationStep";
import { Actions } from "./components/Actions";
import { useRegistrationMutation } from "../../store/api/registration/registration.api";

interface SignUpModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleLogIn: () => void;
}

type ApiResponse = {
  data?: object;
  error?: any;
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

  const [registration, { isError }] = useRegistrationMutation();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [faculty, setFaculty] = useState<number | null>(null);
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClear = (): void => {
    setActiveStep(0);
    setFirstname("");
    setLastname("");
    setFaculty(null);
    setLogin("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
    setSecretKey("");
    setHasError(false);
  };

  const handleClose = (): void => {
    setOpen(false);
    handleClear();
  };

  const handleOpenLogInModal = (): void => {
    handleClose();
    handleLogIn();
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
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      response?.error?.data && setErrorMessage(response.error.data.detail);
      setHasError(true);
      setTimeout(() => setHasError(false), 4000);
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
            p: { xs: "16px 8px", sm: "24px" },
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
              sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}
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
                  handleOpenLogInModal={handleOpenLogInModal}
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
                  errorMessage={errorMessage}
                />
              )}
              {activeStep === 2 && (
                <VerificationStep
                  email={email}
                  secretKey={secretKey}
                  setSecretKey={setSecretKey}
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
              secretKey={secretKey}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleClear={handleClear}
              setHasError={setHasError}
              handleClose={handleClose}
            />
          </Box>
          {activeStep === 0 && (
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
                  marginLeft: 4,
                  color: palette.semantic.info,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {t("common.login")}
              </span>
            </Typography>
          )}
        </Grid>
      </form>
    </Modal>
  );
};

export { SignUpModal };
