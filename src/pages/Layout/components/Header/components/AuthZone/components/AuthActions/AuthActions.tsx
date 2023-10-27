import { FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { VerticalDivider } from "../../../../../../../../components/VerticalDivider";

import { endpoints } from "../../../../../../../../constants";
import Logo from "../../../../../../../../assets/Logomark.svg";
import {
  getUserId,
  getUserName,
  getUserLogin,
  getPermissions,
} from "../../../../../../../../shared/functions/getLocalStorageData";
import { useAuth } from "../../../../../../../../context/AuthContext";
import IPalette from "../../../../../../../../theme/IPalette.interface";
import { CustomTooltip } from "../../../../../../../../components/CustomTooltip";

const AuthActions: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 600px)");

  const { logoutUser } = useAuth();

  const permissions = getPermissions();
  const isCanCreateTicket = permissions.includes("CREATE_TICKET");

  const userId: number | null = getUserId();
  const userLogin = getUserLogin();
  const userName = getUserName();
  const [open, setOpen] = useState(false);

  const handleLogOut = (event: MouseEvent): void => {
    event.preventDefault();

    logoutUser();
    setOpen(false);
  };

  const handleRedirectToProfile = (): void => {
    navigate(`${endpoints.profile}/${userId}`);
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
          setOpen={setOpen}
          base={
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
              <Avatar alt="Avatar" src={Logo} sx={{ width: 32, height: 32 }} />
            </IconButton>
          }
        >
          <div style={{ padding: "8px 16px 16px" }}>
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
                src={Logo}
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
                @{userLogin}
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
              <Button color="inherit" onClick={handleLogOut}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                {t("common.logout")}
              </Button>
            </Box>
          </div>
        </CustomTooltip>
      </Box>
      {matches && isCanCreateTicket && (
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
