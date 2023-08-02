import { FC, Dispatch, SetStateAction, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

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

  const userId: boolean | number = isAuth && jwt && jwt?.user_id;
  const userName: string | null = localStorage.getItem("user-name");

  const handleLogOut = (event: MouseEvent): void => {
    event.preventDefault();

    localStorage.removeItem("access-token");
    localStorage.removeItem("user-name");

    setIsAuth(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <span>{userName}</span>
        <Link to={`${endpoints.profile}/${userId}`}>
          <Tooltip
            title={
              <Button sx={{ color: "#ffffff" }} onClick={handleLogOut}>
                log out
              </Button>
            }
          >
            <Avatar alt="Avatar" src={Logo} sizes="40" />
          </Tooltip>
        </Link>
      </Box>
      <VerticalDivider />
      <Link to={endpoints.createTicket}>
        <Button
          variant={"contained"}
          sx={{ fontSize: 14, textTransform: "none" }}
        >
          {t("common.createButton")}
        </Button>
      </Link>
    </>
  );
};

export { AuthActions };
