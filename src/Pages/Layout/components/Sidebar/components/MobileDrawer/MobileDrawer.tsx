import { FC } from "react";

import {
  Drawer,
  Avatar,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { EllipsisMenu } from "../EllipsisMenu";
import { SidebarActions } from "../SidebarActions";

import Logo from "../../../../../../assets/Logomark.svg";
import IPalette from "../../../../../../theme/IPalette.interface";

interface MobileDrawerProps {
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const MobileDrawer: FC<MobileDrawerProps> = ({
  container,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
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
            backgroundColor: palette.whiteAlpha.default,
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
