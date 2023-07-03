import { Slide, SlideProps, Snackbar, useTheme } from "@mui/material";
import IPalette from "../../theme/IPalette.interface";
import { FC, useState } from "react";

interface SnackbarNotificationProps {
  children: any;
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
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message="I love snacks"
      key={transition ? transition.name : ""}
    />
  );
};

export { SnackbarNotification };
