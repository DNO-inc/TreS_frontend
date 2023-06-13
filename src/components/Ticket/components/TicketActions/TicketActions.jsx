import { Grid, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@emotion/react";

const TicketActions = ({
  isAuth,
  isReported,
  handleToggleReported,
  isLiked,
  upvotes,
  isBookmarked,
  handleToggleLike,
  handleToggleBookmark,
  formattedDate,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <Grid container justifyContent={"space-between"} alignItems={"center"}>
      <Typography color="text.secondary" fontSize={14}>
        {formattedDate}
      </Typography>
      <Grid
        sx={{
          display: "flex",
          gap: 1.5,
          "& > .MuiIconButton-root": {
            width: 28,
            height: 28,
            "& > .MuiSvgIcon-root": {
              fontSize: 22,
            },
          },
        }}
      >
        <IconButton
          onClick={handleToggleReported}
          disabled={!isAuth}
          sx={{
            bgcolor: isReported && palette.semantic.error,
            "&:hover": {
              bgcolor: isReported && palette.semantic.error,
            },
            "& > .MuiSvgIcon-root": {
              fontSize: 18,
            },
          }}
        >
          <DoNotDisturbAltOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={handleToggleBookmark}
          disabled={!isAuth}
          sx={{
            // bgcolor: isBookmarked && palette.semantic.info,
            // "&:hover": {
            //   bgcolor: isBookmarked && palette.semantic.info,
            // },
            "& > .MuiSvgIcon-root": {
              color: isBookmarked && palette.semantic.info,
            },
          }}
        >
          {isAuth && isBookmarked ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={handleToggleLike}
          disabled={!isAuth}
          sx={{
            // bgcolor: isLiked && palette.semantic.info,
            // "&:hover": {
            //   bgcolor: isLiked && palette.semantic.info,
            // },
            "& > .MuiSvgIcon-root": {
              color: isLiked && palette.semantic.error,
            },
          }}
        >
          {/* {!!upvotes && upvotes} */}
          {isAuth && isLiked ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

TicketActions.propTypes = {};

export { TicketActions };
