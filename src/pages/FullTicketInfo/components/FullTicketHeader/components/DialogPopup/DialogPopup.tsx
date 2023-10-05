import { FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../../../theme/IPalette.interface";

interface DialogPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleAccept;
}

const DialogPopup: FC<DialogPopupProps> = ({ open, setOpen, handleAccept }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          p: "12px 8px 8px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {t("fullTicket.dialog.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t("fullTicket.dialog.body")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color={"inherit"} onClick={handleClose}>
          {t("fullTicket.dialog.cancel")}
        </Button>
        <Button
          variant="contained"
          color={"inherit"}
          sx={{ bgcolor: palette.semantic.error }}
          onClick={handleAccept}
          autoFocus
        >
          {t("fullTicket.dialog.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogPopup };
