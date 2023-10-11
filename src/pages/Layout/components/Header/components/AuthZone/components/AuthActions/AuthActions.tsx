import { FC, MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { VerticalDivider } from "../../../../../../../../components/VerticalDivider";

import { endpoints } from "../../../../../../../../constants";
import Logo from "../../../../../../../../assets/Logomark.svg";
import {
  getUserId,
  getUserLogin,
} from "../../../../../../../../shared/functions/getLocalStorageData";
import { useAuth } from "../../../../../../../../context/AuthContext";

interface AuthActionsProps {
  matches: boolean;
}

const AuthActions: FC<AuthActionsProps> = ({ matches }) => {
  const { t } = useTranslation();

  const { logoutUser } = useAuth();

  const userId: number | null = getUserId();
  const [userName, setUserName] = useState(getUserLogin());

  const handleLogOut = (event: MouseEvent): void => {
    event.preventDefault();

    logoutUser();
  };

  useEffect(() => {
    const userLogin = getUserLogin();
    setUserName(userLogin);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {matches && <span>{userName}</span>}
        <Link to={`${endpoints.profile}/${userId}`}>
          <Tooltip
            title={
              <Button sx={{ color: "#ffffff" }} onClick={handleLogOut}>
                {t("common.logout")}
              </Button>
            }
          >
            <Avatar alt="Avatar" src={Logo} sx={{ width: 36, height: 36 }} />
          </Tooltip>
        </Link>
      </Box>
      {matches && (
        <>
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
      )}
    </>
  );
};

export { AuthActions };
