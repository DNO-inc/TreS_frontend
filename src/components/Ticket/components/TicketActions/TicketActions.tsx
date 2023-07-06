import { FC } from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

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
  // isReported,
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
          gap: 0.8,
          "& > .MuiIconButton-root": {
            height: 26,
            "& > .MuiSvgIcon-root": {
              fontSize: 20,
            },
          },
        }}
      >
        <IconButton
          onClick={handleToggleReported}
          disabled={!isAuth}
          className="evadeItem"
          sx={{
            width: 26,
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
            width: 26,
            mr: !upvotes ? 0 : -0.6,
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
            width: !upvotes ? 26 : "auto",
            borderRadius: 4,
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
            <Typography
              className="evadeItem"
              sx={{ fontSize: 16, fontWeight: 300 }}
            >
              {upvotes}
            </Typography>
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export { TicketActions };
