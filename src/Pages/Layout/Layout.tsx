import { Dispatch, SetStateAction, useState, FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import IPalette from "../../theme/IPalette.interface";
import { Loader } from "../../components/Loader";
import { dimensions } from "../../constants";

interface LayoutProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const Layout: FC<LayoutProps> = ({ isAuth, setIsAuth }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { palette }: IPalette = useTheme();

  const drawerWidth = dimensions.drawerWidth;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          minHeight: "100vh",
          p: { xs: "72px 8px 8px 32px", sm: "72px 24px 24px 32px" },
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: palette.grey.background,
          color: palette.common.white,
          "& > .MuiGrid-root > .MuiBox-root:first-of-type": {
            position: "fixed",
            left: { xs: 0, md: drawerWidth },
            right: 0,
            p: { xs: "24px 8px 8px", sm: "24px 24px 24px" },
            bgcolor: palette.grey.background,
            zIndex: 100,
            "& > .MuiTypography-h1": {
              mb: 3,
            },
          },
          "& > .MuiGrid-root > .MuiBox-root:nth-of-type(2)": {
            pt: 21,
          },
        }}
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export { Layout };
