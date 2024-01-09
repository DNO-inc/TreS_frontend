import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface VerificationStepProps {
  secretKey: string;
  setSecretKey: Dispatch<SetStateAction<string>>;
  isError: boolean;
}

const VerificationStep: FC<VerificationStepProps> = ({
  secretKey,
  setSecretKey,
  isError,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography sx={{ mt: 4, mb: 1, textAlign: "center" }}>
        {t("signUp.verificationDetails")}
      </Typography>
      <TextField
        size="small"
        label={t(`signUp.secretKey`)}
        value={secretKey}
        onChange={event => {
          const newSecretKey = event.target.value;
          setSecretKey(newSecretKey);
        }}
        autoComplete={"new-confirmPassword"}
        fullWidth
        error={isError}
        helperText={isError ? t("signUp.invalidKey") : " "}
        sx={{
          mb: 1,
          ".MuiFormLabel-root": {
            top: 4,
          },
          ".MuiInputBase-input": {
            p: "12px 14px",
          },
        }}
      />
    </>
  );
};

export { VerificationStep };
