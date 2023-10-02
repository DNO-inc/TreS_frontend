import {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { getAccessToken } from "../shared/functions/getLocalStorageData";
import { useAuth } from "./AuthContext";

interface WebSocketContextProps {
  notifications: INotification[];
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
  countOfNotification: number;
}

interface INotification {
  body: string;
  body_ua: string;
  ticket_id: number;
  user_id: number;
}

const WebSocketContext = createContext({} as WebSocketContextProps);

export default WebSocketContext;

const wsUrl = "wss://burrito.tres.cyberbydlo.com/ws";

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { isAuth } = useAuth();

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
        ping();
      };

      const messageHandler = e => {
        e.data
          .text()
          .then(value => {
            const notification: INotification = JSON.parse(value).data;

            notification.body &&
              setNotifications(prevState => [notification, ...prevState]);
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

  const contextData = {
    notifications,
    setNotifications,
    countOfNotification: notifications.length,
  };

  return (
    <WebSocketContext.Provider value={contextData}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
