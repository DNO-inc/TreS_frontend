import { FC } from "react";

import { useTheme, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import IPalette from "../../../../../../theme/IPalette.interface";

interface EditQueuesPopupProps {
  queue: {
    queue_id: number;
    faculty: number;
    name: string;
    scope: string;
  };
}

const QueueManagementItem: FC<EditQueuesPopupProps> = ({ queue }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
        ".MuiBox-root": {
          p: "12px 16px",
          bgcolor: palette.grey.divider,
          borderRadius: 1,
        },
      }}
    >
      <Box sx={{ flexGrow: 1, lineHeight: 2 }}>{queue.name}</Box>
      <Box
        sx={{
          ".MuiButtonBase-root": {
            borderRadius: 2,
            ".MuiSvgIcon-root": {
              fontSize: 20,
            },
          },
        }}
      >
        <IconButton
          size="small"
          sx={{
            mr: 1,
            "&:hover": {
              ".MuiSvgIcon-root": { color: palette.semantic.error },
            },
          }}
        >
          <DeleteOutlineIcon sx={{ color: "rgba(255, 255,255,0.24)" }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            "&:hover": {
              ".MuiSvgIcon-root": { color: palette.semantic.info },
            },
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export { QueueManagementItem };
