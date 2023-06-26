import { FC } from "react";
import { NavLink } from "react-router-dom";

import {
  Collapse,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import useGetListItemsArray from "./useGetListItemArray";

interface NestedListProps {
  open: boolean;
  isAuth: boolean;
  selectedKey: string;
  handleListItemClick: (key: string) => void;
}

const NestedList: FC<NestedListProps> = ({
  open,
  isAuth,
  selectedKey,
  handleListItemClick,
}) => {
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
