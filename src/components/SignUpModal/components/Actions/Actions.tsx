import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ActionsProps {
  firstname: string;
  lastname: string;
  faculty: number | null;
  login: string;
  email: string;
  password: string;
  confirmedPassword: string;
  isVerified: boolean;
  steps: string[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const Actions: FC<ActionsProps> = ({
  firstname,
  lastname,
  faculty,
  login,
  email,
  password,
  confirmedPassword,
  isVerified,
  steps,
  activeStep,
  setActiveStep,
}) => {
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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
          variant="contained"
          onClick={handleNext}
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
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
      <Button
        variant="outlined"
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        {t("signUp.back")}
      </Button>
      <NextButton />
      <Button
        sx={{
          display: activeStep === steps.length - 1 ? "block" : "none",
        }}
        type="submit"
        variant="contained"
        disabled={!isVerified}
      >
        {t("signUp.finish")}
      </Button>
    </Box>
  );
};

export { Actions };
