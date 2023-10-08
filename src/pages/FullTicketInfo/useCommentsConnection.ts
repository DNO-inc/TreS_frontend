import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { getAccessToken } from "../../shared/functions/getLocalStorageData";
import { useAuth } from "../../context/AuthContext";
import {
  useGetActionByIdMutation,
  useGetCommentByIdMutation,
} from "../../store/api/comments/comments.api";
import { IComment } from "../../components/Comment/Comment";
import { IAction } from "../../components/Action/Action";

type ApiResponse = {
  data?: IComment | IAction;
  error?: FetchBaseQueryError | SerializedError;
};

const useCommentsConnection = (ticketId: number) => {
  const wsUrl = import.meta.env.VITE_WS_URL;

  const [createdComment, setCreatedComment] = useState<IComment | null>(null);
  const [changedComment, setChangedComment] = useState<IComment | null>(null);
  // const [actions, setActions] = useState<IAction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { isAuth } = useAuth();

  const [getComment] = useGetCommentByIdMutation();
  // const [getAction] = useGetActionByIdMutation();

  useEffect(() => {
    if (isAuth && !ws) {
      const newWs = new WebSocket(wsUrl);
      setWs(newWs);

      function ping() {
        if (!newWs) return;
        if (newWs.readyState !== 1) return;
        newWs.send("PING");
        setTimeout(ping, 55000);
      }

      const openConnection = () => {
        const accessToken = getAccessToken() || "";
        newWs.send(accessToken);
        newWs.send("CHAT");
        newWs.send(ticketId.toString());
        ping();
      };

      const messageHandler = e => {
        e.data
          .text()
          .then(response => {
            const commentData = JSON.parse(response);
            const commentId = commentData.comment_id;
            const commentType = commentData.msg_type;

            if (commentType === "MSG_CREATE") {
              getComment({
                body: JSON.stringify({ comment_id: commentId }),
              }).then((res: ApiResponse) => {
                const commentData = res?.data;

                if (commentData && commentData.type_ === "comment") {
                  setCreatedComment(commentData);
                }
              });
            } else if (commentType === "MSG_EDIT") {
              getComment({
                body: JSON.stringify({ comment_id: commentId }),
              }).then((res: ApiResponse) => {
                const commentData = res?.data;

                if (commentData && commentData.type_ === "comment") {
                  setChangedComment(commentData);
                }
              });
            } else if (commentType === "MSG_DELETE") {
              setDeleteId(commentId);
            }
            // else if (commentType === "MSG_ACTION") {
            //   getAction({
            //     body: JSON.stringify({ action_id: commentId }),
            //   }).then((res: ApiResponse) => {
            //     const commentData = res?.data;

            //     if (commentData && commentData.type_ === "action") {
            //       setActions(commentData);
            //     }
            //   });
            // }
          })
          .catch(() => {});
      };

      newWs.addEventListener("open", openConnection);
      newWs.addEventListener("message", messageHandler);
    } else if (!isAuth && ws) {
      ws.close();
      setWs(null);
    }
  }, [isAuth, ws]);

  return {
    createdComment,
    changedComment,
    deleteId,
  };
};

export { useCommentsConnection };
