import { FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
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
  const matchesTablet = useMediaQuery(
    "(min-width: 900px) and (max-width: 1000px)"
  );
  const matchesPhone = useMediaQuery("(max-width: 700px)");

  const handleFormat = (type: string) => {
    setFormattedText(getFormattedText(text, type, input));
  };

  return (
    <Box
      sx={{
        p: 0.5,
        display: "flex",
        gap: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        mt: 2,
        bgcolor: palette.grey.card,
        borderRadius: 1,
        border: `3px solid ${palette.grey.divider}`,
      }}
    >
      <Box
        sx={{
          "& .MuiBox-root > .MuiButtonBase-root": {
            borderRadius: 2,
          },
          "& > .MuiBox-root": {
            display: "inline-block",
            "& > .MuiBox-root": {
              height: 24,
              mr: 1,
              ml: 1,
              transform: "translateY(35%)",
            },
          },
        }}
      >
        <Box>
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
        </Box>
        <Box>
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
        </Box>
        <Box>
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
      </Box>
      <Button
        startIcon={isPreview ? <EditIcon /> : <VisibilityIcon />}
        color="inherit"
        sx={{
          color: palette.whiteAlpha.text,
          pr: !matchesPhone && !matchesTablet ? 2 : -1,
          pl: 2,
          minHeight: 40,
          borderBottom: `2px solid ${palette.grey.active}`,
          borderRight: `2px solid ${palette.grey.border}`,
        }}
        onClick={handleShowPreview}
      >
        {!matchesPhone &&
          !matchesTablet &&
          (isPreview ? t("createTicket.edit") : t("createTicket.preview"))}
      </Button>
    </Box>
  );
};

export { MarkdownControls };
