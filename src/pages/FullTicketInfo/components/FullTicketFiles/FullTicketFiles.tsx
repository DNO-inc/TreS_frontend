import { FC, useEffect, useState, useRef, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import AttachFileIcon from "@mui/icons-material/AttachFile";

import { DialogPopup } from "components/DialogPopup";
import { File } from "./components/File";

import IPalette from "theme/IPalette.interface";
import { useDeleteFileMutation, useGetFilesIdsMutation } from "api/iofiles.api";
import { useUploadFile } from "./components/hooks/useUploadFile";

interface FullTicketFilesProps {
  ticketId: number;
  isCanManipulateFile: boolean;
}

export interface IFile {
  content_type: string;
  file_id: string;
  file_name: string;
  owner_id: number;
  ticket_id: number;
}

export interface ILoadingFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export type ApiResponse = {
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

  const [getFilesId] = useGetFilesIdsMutation();
  const [deleteFile, { isSuccess: isFileDeleted }] = useDeleteFileMutation();

  const textBody = {
    title: "deleteFile.title",
    description: "deleteFile.description",
  };

  const { handleUploadFile, isFileUploaded } = useUploadFile({
    ticketId,
    setFiles,
  });

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
              onChange={handleUploadFile}
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
              <File
                type={file.type}
                name={file.name}
                isLoading={true}
                key={file.name}
              />
            );
          } else {
            return (
              <File
                type={file.content_type}
                name={file.file_name}
                fileId={file.file_id}
                handleOpenDialog={handleOpenDialog}
                isCanManipulateFile={isCanManipulateFile}
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
