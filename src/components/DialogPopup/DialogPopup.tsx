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

interface DialogPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  textBody: {
    title: string;
    description: string;
    agreeButton?: string;
    disagreeButton?: string;
  };
  handleAgree: () => void;
}

const DialogPopup: FC<DialogPopupProps> = ({
  open,
  setOpen,
  textBody,
  handleAgree,
}) => {
  const { t } = useTranslation();
  const { title, description } = textBody;

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
        ".MuiPaper-root": {
          p: 2,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{t(`dialog.${title}`)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t(`dialog.${description}`)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={handleClose}>
          {t("dialog.disagree")}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            handleAgree();
            handleClose();
          }}
          autoFocus
        >
          {t("dialog.agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogPopup };
