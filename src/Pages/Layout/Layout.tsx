import { Dispatch, SetStateAction, useState, FC } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box, Grid, useTheme } from "@mui/material";
import IPalette from "../../theme/IPalette.interface";

interface LayoutProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const drawerWidth = 300;

const Layout: FC<LayoutProps> = ({ isAuth, setIsAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { palette }: IPalette = useTheme();

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

export { Layout };
