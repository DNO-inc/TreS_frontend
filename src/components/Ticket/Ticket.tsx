import {
  MouseEvent,
  useState,
  FC,
  ComponentType,
  useEffect,
  memo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import useTheme from "@mui/material/styles/useTheme";
import { SlideProps } from "@mui/material";

import { TicketHeader } from "./components/TicketHeader";
import { TicketBody } from "./components/TicketBody";
import { TicketActions } from "./components/TicketActions";
import { SnackbarNotification } from "../SnackbarNotification";
import { SlideNotification } from "../SlideNotification";

import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets.api";
import { endpoints } from "../../constants";
import { useFormatDate } from "../../shared/hooks";
import IPalette from "../../theme/IPalette.interface";

import { ITicket } from "./ticket.interface";
import { getUserId } from "../../shared/functions/getLocalStorageData";
import { checkStatus } from "../../shared/functions";
import { useAuth } from "../../context/AuthContext";

interface TicketProps {
  ticket: ITicket;
  ticketsPerRow: number;
}

const TOGGLE_LIKE_OPTION = {
  LIKE: "like",
  UNLIKE: "unlike",
};

const TOGGLE_BOOKMARK_OPTION = {
  BOOKMARK: "bookmark",
  UNBOOKMARK: "unbookmark",
};

const Ticket: FC<TicketProps> = memo(({ ticket, ticketsPerRow }) => {
  const { palette }: IPalette = useTheme();

  const { isAuth } = useAuth();

  ////////////////////////////////////////////
  const userId = Number(getUserId());
  const creatorId = ticket?.creator && ticket?.creator.user_id;
  const isMyTicket = userId == creatorId;

  const isHiddenTicket = isMyTicket && ticket.hidden;

  ////////////////////////////////////////
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    ComponentType<TransitionProps> | undefined
  >(undefined);

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionRight(props: TransitionProps, variant: string) {
    return <SlideNotification props={props} variant={variant} />;
  }

  const handleSnackbarClick = (Transition: ComponentType<TransitionProps>) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason: string) => {
    if (reason === "timeout") {
      setOpen(false);
    }
  };

  ////////////////////////////////////////

  const [upvotes, setUpvotes] = useState<number>(ticket.upvotes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  // const [isReported, setIsReported] = useState<boolean>(false);

  useEffect(() => {
    ticket.is_liked && setIsLiked(true);
  }, [ticket.is_liked]);

  useEffect(() => {
    ticket.is_followed && setIsFollowed(true);
  }, [ticket.is_followed]);

  const navigate = useNavigate();

  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const color: string = checkStatus(ticket.status.name);
  const formattedDate: string = ticket?.date && useFormatDate(ticket.date);

  const handleToggleReported = (): void => {
    // setIsReported(prevIsReported => !prevIsReported);

    handleSnackbarClick(props => TransitionRight(props, "report"));
  };

  const handleToggleLike = useCallback(() => {
    const option = !isLiked
      ? TOGGLE_LIKE_OPTION.LIKE
      : TOGGLE_LIKE_OPTION.UNLIKE;

    toggleLike({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setUpvotes((prevUpvote: number) =>
      option === "like" ? prevUpvote + 1 : prevUpvote - 1
    );

    setIsLiked((prevIsLiked: boolean) => !prevIsLiked);

    handleSnackbarClick(props => TransitionRight(props, option));
  }, [isLiked, toggleLike, ticket]);

  const handleToggleFollowed = useCallback(() => {
    const option = !isFollowed
      ? TOGGLE_BOOKMARK_OPTION.BOOKMARK
      : TOGGLE_BOOKMARK_OPTION.UNBOOKMARK;
    const notiOption = !isFollowed ? "follow" : "unfollow";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsFollowed((prevIsBookmarked: boolean) => !prevIsBookmarked);

    handleSnackbarClick(props => TransitionRight(props, notiOption));
  }, [isFollowed, toggleBookmark, ticket]);

  const handleClick = (event: MouseEvent): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      target.tagName !== "path" &&
      !target.closest(".evadeItem")
    ) {
      isAuth && navigate(`${endpoints.FULL_TICKET}/${ticket.ticket_id}`);
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
        flexBasis: `calc((100% - 16px * ${
          ticketsPerRow - 1
        }) / ${ticketsPerRow})`,
        height: 332,
        bgcolor: palette.grey.card,
        cursor: isAuth ? "pointer" : "default",
        backgroundImage: "none",
        border: `2px solid ${palette.grey.border}`,
        "& > div > div": {
          p: 2,
        },
        "& > div > hr": {
          borderRadius: 2,
          border: `1px solid ${palette.grey.border}`,
          ml: 2,
          mr: 2,
        },

        "&::before": isHiddenTicket
          ? {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              zIndex: 2,
            }
          : {},
        "&::after": isHiddenTicket
          ? {
              content: "'Заспокойся, ніхто не бачить'",
              textAlign: "center",
              fontSize: 40,
              fontWeight: 900,
              transform: "rotate(20deg) translate(-10%, -20%)",
              position: "absolute",
              top: "40%",
              left: "15%",
              zIndex: 3,
            }
          : {},
      }}
      onClick={handleClick}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderLeft: `12px solid ${color}`,
        }}
      >
        <TicketHeader
          color={color}
          scope={ticket.queue?.scope}
          subject={ticket.subject}
          status={ticket.status.name}
          assignee={ticket.assignee}
        />
        <Divider />
        <TicketBody
          isHiddenTicket={isHiddenTicket}
          isMyTicket={isMyTicket}
          body={ticket.body}
          creator={ticket.creator}
          faculty={ticket.faculty.name}
        />
        <hr />
        <TicketActions
          isLiked={isLiked}
          // isReported={isReported}
          upvotes={upvotes}
          isFollowed={isFollowed}
          handleToggleLike={handleToggleLike}
          handleToggleFollowed={handleToggleFollowed}
          handleToggleReported={handleToggleReported}
          formattedDate={formattedDate}
          isMyTicket={isMyTicket}
        />
        <SnackbarNotification
          open={open}
          handleClose={handleClose}
          transition={transition}
        />
      </Grid>
    </Card>
  );
});

export { Ticket };
