import { useEffect, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../components/Loader";
import { ActionPanel } from "./components/ActionPanel";
import { MarkdownWithStyles } from "../../utils/markdown";

import { VerticalDivider } from "../../components/VerticalDivider";

import { endpoints } from "../../constants";
import { useShowTicketMutation } from "../../store/api/tickets/tickets.api";
import { checkIsAdmin, checkStatus, formatDate } from "../../shared/functions";
import IPalette from "../../theme/IPalette.interface";
import { useAdminShowTicketMutation } from "../../store/api/admin/admin.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";

const FullTicketInfo: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();

  const ticketId: number = parseInt(pathname.split("/")[2]);
  const isAdmin = checkIsAdmin();

  const [showTicket, { data: ticket, isSuccess, isLoading }] = isAdmin
    ? useAdminShowTicketMutation()
    : useShowTicketMutation();

  const userId = Number(getUserId());
  const creatorId = ticket?.creator && ticket?.creator.user_id;
  const isMyTicket = userId == creatorId;

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
  const [isLiked, setIsLiked] = useState<boolean>(ticket?.is_liked);
  const [upvotes, setUpvotes] = useState<number>(ticket?.upvotes);
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
          <Grid container sx={{ flexDirection: "column" }}>
            <Grid
              container
              sx={{
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: 36,
                  mb: "12px",
                  maxWidth: "80%",
                }}
              >
                <MarkdownWithStyles innerText={ticket.subject} />
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  p: "4px 12px",
                  bgcolor: checkStatus(ticket.status.name),
                  color:
                    checkStatus(ticket.status.name) === "#FFFFFF"
                      ? palette.common.black
                      : palette.common.white,
                  borderRadius: 1,
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {t(`ticketStatus.${ticket.status.name.toLowerCase()}`)}
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{ticket.queue.scope}</Typography>
              <VerticalDivider height={16} />
              <Typography sx={{ color: palette.whiteAlpha.default }}>
                {ticket.queue.name}
              </Typography>
            </Box>
          </Grid>
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
          <Grid container>
            <Typography mb={2}>{t("fullTicket.additionalInfo")}</Typography>
            <Grid
              container
              sx={{
                gap: 1,
                "& > .MuiGrid-root": {
                  flexBasis: "calc((100% - 16px) / 3)",
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: palette.grey.card,
                  borderRadius: 1,
                  "& > *": {
                    color: "rgba(255, 255,255, 0.8)",
                  },
                },
              }}
            >
              <Grid>
                <Typography>{t("fullTicket.author")}</Typography>
                <NavLink
                  to={
                    !ticket.creator
                      ? ""
                      : `${endpoints.profile}/${ticket.creator.user_id}`
                  }
                  style={{ color: palette.semantic.info }}
                >
                  @{!ticket.creator ? "anonymous" : ticket.creator.login}
                </NavLink>
              </Grid>
              <Grid>
                <Typography>{t("fullTicket.faculty")}</Typography>
                <Box>{ticket.faculty.name}</Box>
              </Grid>
              <Grid>
                <Typography>{t("fullTicket.dateOfCreation")}</Typography>
                <Box>{formatDate(ticket.date)}</Box>
              </Grid>
            </Grid>
          </Grid>
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
