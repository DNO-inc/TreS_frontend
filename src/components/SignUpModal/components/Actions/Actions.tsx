import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEmailVerificationMutation } from "../../../../store/api/registration/registration.api";
import { useAuth } from "../../../../context/AuthContext";

interface ActionsProps {
  firstname: string;
  lastname: string;
  faculty: number | null;
  login: string;
  email: string;
  password: string;
  confirmedPassword: string;
  secretKey: string;
  steps: string[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  handleClear: () => void;
  setHasError: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
}

const Actions: FC<ActionsProps> = ({
  firstname,
  lastname,
  faculty,
  login,
  email,
  password,
  confirmedPassword,
  secretKey,
  steps,
  activeStep,
  setActiveStep,
  handleClear,
  setHasError,
  handleClose,
}) => {
  const { t } = useTranslation();

  const { loginUser } = useAuth();
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
      body: JSON.stringify({ email_code: secretKey }),
    });

    if (verificationResponse.data) {
      loginUser({ login, password });

      handleClose();
      handleClear();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 4000);
    }
  };

  const NextButton = () => {
    if (activeStep === 0) {
      return (
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!firstname || !lastname || !faculty}
        >
          {t("signUp.next")}
        </Button>
      );
    }

    if (activeStep === 1) {
      return (
        <Button
          type="submit"
          variant="contained"
          disabled={
            !login ||
            !email ||
            !password ||
            !confirmedPassword ||
            !(password === confirmedPassword)
          }
        >
          {t("signUp.next")}
        </Button>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        "& > .MuiButton-root": {
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
      <NextButton />
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
