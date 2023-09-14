import {
  FC,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Comment } from "../../../../components/Comment";
import { Action } from "../../../../components/Action";

import IPalette from "../../../../theme/IPalette.interface";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetFullHistoryMutation,
} from "../../../../store/api/comments/comments.api";
import { CommentsTextField } from "./components/CommentsTextField";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { FloatingPanel } from "./components/FloatingPanel";

export type IHistoryItem =
  | {
      action_id: 1;
      author: {
        user_id: 2;
        firstname: string;
        lastname: string;
        login: string;
        faculty: { faculty_id: number; name: string };
        group: { group_id: number; name: string };
      };
      creation_date: string;
      field_name: string;
      new_value: string;
      old_value: string;
      ticket_id: number;
      type_: "action";
    }
  | {
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

interface CreateCommentResponse {
  data?: {
    history: IHistoryItem[];
  };
  error?: FetchBaseQueryError | SerializedError;
}

interface FullTicketCommentsProps {
  ticketId: number;
}

export interface EditedComment {
  id: number;
  body: string;
}

export interface RepliedComment {
  id: number;
  body: string;
  fullName: string;
}

const FullTicketComments: FC<FullTicketCommentsProps> = ({ ticketId }) => {
  const { t, i18n } = useTranslation();
  const { palette }: IPalette = useTheme();

  const commentFieldRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [getComments] = useGetFullHistoryMutation();
  const [createComment, { isSuccess: isCommentCreated }] =
    useCreateCommentMutation();
  const [deleteComment, { isSuccess: isCommentDeleted }] =
    useDeleteCommentMutation();
  const [editComment, { isSuccess: isCommentEdited }] =
    useEditCommentMutation();

  // =========================================================
  const [comments, setComments] = useState<IHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [repliedComment, setRepliedComment] = useState<RepliedComment | null>(
    null
  );
  const [editedComment, setEditedComment] = useState<EditedComment | null>(
    null
  );

  // const containerRef = useRef<HTMLInputElement | null>(null);
  const observer: MutableRefObject<undefined | IntersectionObserver> = useRef();

  const lastCommentElementRef: any = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setIsLoading(true);

    getComments({
      body: JSON.stringify({
        start_page: currentPage,
        items_count: 25,
        ticket_id: ticketId,
      }),
    })
      .then((response: CreateCommentResponse) => {
        if (response && response?.data && response?.data?.history) {
          const newComments = response.data.history;

          setComments(prevComments =>
            currentPage === 1
              ? [...newComments]
              : [...prevComments, ...newComments]
          );
          setHasMore(response.data.history.length > 0);
          setIsLoading(false);

          // if (commentFieldRef.current) {
          //   const scrollContainer = commentFieldRef.current;
          //   scrollContainer.scrollTop = scrollContainer.scrollHeight;
          // }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [isCommentCreated, isCommentDeleted, isCommentEdited, currentPage]);

  // =========================================================

  return (
    <Grid container sx={{ position: "relative" }}>
      <Typography mb={2}>{t("fullTicket.comments.heading")}</Typography>
      <Grid
        container
        ref={commentFieldRef}
        sx={{
          flexDirection: "column",
          flexWrap: "nowrap",
          overflowY: "auto",
          scrollBehavior: "smooth",
          width: "100%",
          minHeight: 80,
          maxHeight: 500,
          p: "16px 20px",
          bgcolor: palette.grey.card,
          borderRadius: 1,
          whiteSpace: "pre-line",
          gap: 2,
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "inherit",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: palette.whiteAlpha.default,
            borderRadius: 2,
          },
        }}
      >
        {comments.map((item: IHistoryItem, index: number) => {
          if (item.type_ === "comment") {
            if (comments.length === index + 1) {
              return (
                <Comment
                  ref={lastCommentElementRef}
                  comment={item}
                  key={`${item.type_}-${item.comment_id}`}
                  deleteComment={deleteComment}
                  setEditedComment={setEditedComment}
                  setRepliedComment={setRepliedComment}
                />
              );
            }

            return (
              <Comment
                comment={item}
                key={`${item.type_}-${item.comment_id}`}
                deleteComment={deleteComment}
                setEditedComment={setEditedComment}
                setRepliedComment={setRepliedComment}
              />
            );
          } else if (item.type_ === "action") {
            if (comments.length === index + 1) {
              return (
                <Action
                  ref={lastCommentElementRef}
                  action={item}
                  translator={t}
                  lang={i18n.language}
                  key={`${item.type_}-${item.action_id}`}
                />
              );
            }

            return (
              <Action
                action={item}
                translator={t}
                lang={i18n.language}
                key={`${item.type_}-${item.action_id}`}
              />
            );
          }
        })}
      </Grid>
      {(editedComment || repliedComment) && (
        <FloatingPanel
          editedComment={editedComment}
          setEditedComment={setEditedComment}
          repliedComment={repliedComment}
          setRepliedComment={setRepliedComment}
        />
      )}
      <CommentsTextField
        ticketId={ticketId}
        createComment={createComment}
        editedComment={editedComment}
        editComment={editComment}
        setEditedComment={setEditedComment}
        repliedComment={repliedComment}
        setRepliedComment={setRepliedComment}
      />
    </Grid>
  );
};

export { FullTicketComments };
