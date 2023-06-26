import { useState, FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { Box, Button, ListItem } from "@mui/material";

import { LogInModal } from "../../../../../../../../components/LogInModal";

interface NoAuthActionsProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const NoAuthActions: FC<NoAuthActionsProps> = ({ setIsAuth }) => {
  const { t } = useTranslation();
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  const handleLogIn = (): void => {
    setShowLogIn(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ListItem key={"Log In"}>
        <Button
          variant="contained"
          onClick={handleLogIn}
          sx={{ minWidth: "100%" }}
        >
          {t("common.login")}
        </Button>
      </ListItem>
      {showLogIn && (
        <LogInModal
          open={showLogIn}
          setOpen={setShowLogIn}
          setIsAuth={setIsAuth}
        />
      )}
    </Box>
  );
};

export { NoAuthActions };
