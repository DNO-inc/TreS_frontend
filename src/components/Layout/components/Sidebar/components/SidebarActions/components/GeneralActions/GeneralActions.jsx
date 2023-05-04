import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import GridViewIcon from "@mui/icons-material/GridView";
import NotesIcon from "@mui/icons-material/Notes";
import { NestedList } from "./components/NestedList";
import { endpoints } from "../../../../../../../../constants";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge, IconButton } from "@mui/material";

const GeneralActions = ({ isAuth, selectedIndex, setSelectedIndex }) => {
  const countOfNotification = 120;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }

    return `${count} notifications`;
  }

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
            to={!isAuth ? null : endpoints.dashboard}
            style={{ cursor: !isAuth ? "default" : "pointer" }}
          >
            <ListItemButton
              disabled={!isAuth}
              selected={selectedIndex === endpoints.dashboard}
              onClick={event => handleListItemClick(event, endpoints.dashboard)}
            >
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>
              <ListItemText primary={t("sidebar.dashboard")} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"My Tickets"} disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
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
            to={!isAuth ? null : endpoints.notifications}
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
                <NotificationsNoneIcon />
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
                <NotesIcon />
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
