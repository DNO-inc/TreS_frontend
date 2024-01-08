import { useEffect, useState, FC, Dispatch, SetStateAction, lazy } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

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

import { endpoints } from "../../../../../../../../constants";
import { useAuth } from "../../../../../../../../context/AuthContext";
import { checkIsAdmin } from "../../../../../../../../shared/functions";
import { useNotification } from "../../../../../../../../context/NotificationContext";

const NestedList = lazy(() => import("./components/NestedList"));

interface GeneralActionsProps {
  selectedKey: string;
  setSelectedKey: Dispatch<SetStateAction<string>>;
}

const GeneralActions: FC<GeneralActionsProps> = ({
  selectedKey,
  setSelectedKey,
}) => {
  const { t } = useTranslation();

  const { isAuth } = useAuth();
  const { countOfNotification } = useNotification();

  const isAdmin = checkIsAdmin();

  const [open, setOpen] = useState<boolean>(false);

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
        <ListItem key={"General tickets"} disablePadding>
          <NavLink to={endpoints.GENERAL_TICKETS}>
            <ListItemButton
              selected={selectedKey === endpoints.GENERAL_TICKETS}
              onClick={() => handleListItemClick(endpoints.GENERAL_TICKETS)}
            >
              <ListItemIcon>
                {selectedKey === endpoints.GENERAL_TICKETS ? (
                  <ArticleIcon />
                ) : (
                  <ArticleOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={t("sidebar.generalTickets")} />
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
          selectedKey={selectedKey}
          handleListItemClick={handleListItemClick}
        />
        {isAdmin && (
          <ListItem key={"Queue"} disablePadding>
            <NavLink
              to={!isAuth ? "" : endpoints.QUEUE}
              style={{ cursor: !isAuth ? "default" : "pointer" }}
            >
              <ListItemButton
                disabled={!isAuth}
                selected={selectedKey === endpoints.QUEUE}
                onClick={() => handleListItemClick(endpoints.QUEUE)}
              >
                <ListItemIcon>
                  {selectedKey === endpoints.QUEUE ? (
                    <GridViewSharpIcon />
                  ) : (
                    <GridViewIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={t("sidebar.queue")} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        )}
        <ListItem key={"Notifications"} disablePadding>
          <NavLink
            to={!isAuth ? "" : endpoints.NOTIFICATIONS}
            style={{ cursor: !isAuth ? "default" : "pointer" }}
          >
            <ListItemButton
              disabled={!isAuth}
              selected={selectedKey === endpoints.NOTIFICATIONS}
              onClick={() => handleListItemClick(endpoints.NOTIFICATIONS)}
            >
              <ListItemIcon>
                {selectedKey === endpoints.NOTIFICATIONS ? (
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
      </List>
    </>
  );
};

export { GeneralActions };
