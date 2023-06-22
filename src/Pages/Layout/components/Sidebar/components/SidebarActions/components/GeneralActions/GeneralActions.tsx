import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArticleIcon from "@mui/icons-material/Article";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { NestedList } from "./components/NestedList";
import { endpoints } from "../../../../../../../../constants";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge, IconButton } from "@mui/material";

interface IGeneralActions {
  isAuth: boolean;
  selectedIndex: string;
  setSelectedIndex: (param: string) => void;
}

const GeneralActions = ({
  isAuth,
  selectedIndex,
  setSelectedIndex,
}: IGeneralActions) => {
  const countOfNotification = 0;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index: string) => {
    setSelectedIndex(index);
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }

    return `${count} notifications`;
  }

  useEffect(() => {
    setOpen(false);
  }, [isAuth]);

  return (
    <>
      <List
        sx={{
          "& > li > a": {
            width: "100%",
          },
        }}
      >
        <ListItem key={"Dashboard"} disablePadding>
          <NavLink
            to={!isAuth ? "" : endpoints.dashboard}
            style={{ cursor: !isAuth ? "default" : "pointer" }}
          >
            <ListItemButton
              disabled={!isAuth}
              selected={selectedIndex === endpoints.dashboard}
              onClick={event => handleListItemClick(event, endpoints.dashboard)}
            >
              <ListItemIcon>
                {selectedIndex === endpoints.dashboard ? (
                  <GridViewSharpIcon />
                ) : (
                  <GridViewIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={t("sidebar.dashboard")} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"My Tickets"} disablePadding>
          <ListItemButton disabled={!isAuth} onClick={handleClick}>
            <ListItemIcon>
              {open ? <SourceRoundedIcon /> : <SourceOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={t("sidebar.myTickets.title")} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <NestedList
          open={open}
          isAuth={isAuth}
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
        />
        <ListItem key={"Notifications"} disablePadding>
          <NavLink
            to={!isAuth ? "" : endpoints.notifications}
            style={{ cursor: !isAuth ? "default" : "pointer" }}
          >
            <ListItemButton
              disabled={!isAuth}
              selected={selectedIndex === endpoints.notifications}
              onClick={event =>
                handleListItemClick(event, endpoints.notifications)
              }
            >
              <ListItemIcon>
                {selectedIndex === endpoints.notifications ? (
                  <NotificationsIcon />
                ) : (
                  <NotificationsOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={t("sidebar.notification")} />
              {isAuth && (
                <IconButton
                  aria-label={notificationsLabel(countOfNotification)}
                >
                  <Badge
                    badgeContent={countOfNotification}
                    color="primary"
                    sx={{ "& > span": { color: "white" } }}
                  ></Badge>
                </IconButton>
              )}
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"General tickets"} disablePadding>
          <NavLink to={endpoints.generalTickets}>
            <ListItemButton
              selected={selectedIndex === endpoints.generalTickets}
              onClick={event =>
                handleListItemClick(event, endpoints.generalTickets)
              }
            >
              <ListItemIcon>
                {selectedIndex === endpoints.generalTickets ? (
                  <ArticleIcon />
                ) : (
                  <ArticleOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={t("sidebar.generalTickets")} />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </>
  );
};

GeneralActions.propTypes = {};

export { GeneralActions };
