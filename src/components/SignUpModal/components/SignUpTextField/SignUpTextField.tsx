import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import TextField from "@mui/material/TextField";

import { ISignUpData } from "../../SignUpModal";

interface SignUpTextFieldProps {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<ISignUpData>>;
  hasError?: boolean;
  helperText?: string;
}
const SignUpTextField: FC<SignUpTextFieldProps> = ({
  type,
  value,
  setValue,
  hasError,
  helperText,
}) => {
  const { t } = useTranslation();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(prevState => {
      return { ...prevState, [type]: event.target.value };
    });
  };

  return (
    <TextField
      size="small"
      label={t(`signUp.${type}Input`)}
      value={value}
      onChange={handleChange}
      error={hasError}
      required
      autoComplete={`new-${type}`}
      fullWidth
      type={type}
      helperText={helperText || " "}
      sx={{
        ".MuiFormLabel-root": {
          top: 4,
        },
        ".MuiInputBase-input": {
          p: "12px 14px",
        },
      }}
    />
  );
};

export { SignUpTextField };
