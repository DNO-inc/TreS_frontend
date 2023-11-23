import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CommentMenuProps {
  changeComment: () => void;
  removeComment: () => void;
  handleReply: () => void;
}

const CommentMenu: FC<CommentMenuProps> = ({
  changeComment,
  removeComment,
  handleReply,
}) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        sx={{ float: "right", mt: -0.3, mr: -1, p: 0 }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ".MuiSvgIcon-root": { fontSize: 18, mr: 1.5 },
          span: { textTransform: "capitalize" },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleReply();
          }}
        >
          <ReplyIcon />
          <span>{t("fullTicket.comments.reply")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            changeComment();
          }}
        >
          <EditIcon />
          <span>{t("fullTicket.comments.edit")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            removeComment();
          }}
        >
          <DeleteIcon />
          <span>{t("fullTicket.comments.delete")}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export { CommentMenu };
