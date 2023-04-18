import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { endpoints } from "../../../../../../../../../../constants";
import { NavLink } from "react-router-dom";

const NestedList = ({ open, isAuth, selectedIndex, handleListItemClick }) => {
  const listItemsArray = [
    {
      text: "Sent",
      icon: <FolderOpenIcon />,
      endpoint: endpoints.sent,
    },
    {
      text: "Received",
      icon: <FolderOpenIcon />,
      endpoint: endpoints.received,
    },
    {
      text: "Followed",
      icon: <FolderOpenIcon />,
      endpoint: endpoints.followed,
    },
    {
      text: "Saved",
      icon: <Inventory2OutlinedIcon />,
      endpoint: endpoints.saved,
    },
    {
      text: "Deleted",
      icon: <DeleteOutlineIcon />,
      endpoint: endpoints.deleted,
    },
  ];

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List
        disablePadding
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
        {listItemsArray.map(listItem => {
          return (
            <ListItem key={listItem.text}>
              <NavLink
                to={!isAuth ? null : listItem.endpoint}
                style={{ cursor: !isAuth ? "default" : "pointer" }}
              >
                <ListItemButton
                  sx={{ pl: 4 }}
                  disabled={!isAuth}
                  selected={selectedIndex === listItem.endpoint}
                  onClick={event =>
                    handleListItemClick(event, listItem.endpoint)
                  }
                >
                  <ListItemIcon>{listItem.icon}</ListItemIcon>
                  <ListItemText primary={listItem.text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
};

NestedList.propTypes = {};

export { NestedList };
