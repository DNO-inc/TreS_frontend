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
import { Button } from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";

import IPalette from "../../../../theme/IPalette.interface";
import {
  useGetFileMutation,
  useGetFilesIdsMutation,
  useUploadFilesMutation,
} from "../../../../store/api/iofiles/iofiles.api";
import { getFileIcon } from "../../../../shared/functions";

interface FullTicketFilesProps {
  ticketId: number;
  isCanAddFiles: boolean;
}

interface IFile {
  file_id: string;
  file_name: string;
  ticket_id: number;
}

type ApiResponse = {
  data?: any;
  error?: FetchBaseQueryError | SerializedError;
};

const FullTicketFiles: FC<FullTicketFilesProps> = ({
  ticketId,
  isCanAddFiles,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [files, setFiles] = useState<IFile[]>([]);

  const [uploadFiles, { isSuccess: isFilesUploaded }] =
    useUploadFilesMutation();
  const [getFilesId] = useGetFilesIdsMutation();
  const [getFile] = useGetFileMutation();

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
    if (isFilesUploaded) {
      uploadFileList();
    }
  }, [isFilesUploaded]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      alert("Select File");
      return;
    }

    const formData = new FormData();

    formData.append("ticket_id", ticketId.toString());

    Object.keys(files).map(file => {
      formData.append("file_list", files[file]);
    });

    uploadFiles(formData);
  };

  const handleClick = (fileId: string, fileName: string) => {
    console.log(fileName);

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
        {isCanAddFiles && (
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
        {files.map(file => {
          return (
            <Button
              color="inherit"
              sx={{
                bgcolor: palette.grey.card,
                border: `2px solid ${palette.grey.divider}`,
                borderRadius: 1,
                textTransform: "none",
              }}
              key={file.file_id}
              onClick={() => handleClick(file.file_id, file.file_name)}
            >
              {getFileIcon(file.file_name)}
              <Typography sx={{ ml: 1 }}>{file.file_name}</Typography>
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
};

export { FullTicketFiles };
