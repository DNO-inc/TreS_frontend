import { useEffect, useState, FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button, Grid, Divider, useTheme } from "@mui/material";

import { GeneralActions } from "./components/GeneralActions";
import { AdditionActions } from "./components/AdditionActions";
import { VerticalDivider } from "../../../../../../components/VerticalDivider";

import { useJwtDecode } from "../../../../../../shared/hooks";
import { endpoints } from "../../../../../../constants";
import IPalette from "../../../../../../theme/IPalette.interface";

const SidebarActions: FC = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [selectedKey, setSelectedKey] = useState<string>(
    endpoints.generalTickets
  );
  const jwt = useJwtDecode();

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    setSelectedKey(pathname);
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
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
        <Divider sx={{ width: "100%" }} />
        <AdditionActions
          isAuth={!!jwt}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
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

export { SidebarActions };
