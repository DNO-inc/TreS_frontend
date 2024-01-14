import { useState, FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import LogInModal from "../../../../../../../../components/LogInModal";
import SignUpModal from "../../../../../../../../components/SignUpModal";

const NoAuthActions: FC = () => {
  const { t } = useTranslation();
  const [showLogIn, setShowLogIn] = useState<boolean>(false);
  const [showSignUn, setShowSignUp] = useState<boolean>(false);

  const handleLogIn = (): void => {
    setShowLogIn(true);
  };

  const handleSignUn = (): void => {
    setShowSignUp(true);
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleLogIn}
          sx={{ minWidth: "42%" }}
        >
          {t("common.login")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSignUn}
          sx={{ minWidth: "42%" }}
        >
          {t("signUp.header")}
        </Button>
      </Box>
      <LogInModal
        open={showLogIn}
        setOpen={setShowLogIn}
        handleSignUn={handleSignUn}
      />
      <SignUpModal
        open={showSignUn}
        setOpen={setShowSignUp}
        handleLogIn={handleLogIn}
      />
    </>
  );
};

export { NoAuthActions };
