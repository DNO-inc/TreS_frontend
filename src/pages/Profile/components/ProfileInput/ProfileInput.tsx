import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { TextField } from "@mui/material";

interface ProfileInputProps {
  register: UseFormRegister<FieldValues>;
  value: string | number | null;
  inputType: string;
}

const ProfileInput: FC<ProfileInputProps> = ({
  register,
  value,
  inputType,
}) => {
  const { t } = useTranslation();

  const placeholder = t(`profile.editMode.${inputType}`);

  return (
    <TextField
      id="ticket-title"
      placeholder={placeholder}
      defaultValue={value}
      variant="standard"
      fullWidth
      {...register(inputType)}
      sx={{ maxWidth: 170 }}
    />
  );
};

export { ProfileInput };
