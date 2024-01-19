import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { LikeButton } from "./components/LikeButton";
import { FollowButton } from "./components/FollowButton";

interface TicketActionsProps {
  isMyTicket: boolean;
  isLiked: boolean;
  isFollowed: boolean;
  upvotes: number;
  formattedDate: string;
  handleToggleLike: () => void;
  handleToggleFollowed: () => void;
}

const TicketActions: FC<TicketActionsProps> = ({
  isMyTicket,
  isLiked,
  isFollowed,
  upvotes,
  formattedDate,
  handleToggleLike,
  handleToggleFollowed,
}) => {
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
          zIndex: 3,
        }}
      >
        {!isMyTicket && (
          <FollowButton
            isFollowed={isFollowed}
            handleToggleFollowed={handleToggleFollowed}
            upvotes={upvotes}
          />
        )}
        <LikeButton
          isLiked={isLiked}
          handleToggleLike={handleToggleLike}
          upvotes={upvotes}
        />
      </Grid>
    </Grid>
  );
};

export { TicketActions };
