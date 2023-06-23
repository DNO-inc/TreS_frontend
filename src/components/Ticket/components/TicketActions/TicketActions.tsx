import { FC } from "react";

import { Grid, IconButton, Typography, useTheme } from "@mui/material";

import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IPalette from "../../../../theme/IPalette.interface";

interface TicketActionsProps {
  isAuth: boolean;
  isReported: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  upvotes: number;
  formattedDate: string;
  handleToggleReported: () => void;
  handleToggleLike: () => void;
  handleToggleBookmark: () => void;
}

const TicketActions: FC<TicketActionsProps> = ({
  isAuth,
  isReported,
  isLiked,
  isBookmarked,
  upvotes,
  formattedDate,
  handleToggleReported,
  handleToggleLike,
  handleToggleBookmark,
}) => {
  const { palette }: IPalette = useTheme();

  return (
    <Grid container justifyContent={"space-between"} alignItems={"center"}>
      <Typography color="text.secondary" fontSize={14}>
        {formattedDate}
      </Typography>
      <Grid
        sx={{
          display: "flex",
          gap: 1,
          "& > .MuiIconButton-root": {
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
          className="evadeItem"
          sx={{
            width: 28,
            // bgcolor: isReported && palette.semantic.error,
            // "&:hover": {
            //   bgcolor: isReported && palette.semantic.error,
            // },
            "& > .MuiSvgIcon-root": {
              fontSize: 18,
            },
          }}
        >
          <DoNotDisturbAltOutlinedIcon className="evadeItem" />
        </IconButton>
        <IconButton
          onClick={handleToggleBookmark}
          disabled={!isAuth}
          className="evadeItem"
          sx={{
            width: 28,
            mr: !upvotes ? 0 : -0.6,
            // bgcolor: isBookmarked && palette.semantic.info,
            // "&:hover": {
            //   bgcolor: isBookmarked && palette.semantic.info,
            // },
            "& > .MuiSvgIcon-root": {
              color: isBookmarked ? palette.semantic.info : "none",
            },
          }}
        >
          {isAuth && isBookmarked ? (
            <BookmarkIcon className="evadeItem" />
          ) : (
            <BookmarkBorderOutlinedIcon className="evadeItem" />
          )}
        </IconButton>
        <IconButton
          onClick={handleToggleLike}
          disabled={!isAuth}
          className="evadeItem"
          sx={{
            gap: 0.5,
            width: !upvotes ? 28 : "auto",
            borderRadius: 4,
            // bgcolor: isLiked && palette.semantic.info,
            // "&:hover": {
            //   bgcolor: isLiked && palette.semantic.info,
            // },
            "& > .MuiSvgIcon-root": {
              color: isLiked ? palette.semantic.error : "none",
            },
          }}
        >
          {isAuth && isLiked ? (
            <FavoriteIcon className="evadeItem" />
          ) : (
            <FavoriteBorderOutlinedIcon className="evadeItem" />
          )}
          {!!upvotes && (
            <Typography className="evadeItem">{upvotes}</Typography>
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

TicketActions.propTypes = {};

export { TicketActions };
