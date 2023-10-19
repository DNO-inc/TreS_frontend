import { FC } from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

// import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import IPalette from "../../../../theme/IPalette.interface";
import { useAuth } from "../../../../context/AuthContext";

interface TicketActionsProps {
  isMyTicket: boolean;
  // isReported: boolean;
  isLiked: boolean;
  isFollowed: boolean;
  upvotes: number;
  formattedDate: string;
  handleToggleReported: () => void;
  handleToggleLike: () => void;
  handleToggleFollowed: () => void;
}

const TicketActions: FC<TicketActionsProps> = ({
  isMyTicket,
  // isReported,
  isLiked,
  isFollowed,
  upvotes,
  formattedDate,
  // handleToggleReported,
  handleToggleLike,
  handleToggleFollowed,
}) => {
  const { palette }: IPalette = useTheme();

  const { isAuth } = useAuth();

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
        {/* {isAdmin && (
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
        )} */}
        {!isMyTicket && (
          <IconButton
            onClick={handleToggleFollowed}
            disabled={!isAuth}
            className="evadeItem"
            sx={{
              width: 26,
              mr: !upvotes ? 0 : -0.6,
              "& > .MuiSvgIcon-root": {
                color: isFollowed ? palette.semantic.info : "none",
                fontSize: "24px !important",
              },
            }}
          >
            {isAuth && isFollowed ? (
              <StarIcon className="evadeItem" />
            ) : (
              <StarBorderIcon className="evadeItem" />
            )}
          </IconButton>
        )}
        <IconButton
          onClick={handleToggleLike}
          disabled={!isAuth}
          className="evadeItem"
          sx={{
            pt: "10px",
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
