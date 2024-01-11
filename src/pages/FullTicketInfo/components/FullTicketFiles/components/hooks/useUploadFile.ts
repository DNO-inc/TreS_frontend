import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { IFile, ILoadingFile } from "../../FullTicketFiles";
import { useUploadFileMutation } from "../../../../../../store/api/iofiles.api";

interface UploadFileProps {
  ticketId: number;
  setFiles: Dispatch<SetStateAction<ILoadingFile[] | IFile[]>>;
}

const useUploadFile = ({ ticketId, setFiles }: UploadFileProps) => {
  const [uploadFiles, { isSuccess: isFileUploaded }] = useUploadFileMutation();

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
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

  return { handleUploadFile, isFileUploaded };
};

export { useUploadFile };
