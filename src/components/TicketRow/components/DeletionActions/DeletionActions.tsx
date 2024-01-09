import { FC } from "react";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import IPalette from "../../../../theme/IPalette.interface";

interface DeletionActionsProps {
  isSent: boolean;
  isDeleted: boolean;
  handleDelete: ((ticketId: number[]) => void) | null;
  handleRestore: ((ticketId: number) => void) | null;
  ticketId: number;
}

const DeletionActions: FC<DeletionActionsProps> = ({
  isSent,
  isDeleted,
  handleDelete,
  handleRestore,
  ticketId,
}) => {
  const { palette }: IPalette = useTheme();

  return (
    <>
      {isSent && (
        <Button
          color="inherit"
          onClick={() => handleDelete && handleDelete([ticketId])}
          sx={{
            color: palette.common.white,
            p: 0,
            minWidth: 32,
          }}
        >
          <DeleteForeverIcon />
        </Button>
      )}
      {isDeleted && (
        <Button
          color="inherit"
          onClick={() => handleRestore && handleRestore(ticketId)}
          sx={{
            color: palette.common.white,
            p: 0,
            minWidth: 32,
          }}
        >
          <RestoreFromTrashIcon />
        </Button>
      )}
    </>
  );
};

export { DeletionActions };
