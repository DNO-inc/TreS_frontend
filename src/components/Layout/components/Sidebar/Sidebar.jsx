import Box from "@mui/material/Box";
import { MobileDrawer } from "./components/MobileDrawer/MobileDrawer";
import { CommonDrawer } from "./components/CommonDrawer/CommonDrawer";

const Sidebar = ({
  isAuth,
  setIsAuth,
  mobileOpen,
  drawerWidth,
  handleDrawerToggle,
}) => {
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
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <CommonDrawer isAuth={isAuth} drawerWidth={drawerWidth} />
    </Box>
  );
};

Sidebar.propTypes = {};

export { Sidebar };
