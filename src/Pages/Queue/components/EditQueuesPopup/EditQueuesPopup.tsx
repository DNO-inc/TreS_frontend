import { FC, Dispatch, SetStateAction, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import IPalette from "../../../../theme/IPalette.interface";
import { QueueManagementItem } from "./components/QueueManagementItem";

interface EditQueuesPopupProps {
  scope?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}

const q = [
  {
    queue_id: 1,
    faculty: 1,
    name: "Lecturers",
    scope: "Reports",
  },
  {
    queue_id: 2,
    faculty: 1,
    name: "Food",
    scope: "Reports",
  },
  {
    queue_id: 5,
    faculty: 1,
    name: "Scholarship",
    scope: "Q/A",
  },
  {
    queue_id: 7,
    faculty: 1,
    name: "Dormitory",
    scope: "Q/A",
  },
  {
    queue_id: 12,
    faculty: 1,
    name: "Lecturers",
    scope: "Reports",
  },
  {
    queue_id: 22,
    faculty: 1,
    name: "Food",
    scope: "Reports",
  },
  {
    queue_id: 52,
    faculty: 1,
    name: "Scholarship",
    scope: "Q/A",
  },
  {
    queue_id: 72,
    faculty: 1,
    name: "Dormitory",
    scope: "Q/A",
  },
];

const EditQueuesPopup: FC<EditQueuesPopupProps> = ({ open, setOpen }) => {
  const { palette }: IPalette = useTheme();

  const [queueList] = useState<IQueue[]>(q);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddQueue = () => {
    alert("Don't touch, the Tres team is working on it");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        backdropFilter: "blur(10px)",
        ".MuiDialog-paper": {
          width: 532,
          bgcolor: palette.grey.card,
          backgroundImage: "none",
          border: `1px solid ${palette.grey.border}`,
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "24px 24px 24px 32px",
          borderBottom: `1px solid ${palette.grey.border}`,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
          {"Queue management"}
        </Typography>
        <IconButton sx={{ borderRadius: 2 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          height: 240,
          m: "32px 24px",
          p: "0 8px 0 0",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: palette.grey.divider,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "& > .MuiBox-root:not(:nth-last-of-type(1))": {
            mb: 1,
          },
        }}
      >
        {queueList.map((queue: IQueue) => (
          <QueueManagementItem queue={queue} key={queue.queue_id} />
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 0, m: "0 24px 32px" }}>
        <Button
          variant="contained"
          onClick={handleAddQueue}
          autoFocus
          startIcon={<AddIcon />}
          sx={{
            textTransform: "capitalize",
            width: "100%",
            p: "12px 24px 12px 16px",
            borderRadius: 2,
          }}
        >
          Add queue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EditQueuesPopup };
