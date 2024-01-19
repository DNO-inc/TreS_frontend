import { Dispatch, SetStateAction } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { IAction } from "../components/FullTicketComments/components/Action/Action";
import { IComment } from "../components/FullTicketComments/components/Comment/Comment";
import { useGetCommentByIdMutation } from "api/comments.api";
import { useGetActionByIdMutation } from "api/tickets.api";

type ApiResponse = {
  data?: IComment | IAction;
  error?: FetchBaseQueryError | SerializedError;
};

interface CommentsConnectionProps {
  setAction: Dispatch<SetStateAction<IAction | null>>;
  setCreatedComment: Dispatch<SetStateAction<IComment | null>>;
  setChangedComment: Dispatch<SetStateAction<IComment | null>>;
  setDeleteId: Dispatch<SetStateAction<string | null>>;
}

const useMessageHandler = ({
  setAction,
  setCreatedComment,
  setChangedComment,
  setDeleteId,
}: CommentsConnectionProps) => {
  const [getComment] = useGetCommentByIdMutation();
  const [getAction] = useGetActionByIdMutation();

  const handleAction = (commentData: IAction) => {
    if (commentData.type_ === "action") {
      setAction(commentData);
    }
  };

  const handleComment = (commentData: IComment, setter: Function) => {
    if (commentData.type_ === "comment") {
      setter(commentData);
    }
  };

  const messageHandler = (e: MessageEvent) => {
    e.data
      .text()
      .then(response => {
        const commentData = JSON.parse(response);
        const messageType = commentData.msg_type;
        const isActionType = messageType.includes("ACTION");

        if (isActionType) {
          const actionId = commentData.action_id;

          getAction({ body: JSON.stringify({ action_id: actionId }) }).then(
            (res: ApiResponse) => handleAction(res?.data as IAction)
          );
        } else {
          const commentId = commentData.comment_id;

          if (messageType === "MSG_CREATE") {
            getComment({
              body: JSON.stringify({ comment_id: commentId }),
            }).then((res: ApiResponse) =>
              handleComment(res?.data as IComment, setCreatedComment)
            );
          } else if (messageType === "MSG_EDIT") {
            getComment({
              body: JSON.stringify({ comment_id: commentId }),
            }).then((res: ApiResponse) =>
              handleComment(res?.data as IComment, setChangedComment)
            );
          } else if (messageType === "MSG_DELETE") {
            setDeleteId(commentId);
          }
        }
      })
      .catch(() => {});
  };

  return messageHandler;
};

export { useMessageHandler };
