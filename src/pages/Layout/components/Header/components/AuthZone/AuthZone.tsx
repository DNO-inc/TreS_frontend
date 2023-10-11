import { FC } from "react";

import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";
import { useAuth } from "../../../../../../context/AuthContext";

const AuthZone: FC = () => {
  const matches = useMediaQuery("(min-width: 600px)");
  const { isAuth } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      {isAuth ? <AuthActions matches={matches} /> : <NoAuthActions />}
    </Box>
  );
};

export { AuthZone };
