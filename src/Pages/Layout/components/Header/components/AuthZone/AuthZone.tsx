import { FC, Dispatch, SetStateAction } from "react";

import { List } from "@mui/material";

import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";

interface AuthZoneProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthZone: FC<AuthZoneProps> = ({ isAuth, setIsAuth }) => {
  return (
    <List
      sx={{
        "& > li": {
          padding: { xs: 0, md: "8px 16px" },
        },
      }}
    >
      {isAuth ? (
        <AuthActions isAuth={isAuth} setIsAuth={setIsAuth} />
      ) : (
        <NoAuthActions setIsAuth={setIsAuth} />
      )}
    </List>
  );
};

export { AuthZone };
