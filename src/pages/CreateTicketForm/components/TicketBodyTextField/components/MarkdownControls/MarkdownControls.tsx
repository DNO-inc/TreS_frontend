import { FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { Button, IconButton, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import IPalette from "../../../../../../theme/IPalette.interface";
import { VerticalDivider } from "../../../../../../components/VerticalDivider";
import { getFormattedText } from "./getFormattedText";

interface MarkdownControlsProps {
  text: string;
  isPreview: boolean;
  setFormattedText: Dispatch<SetStateAction<string>>;
  handleShowPreview: () => void;
  input: HTMLInputElement | null;
}

const MarkdownControls: FC<MarkdownControlsProps> = ({
  text,
  isPreview,
  setFormattedText,
  handleShowPreview,
  input,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const handleFormat = (type: string) => {
    setFormattedText(getFormattedText(text, type, input));
  };

  return (
    <Box
      sx={{
        p: 0.5,
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
        bgcolor: palette.grey.card,
        borderRadius: 1,
        border: `3px solid ${palette.grey.divider}`,
      }}
    >
      <Box
        sx={{
          "& > .MuiButtonBase-root": {
            borderRadius: 2,
          },
          "& > .MuiBox-root": {
            height: 24,
            mr: 1,
            ml: 1,
            transform: "translateY(35%)",
          },
        }}
      >
        <IconButton
          onClick={() => handleFormat("heading")}
          sx={{ fontSize: 20, width: 40, height: 40 }}
        >
          H
        </IconButton>
        <IconButton onClick={() => handleFormat("bold")}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("italic")}>
          <FormatItalicIcon />
        </IconButton>
        <VerticalDivider />
        <IconButton onClick={() => handleFormat("code")}>
          <CodeIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("strike-through")}>
          <FormatStrikethroughIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("link")}>
          <AddLinkIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("image")}>
          <AddPhotoAlternateIcon />
        </IconButton>
        <VerticalDivider />
        <IconButton onClick={() => handleFormat("bulleted-list")}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("numbered-list")}>
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton onClick={() => handleFormat("check-list")}>
          <ChecklistIcon />
        </IconButton>
        <VerticalDivider />
      </Box>
      {isPreview ? (
        <Button
          startIcon={<EditIcon />}
          color="inherit"
          sx={{ zIndex: 2200, color: palette.whiteAlpha.text, pr: 4, pl: 4 }}
          onClick={handleShowPreview}
        >
          {t("createTicket.edit")}
        </Button>
      ) : (
        <Button
          startIcon={<VisibilityIcon />}
          color="inherit"
          sx={{ zIndex: 2200, color: palette.whiteAlpha.text, pr: 2, pl: 2 }}
          onClick={handleShowPreview}
        >
          {t("createTicket.preview")}
        </Button>
      )}
    </Box>
  );
};

export { MarkdownControls };
