import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ProfileActionsProps {
  isEditMode: boolean;
  handelReset: () => void;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

const ProfileActions: FC<ProfileActionsProps> = ({
  handelReset,
  isEditMode,
  setIsEditMode,
}) => {
  const { t } = useTranslation();

  const handleEdit = () => {
    setIsEditMode(prevState => !prevState);
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isEditMode ? (
        <>
          <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handelReset}>
            {t("profile.editMode.cancelButton")}
          </Button>
          <Button sx={{ flexGrow: 1 }} type="submit" variant="contained">
            {t("profile.editMode.applyButton")}
          </Button>
        </>
      ) : (
        <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={handleEdit}>
          {t("profile.editMode.editButton")}
        </Button>
      )}
    </Box>
  );
};

export { ProfileActions };
