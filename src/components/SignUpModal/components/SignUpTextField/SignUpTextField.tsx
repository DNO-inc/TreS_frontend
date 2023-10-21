import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";

interface SignUpTextFieldProps {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  hasError: boolean;
}
const SignUpTextField: FC<SignUpTextFieldProps> = ({
  type,
  value,
  setValue,
  hasError,
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      size="small"
      label={t(`signUp.${type}Input`)}
      value={value}
      onChange={event => setValue(event.target.value)}
      error={hasError}
      required
      autoComplete={`new-${type}`}
      fullWidth
      type={type}
      sx={{
        "& .MuiFormLabel-root": {
          top: 4,
        },
        "& .MuiInputBase-input": {
          p: "12px 14px",
        },
      }}
    />
  );
};

export { SignUpTextField };
