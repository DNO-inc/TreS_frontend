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

interface WebSocketContextProps {
  notifications: INotification[];
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
  countOfNotification: number;
}

interface INotification {
  data: {
    body: string;
    body_ua: string;
    ticket_id: number;
    user_id: number;
  };
  type_: "notification";
}

const WebSocketContext = createContext({} as WebSocketContextProps);

export default WebSocketContext;

const wsUrl = "wss://burrito.tres.cyberbydlo.com/ws";
const ws = new WebSocket(wsUrl);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    function ping() {
      if (!ws) return;
      if (ws.readyState !== 1) return;
      ws.send("PING");
      setTimeout(ping, 55000);
    }

    const openConnection = () => {
      const accessToken = getAccessToken() || "";
      ws.send(accessToken);
      ping();
    };

    const messageHandler = e => {
      e.data
        .text()
        .then(value => {
          const notification: INotification = JSON.parse(value);

          notification.data.body &&
            setNotifications(prevState => [notification, ...prevState]);
        })
        .catch(() => {});
    };

    ws.addEventListener("open", openConnection);

    ws.addEventListener("message", messageHandler);

    return () => {
      ws.removeEventListener("open", openConnection);
      ws.removeEventListener("message", messageHandler);
      ws.close();
    };
  }, []);

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
