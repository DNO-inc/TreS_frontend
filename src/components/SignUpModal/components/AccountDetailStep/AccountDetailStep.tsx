import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

import { SignUpTextField } from "../SignUpTextField";

import { endpoints } from "../../../../constants";
import IPalette from "../../../../theme/IPalette.interface";
import { ISignUpData } from "../../SignUpModal";

interface AccountDetailStepProps {
  signUpData: ISignUpData;
  setSignUpData: Dispatch<SetStateAction<ISignUpData>>;
  errorMessage: string;
}

const ACTION_TYPES = {
  LOGIN: "login",
  EMAIL: "email",
  PASSWORD: "password",
};

const AccountDetailStep: FC<AccountDetailStepProps> = ({
  signUpData,
  setSignUpData,
  errorMessage,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

  const checkError = (word: string) => {
    return errorMessage.includes(word);
  };

  const renderSignUpTextField = (
    type: string,
    value: string,
    setValue: Dispatch<SetStateAction<ISignUpData>>
  ) => (
    <SignUpTextField
      type={type}
      value={value}
      setValue={setValue}
      hasError={checkError(type)}
      helperText={checkError(type) ? errorMessage : ""}
    />
  );

  return (
    <>
      {renderSignUpTextField(
        ACTION_TYPES.LOGIN,
        signUpData.login,
        setSignUpData
      )}
      {renderSignUpTextField(
        ACTION_TYPES.EMAIL,
        signUpData.email,
        setSignUpData
      )}
      {renderSignUpTextField(
        ACTION_TYPES.PASSWORD,
        signUpData.password,
        setSignUpData
      )}
      <TextField
        size="small"
        label={t(`signUp.confirmPasswordInput`)}
        value={signUpData.confirmedPassword}
        onChange={event => {
          const newPassword = event.target.value;

          setSignUpData(prevState => ({
            ...prevState,
            confirmedPassword: newPassword,
          }));
          setIsConfirmed(signUpData.password === newPassword);
        }}
        error={!isConfirmed}
        required
        autoComplete={"new-confirmPassword"}
        fullWidth
        type="password"
        sx={{
          ".MuiFormLabel-root": {
            top: 4,
          },
          ".MuiInputBase-input": {
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
          to={endpoints.PRIVACY_POLICY}
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
