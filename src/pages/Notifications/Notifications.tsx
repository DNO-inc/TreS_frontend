import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";

import { useNotification } from "../../context/NotificationContext";
import IPalette from "../../theme/IPalette.interface";
import { endpoints } from "../../constants";

const Notifications: FC = () => {
  const { palette }: IPalette = useTheme();
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
          pt: 12,
          width: "100%",
        }}
      >
        {notifications.length ? (
          notifications.map((notification, index) => {
            return (
              <Link
                to={`${endpoints.fullTicket}/${notification.ticket_id}`}
                key={index}
              >
                <Box
                  onClick={() => handleClick(index)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: palette.grey.card,
                    border: `2px solid ${palette.grey.button}`,
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <ChatIcon />
                  {i18n.language === "en"
                    ? notification.body
                    : notification.body_ua}
                </Box>
              </Link>
            );
          })
        ) : (
          <Typography variant="h1" mt={6}>
            {t("common.notFound")}
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export { Notifications };
