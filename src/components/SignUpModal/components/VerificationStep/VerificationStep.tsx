import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

interface VerificationStepProps {
  email: string;
  isVerified: boolean;
  setIsVerified: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
}

const VerificationStep: FC<VerificationStepProps> = ({ setIsVerified }) => {
  const { t } = useTranslation();

  const [secretKey, setSecretKey] = useState("");

  const SECRET_KEY = "i_love_burrito";

  return (
    <>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        {t("signUp.verificationDetails")}
      </Typography>
      <TextField
        size="small"
        label={t(`signUp.secretKey`)}
        value={secretKey}
        onChange={event => {
          const newSecretKey = event.target.value;
          setSecretKey(newSecretKey);
          setIsVerified(SECRET_KEY === newSecretKey);
        }}
        autoComplete={"new-confirmPassword"}
        fullWidth
        type="password"
        sx={{
          mb: 3,
          "& .MuiFormLabel-root": {
            top: 4,
          },
          "& .MuiInputBase-input": {
            p: "12px 14px",
          },
        }}
      />
    </>
  );
};

export { VerificationStep };
