import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface NavbarListItemProps {
  title: string;
  endpoint: string;
  disabled?: boolean;
  selectedKey: string;
  handleListItemClick: (key: string) => void;
  activeIcon: ReactNode;
  disableIcon: ReactNode;
  children?: ReactNode;
}

const NavbarListItem: FC<NavbarListItemProps> = ({
  title,
  endpoint,
  disabled = true,
  selectedKey,
  handleListItemClick,
  activeIcon,
  disableIcon,
  children,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRedirect = () => {
    handleListItemClick(endpoint);

    !disabled && navigate(endpoint);
  };

  return (
    <ListItem key={title} disablePadding>
      <ListItemButton
        disabled={disabled}
        selected={selectedKey === endpoint}
        onClick={handleRedirect}
      >
        <ListItemIcon>
          {selectedKey === endpoint ? activeIcon : disableIcon}
        </ListItemIcon>
        <ListItemText primary={t(`sidebar.${title}`)} />
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export { NavbarListItem };
