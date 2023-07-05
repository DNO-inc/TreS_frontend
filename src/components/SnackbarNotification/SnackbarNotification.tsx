import { FC } from "react";

import { Snackbar } from "@mui/material";

interface SnackbarNotificationProps {
  variant: any;
  open: any;
  handleClose: any;
  transition: any;
}

const SnackbarNotification: FC<SnackbarNotificationProps> = ({
  // variant,
  open,
  handleClose,
  transition,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message="Version 2.0"
      key={transition ? transition.name : ""}
    />
  );
};

export { SnackbarNotification };
