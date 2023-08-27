import { FC } from "react";

import Snackbar from "@mui/material/Snackbar";

interface SnackbarNotificationProps {
  open: any;
  handleClose: any;
  transition: any;
}

const SnackbarNotification: FC<SnackbarNotificationProps> = ({
  open,
  handleClose,
  transition,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
    />
  );
};

export { SnackbarNotification };
