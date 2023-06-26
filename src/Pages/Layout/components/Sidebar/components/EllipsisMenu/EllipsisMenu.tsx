import { useState, FC, MouseEvent } from "react";

import { Menu, MenuItem, useTheme, PopoverVirtualElement } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import IPalette from "../../../../../../theme/IPalette.interface";

const options: string[] = ["Report"];

const EllipsisMenu: FC = () => {
  const { palette }: IPalette = useTheme();

  const [anchorEl, setAnchorEl] = useState<
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined
  >(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: palette.grey.active }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          maxHeight: 150,
          width: "20ch",
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export { EllipsisMenu };
