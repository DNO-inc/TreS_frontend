import { FC } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { VerticalDivider } from "../../../../components/VerticalDivider";

import IPalette from "../../../../theme/IPalette.interface";
import { checkIsAdmin } from "../../../../shared/functions";

interface ActionPanelProps {
  isMyTicket: boolean;
  isReported: boolean;
  isLiked: boolean;
  isFollowed: boolean;
  upvotes: number;
  handleToggleReported: () => void;
  handleToggleLike: () => void;
  handleToggleFollowed: () => void;
}

const ActionPanel: FC<ActionPanelProps> = ({
  isMyTicket,
  // isReported,
  isLiked,
  isFollowed,
  upvotes,
  handleToggleReported,
  handleToggleLike,
  handleToggleFollowed,
}) => {
  const { palette }: IPalette = useTheme();

  const isAdmin = checkIsAdmin();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        gap: 1,
        left: { xs: "50%", md: "calc(50% + 165px)" },
        bottom: "20px",
        bgcolor: palette.grey.card,
        border: `2px solid ${palette.grey.divider}`,
        p: "4px 12px",
        borderRadius: 12,
        transform: "translateX(-50%)",
      }}
    >
      {isAdmin && (
        <IconButton onClick={handleToggleReported}>
          <DoNotDisturbAltOutlinedIcon />
        </IconButton>
      )}
      {!isMyTicket && (
        <>
          <VerticalDivider />
          <IconButton onClick={handleToggleFollowed}>
            {isFollowed ? (
              <StarIcon sx={{ color: palette.semantic.info }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </>
      )}
      <VerticalDivider />
      <IconButton sx={{ pt: "10px" }} onClick={handleToggleLike}>
        {isLiked ? (
          <FavoriteIcon sx={{ color: palette.semantic.error }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
        {!!upvotes && (
          <Typography sx={{ fontSize: 18, pl: 1 }}>{upvotes}</Typography>
        )}
      </IconButton>
    </Box>
  );
};

export { ActionPanel };
