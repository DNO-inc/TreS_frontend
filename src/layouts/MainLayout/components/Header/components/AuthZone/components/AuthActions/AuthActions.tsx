import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { VerticalDivider } from "components/VerticalDivider";
import { CustomTooltip } from "components/CustomTooltip";

import Logo from "../../../../../../../../assets/Logomark.svg";
import admin from "../../../../../../../../assets/admin.webp";
import { dimensions, endpoints, permissions } from "constants";
import { getUser, getUserRole } from "functions/manipulateLocalStorage";
import { useAuth } from "context/AuthContext/AuthContext";
import IPalette from "theme/IPalette.interface";
import { checkIsAdmin } from "functions/index";

const AuthActions: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.AUTH_ACTIONS}px)`
  );

  const { logoutUser } = useAuth();

  const isAdmin = checkIsAdmin();

  const { userId, login, userName } = getUser();
  const { permissionList } = getUserRole();
  const isCanCreateTicket = permissionList.includes(permissions.CREATE_TICKET);

  const [open, setOpen] = useState(false);
  const iconButtonRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = event => {
      const isIconButtonClicked =
        iconButtonRef.current && iconButtonRef.current.contains(event.target);

      const isBoxClicked =
        boxRef.current && boxRef.current.contains(event.target);

      if (!isIconButtonClicked && !isBoxClicked) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [iconButtonRef, boxRef]);

  const handleLogOut = (event: MouseEvent): void => {
    event.preventDefault();

    logoutUser();
    setOpen(false);
  };

  const handleRedirectToProfile = (): void => {
    navigate(`${endpoints.PROFILE}/${userId}`);
    setOpen(false);
  };

  const handleOpenMenu = (): void => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <span>{userName}</span>
        <CustomTooltip
          open={open}
          base={
            <Box ref={iconButtonRef}>
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Avatar"
                  src={isAdmin ? admin : Logo}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Box>
          }
        >
          <Box ref={boxRef} sx={{ p: "8px 16px 16px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Avatar
                alt="Avatar"
                src={isAdmin ? admin : Logo}
                sx={{
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  fontSize: 16,
                }}
              />
              <Typography>{userName}</Typography>
              <Typography
                sx={{
                  color: palette.whiteAlpha.default,
                  fontSize: 12,
                  mt: -0.5,
                }}
              >
                @{login}
              </Typography>
            </Box>
            <Divider sx={{ borderWidth: 1, width: "70%", m: "0 auto 16px" }} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "nowrap",
                gap: 2,
                "& > .MuiButton-root": {
                  backgroundColor: palette.grey.button,
                  color: "#ffffff",
                  textTransform: "initial",
                  borderRadius: 2,
                  p: "4px 15px",
                  border: `2px solid ${palette.grey.active}`,
                },
              }}
            >
              <Button color="inherit" onClick={handleRedirectToProfile}>
                <AccountBoxIcon fontSize="small" sx={{ mr: 1 }} />
                {t("common.profile")}
              </Button>
              <Button
                color="inherit"
                onClick={handleLogOut}
                sx={{ whiteSpace: "nowrap" }}
              >
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                {t("common.logout")}
              </Button>
            </Box>
          </Box>
        </CustomTooltip>
      </Box>
      {matches && isCanCreateTicket && (
        <>
          <VerticalDivider />
          <Link to={endpoints.CREATE_TICKET}>
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
