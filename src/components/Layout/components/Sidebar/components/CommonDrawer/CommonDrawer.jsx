import Drawer from "@mui/material/Drawer";
import { SidebarActions } from "../SidebarActions";
import { useTheme } from "@emotion/react";
import { Avatar, Grid, Toolbar, Typography } from "@mui/material";
import Logo from "../../../../../../assets/Logomark.svg";

const CommonDrawer = ({
  isAuth,
  setIsAuth,
  container,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  const { palette } = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          backgroundColor: palette.grey.sidebar,
          borderRight: `2px solid ${palette.grey.card}`,
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
            backgroundColor: palette.grey[400],
            borderRadius: 2,
          },
        },
      }}
      open
    >
      <Toolbar
        sx={{
          minHeight: "73px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: palette.grey.sidebar,
          borderBottom: `2px solid ${palette.grey.card}`,
          mb: 2,
        }}
      >
        <Grid container alignItems={"center"} gap={1}>
          <Avatar alt="Logo" src={Logo} sx={{ width: 40, height: 40 }} />
          <Typography
            sx={{
              ml: 1,
              textTransform: "uppercase",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            TreS
          </Typography>
        </Grid>
      </Toolbar>
      <SidebarActions isAuth={isAuth} setIsAuth={setIsAuth} />
    </Drawer>
  );
};

export { CommonDrawer };
