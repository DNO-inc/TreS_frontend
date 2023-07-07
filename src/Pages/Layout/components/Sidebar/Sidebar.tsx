import { FC } from "react";

import Box from "@mui/material/Box";

import { MobileDrawer } from "./components/MobileDrawer/MobileDrawer";
import { CommonDrawer } from "./components/CommonDrawer/CommonDrawer";

import { dimensions } from "../../../../constants";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const container: (() => HTMLElement) | undefined =
    window !== undefined ? () => window.document.body : undefined;

  const drawerWidth = dimensions.drawerWidth;

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
