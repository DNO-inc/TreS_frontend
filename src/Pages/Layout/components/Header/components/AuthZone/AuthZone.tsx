import { FC, Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";

import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";

interface AuthZoneProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthZone: FC<AuthZoneProps> = ({ isAuth, setIsAuth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: { xs: 0, md: "8px 16px" },
      }}
    >
      {isAuth ? (
        <AuthActions isAuth={isAuth} setIsAuth={setIsAuth} />
      ) : (
        <NoAuthActions setIsAuth={setIsAuth} />
      )}
    </Box>
  );
};

export { AuthZone };
