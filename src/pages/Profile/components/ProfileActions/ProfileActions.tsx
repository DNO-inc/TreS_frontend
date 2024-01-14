import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ProfileActionsProps {
  isEditMode: boolean;
  handelReset: () => void;
}

const ProfileActions: FC<ProfileActionsProps> = ({
  handelReset,
  isEditMode,
}) => {
  const { t } = useTranslation();

  const buttonText = isEditMode
    ? t("profile.editMode.cancelButton")
    : t("profile.editMode.editButton");

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handelReset}>
        {buttonText}
      </Button>
      {isEditMode && (
        <Button sx={{ flexGrow: 1 }} type="submit" variant="contained">
          {t("profile.editMode.applyButton")}
        </Button>
      )}
    </Box>
  );
};

export { ProfileActions };
