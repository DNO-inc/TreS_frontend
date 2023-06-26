import { FC, Dispatch, SetStateAction, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Avatar, Button, ListItem, Tooltip, Typography } from "@mui/material";

import { VerticalDivider } from "../../../../../../../../components/VerticalDivider";

import { endpoints } from "../../../../../../../../constants";
import { useJwtDecode } from "../../../../../../../../shared/hooks";
import Logo from "../../../../../../../../assets/Logomark.svg";

interface AuthActionsProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthActions: FC<AuthActionsProps> = ({ isAuth, setIsAuth }) => {
  const { t } = useTranslation();
  const jwt = useJwtDecode();

  const userId: boolean | number =
    isAuth && jwt && JSON.parse(jwt.sub)?.user_id;
  const userName: string | null = localStorage.getItem("user-name");

  const handleLogOut = (event: MouseEvent): void => {
    event.preventDefault();

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

export { AuthActions };
