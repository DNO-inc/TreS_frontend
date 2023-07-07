import { useEffect, useState, FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
// import styled from "@emotion/styled";

// import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import { endpoints } from "../../../../../../../../constants";
// import { ColorModeContext } from "../../../../../../../../theme";

interface AdditionActionsProps {
  isAuth: boolean;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

const AdditionActions: FC<AdditionActionsProps> = ({
  isAuth,
  selectedKey,
  setSelectedKey,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // const { toggleColorMode } = useContext(ColorModeContext);
  const [checked, setChecked] = useState<boolean>(
    theme.palette.mode === "dark"
  );

  const handleListItemClick = (index: string): void => {
    setSelectedKey(index);
  };

  // const handleColorMode = (): void => {
  //   toggleColorMode();
  // };

  useEffect(() => {
    setChecked(!checked);
  }, [theme.palette.mode]);

  // const CustomSwitch = styled((props: object) => (
  //   <Switch
  //     checked={checked}
  //     focusVisibleClassName=".Mui-focusVisible"
  //     onClick={handleColorMode}
  //     {...props}
  //   />
  // ))(({ theme }) => ({
  //   width: 44,
  //   height: 24,
  //   padding: 0,
  //   "& .MuiSwitch-switchBase": {
  //     padding: 0,
  //     margin: 4,
  //     transitionDuration: "300ms",
  //     "&.Mui-checked": {
  //       transform: "translateX(20px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         opacity: 1,
  //         border: 0,
  //       },
  //       "&.Mui-disabled + .MuiSwitch-track": {
  //         opacity: 0.5,
  //       },
  //     },
  //     "&.Mui-focusVisible .MuiSwitch-thumb": {
  //       color: "#33cf4d",
  //       border: "6px solid #fff",
  //     },
  //     "&.Mui-disabled .MuiSwitch-thumb": {
  //       color:
  //         theme.palette.mode === "light"
  //           ? theme.palette.grey[100]
  //           : theme.palette.grey[600],
  //     },
  //     "&.Mui-disabled + .MuiSwitch-track": {
  //       opacity: theme.palette.mode === "light" ? 0.7 : 0.1,
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxSizing: "border-box",
  //     width: 16,
  //     height: 16,
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 26 / 2,
  //     backgroundColor:
  //       theme.palette.mode === "light" ? "#E9E9EA" : theme.palette.grey[700],
  //     opacity: 1,
  //     transition: theme.transitions.create(["background-color"], {
  //       duration: 500,
  //     }),
  //   },
  // }));

  return (
    <List
      sx={{
        "& >  li > a > div": {
          borderRadius: "8px",
        },
        "& > li": {
          padding: "4px 16px",
        },
        "& > li > a": {
          width: "100%",
        },
      }}
    >
      <ListItem key={"Settings"} disablePadding>
        <NavLink
          to={!isAuth ? "" : endpoints.settings}
          style={{ cursor: !isAuth ? "default" : "pointer" }}
        >
          <ListItemButton
            disabled={!isAuth}
            selected={selectedKey === endpoints.settings}
            onClick={() => handleListItemClick(endpoints.settings)}
          >
            <ListItemIcon>
              {selectedKey === endpoints.settings ? (
                <SettingsIcon />
              ) : (
                <SettingsOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={t("sidebar.settings")} />
          </ListItemButton>
        </NavLink>
      </ListItem>
      {/* <ListItem key={"Light mode"} disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            cursor: "default",
          }}
        >
          <ListItemIcon>
            <LightModeIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.lightMode")} />
          <CustomSwitch />
        </ListItemButton>
      </ListItem> */}
    </List>
  );
};

export { AdditionActions };
