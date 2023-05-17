import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { AuthZone } from "../AuthZone";
import { useTheme } from "@emotion/react";

const Header = ({ isAuth, setIsAuth, drawerWidth, handleDrawerToggle }) => {
  const { palette } = useTheme();

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
