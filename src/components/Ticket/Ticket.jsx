import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Divider, Grid } from "@mui/material";
import { useState } from "react";
import { formatDate, checkStatus, checkScope } from "../../shared/functions";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";
import { TicketHeader } from "./components/TicketHeader";
import { TicketBody } from "./components/TicketBody";
import { TicketActions } from "./components/TicketActions/TicketActions";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";

const Ticket = ({ ticket, ticketsPerRow, isAuth }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [isLiked, setIsLiked] = useState(ticket.is_liked);
  const [upvotes, setUpvotes] = useState(ticket.upvotes);
  const [isBookmarked, setIsBookmarked] = useState(ticket.is_bookmarked);
  const [isReported, setIsReported] = useState(false);
  const navigate = useNavigate();

  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const color = checkStatus(ticket.status.name);
  const { icon, tooltipText } = checkScope(ticket.queue.scope);
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

    setUpvotes(prevUpvote =>
      option === "like" ? prevUpvote + 1 : prevUpvote - 1
    );
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleToggleBookmark = () => {
    const option = !isBookmarked ? "bookmark" : "unbookmark";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
  };

  const handleClick = event => {
    const { target } = event;

    if (target.tagName === "path" || target.closest(".evadeItem")) {
    } else {
      isAuth && navigate(`${endpoints.fullTicket}/${ticket.ticket_id}`);
    }
  };

  return (
    <Card
      sx={{
        flexBasis: `calc((100% - 16px * ${
          ticketsPerRow - 1
        }) / ${ticketsPerRow})`,
        width: { xs: "100%" },
        height: 332,
        bgcolor: palette.grey.card,
        cursor: isAuth ? "pointer" : "default",
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
      onClick={e => handleClick(e)}
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
          icon={icon}
          tooltipText={tooltipText}
          color={color}
          subject={ticket.subject}
          status={ticket.status.name}
          assignee={ticket.assignee}
        />
        <Divider />
        <TicketBody
          body={ticket.body}
          userId={userId}
          creator={ticket.creator}
          faculty={ticket.faculty.name}
        />
        <Divider />
        <TicketActions
          isAuth={isAuth}
          isLiked={isLiked}
          isReported={isReported}
          upvotes={upvotes}
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
