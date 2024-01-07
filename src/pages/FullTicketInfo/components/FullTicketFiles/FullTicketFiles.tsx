import {
  FC,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  ChangeEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Chip from "@mui/material/Chip";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";
import { LinearProgress } from "@mui/material";

import { DialogPopup } from "../../../../components/DialogPopup";

import IPalette from "../../../../theme/IPalette.interface";
import {
  useDeleteFileMutation,
  useGetFileMutation,
  useGetFilesIdsMutation,
  useUploadFileMutation,
} from "../../../../store/api/iofiles/iofiles.api";
import { getFileIcon } from "../../../../shared/functions";

interface FullTicketFilesProps {
  ticketId: number;
  isCanManipulateFile: boolean;
}

interface IFile {
  content_type: string;
  file_id: string;
  file_name: string;
  owner_id: number;
  ticket_id: number;
}

interface ILoadingFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

type ApiResponse = {
  data?: any;
  error?: FetchBaseQueryError | SerializedError;
};

const FullTicketFiles: FC<FullTicketFilesProps> = ({
  ticketId,
  isCanManipulateFile,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [files, setFiles] = useState<IFile[] | ILoadingFile[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deletedFileId, setDeletedFileId] = useState<string>("");

  const [uploadFiles, { isSuccess: isFileUploaded }] = useUploadFileMutation();
  const [getFilesId] = useGetFilesIdsMutation();
  const [getFile] = useGetFileMutation();
  const [deleteFile, { isSuccess: isFileDeleted }] = useDeleteFileMutation();

  const textBody = {
    title: "deleteFile.title",
    description: "deleteFile.description",
  };

  const uploadFileList = () => {
    const formData = new FormData();

    formData.append("ticket_id", ticketId.toString());

    getFilesId(formData).then((res: ApiResponse) => {
      const fileData = res?.data?.file_ids;

      if (fileData) {
        setFiles(fileData);
      }
    });
  };

  useEffect(() => {
    uploadFileList();
  }, []);

  useEffect(() => {
    if (isFileUploaded || isFileDeleted) {
      uploadFileList();
    }
  }, [isFileUploaded, isFileDeleted]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      alert("Select File");
      return;
    }

    const loadingFiles: ILoadingFile[] = [];

    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        loadingFiles.push(files[key]);
      }
    }

    setFiles(
      prevFiles => [...prevFiles, ...loadingFiles] as IFile[] | ILoadingFile[]
    );

    const formData = new FormData();

    formData.append("ticket_id", ticketId.toString());

    Object.keys(files).map(file => {
      formData.append("file_list", files[file]);
    });

    uploadFiles(formData);
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

  const handlePick = () => {
    inputRef?.current?.click();
  };

  const handleOpenDialog = (fileId: string) => {
    setOpenDialog(true);
    setDeletedFileId(fileId);
  };

  const handlePositiveAnswer = () => {
    const formData = new FormData();

    formData.append("file_id", deletedFileId);

    deleteFile(formData);
  };

  return (
    <Grid container>
      <Typography mb={2}>{t("fullTicket.files")}</Typography>
      <Grid
        container
        sx={{
          width: "100%",
          borderRadius: 1,
          gap: 1.5,
        }}
      >
        {isCanManipulateFile && (
          <>
            <input
              ref={inputRef}
              style={{ width: 0 }}
              type="file"
              multiple
              onChange={handleUpload}
            />
            <IconButton
              onClick={handlePick}
              sx={{
                ml: -1.5,
                bgcolor: palette.grey.card,
                border: `2px solid ${palette.grey.divider}`,
                borderRadius: 1,
              }}
            >
              <AttachFileIcon />
            </IconButton>
          </>
        )}
        {files.map((file: IFile | ILoadingFile) => {
          if ("type" in file) {
            return (
              <Chip
                sx={{
                  bgcolor: palette.grey.card,
                  border: `2px solid ${palette.grey.divider}`,
                  borderRadius: 1,
                  textTransform: "none",
                  height: "43px",
                }}
                icon={getFileIcon(file.type)}
                label={
                  <>
                    <span style={{ fontSize: "16px", marginRight: 6 }}>
                      {file.name}
                    </span>
                    <LinearProgress />
                  </>
                }
                variant="outlined"
                key={file.name}
              />
            );
          } else {
            return (
              <Chip
                sx={{
                  bgcolor: palette.grey.card,
                  border: `2px solid ${palette.grey.divider}`,
                  borderRadius: 1,
                  textTransform: "none",
                  height: "43px",
                }}
                icon={getFileIcon(file.content_type)}
                label={
                  <span style={{ fontSize: "16px", marginRight: 6 }}>
                    {file.file_name}
                  </span>
                }
                variant="outlined"
                onClick={() => handleClick(file.file_id, file.file_name)}
                deleteIcon={isCanManipulateFile ? <CancelIcon /> : <></>}
                onDelete={() => {
                  handleOpenDialog(file.file_id);
                }}
                key={file.file_id}
              />
            );
          }
        })}
      </Grid>
      <DialogPopup
        open={openDialog}
        setOpen={setOpenDialog}
        textBody={textBody}
        handleAgree={handlePositiveAnswer}
      />
    </Grid>
  );
};

export { FullTicketFiles };
