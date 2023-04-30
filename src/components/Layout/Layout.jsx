import { useState } from "react";
import PropTypes from "prop-types";
import { MobileHeader } from "./components/MobileHeader";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";

const drawerWidth = 300;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Grid sx={{ display: "flex" }}>
      <MobileHeader
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          p: { xs: "80px 24px 24px", md: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: theme.palette.common.white,
          color: theme.palette.common.black,
        }}
      >
        <Outlet />
      </Box>
    </Grid>
  );
};

Layout.propTypes = {};

export { Layout };
