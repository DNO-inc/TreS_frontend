import { MouseEvent, useState, FC } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import { Divider, Grid, useTheme } from "@mui/material";

import { TicketHeader } from "./components/TicketHeader";
import { TicketBody } from "./components/TicketBody";
import { TicketActions } from "./components/TicketActions";
import { SnackbarNotification } from "../SnackbarNotification";

import { formatDate, checkStatus } from "../../shared/functions";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";
import { endpoints } from "../../constants";
import { useCheckScope } from "../../shared/hooks";
import IPalette from "../../theme/IPalette.interface";

import { Slide, SlideProps } from "@mui/material";

interface TicketProps {
  ticket: ITicket;
  ticketsPerRow: number;
  isAuth: boolean;
}

const Ticket: FC<TicketProps> = ({ ticket, ticketsPerRow, isAuth }) => {
  const { palette }: IPalette = useTheme();

  ////////////////////////////////////////
  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
  }

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleSnackbarClick = (
    Transition: React.ComponentType<TransitionProps>
  ) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ////////////////////////////////////////

  const [isLiked, setIsLiked] = useState<boolean>(ticket.is_liked);
  const [upvotes, setUpvotes] = useState<number>(ticket.upvotes);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    ticket.is_bookmarked
  );
  const [isReported, setIsReported] = useState<boolean>(false);

  const navigate = useNavigate();

  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const color: string = checkStatus(ticket.status.name);
  const { icon, tooltipText }: { icon: JSX.Element; tooltipText: string } =
    useCheckScope(ticket.queue.scope);
  const formattedDate: string = ticket?.date && formatDate(ticket.date);
  const userId: number | null = ticket.creator?.user_id;

  const handleToggleReported = (): void => {
    setIsReported(prevIsReported => !prevIsReported);

    handleSnackbarClick(TransitionRight);
  };

  const handleToggleLike = (): void => {
    const option = !isLiked ? "like" : "unlike";

    toggleLike({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setUpvotes((prevUpvote: number) =>
      option === "like" ? prevUpvote + 1 : prevUpvote - 1
    );

    setIsLiked((prevIsLiked: boolean) => !prevIsLiked);
  };

  const handleToggleBookmark = (): void => {
    const option = !isBookmarked ? "bookmark" : "unbookmark";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsBookmarked((prevIsBookmarked: boolean) => !prevIsBookmarked);
  };

  const handleClick = (event: MouseEvent): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      target.tagName !== "path" &&
      !target.closest(".evadeItem")
    ) {
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
      onClick={handleClick}
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
        <SnackbarNotification
          variant={"like"}
          open={open}
          handleClose={handleClose}
          transition={transition}
        />
      </Grid>
    </Card>
  );
};

export { Ticket };
