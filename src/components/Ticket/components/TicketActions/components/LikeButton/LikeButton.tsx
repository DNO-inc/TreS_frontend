import { FC } from "react";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IPalette from "theme/IPalette.interface";
import { useAuth } from "context/AuthContext/AuthContext";

interface LikeButtonProps {
  isLiked: boolean;
  handleToggleLike: () => void;
  upvotes: number;
}

const LikeButton: FC<LikeButtonProps> = ({
  isLiked,
  handleToggleLike,
  upvotes,
}) => {
  const { palette }: IPalette = useTheme();
  const { isAuth } = useAuth();

  return (
    <IconButton
      onClick={handleToggleLike}
      disabled={!isAuth}
      aria-label="like-button"
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
      {isLiked ? (
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
  );
};

export { LikeButton };
