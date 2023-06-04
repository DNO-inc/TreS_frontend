import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TicketActions = ({
  isAuth,
  isLiked,
  isBookmarked,
  handleToggleLike,
  handleToggleBookmark,
  formattedDate,
}) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ p: "8px 16px !important" }}
    >
      <Typography color="text.secondary" fontSize={14}>
        {formattedDate}
      </Typography>
      <Grid display={"flex"}>
        <IconButton disabled={!isAuth}>
          <DoNotDisturbAltOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleToggleBookmark} disabled={!isAuth}>
          {isAuth && isBookmarked ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderOutlinedIcon />
          )}
        </IconButton>
        <Button
          onClick={handleToggleLike}
          disabled={!isAuth}
          sx={{
            minWidth: 40,
            height: 40,
            borderRadius: "50%",
            "& > svg": {
              color: "#fff",
            },
          }}
        >
          {isAuth && isLiked ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

TicketActions.propTypes = {};

export { TicketActions };
