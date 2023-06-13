import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDate, checkStatus } from "../../shared/functions";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";
import { TicketHeader } from "./components/TicketHeader";
import { TicketBody } from "./components/TicketBody";
import { TicketActions } from "./components/TicketActions/TicketActions";

const Ticket = ({ ticket, ticketsPerRow, isAuth }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [isLiked, setIsLiked] = useState(ticket.is_liked);
  const [isBookmarked, setIsBookmarked] = useState(ticket.is_bookmarked);
  const [isReported, setIsReported] = useState(false);

  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const { color, icon } = checkStatus(ticket.status.name);
  const formattedDate = ticket?.date && formatDate(ticket.date);
  const userId = ticket.creator?.user_id;

  const handleToggleReported = () => {
    setIsReported(prevIsReported => !prevIsReported);
  };

  const handleToggleLike = () => {
    const option = !isLiked ? "like" : "unlike";

    toggleLike({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  useEffect(() => {
    setIsLiked(ticket.is_liked);
  }, [ticket.is_liked]);

  const handleToggleBookmark = () => {
    const option = !isBookmarked ? "bookmark" : "unbookmark";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
  };

  useEffect(() => {
    setIsBookmarked(ticket.is_bookmarked);
  }, [ticket.is_bookmarked]);

  return (
    <Card
      sx={{
        flexBasis: `calc((100% - 16px * ${
          ticketsPerRow - 1
        }) / ${ticketsPerRow})`,
        width: { xs: "100%" },
        height: 332,
        bgcolor: palette.grey.card,
        border: `2px solid ${palette.grey.border}`,
        "& > div > div": {
          p: 2,
        },
        "& > div > hr": {
          bgcolor: palette.grey.border,
          ml: 2,
          mr: 2,
        },
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          borderLeft: `12px solid ${color}`,
        }}
      >
        <TicketHeader
          color={color}
          icon={icon}
          subject={ticket.subject}
          status={ticket.status.name}
          assignee={ticket.assignee}
        />
        <Divider />
        <TicketBody
          body={ticket.body}
          userId={userId}
          ticketId={ticket.ticket_id}
          creator={ticket.creator}
          faculty={ticket.faculty.name}
        />
        <Divider />
        <TicketActions
          isAuth={isAuth}
          isLiked={isLiked}
          isReported={isReported}
          upvotes={ticket.upvotes}
          isBookmarked={isBookmarked}
          handleToggleLike={handleToggleLike}
          handleToggleBookmark={handleToggleBookmark}
          handleToggleReported={handleToggleReported}
          formattedDate={formattedDate}
        />
      </Grid>
    </Card>
  );
};

Ticket.propTypes = {};

export { Ticket };
