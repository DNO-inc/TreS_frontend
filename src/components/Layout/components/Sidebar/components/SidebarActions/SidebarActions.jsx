import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { GeneralActions } from "./components/GeneralActions";
import { AdditionActions } from "./components/AdditionActions";
import { AuthZone } from "../../../AuthZone";
import { Avatar, Grid, Typography } from "@mui/material";
import Logo from "../../../../../../assets/Logomark.svg";
import { useLocation } from "react-router-dom";

const SidebarActions = ({ mode, isAuth, setIsAuth }) => {
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState("/general-reports");

  useEffect(() => {
    setSelectedIndex(pathname);
  }, [pathname]);

  return (
    <Grid
      container
      flexDirection={"column"}
      height={"100%"}
      flexWrap={"nowrap"}
      padding={"16px 8px"}
    >
      <Grid flex={"1 0 auto"}>
        <Grid
          display={"flex"}
          flexDirection={"row"}
          sx={{
            padding: "20px 20px 30px 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar alt="Logo" src={Logo} sx={{ width: 48, height: 48 }} />
          <Typography
            sx={{
              ml: 1,
              textTransform: "uppercase",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            TreS
          </Typography>
        </Grid>
        <GeneralActions
          isAuth={isAuth}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Divider />
        <AdditionActions
          mode={mode}
          isAuth={isAuth}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Grid>
      <Grid sx={{ display: { xs: "none", md: "block" } }}>
        <AuthZone isAuth={isAuth} setIsAuth={setIsAuth} />
      </Grid>
    </Grid>
  );
};

SidebarActions.propTypes = {};

export { SidebarActions };
