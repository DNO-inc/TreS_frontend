import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextField, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import { SignUpTextField } from "../SignUpTextField";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../../../constants";
import IPalette from "../../../../theme/IPalette.interface";

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
  errorMessage: string;
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
  errorMessage,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

  return (
    <>
      <SignUpTextField
        type={"login"}
        value={login}
        setValue={setLogin}
        hasError={errorMessage.includes("login")}
        helperText={errorMessage.includes("login") ? errorMessage : ""}
      />
      <SignUpTextField type={"email"} value={email} setValue={setEmail} />
      <SignUpTextField
        type={"password"}
        value={password}
        setValue={setPassword}
        hasError={errorMessage.includes("password")}
        helperText={errorMessage.includes("password") ? errorMessage : ""}
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
      <Typography
        fontSize={14}
        sx={{
          mt: 2,
          width: "100%",
          textAlign: "center",
          color: palette.whiteAlpha.default,
        }}
      >
        {t("privacyPolicy.postscript.1")}
        <NavLink
          to={endpoints.privacyPolicy}
          target="blank"
          style={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          {t("privacyPolicy.postscript.link")}
        </NavLink>
        {t("privacyPolicy.postscript.2")}
      </Typography>
    </>
  );
};

export { AccountDetailStep };
