import { useState } from "react";
import PropTypes from "prop-types";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";

const drawerWidth = 300;

const Layout = ({ isAuth, setIsAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { palette } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Grid sx={{ display: "flex" }}>
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Sidebar
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          minHeight: "100vh",
          p: { xs: "100px 8px 8px", sm: "100px 24px 24px" },
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: palette.grey.background,
          color: palette.common.white,
          "& > div > h1": {
            mb: 3,
          },
        }}
      >
        <Outlet />
      </Box>
    </Grid>
  );
};

Layout.propTypes = {};

export { Layout };
