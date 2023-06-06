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
import { useJwtDecode } from "../../../../../../../../shared/hooks";

const AuthActions = ({ isAuth, setIsAuth }) => {
  const { data } = useJwtDecode();
  const userId = isAuth && JSON.parse(data.sub)?.user_id;
  const userName = localStorage.getItem("user-name");

  const handleLogOut = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-name");
    setIsAuth(false);
  };

  return (
    <ListItem key={"Log out"} sx={{ display: "flex", gap: 2 }}>
      <Typography>{userName}</Typography>
      <NavLink to={`${endpoints.profile}/${userId}`}>
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
