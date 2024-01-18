import { FC } from "react";

import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import useTheme from "@mui/material/styles/useTheme";

import CancelIcon from "@mui/icons-material/Cancel";

import IPalette from "theme/IPalette.interface";
import { getFileIcon } from "functions/index";
import { useGetFileMutation } from "api/iofiles.api";
import { ApiResponse } from "../../FullTicketFiles";

interface FileProps {
  type: string;
  name: string;
  isLoading?: boolean;
  fileId?: string;
  handleOpenDialog?: (fileId: string) => void;
  isCanManipulateFile?: boolean;
}

const File: FC<FileProps> = ({
  type,
  name,
  isLoading = false,
  fileId,
  handleOpenDialog,
  isCanManipulateFile,
}) => {
  const { palette }: IPalette = useTheme();

  const [getFile] = useGetFileMutation();

  const fileIcon = getFileIcon(type);

  const fileStyle = {
    bgcolor: palette.grey.card,
    border: `2px solid ${palette.grey.divider}`,
    borderRadius: 1,
    textTransform: "none",
    height: "43px",
  };

  const handleClick = (fileId: string, fileName: string) => {
    getFile(fileId).then((res: ApiResponse) => {
      if (res?.data) {
        const file = res.data;
        const url = URL.createObjectURL(file);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        document.body.append(anchor);
        anchor.setAttribute("style", "display: none");
        anchor.click();
        anchor.remove();
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Chip
          sx={fileStyle}
          icon={fileIcon}
          label={
            <>
              <span style={{ fontSize: "16px", marginRight: 6 }}>{name}</span>
              <LinearProgress />
            </>
          }
          variant="outlined"
        />
      ) : (
        <>
          {fileId && handleOpenDialog && (
            <Chip
              sx={fileStyle}
              icon={fileIcon}
              label={
                <span style={{ fontSize: "16px", marginRight: 6 }}>{name}</span>
              }
              variant="outlined"
              onClick={() => handleClick(fileId, name)}
              deleteIcon={isCanManipulateFile ? <CancelIcon /> : <></>}
              onDelete={() => {
                handleOpenDialog(fileId);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export { File };
