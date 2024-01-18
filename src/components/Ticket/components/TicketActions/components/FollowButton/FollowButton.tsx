import { FC } from "react";

import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import IPalette from "theme/IPalette.interface";
import { useAuth } from "context/AuthContext/AuthContext";

interface FollowButtonProps {
  isFollowed: boolean;
  handleToggleFollowed: () => void;
  upvotes: number;
}

const FollowButton: FC<FollowButtonProps> = ({
  isFollowed,
  handleToggleFollowed,
  upvotes,
}) => {
  const { palette }: IPalette = useTheme();
  const { isAuth } = useAuth();

  return (
    <IconButton
      onClick={handleToggleFollowed}
      disabled={!isAuth}
      aria-label="follow-button"
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
      {isFollowed ? (
        <StarIcon className="evadeItem" />
      ) : (
        <StarBorderIcon className="evadeItem" />
      )}
    </IconButton>
  );
};

export { FollowButton };
