import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface NavbarListItemProps {
  title: string;
  endpoint: string;
  selectedKey: string;
  handleListItemClick: (key: string) => void;
  activeIcon: ReactNode;
  disableIcon: ReactNode;
  children?: ReactNode;
}

const NavbarListItem: FC<NavbarListItemProps> = ({
  title,
  endpoint,
  selectedKey,
  handleListItemClick,
  activeIcon,
  disableIcon,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <ListItem key={title} disablePadding>
      <NavLink to={endpoint}>
        <ListItemButton
          selected={selectedKey === endpoint}
          onClick={() => handleListItemClick(endpoint)}
        >
          <ListItemIcon>
            {selectedKey === endpoint ? activeIcon : disableIcon}
          </ListItemIcon>
          <ListItemText primary={t(`sidebar.${title}`)} />
          {children}
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export { NavbarListItem };
