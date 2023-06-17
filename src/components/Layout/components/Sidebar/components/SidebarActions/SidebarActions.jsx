import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { GeneralActions } from "./components/GeneralActions";
import { AdditionActions } from "./components/AdditionActions";
import { Button, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { VerticalDivider } from "../../../../../VerticalDivider";
import { useJwtDecode } from "../../../../../../shared/hooks";
import { endpoints } from "../../../../../../constants";

const SidebarActions = () => {
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(endpoints.generalTickets);
  const { t, i18n } = useTranslation();
  const { palette } = useTheme();
  const jwt = useJwtDecode();

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
          isAuth={!!jwt}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Divider width={"100%"} />
        <AdditionActions
          isAuth={!!jwt}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
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
        <VerticalDivider />
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
