import { useState } from "react";
import { Box, Button, ListItem } from "@mui/material";
import { LogInModal } from "../../../../../../../LogInModal";
import { SignUpModal } from "../../../../../../../SignUpModal";
import { useTranslation } from "react-i18next";

const NoAuthActions = ({ setIsAuth }) => {
  const { t } = useTranslation();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleSignUp = () => {
    setShowSignUp(true);
  };

  const handleLogIn = () => {
    setShowLogIn(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <ListItem key={"Sign Up"}>
        <Button
          variant="contained"
          onClick={handleSignUp}
          sx={{ minWidth: "110%" }}
        >
          {t("common.signup")}
        </Button>
      </ListItem>
      {showSignUp && <SignUpModal open={showSignUp} setOpen={setShowSignUp} />} */}
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

NoAuthActions.propTypes = {};

export { NoAuthActions };
