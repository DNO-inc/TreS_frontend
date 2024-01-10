import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { getAccessToken } from "../../shared/functions/getLocalStorageData";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useGetCommentByIdMutation } from "../../store/api/comments.api";
import { IComment } from "./components/FullTicketComments/components/Comment/Comment";
import { IAction } from "./components/FullTicketComments/components/Action/Action";
import { useGetActionByIdMutation } from "../../store/api/tickets.api";

type ApiResponse = {
  data?: IComment | IAction;
  error?: FetchBaseQueryError | SerializedError;
};

const useCommentsConnection = (ticketId: number) => {
  const wsUrl = import.meta.env.VITE_WS_URL;

  const [createdComment, setCreatedComment] = useState<IComment | null>(null);
  const [changedComment, setChangedComment] = useState<IComment | null>(null);
  const [action, setAction] = useState<IAction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const { isAuth } = useAuth();

  const [getComment] = useGetCommentByIdMutation();
  const [getAction] = useGetActionByIdMutation();

  useEffect(() => {
    if (isAuth && !ws) {
      const newWs = new WebSocket(wsUrl);
      setWs(newWs);

      function ping() {
        if (!newWs) return;
        if (newWs.readyState !== 1) return;
        newWs.send("PING");
        if (isFirstLoad) {
          setTimeout(ping, 25000);
          setIsFirstLoad(false);
        } else {
          setTimeout(ping, 60000);
        }
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
            const messageType = commentData.msg_type;
            const isActionType = messageType.includes("ACTION");

            if (isActionType) {
              const actionId = commentData.action_id;

              getAction({
                body: JSON.stringify({ action_id: actionId }),
              }).then((res: ApiResponse) => {
                const commentData = res?.data;

                if (commentData && commentData.type_ === "action") {
                  setAction(commentData);
                }
              });
            } else {
              const commentId = commentData.comment_id;

              if (messageType === "MSG_CREATE") {
                getComment({
                  body: JSON.stringify({ comment_id: commentId }),
                }).then((res: ApiResponse) => {
                  const commentData = res?.data;

                  if (commentData && commentData.type_ === "comment") {
                    setCreatedComment(commentData);
                  }
                });
              } else if (messageType === "MSG_EDIT") {
                getComment({
                  body: JSON.stringify({ comment_id: commentId }),
                }).then((res: ApiResponse) => {
                  const commentData = res?.data;

                  if (commentData && commentData.type_ === "comment") {
                    setChangedComment(commentData);
                  }
                });
              } else if (messageType === "MSG_DELETE") {
                setDeleteId(commentId);
              }
            }
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
    action,
  };
};

export { useCommentsConnection };
