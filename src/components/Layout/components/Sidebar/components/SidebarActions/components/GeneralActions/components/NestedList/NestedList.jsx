import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { endpoints } from "../../../../../../../../../../constants";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NestedList = ({ open, isAuth, selectedIndex, handleListItemClick }) => {
  const { t } = useTranslation();

  const listItemsArray = [
    {
      text: t("sidebar.myTickets.sent"),
      icon: <FolderOpenIcon />,
      endpoint: endpoints.sent,
      isHaveNewMessage: false,
    },
    // {
    //   text: t("sidebar.myTickets.received"),
    //   icon: <FolderOpenIcon />,
    //   endpoint: endpoints.received,
    //   isHaveNewMessage: true,
    // },
    {
      text: t("sidebar.myTickets.followed"),
      icon: <FolderOpenIcon />,
      endpoint: endpoints.followed,
      isHaveNewMessage: false,
    },
    {
      text: t("sidebar.myTickets.bookmarks"),
      icon: <BookmarkBorderIcon />,
      endpoint: endpoints.bookmarks,
      isHaveNewMessage: false,
    },
    {
      text: t("sidebar.myTickets.deleted"),
      icon: <DeleteOutlineIcon />,
      endpoint: endpoints.deleted,
      isHaveNewMessage: false,
    },
  ];

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List
        disablePadding
        sx={{
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
                  {isAuth && listItem.isHaveNewMessage && (
                    <Badge color="primary" variant="dot"></Badge>
                  )}
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
