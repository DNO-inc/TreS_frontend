import Box from "@mui/material/Box";
import { MobileDrawer } from "./components/MobileDrawer/MobileDrawer";
import { CommonDrawer } from "./components/CommonDrawer/CommonDrawer";

interface ISidebarProps {
  mobileOpen: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Sidebar = ({
  mobileOpen,
  drawerWidth,
  handleDrawerToggle,
}: ISidebarProps) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth, handleDrawerToggle },
        height: "100%",
        flexShrink: { md: 0 },
      }}
      aria-label="mailbox folders"
    >
      <MobileDrawer
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <CommonDrawer drawerWidth={drawerWidth} />
    </Box>
  );
};

Sidebar.propTypes = {};

export { Sidebar };
