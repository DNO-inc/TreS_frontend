import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import TextField from "@mui/material/TextField";

import SendIcon from "@mui/icons-material/Send";

import IPalette from "../../../../../../theme/IPalette.interface";
import { EditedComment, RepliedComment } from "../../FullTicketComments";

interface CommentsTextFieldProps {
  ticketId: number;
  editedComment: EditedComment | null;
  setEditedComment: Dispatch<SetStateAction<EditedComment | null>>;
  repliedComment: RepliedComment | null;
  setRepliedComment: Dispatch<SetStateAction<RepliedComment | null>>;
  createComment: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
  editComment: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
}

interface CreateCommentBody {
  ticket_id: number;
  body: string;
  reply_to?: number;
}

interface EditCommentBody {
  comment_id: number;
  body: string;
}

const CommentsTextField: FC<CommentsTextFieldProps> = ({
  ticketId,
  createComment,
  editedComment,
  setEditedComment,
  editComment,
  repliedComment,
  setRepliedComment,
}) => {
  const { palette }: IPalette = useTheme();

  const [comment, setComment] = useState(
    editedComment?.body ? editedComment.body : ""
  );

  const sendComment = () => {
    if (comment) {
      if (editedComment && editedComment?.id) {
        const body: EditCommentBody = {
          comment_id: editedComment.id,
          body: comment,
        };

        editComment({ body: JSON.stringify(body) });
        setEditedComment(null);
      } else {
        const body: CreateCommentBody = {
          ticket_id: ticketId,
          body: comment,
        };

        if (repliedComment?.id) {
          body["reply_to"] = repliedComment.id;
        }

        createComment({ body: JSON.stringify(body) });
        setRepliedComment(null);
        setComment("");
      }
    }
  };

  useEffect(() => {
    setComment(editedComment?.body ? editedComment.body : "");
  }, [editedComment]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        width: "100%",
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Message"
        sx={{
          bgcolor: palette.grey.card,
          "& .MuiInputBase-root": {
            p: "12px",
          },
          "& .MuiInputBase-input": {
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
          },
        }}
      />
      <Button
        onClick={sendComment}
        variant="contained"
        color="inherit"
        startIcon={<SendIcon />}
        sx={{ pr: 4, pl: 4, height: 47 }}
      >
        Send
      </Button>
    </Box>
  );
};

export { CommentsTextField };
