import { FC, Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import useTheme from "@mui/material/styles/useTheme";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AuthZone } from "./components/AuthZone";

import { dimensions, endpoints } from "../../../../constants";
import IPalette from "../../../../theme/IPalette.interface";

interface HeaderProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  handleDrawerToggle: () => void;
}

const Header: FC<HeaderProps> = ({ isAuth, setIsAuth, handleDrawerToggle }) => {
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const drawerWidth = dimensions.drawerWidth;

  const isFullTicketInfo: boolean = !!ticketId;
  const isCreateTicket: boolean = pathname === endpoints.createTicket;

  const isDrawStepBackAction: boolean = isFullTicketInfo || isCreateTicket;

  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        boxShadow: "none",
        backgroundImage: "none",
        backgroundColor: palette.grey.background,
        borderBottom: `2px solid ${palette.grey.card}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          height: "72px",
          justifyContent: {
            xs: "space-between",
            md: "flex-end",
          },
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {isDrawStepBackAction && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 48,
              bgcolor: palette.grey.card,
              display: { xs: "none", md: "block" },
            }}
          >
            <Button
              color="inherit"
              onClick={handleClick}
              sx={{ minWidth: "100%", minHeight: "100%" }}
            >
              <ArrowBackIcon sx={{ color: palette.common.white }} />
            </Button>
          </Box>
        )}
        <AuthZone isAuth={isAuth} setIsAuth={setIsAuth} />
      </Toolbar>
    </AppBar>
  );
};

export { Header };
