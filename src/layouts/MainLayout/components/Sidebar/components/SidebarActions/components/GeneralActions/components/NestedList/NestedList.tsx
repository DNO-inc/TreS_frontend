import { FC } from "react";
import { NavLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import Collapse from "@mui/material/Collapse";

import useGetListItemsArray from "./useGetListItemArray";
import { useAuth } from "context/AuthContext/AuthContext";

interface NestedListProps {
  open: boolean;
  selectedKey: string;
  handleListItemClick: (key: string) => void;
}

const NestedList: FC<NestedListProps> = ({
  open,
  selectedKey,
  handleListItemClick,
}) => {
  const { isAuth } = useAuth();

  const listItemsArray = useGetListItemsArray(selectedKey);

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
                to={!isAuth ? "" : listItem.endpoint}
                style={{ cursor: !isAuth ? "default" : "pointer" }}
              >
                <ListItemButton
                  sx={{ pl: 4 }}
                  disabled={!isAuth}
                  selected={selectedKey === listItem.endpoint}
                  onClick={() => handleListItemClick(listItem.endpoint)}
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

export { NestedList };
