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
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AccountDetailStep } from "./components/AccountDetailStep";
import { Actions } from "./components/Actions";
import { PersonalInfoStep } from "./components/PersonalInfoStep";
import { VerificationStep } from "./components/VerificationStep";

import { useRegistrationMutation } from "api/registration.api";
import IPalette from "theme/IPalette.interface";
import { dimensions } from "constants";

interface SignUpModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleLogIn: () => void;
}

interface ApiResponse {
  data?: object;
  error?: any;
}

export interface ISignUpData {
  firstname: string;
  lastname: string;
  faculty: number | null;
  login: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const STEPS = {
  PERSONAL_INFO: 0,
  ACCOUNT_DETAIL: 1,
  VERIFICATION: 2,
};

const SignUpModal: FC<SignUpModalProps> = ({ open, setOpen, handleLogIn }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery(
    `(max-width: ${dimensions.BREAK_POINTS.SIGNUP_MODAL}px)`
  );

  const steps = [
    t("signUp.firstStep"),
    t("signUp.secondStep"),
    t("signUp.thirdStep"),
  ];

  const [registration, { isError }] = useRegistrationMutation();

  const [signUpData, setSignUpData] = useState<ISignUpData>({
    firstname: "",
    lastname: "",
    faculty: null,
    login: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [secretKey, setSecretKey] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(STEPS.PERSONAL_INFO);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClear = (): void => {
    setActiveStep(0);
    setSignUpData({
      firstname: "",
      lastname: "",
      faculty: null,
      login: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
    setSecretKey("");
    setHasError(false);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpenLogInModal = (): void => {
    handleClose();
    handleLogIn();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const { firstname, lastname, faculty, login, email, password } = signUpData;

    const response: ApiResponse = await registration({
      body: JSON.stringify({
        firstname,
        lastname,
        faculty,
        login,
        email,
        password,
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
      aria-labelledby="modal-modal-signup"
      aria-describedby="modal-modal-authorization"
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
              {activeStep === STEPS.PERSONAL_INFO && (
                <PersonalInfoStep
                  signUpData={signUpData}
                  setSignUpData={setSignUpData}
                  isError={hasError}
                />
              )}
              {activeStep === STEPS.ACCOUNT_DETAIL && (
                <AccountDetailStep
                  signUpData={signUpData}
                  setSignUpData={setSignUpData}
                  errorMessage={errorMessage}
                />
              )}
              {activeStep === STEPS.VERIFICATION && (
                <VerificationStep
                  secretKey={secretKey}
                  setSecretKey={setSecretKey}
                  isError={hasError}
                />
              )}
            </Box>
            <Actions
              signUpData={signUpData}
              secretKey={secretKey}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              handleClear={handleClear}
              setHasError={setHasError}
              handleClose={handleClose}
            />
          </Box>
          {activeStep === STEPS.PERSONAL_INFO && (
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
