import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { SidebarActions } from "./components/SidebarActions";
import { useTheme } from "@emotion/react";

const Sidebar = ({
  isAuth,
  setIsAuth,
  mobileOpen,
  drawerWidth,
  handleDrawerToggle,
}) => {
  const container =
    window !== undefined ? () => window.document.body : undefined;

  const theme = useTheme();

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
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          "& > div": {
            "&::-webkit-scrollbar": {
              width: 3,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "inherit",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#A0A0A0",
              borderRadius: 2,
            },
          },
        }}
      >
        <SidebarActions isAuth={isAuth} setIsAuth={setIsAuth} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          "& > div": {
            "&::-webkit-scrollbar": {
              width: 3,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "inherit",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.grey[400],
              borderRadius: 2,
            },
          },
        }}
        open
      >
        <SidebarActions isAuth={isAuth} setIsAuth={setIsAuth} />
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {};

export { Sidebar };
