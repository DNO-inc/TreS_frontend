import { FC } from "react";

import { Snackbar, useTheme } from "@mui/material";

import IPalette from "../../theme/IPalette.interface";

interface SnackbarNotificationProps {
  variant: any;
  open: any;
  handleClose: any;
  transition: any;
}

const SnackbarNotification: FC<SnackbarNotificationProps> = ({
  variant,
  open,
  handleClose,
  transition,
}) => {
  const { palette }: IPalette = useTheme();
  // debugger;

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
