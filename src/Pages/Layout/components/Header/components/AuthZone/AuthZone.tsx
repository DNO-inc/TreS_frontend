import { FC } from "react";

import Box from "@mui/material/Box";

import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";
import { useAuth } from "../../../../../../context/AuthContext";

const AuthZone: FC = () => {
  const { isAuth } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: { xs: 0, md: "8px 16px" },
      }}
    >
      {isAuth ? <AuthActions /> : <NoAuthActions />}
    </Box>
  );
};

export { AuthZone };
