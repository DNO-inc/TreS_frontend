import {
  FC,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { MarkdownWithStyles } from "../../../../utils/markdown";

import IPalette from "../../../../theme/IPalette.interface";
import { MarkdownControls } from "./components/MarkdownControls";
// import {
//   useGetFilesMutation,
//   useUploadFilesMutation,
// } from "../../../../store/api/iofiles/iofiles.api";
// import { Button } from "@mui/material";

interface TicketBodyTextFieldProps {
  register: UseFormRegister<ICreateTicketRequestBody>;
  formattedText: string;
  setFormattedText: Dispatch<SetStateAction<string>>;
}

const TicketBodyTextField: FC<TicketBodyTextFieldProps> = ({
  register,
  formattedText,
  setFormattedText,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const inputRef: MutableRefObject<null | HTMLInputElement> = useRef(null);

  const [isPreview, setIsPreview] = useState(false);

  const placeholderText: string = t("createTicket.ticketBodyPlaceholder");

  const handleShowPreview = () => {
    setIsPreview(prevState => !prevState);
  };

  // ===========================
  // const [selectedFiles, setSelectedFiles] = useState(null);

  // const [uploadFiles] = useUploadFilesMutation();
  // const [getFiles] = useGetFilesMutation();

  // const handleChange = event => {
  //   setSelectedFiles(event.target.files);
  // };

  // const handleUpload = event => {
  //   if (!selectedFiles) {
  //     alert("Stop");
  //     return;
  //   }

  //   const formData = new FormData();
  //   const formData2 = new FormData();

  //   formData.append("ticket_id", "6");
  //   formData2.append("ticket_id", "6");
  //   formData.append("file_list", selectedFiles[0]);

  //   // console.log(formData.get("file"));

  //   // uploadFiles(formData);
  //   getFiles(formData2).then(res => {
  //     console.log(res.data.files);
  //   });
  // };

  // ===========================

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.ticketBody")}</Typography>
      <Box
        sx={{
          display: isPreview ? "block" : "none",
          overflow: "hidden",
          overflowY: "auto",
          scroll: "scroll",
          width: "100%",
          height: 312,
          borderRadius: 1,
          p: "12px 16px 12px",
          bgcolor: palette.grey.card,
          whiteSpace: "pre-line",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: palette.grey.divider,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <MarkdownWithStyles innerText={formattedText} />
      </Box>
      <TextField
        inputRef={inputRef}
        id="ticket-body"
        placeholder={placeholderText}
        required
        multiline
        rows={12}
        variant="outlined"
        fullWidth
        {...register("body")}
        value={formattedText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFormattedText(event.target.value);
        }}
        sx={{
          display: isPreview ? "none" : "block",
          overflow: "hidden",
          bgcolor: palette.grey.card,
          "& > .MuiOutlinedInput-root": {
            p: "0 0 24px",
          },
          "& > .MuiOutlinedInput-root > textarea": {
            p: "12px 16px 0",
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: palette.grey.border,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.36)",
              borderRadius: 4,
            },
          },
        }}
      />
      {/* <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button> */}
      <MarkdownControls
        text={formattedText}
        isPreview={isPreview}
        setFormattedText={setFormattedText}
        handleShowPreview={handleShowPreview}
        input={inputRef.current}
      />
    </Box>
  );
};

export { TicketBodyTextField };
