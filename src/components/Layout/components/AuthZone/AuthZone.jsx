import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import Logo from "../../../../assets/Logomark.svg";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../../../constants";
import { useTranslation } from "react-i18next";

const AuthZone = ({ isAuth, setIsAuth }) => {
  const { t } = useTranslation();

  const handleLogIn = () => {
    setIsAuth(true);
  };

  const handleLogOut = () => {
    setIsAuth(false);
  };

  return (
    <List>
      {!isAuth ? (
        <ListItem
          key={"Log In"}
          sx={{
            padding: { xs: 0, md: "8px 16px" },
          }}
        >
          <Button
            variant="contained"
            onClick={handleLogIn}
            sx={{ minWidth: "100%" }}
          >
            {t("common.login")}
          </Button>
        </ListItem>
      ) : (
        <ListItem
          key={"Log out"}
          sx={{ display: "flex", padding: { xs: 0, md: "8px 16px" } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: "1 0 auto" }}>
            <NavLink to={endpoints.profile}>
              <Avatar
                alt="Avatar"
                src={Logo}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
            </NavLink>
            <Typography sx={{ display: { xs: "none", md: "inline-block" } }}>
              {t("common.profile")}
            </Typography>
          </Box>
          <NavLink to={endpoints.base}>
            <Button onClick={handleLogOut} sx={{ minWidth: 2 }}>
              <ListItemIcon sx={{ minWidth: 2 }}>
                <LogoutIcon />
              </ListItemIcon>
            </Button>
          </NavLink>
        </ListItem>
      )}
    </List>
  );
};

AuthZone.propTypes = {};

export { AuthZone };
