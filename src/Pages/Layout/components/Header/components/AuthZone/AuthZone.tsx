import List from "@mui/material/List";
import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";

interface IAuthZone {
  isAuth: boolean;
  setIsAuth: (param: boolean) => void;
}

const AuthZone = ({ isAuth, setIsAuth }: IAuthZone) => {
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

AuthZone.propTypes = {};

export { AuthZone };
