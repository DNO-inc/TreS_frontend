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
import { useFormatDate, useRandomNick } from "../../shared/hooks";
import {
  EditedComment,
  RepliedComment,
} from "../../pages/FullTicketInfo/components/FullTicketComments/FullTicketComments";

export type IComment = {
  color: string;
  nick: string;
  comment_id: string;
  author: {
    user_id: number;
    firstname: string;
    lastname: string;
    login: string;
    faculty: { faculty_id: number; name: string };
    group: { group_id: number; name: string };
  };
  reply_to: {
    author: {
      user_id: number;
      firstname: string;
      lastname: string;
    };
    body: string;
  } | null;
  body: string;
  creation_date: string;
  type_: "comment";
};

interface CommentProps {
  comment: IComment;
  index: number;
  setEditedComment: Dispatch<SetStateAction<EditedComment | null>>;
  setRepliedComment: Dispatch<SetStateAction<RepliedComment | null>>;
  setCommentId: Dispatch<SetStateAction<number | null>>;
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
  (
    {
      comment,
      setEditedComment,
      deleteComment,
      setRepliedComment,
      setCommentId,
      index,
    },
    ref
  ) => {
    const { palette }: IPalette = useTheme();

    const userId = getUserId();
    const isMyComment = userId === comment.author.user_id;

    const formattedDate: string = useFormatDate(comment.creation_date, "time");

    const repliedNick = useRandomNick(
      comment.reply_to?.author.firstname,
      comment.reply_to?.author.lastname
    );

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
      setCommentId(index);
    };

    const changeComment = () => {
      setEditedComment({ id: comment.comment_id, body: comment.body });
      setCommentId(index);
      setRepliedComment(null);
    };

    const handleReply = () => {
      setRepliedComment({
        id: comment.comment_id,
        body: comment.body,
        fullName: comment.nick,
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
          <Link
            to={
              comment.author?.user_id
                ? `${endpoints.profile}/${comment.author.user_id}`
                : ""
            }
          >
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
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <Link
                  to={
                    comment.author?.user_id
                      ? `${endpoints.profile}/${comment.author.user_id}`
                      : ""
                  }
                >
                  <Typography
                    sx={{ fontWeight: 600, mb: 0.5, color: comment.color }}
                  >
                    {comment.nick}
                  </Typography>
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
            {comment?.reply_to && (
              <Box
                sx={{
                  borderLeft: `3px solid ${
                    isMyComment ? palette.common.white : comment.color
                  }`,
                  borderRadius: "2px",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    ml: 1,
                    fontWeight: 600,
                    color: isMyComment ? palette.common.white : comment.color,
                  }}
                >
                  {repliedNick}
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "95%",
                  }}
                >
                  {comment.reply_to.body}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: isMyComment ? "" : "flex",
                flexWrap: "nowrap",
                gap: 3,
                justifyContent: "space-between",
              }}
            >
              {isMyComment && (
                <>
                  {getCommentBody()}
                  <Box component={"span"} sx={{ float: "right" }}>
                    <IconButton
                      onClick={changeComment}
                      sx={{
                        color: palette.whiteAlpha.default,
                        p: "2px",
                        ml: 2,
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
                </>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {!isMyComment ? getCommentBody() : <span> </span>}
              <Box>
                <span> </span>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: 14,
                    fontWeight: 300,
                    float: "right",
                    ml: 2,
                  }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export { Comment };
