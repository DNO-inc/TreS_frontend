import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";

import Box from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import IPalette from "../../theme/IPalette.interface";
import { endpoints } from "../../constants";
import { getUserId } from "../../shared/functions/getLocalStorageData";
import { useFormatDate } from "../../shared/hooks";
import useRandomNickColor from "../../shared/hooks/useRandomNickColor";
import {
  EditedComment,
  RepliedComment,
} from "../../Pages/FullTicketInfo/components/FullTicketComments/FullTicketComments";

export type IComment = {
  comment_id: number;
  author: {
    user_id: 2;
    firstname: string;
    lastname: string;
    login: string;
    faculty: { faculty_id: number; name: string };
    group: { group_id: number; name: string };
  };
  body: string;
  creation_date: string;
  type_: "comment";
};

interface CommentProps {
  comment: IComment;
  setEditedComment: Dispatch<SetStateAction<EditedComment | null>>;
  setRepliedComment: Dispatch<SetStateAction<RepliedComment | null>>;
  deleteComment: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
}

const Comment: ForwardRefExoticComponent<
  Omit<CommentProps, "ref"> & RefAttributes<HTMLDivElement>
> = forwardRef(
  ({ comment, setEditedComment, deleteComment, setRepliedComment }, ref) => {
    const { palette }: IPalette = useTheme();

    const userId = getUserId();
    const isMyComment = userId === comment.author.user_id;

    const color = useRandomNickColor();
    const formattedDate: string = useFormatDate(comment.creation_date, "time");

    const getCommentBody = () => {
      let body = "";

      if (comment?.body) {
        body = comment.body;
      } else {
        body = "Something went wrong";
      }

      return body;
    };

    const removeComment = () => {
      deleteComment({
        body: JSON.stringify({ comment_id: comment.comment_id }),
      });
    };

    const changeComment = () => {
      setEditedComment({ id: comment.comment_id, body: comment.body });
      setRepliedComment(null);
    };

    const handleReply = () => {
      setRepliedComment({
        id: comment.comment_id,
        body: comment.body,
        fullName: `${comment.author.firstname} ${comment.author.lastname}`,
      });
      setEditedComment(null);
    };

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "flex-end",
          flexDirection: isMyComment ? "row-reverse" : "initial",
          gap: 2,
        }}
      >
        {!isMyComment && (
          <Link to={`${endpoints.profile}/${comment.author.user_id}`}>
            <Avatar />
          </Link>
        )}
        <Box
          sx={{
            position: "relative",
            bgcolor: isMyComment
              ? palette.semantic.waiting
              : palette.grey.border,
            maxWidth: "40vw",
            p: "12px 12px 4px 16px",
            borderRadius: 3,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
            },
            "&::before": isMyComment
              ? {
                  bottom: 0,
                  right: -13,
                  width: 25,
                  height: 20,
                  bgcolor: "inherit",
                }
              : {
                  bottom: 0,
                  left: -13,
                  width: 25,
                  height: 20,
                  bgcolor: "inherit",
                },
            "&::after": isMyComment
              ? {
                  bottom: -2,
                  right: -15,
                  width: 15,
                  height: 25,
                  borderRadius: "0 0 0 20px",
                  bgcolor: palette.grey.card,
                }
              : {
                  bottom: -2,
                  left: -15,
                  width: 15,
                  height: 25,
                  borderRadius: "0 0 20px 0",
                  bgcolor: palette.grey.card,
                },
          }}
        >
          <Box>
            {!isMyComment && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Link to={`${endpoints.profile}/${comment.author.user_id}`}>
                  <Typography
                    sx={{ fontWeight: 600, mb: 0.5, color: color }}
                  >{`${comment.author.firstname} ${comment.author.lastname}`}</Typography>
                </Link>
                <IconButton
                  onClick={handleReply}
                  sx={{
                    color: palette.whiteAlpha.default,
                    p: "2px",
                    mb: 0.4,
                  }}
                >
                  <ReplyIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            )}
            <Typography sx={{ fontWeight: 400 }}>
              {getCommentBody()}
              {isMyComment && (
                <>
                  <IconButton
                    onClick={changeComment}
                    sx={{
                      color: palette.whiteAlpha.default,
                      p: "2px",
                      ml: 5,
                      mb: 0.4,
                    }}
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton
                    onClick={removeComment}
                    sx={{
                      color: palette.whiteAlpha.default,
                      p: "2px",
                      mb: 0.4,
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </>
              )}
              <Typography
                component={"span"}
                color="text.secondary"
                sx={{ fontSize: 14, fontWeight: 300, float: "right", mt: 1.5 }}
              >
                {formattedDate}
              </Typography>
            </Typography>
            <Box
              component={"span"}
              sx={{
                float: "right",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export { Comment };
