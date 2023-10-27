import {
  FC,
  // useState,
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
// import { MarkdownControls } from "./components/MarkdownControls";
import { general } from "../../../../constants";

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

  // const [isPreview, setIsPreview] = useState(false);

  const placeholderText: string = t("createTicket.ticketBodyPlaceholder");

  // const handleShowPreview = () => {
  //   setIsPreview(prevState => !prevState);
  // };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h3">{t("createTicket.ticketBody")}</Typography>
      <Box
        sx={{
          // display: isPreview ? "block" : "none",
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
        multiline
        rows={12}
        variant="outlined"
        fullWidth
        {...register("body", {
          required: true,
          maxLength: general.maxBodyLength,
        })}
        value={formattedText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFormattedText(event.target.value);
        }}
        sx={{
          // display: isPreview ? "none" : "block",
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
      <span
        style={{
          position: "absolute",
          top: "93%",
          right: 8,
          fontSize: 12,
          color: palette.whiteAlpha.default,
        }}
      >
        {formattedText.length} / {general.maxBodyLength}
      </span>
      {/* <MarkdownControls
        text={formattedText}
        isPreview={isPreview}
        setFormattedText={setFormattedText}
        handleShowPreview={handleShowPreview}
        input={inputRef.current}
      /> */}
    </Box>
  );
};

export { TicketBodyTextField };
