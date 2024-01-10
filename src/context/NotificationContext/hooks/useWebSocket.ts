import { useEffect, useState } from "react";
import { getAccessToken } from "../../../shared/functions/getLocalStorageData";

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
