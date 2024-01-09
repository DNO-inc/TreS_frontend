import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useEmailVerificationMutation } from "../../../../store/api/registration.api";
import { useAuth } from "../../../../context/AuthContext";
import { ISignUpData } from "../../SignUpModal";
import { NextButton } from "./components/NextButton";

interface ActionsProps {
  signUpData: ISignUpData;
  secretKey: string;
  steps: string[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  handleClear: () => void;
  setHasError: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
}

const Actions: FC<ActionsProps> = ({
  signUpData,
  secretKey,
  steps,
  activeStep,
  setActiveStep,
  handleClear,
  setHasError,
  handleClose,
}) => {
  const { t } = useTranslation();

  const {
    firstname,
    lastname,
    faculty,
    login,
    email,
    password,
    confirmedPassword,
  } = signUpData;

  const { registerUser } = useAuth();
  const [emailVerification] = useEmailVerificationMutation();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    handleClear();
    setActiveStep(0);
  };

  const handleVerify = async () => {
    const verificationResponse: any = await emailVerification({
      body: JSON.stringify({ email_code: secretKey, email: email }),
    });

    if (verificationResponse.data) {
      registerUser(verificationResponse.data);

      handleClose();
      handleClear();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 4000);
    }
  };

  const isDisabled =
    activeStep === 0
      ? ![firstname, lastname, faculty].every(Boolean)
      : ![login, email, password, confirmedPassword].every(Boolean) ||
        password !== confirmedPassword;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        ".MuiButton-root": {
          minWidth: 100,
        },
      }}
    >
      {activeStep === steps.length - 1 ? (
        <Button variant="outlined" color="inherit" onClick={handleReset}>
          {t("signUp.reset")}
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          {t("signUp.back")}
        </Button>
      )}
      <NextButton
        activeStep={activeStep}
        disabled={isDisabled}
        handleNext={handleNext}
      />
      {activeStep === steps.length - 1 && (
        <Button
          variant="contained"
          disabled={!secretKey}
          onClick={handleVerify}
        >
          {t("signUp.finish")}
        </Button>
      )}
    </Box>
  );
};

export { Actions };
