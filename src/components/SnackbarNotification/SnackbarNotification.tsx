import { ComponentType, FC } from "react";

import Snackbar from "@mui/material/Snackbar";
import { SlideProps } from "@mui/material/Slide";

interface SnackbarNotificationProps {
  open: boolean;
  handleClose: (_: React.SyntheticEvent | Event, reason: string) => void;
  transition: ComponentType<Omit<SlideProps, "direction">> | undefined;
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
      autoHideDuration={2000}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
    />
  );
};

export { SnackbarNotification };
