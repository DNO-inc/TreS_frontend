import { Dispatch, FC, SetStateAction } from "react";

import { useTranslation } from "react-i18next";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import IPalette from "../../../../../../theme/IPalette.interface";
import { EditedComment, RepliedComment } from "../../FullTicketComments";

interface FloatingPanelProps {
  editedComment: EditedComment | null;
  setEditedComment: Dispatch<SetStateAction<EditedComment | null>>;
  repliedComment: RepliedComment | null;
  setRepliedComment: Dispatch<SetStateAction<RepliedComment | null>>;
}

const FloatingPanel: FC<FloatingPanelProps> = ({
  editedComment,
  setEditedComment,
  repliedComment,
  setRepliedComment,
}) => {

  const { t } = useTranslation();

  const { palette }: IPalette = useTheme();

  const isReply = !!repliedComment;

  return (
    <Box
      sx={{
        position: "absolute",
        overflow: "hidden",
        top: 460,
        left: 0,
        right: 0,
        height: 80,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        p: 2,
        bgcolor: palette.grey.button,
      }}
    >
      {isReply ? (
        <>
          <ReplyIcon
            sx={{ color: palette.semantic.success, transform: "scaleX(-1)" }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ color: palette.semantic.success, fontWeight: 600 }}
            >
              {repliedComment.fullName}
            </Typography>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "95%",
              }}
            >
              {repliedComment?.body}
            </Typography>
          </Box>
          <IconButton onClick={() => setRepliedComment(null)}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <EditIcon sx={{ color: palette.semantic.success }} />
          <Box sx={{ flexGrow: 1, maxWidth: "90%" }}>
            <Typography
              sx={{ color: palette.semantic.success, fontWeight: 600 }}
            >

              {t("fullTicket.comments.editMessage")}

            </Typography>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "95%",
              }}
            >
              {editedComment?.body}
            </Typography>
          </Box>
          <IconButton onClick={() => setEditedComment(null)}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export { FloatingPanel };
