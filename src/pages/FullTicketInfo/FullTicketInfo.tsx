import { useEffect, FC, useState } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../components/Loader";
import { ActionPanel } from "./components/ActionPanel";
import { MarkdownWithStyles } from "../../utils/markdown";
import { FullTicketHeader } from "./components/FullTicketHeader";
import { FullTicketComments } from "./components/FullTicketComments";
import { FullTicketAdditionInfo } from "./components/FullTicketAdditionInfo";
import { FullTicketFiles } from "./components/FullTicketFiles";

import { useShowTicketMutation } from "../../store/api/tickets/tickets.api";
import { checkIsAdmin } from "../../shared/functions";
import IPalette from "../../theme/IPalette.interface";
import {
  useAdminShowTicketMutation,
  useAdminUpdateTicketMutation,
} from "../../store/api/admin/admin.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";
import { useCommentsConnection } from "./useCommentsConnection";

export interface IPerson {
  color: string;
  nick: string;
}

const FullTicketInfo: FC = () => {
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();

  const [peopleSettings, setPeopleSettings] = useState(
    new Map<number, IPerson>()
  );

  const ticketId: number = parseInt(pathname.split("/")[2]);
  const isAdmin = checkIsAdmin();

  const [showTicket, { data: ticket, isSuccess, isLoading }] = isAdmin
    ? useAdminShowTicketMutation()
    : useShowTicketMutation();
  const [updateTicket] = useAdminUpdateTicketMutation();

  const userId = Number(getUserId());
  const creatorId = ticket?.creator && ticket?.creator.user_id;
  const assigneeId = ticket?.assignee && ticket?.assignee.user_id;
  const isMyTicket = userId == creatorId;
  const isCanManipulateFile = isMyTicket || isAdmin;

  useEffect(() => {
    showTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  }, [ticketId]);

  useEffect(() => {
    if (isSuccess) {
      setIsLiked(ticket?.is_liked);
      setUpvotes(ticket?.upvotes);
      setIsFollowed(ticket?.is_followed);
    }
  }, [isSuccess]);

  // ======================================

  const commentsConnection = useCommentsConnection(ticketId);

  // ======================================

  const [upvotes, setUpvotes] = useState<number>(ticket?.upvotes);
  const [isLiked, setIsLiked] = useState<boolean>(ticket?.is_liked);
  const [isFollowed, setIsFollowed] = useState<boolean>(ticket?.is_followed);
  const [isReported, setIsReported] = useState<boolean>(false);

  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();

  const handleToggleReported = (): void => {
    setIsReported(prevIsReported => !prevIsReported);
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

  const handleToggleFollowed = (): void => {
    const option = !isFollowed ? "bookmark" : "unbookmark";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsFollowed((prevIsBookmarked: boolean) => !prevIsBookmarked);
  };
  // ======================================

  return (
    <Grid container>
      {isLoading && <Loader />}
      {isSuccess && (
        <Grid
          container
          gap={3}
          sx={{
            pt: 6,
            pb: 10,
            "& > .MuiGrid-root > .MuiTypography-root:not(:first-of-type)": {
              fontSize: 20,
            },
          }}
        >
          <FullTicketHeader
            assigneeId={assigneeId}
            ticketFaculty={ticket.faculty.faculty_id}
            ticketStatus={ticket.status}
            ticketQueue={ticket.queue}
            ticketId={ticket.ticket_id}
            ticketAssignee={ticket.assignee}
            updateTicket={updateTicket}
            subject={ticket.subject}
            action={commentsConnection.action}
          />
          <Grid container>
            <Grid
              sx={{
                width: "100%",
                p: "16px 20px",
                bgcolor: palette.grey.card,
                borderRadius: 1,
                whiteSpace: "pre-line",
              }}
            >
              <MarkdownWithStyles innerText={ticket.body} />
            </Grid>
          </Grid>
          <FullTicketFiles
            ticketId={ticket.ticket_id}
            isCanManipulateFile={isCanManipulateFile}
          />
          <FullTicketAdditionInfo
            creator={ticket.creator}
            faculty={ticket.faculty}
            date={ticket.date}
          />
          <FullTicketComments
            peopleSettings={peopleSettings}
            setPeopleSettings={setPeopleSettings}
            ticketId={ticket.ticket_id}
            commentsConnection={commentsConnection}
          />
          <ActionPanel
            isLiked={isLiked}
            isReported={isReported}
            upvotes={upvotes}
            isFollowed={isFollowed}
            handleToggleLike={handleToggleLike}
            handleToggleFollowed={handleToggleFollowed}
            handleToggleReported={handleToggleReported}
            isMyTicket={isMyTicket}
          />
        </Grid>
      )}
    </Grid>
  );
};

export { FullTicketInfo };
