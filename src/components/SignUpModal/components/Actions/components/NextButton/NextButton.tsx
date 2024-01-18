import { FC } from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";

interface NextButtonProps {
  activeStep: number;
  disabled: boolean;
  handleNext?: () => void;
}

const NextButton: FC<NextButtonProps> = ({
  activeStep,
  disabled,
  handleNext,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {activeStep === 0 && (
        <Button onClick={handleNext} variant="contained" disabled={disabled}>
          {t("signUp.next")}
        </Button>
      )}
      {activeStep === 1 && (
        <Button type="submit" variant="contained" disabled={disabled}>
          {t("signUp.next")}
        </Button>
      )}
    </>
  );
};

export { NextButton };
