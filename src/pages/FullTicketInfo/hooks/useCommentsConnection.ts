import { useEffect, useState } from "react";

import { getAccessToken } from "functions/manipulateLocalStorage";
import { useAuth } from "context/AuthContext/AuthContext";
import { IComment } from "../components/FullTicketComments/components/Comment/Comment";
import { IAction } from "../components/FullTicketComments/components/Action/Action";
import { endpoints } from "constants";
import { useMessageHandler } from "./useMessageHandler";

const useCommentsConnection = (ticketId: number) => {
  const { isAuth } = useAuth();

  const [createdComment, setCreatedComment] = useState<IComment | null>(null);
  const [changedComment, setChangedComment] = useState<IComment | null>(null);
  const [action, setAction] = useState<IAction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const messageHandler = useMessageHandler({
    setAction,
    setCreatedComment,
    setChangedComment,
    setDeleteId,
  });

  const ping = () => {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    ws.send("PING");
    setTimeout(ping, isFirstLoad ? 25000 : 60000);
    setIsFirstLoad(false);
  };

  const openConnection = (webSocket: WebSocket) => {
    const accessToken = getAccessToken() || "";
    webSocket?.send(accessToken);
    webSocket?.send("CHAT");
    webSocket?.send(ticketId.toString());
    ping();
  };

  useEffect(() => {
    if (isAuth && !ws) {
      const newWs = new WebSocket(endpoints.WS_URL);
      setWs(newWs);

      newWs.addEventListener("open", () => {
        openConnection(newWs);
      });
      newWs.addEventListener("message", messageHandler);
    } else if (!isAuth && ws) {
      ws.close();
      setWs(null);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isAuth, ws, ticketId]);

  return {
    createdComment,
    changedComment,
    deleteId,
    action,
  };
};

export { useCommentsConnection };
