import {
  Avatar,
  IconButton,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { VerticalDivider } from "../../../../../../../VerticalDivider";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../../../../../../../assets/Logomark.svg";
import { endpoints } from "../../../../../../../../constants";

const AuthActions = ({ setIsAuth }) => {
  const handleLogOut = () => {
    localStorage.removeItem("jwt-token");
    setIsAuth(false);
  };

  return (
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
  );
};

AuthActions.propTypes = {};

export { AuthActions };
