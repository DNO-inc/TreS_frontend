import { FC } from "react";
import { Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { SidebarActions } from "../SidebarActions";

import Logo from "../../../../../../assets/Logomark.svg";
import IPalette from "../../../../../../theme/IPalette.interface";
import { dimensions, endpoints } from "../../../../../../constants";

const CommonDrawer: FC = () => {
  const { palette }: IPalette = useTheme();

  const drawerWidth = dimensions.DRAWER_WIDTH;

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
          minHeight: "65.5px !important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: palette.grey.sidebar,
          borderBottom: `2px solid ${palette.grey.card}`,
          mb: 1,
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <Link to={endpoints.GENERAL_TICKETS}>
            <Grid display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Avatar alt="Logo" src={Logo} sx={{ width: 36, height: 36 }} />
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
          </Link>
        </Grid>
      </Toolbar>
      <SidebarActions />
    </Drawer>
  );
};

export { CommonDrawer };
