import { useEffect, useState } from "react";
import { getAccessToken } from "../../../shared/functions/manipulateLocalStorage";

const useWebSocket = (
  wsUrl: string,
  isAuth: boolean,
  onMessage: (data: string) => void
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (isAuth && wsUrl) {
      const newWs = new WebSocket(wsUrl);
      setWs(newWs);

      const ping = () => {
        if (!newWs || newWs.readyState !== 1) return;
        newWs.send("PING");
        setTimeout(ping, isFirstLoad ? 25000 : 60000);
        setIsFirstLoad(false);
      };

      const openConnection = () => {
        const accessToken = getAccessToken() || "";
        newWs.send(accessToken);
        newWs.send("NOTIFICATIONS");
        ping();
      };

      const messageHandler = (e: MessageEvent) => {
        e.data
          .text()
          .then(res => {
            onMessage(res);
          })
          .catch(() => {});
      };

      newWs.addEventListener("open", openConnection);
      newWs.addEventListener("message", messageHandler);

      return () => {
        newWs.close();
        setWs(null);
      };
    }
  }, [wsUrl, isAuth]);

  return ws;
};

export { useWebSocket };
