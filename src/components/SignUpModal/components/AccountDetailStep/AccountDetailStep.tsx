import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";

import { SignUpTextField } from "../SignUpTextField";

interface AccountDetailStepProps {
  login: string;
  setLogin: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmedPassword: string;
  setConfirmedPassword: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isError: boolean;
}

const AccountDetailStep: FC<AccountDetailStepProps> = ({
  login,
  setLogin,
  password,
  setPassword,
  confirmedPassword,
  setConfirmedPassword,
  email,
  setEmail,
  isError,
}) => {
  const { t } = useTranslation();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

  return (
    <>
      <SignUpTextField
        type={"login"}
        value={login}
        setValue={setLogin}
        hasError={isError}
      />
      <SignUpTextField
        type={"email"}
        value={email}
        setValue={setEmail}
        hasError={isError}
      />
      <SignUpTextField
        type={"password"}
        value={password}
        setValue={setPassword}
        hasError={isError}
      />
      <TextField
        size="small"
        label={t(`signUp.confirmPasswordInput`)}
        value={confirmedPassword}
        onChange={event => {
          const newPassword = event.target.value;
          setConfirmedPassword(newPassword);
          setIsConfirmed(password === newPassword);
        }}
        error={!isConfirmed}
        required
        autoComplete={"new-confirmPassword"}
        fullWidth
        type="password"
        sx={{
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

export { AccountDetailStep };
