import { useState, FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { LogInModal } from "../../../../../../../../components/LogInModal";

const NoAuthActions: FC = () => {
  const { t } = useTranslation();
  const [showLogIn, setShowLogIn] = useState<boolean>(false);

  const handleLogIn = (): void => {
    setShowLogIn(true);
  };

  return (
    <>
      <Box>
        <Button
          variant="contained"
          onClick={handleLogIn}
          sx={{ minWidth: "100%" }}
        >
          {t("common.login")}
        </Button>
      </Box>
      {showLogIn && <LogInModal open={showLogIn} setOpen={setShowLogIn} />}
    </>
  );
};

export { NoAuthActions };
