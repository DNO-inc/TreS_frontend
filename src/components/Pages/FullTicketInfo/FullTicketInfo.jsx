import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useShowTicketMutation } from "../../../store/api/tickets/tickets.api";
import { checkStatus } from "../../../shared/functions";
import { Loader } from "../../Loader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useJwtDecode } from "../../../shared/hooks";

const FullTicketInfo = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState();
  const [isBookmarked, setIsBookmarked] = useState();
  const jwt = useJwtDecode();

  const ticketId = +pathname.split("/")[2];
  const isAuth = !!jwt;

  const [showTicket, { data, isSuccess, isLoading }] = useShowTicketMutation();

  // let checkStatusResult = isSuccess && checkStatus(data.status.name);

  useEffect(() => {
    showTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  }, []);

  const handleLike = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(prevIsBookmarked => !prevIsBookmarked);
  };

  return (
    <Grid container>
      <Typography variant="h4">{t("fullTicket.heading")}</Typography>
      {isLoading && <Loader />}
      {!isLoading && isSuccess && (
        <Card
          sx={{
            flexBasis: "100%",
            height: "100%",
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
            }}
          >
            <Box maxHeight={80}>
              <Grid
                container
                flexWrap={"nowrap"}
                justifyContent={"space-between"}
                gap={10}
              >
                <Typography noWrap={true}>{data.subject}</Typography>
                <Grid gap={1} display={"flex"}>
                  <Box
                    sx={{
                      textAlign: "center",
                      lineHeight: "24px",
                      p: "0px 12px",
                      bgcolor: checkStatus(data.status.name).color,
                      borderRadius: 1,
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    {data.status.name}
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
                      {checkStatus(data.status.name).icon}
                    </Box>
                  </Tooltip>
                </Grid>
              </Grid>
              <Typography color={palette.whiteAlpha[600]}>
                {data.assignee ? data.assignee : "No assignee"}
              </Typography>
            </Box>
            <Divider />
            <Grid
              display={"flex"}
              flexDirection={"column"}
              sx={{ flexGrow: 1 }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  flexGrow: 1,
                  wordWrap: "break-word",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {data.body}
                </Typography>
              </Box>
              <Grid
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography color="text.secondary">
                  {data.creator?.firstname
                    ? `${data.creator.firstname} ${data.creator.lastname}`
                    : "@user_name"}
                </Typography>
                <Typography color="text.secondary">ELIT</Typography>
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
                {"12.06.23"}
              </Typography>
              <Grid display={"flex"}>
                <IconButton disabled={!isAuth}>
                  <DoNotDisturbAltOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleBookmark} disabled={!isAuth}>
                  {isAuth && isBookmarked ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderOutlinedIcon />
                  )}
                </IconButton>
                <IconButton onClick={handleLike} disabled={!isAuth}>
                  {isAuth && isLiked ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </Grid>
  );
};

FullTicketInfo.propTypes = {};

export { FullTicketInfo };
