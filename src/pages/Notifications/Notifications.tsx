import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useNotification } from "../../context/NotificationContext/NotificationContext";
import { NotFound } from "../../components/NotFound";
import { NotificationTile } from "./components/NotificationTile";

const Notifications: FC = () => {
  const { t, i18n } = useTranslation();

  const { notifications, setNotifications } = useNotification();

  const handleClick = (id: number) => {
    setNotifications(prevState => prevState.filter((_, index) => id !== index));
  };

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("notification.heading")}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pt: "80px !important",
          width: "100%",
        }}
      >
        {notifications.length ? (
          notifications.map((notification, index) => {
            const count = notification?.count;
            const description =
              i18n.language === "en" ? notification.body : notification.body_ua;

            return (
              <NotificationTile
                ticketId={notification.ticket_id}
                description={description}
                count={count}
                handleClick={handleClick}
                index={index}
                key={index}
              />
            );
          })
        ) : (
          <NotFound title="notifications" />
        )}
      </Box>
    </Grid>
  );
};

export { Notifications };
