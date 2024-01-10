import { FormEvent, useState, FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { SxProps, Theme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { PasswordField } from "../../../PasswordField";

interface LoginStepProps {
  handleSignUn: () => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  wrapperStyle: SxProps<Theme>;
}

const LoginStep: FC<LoginStepProps> = ({
  handleSignUn,
  setActiveStep,
  setOpen,
  wrapperStyle,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const { loginUser } = useAuth();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOpenSignUpModal = (): void => {
    setOpen(false);
    handleSignUn();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const isLogged = await loginUser({ login, password });

    if (isLogged) {
      setOpen(false);
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={wrapperStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("login.loginHeader")}
        </Typography>
        <TextField
          label={t("login.loginInput")}
          value={login}
          onChange={event => setLogin(event.target.value)}
          error={hasError}
          fullWidth
        />
        <PasswordField
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder="common.password"
          hasError={hasError}
        />
        <Typography
          fontSize={14}
          sx={{
            color: palette.whiteAlpha.default,
            mt: -1,
            mb: -1,
            textAlign: "center",
          }}
        >
          {t("login.resetQuestion")}
          <span
            onClick={() => setActiveStep(1)}
            style={{
              marginLeft: 4,
              color: palette.semantic.info,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {t("login.restoreAccess")}
          </span>
        </Typography>
        <Button variant="contained" color="primary" type="submit">
          {t("login.comeInButton")}
        </Button>
        <Typography fontSize={14} sx={{ color: palette.whiteAlpha.default }}>
          {t("login.signUpQuestion")}
          <span
            onClick={handleOpenSignUpModal}
            style={{
              marginLeft: 4,
              color: palette.semantic.info,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {t("login.signUpRedirect")}
          </span>
        </Typography>
      </Grid>
    </form>
  );
};

export { LoginStep };
