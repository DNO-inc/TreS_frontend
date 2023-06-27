import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  IconButton,
} from "@mui/material";

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

interface GeneralActionsProps {
  isAuth: boolean;
  selectedKey: string;
  setSelectedKey: Dispatch<SetStateAction<string>>;
}

const GeneralActions: FC<GeneralActionsProps> = ({
  isAuth,
  selectedKey,
  setSelectedKey,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const countOfNotification = 0;

  const handleClick = (): void => {
    setOpen(!open);
  };

  const handleListItemClick = (key: string): void => {
    setSelectedKey(key);
  };

  function notificationsLabel(count: number): string {
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
              selected={selectedKey === endpoints.dashboard}
              onClick={() => handleListItemClick(endpoints.dashboard)}
            >
              <ListItemIcon>
                {selectedKey === endpoints.dashboard ? (
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
          selectedKey={selectedKey}
          handleListItemClick={handleListItemClick}
        />
        <ListItem key={"Notifications"} disablePadding>
          <NavLink
            to={!isAuth ? "" : endpoints.notifications}
            style={{ cursor: !isAuth ? "default" : "pointer" }}
          >
            <ListItemButton
              disabled={!isAuth}
              selected={selectedKey === endpoints.notifications}
              onClick={() => handleListItemClick(endpoints.notifications)}
            >
              <ListItemIcon>
                {selectedKey === endpoints.notifications ? (
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
              selected={selectedKey === endpoints.generalTickets}
              onClick={() => handleListItemClick(endpoints.generalTickets)}
            >
              <ListItemIcon>
                {selectedKey === endpoints.generalTickets ? (
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

export { GeneralActions };