import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { changeDate, checkStatus } from "../../shared/functions";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "../../store/api/tickets/tickets.api";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../constants";

const Ticket = ({ ticket, ticketsPerRow, isAuth }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [isLiked, setIsLiked] = useState(ticket.is_liked);
  const [isBookmarked, setIsBookmarked] = useState();

  const [toggleLike, { isSuccess: isLikeSuccess }] = useToggleLikeMutation();
  const [toggleBookmark, { isSuccess: isBookmarkSuccess }] =
    useToggleBookmarkMutation();

  const { color, icon } = checkStatus(ticket.status.name);
  const changedDate = ticket?.date && changeDate(ticket.date);
  const userId = ticket.creator?.user_id;

  const handleToggleLike = () => {
    const option = !isLiked ? "like" : "unlike";
    toggleLike({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });
  };

  // const handleToggleBookmark = () => {
  //   const option = !isBookmarked ? "bookmark" : "unbookmark";
  //   toggleLike({
  //     option: option,
  //     body: JSON.stringify({ ticket_id: ticket.ticket_id }),
  //   });
  // };

  useEffect(() => {
    isLikeSuccess && setIsLiked(prevIsLiked => !prevIsLiked);
    // isBookmarkSuccess && setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
  }, [isLikeSuccess, isBookmarkSuccess]);

  const handleBookmark = () => {
    setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
  };

  return (
    <Card
      sx={{
        flexBasis: `calc((100% - 16px * ${
          ticketsPerRow - 1
        }) / ${ticketsPerRow})`,
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
        <Box maxHeight={80}>
          <Grid
            container
            flexWrap={"nowrap"}
            justifyContent={"space-between"}
            gap={10}
          >
            <Typography noWrap={true}>{ticket.subject}</Typography>
            <Grid gap={1} display={"flex"}>
              <Box
                sx={{
                  textAlign: "center",
                  lineHeight: "24px",
                  p: "0px 12px",
                  bgcolor: color,
                  borderRadius: 1,
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
              >
                {ticket.status.name.toLowerCase()}
              </Box>
              <Tooltip title="Some tooltip text" arrow>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    bgcolor: palette.grey.active,
                    borderRadius: 1,
                  }}
                >
                  {icon}
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
          <Typography color={palette.whiteAlpha[600]}>
            {ticket.assignee ? ticket.assignee : "No assignee"}
          </Typography>
        </Box>
        <Divider />
        <Grid display={"flex"} flexDirection={"column"} sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              maxHeight: "120px",
              overflow: "hidden",
              flexGrow: 1,
              wordWrap: "break-word",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {ticket.body}
            </Typography>
          </Box>
          <Grid
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <NavLink to={userId ? `${endpoints.profile}/${userId}` : "/"}>
              <Typography color="text.secondary">
                {ticket.creator?.login
                  ? `@${ticket.creator.login}`
                  : "@anonymous"}
              </Typography>
            </NavLink>
            <Typography color="text.secondary">
              {ticket.faculty.name}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ p: "8px 16px !important" }}
        >
          <Typography color="text.secondary" fontSize={14}>
            {changedDate}
          </Typography>
          <Grid display={"flex"}>
            <IconButton disabled={!isAuth}>
              <DoNotDisturbAltOutlinedIcon />
            </IconButton>
            <IconButton
              // onClick={handleToggleBookmark}
              disabled={!isAuth}
            >
              {isAuth && isBookmarked ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderOutlinedIcon />
              )}
            </IconButton>
            <Button
              onClick={handleToggleLike}
              disabled={!isAuth}
              sx={{ minWidth: 40, height: 40 }}
            >
              {isAuth && isLiked ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

Ticket.propTypes = {};

export { Ticket };
