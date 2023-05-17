import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { Avatar, Typography } from "@mui/material";
import Logo from "../../../../assets/Logomark.svg";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../../../constants";
import { useTranslation } from "react-i18next";
import { VerticalDivider } from "../../../VerticalDivider";

const AuthZone = ({ isAuth, setIsAuth }) => {
  const { t } = useTranslation();

  const handleLogIn = () => {
    setIsAuth(true);
  };

  const handleLogOut = () => {
    setIsAuth(false);
  };

  return (
    <List
      sx={{
        "& > li": {
          padding: { xs: 0, md: "8px 16px" },
        },
      }}
    >
      {!isAuth ? (
        <ListItem key={"Log In"}>
          <Button
            variant="contained"
            onClick={handleLogIn}
            sx={{ minWidth: "100%" }}
          >
            {t("common.login")}
          </Button>
        </ListItem>
      ) : (
        <ListItem key={"Log out"} sx={{ display: "flex", gap: 2 }}>
          <Typography sx={{ display: { xs: "none", md: "inline-block" } }}>
            User name
          </Typography>
          <NavLink to={endpoints.profile}>
            <Avatar alt="Avatar" src={Logo} sizes="40" sx={{ mr: 1 }} />
          </NavLink>
          <VerticalDivider />
          <NavLink to={endpoints.base}>
            <IconButton onClick={handleLogOut} sx={{ minWidth: 2 }}>
              <ListItemIcon sx={{ minWidth: 2 }}>
                <LogoutIcon />
              </ListItemIcon>
            </IconButton>
          </NavLink>
          <VerticalDivider />
        </ListItem>
      )}
    </List>
  );
};

AuthZone.propTypes = {};

export { AuthZone };
