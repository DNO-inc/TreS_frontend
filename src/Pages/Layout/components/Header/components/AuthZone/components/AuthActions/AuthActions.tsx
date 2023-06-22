import { Avatar, Button, ListItem, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { VerticalDivider } from "../../../../../../../../components/VerticalDivider";
import Logo from "../../../../../../../../assets/Logomark.svg";
import { endpoints } from "../../../../../../../../constants";
import { useJwtDecode } from "../../../../../../../../shared/hooks";
import { useTranslation } from "react-i18next";

interface IAuthActions {
  isAuth: boolean;
  setIsAuth: (param: boolean) => void;
}

const AuthActions = ({ isAuth, setIsAuth }: IAuthActions) => {
  const { t } = useTranslation();
  const { data } = useJwtDecode();
  const userId = isAuth && data && JSON.parse(data.sub)?.user_id;
  const userName = localStorage.getItem("user-name");

  const handleLogOut = e => {
    e.preventDefault();
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-name");
    setIsAuth(false);
  };

  return (
    <ListItem key={"Log out"} sx={{ display: "flex", gap: 2 }}>
      <Typography>{userName}</Typography>
      <NavLink to={`${endpoints.profile}/${userId}`}>
        <Tooltip
          title={
            <Button sx={{ color: "#ffffff" }} onClick={handleLogOut}>
              log out
            </Button>
          }
        >
          <Avatar alt="Avatar" src={Logo} sizes="40" sx={{ mr: 1 }} />
        </Tooltip>
      </NavLink>
      <VerticalDivider />
      <NavLink to={endpoints.createTicket}>
        <Button
          variant={"contained"}
          sx={{ fontSize: 14, textTransform: "none" }}
        >
          {t("common.createButton")}
        </Button>
      </NavLink>
    </ListItem>
  );
};

AuthActions.propTypes = {};

export { AuthActions };
