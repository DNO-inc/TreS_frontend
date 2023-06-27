import { FC } from "react";

import { Box } from "@mui/material";

import { MobileDrawer } from "./components/MobileDrawer/MobileDrawer";
import { CommonDrawer } from "./components/CommonDrawer/CommonDrawer";

interface SidebarProps {
  mobileOpen: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  mobileOpen,
  drawerWidth,
  handleDrawerToggle,
}) => {
  const container: (() => HTMLElement) | undefined =
    window !== undefined ? () => window.document.body : undefined;

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
          drawerWidth={drawerWidth}
        />
      ) : (
        <CommonDrawer drawerWidth={drawerWidth} />
      )}
    </Box>
  );
};

export { Sidebar };
