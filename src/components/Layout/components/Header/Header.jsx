import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { AuthZone } from "./components/AuthZone";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { endpoints } from "../../../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = ({ isAuth, setIsAuth, drawerWidth, handleDrawerToggle }) => {
  const { palette } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isNeedStepBack = pathname === endpoints.createTicket;

  const handleClick = () => {
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
        {isNeedStepBack && (
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

Header.propTypes = {
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export { Header };
