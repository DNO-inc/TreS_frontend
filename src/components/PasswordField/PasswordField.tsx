import { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>> | ((value: string) => void);
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  isAutocomplete?: boolean;
  hasError?: boolean;
}

const PasswordField: FC<PasswordFieldProps> = ({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  placeholder,
  isAutocomplete = false,
  hasError,
}) => {
  const { t } = useTranslation();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setPassword(event.target.value);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">
        {t(placeholder)}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange}
        error={hasError}
        inputProps={
          isAutocomplete
            ? {}
            : {
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

export { PasswordField };
