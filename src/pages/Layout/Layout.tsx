import { useState, FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import IPalette from "../../theme/IPalette.interface";
import { Loader } from "../../components/Loader";
import { dimensions } from "../../constants";
import { ErrorBoundary } from "../../components/ErrorBoundary";

const Layout: FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { palette }: IPalette = useTheme();

  const drawerWidth = dimensions.drawerWidth;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ErrorBoundary>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flex: "1 0 auto",
            minHeight: "100vh",
            p: { xs: "64px 16px 16px 16px", sm: "64px 24px 16px 24px" },
            width: `calc(100% - ${drawerWidth}px)`,
            bgcolor: palette.grey.background,
            color: palette.common.white,
            "& > .MuiGrid-root": {
              flexWrap: { sm: "wrap", xs: "nowrap" },
            },
            "& > .MuiGrid-root > .MuiBox-root:first-of-type": {
              position: "fixed",
              left: { xs: 0, md: drawerWidth },
              right: 0,
              p: { xs: "16px 16px 8px", sm: "16px 24px" },
              bgcolor: palette.grey.background,
              zIndex: 100,
              "& > .MuiTypography-root": {
                fontSize: { xs: 36, sm: 40 },
              },
            },
            "& > .MuiGrid-root > .MuiBox-root:nth-of-type(2)": {
              pt: { xs: 16, sm: 17 },
            },
          }}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </ErrorBoundary>
    </Box>
  );
};

export { Layout };
