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

const GeneralActions = ({ isAuth, selectedIndex, setSelectedIndex }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <List
        sx={{
          "& >  li > a > div, & > li > div": {
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
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"My Reports"} disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="My Reports" />
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
              <ListItemText primary={"Notifications"} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"General reports"} disablePadding>
          <NavLink to={endpoints.generalReports}>
            <ListItemButton
              selected={selectedIndex === endpoints.generalReports}
              onClick={event =>
                handleListItemClick(event, endpoints.generalReports)
              }
            >
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary={"General reports"} />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </>
  );
};

GeneralActions.propTypes = {};

export { GeneralActions };
