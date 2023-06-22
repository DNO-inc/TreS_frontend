import Drawer from "@mui/material/Drawer";
import { SidebarActions } from "../SidebarActions";
import { useTheme } from "@emotion/react";
import { Avatar, Grid, Toolbar, Typography } from "@mui/material";
import Logo from "../../../../../../assets/Logomark.svg";
import { EllipsisMenu } from "../EllipsisMenu";

interface IMobileDrawer {
  container: any;
  mobileOpen: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const MobileDrawer = ({
  container,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}: IMobileDrawer) => {
  const { palette }: IPalette = useTheme();

  return (
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
            backgroundColor: palette.whiteAlpha[400],
            borderRadius: 2,
          },
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px",
          borderBottom: `2px solid ${palette.grey.card}`,
          mb: 4,
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid display={"flex"} flexDirection={"row"} alignItems={"center"}>
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

          <EllipsisMenu />
        </Grid>
      </Toolbar>
      <SidebarActions />
    </Drawer>
  );
};

export { MobileDrawer };
