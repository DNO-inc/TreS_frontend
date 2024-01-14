import { FC, lazy } from "react";

import Box from "@mui/material/Box";

import { dimensions } from "../../../../constants";

const MobileDrawer = lazy(() => import("./components/MobileDrawer"));
const CommonDrawer = lazy(() => import("./components/CommonDrawer"));

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const container: (() => HTMLElement) | undefined =
    window !== undefined ? () => window.document.body : undefined;

  const drawerWidth = dimensions.DRAWER_WIDTH;

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        height: "100%",
        flexShrink: { md: 0 },
      }}
      aria-label="mailbox folders"
    >
      {mobileOpen ? (
        <MobileDrawer
          container={container}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      ) : (
        <CommonDrawer />
      )}
    </Box>
  );
};

export { Sidebar };
