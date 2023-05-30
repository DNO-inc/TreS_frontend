import List from "@mui/material/List";
import PropTypes from "prop-types";
import { AuthActions } from "./components/AuthActions";
import { NoAuthActions } from "./components/NoAuthActions";

const AuthZone = ({ isAuth, setIsAuth }) => {
  return (
    <List
      sx={{
        "& > li": {
          padding: { xs: 0, md: "8px 16px" },
        },
      }}
    >
      {isAuth ? (
        <AuthActions setIsAuth={setIsAuth} />
      ) : (
        <NoAuthActions setIsAuth={setIsAuth} />
      )}
    </List>
  );
};

AuthZone.propTypes = {};

export { AuthZone };
