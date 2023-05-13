import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { GeneralActions } from "./components/GeneralActions";
import { AdditionActions } from "./components/AdditionActions";
import { AuthZone } from "../../../AuthZone";
import { Avatar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

const SidebarActions = ({ isAuth, setIsAuth }) => {
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState("/general-reports");
  const { t, i18n } = useTranslation();
  const { palette } = useTheme();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setSelectedIndex(pathname);
  }, [pathname]);

  return (
    <Grid
      container
      flexDirection={"column"}
      height={"100%"}
      flexWrap={"nowrap"}
      padding={" 0px 12px 16px"}
    >
      <Grid flex={"1 0 auto"}>
        <GeneralActions
          isAuth={isAuth}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Divider width={"100%"} />
        <AdditionActions
          isAuth={isAuth}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          "& > button": { minWidth: 24 },
        }}
      >
        <Button
          onClick={() => {
            changeLanguage("en");
          }}
          sx={{
            color:
              i18n.language === "en"
                ? palette.primary.main
                : palette.common.white,
          }}
        >
          EN
        </Button>
        <Box
          sx={{ width: 2, height: 22, backgroundColor: palette.grey.card }}
        ></Box>
        <Button
          onClick={() => {
            changeLanguage("ua");
          }}
          sx={{
            color:
              i18n.language === "ua"
                ? palette.primary.main
                : palette.common.white,
          }}
        >
          UA
        </Button>
      </Grid>
    </Grid>
  );
};

SidebarActions.propTypes = {};

export { SidebarActions };
