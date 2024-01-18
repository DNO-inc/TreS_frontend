import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { PasswordField } from "components/PasswordField";

import { UseFormSetValue } from "react-hook-form";
import { profileFormKeys } from "constants";
import { ProfileUpdateBody } from "pages/Profile/Profile";

interface PasswordChangeSectionProps {
  password: string;
  setValue: UseFormSetValue<ProfileUpdateBody>;
  handelChangePassword: () => void;
}

const PasswordChangeSection: FC<PasswordChangeSectionProps> = ({
  password,
  setValue,
  handelChangePassword,
}) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography fontSize={24}>{t("profile.passwordTitle")}</Typography>
      <PasswordField
        password={password}
        setPassword={(value: string) =>
          setValue(profileFormKeys.PASSWORD, value)
        }
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        placeholder="profile.editMode.password"
      />
      <Button
        sx={{ flexGrow: 1 }}
        variant="outlined"
        onClick={handelChangePassword}
      >
        {t("profile.changePasswordButton")}
      </Button>
    </Box>
  );
};

export { PasswordChangeSection };
