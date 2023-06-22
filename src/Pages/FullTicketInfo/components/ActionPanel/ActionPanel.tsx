import { useTheme } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import { VerticalDivider } from "../../../../components/VerticalDivider";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteIcon from "@mui/icons-material/Favorite";

const ActionPanel = () => {
  const { palette }: IPalette = useTheme();

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
      <IconButton>
        <DoNotDisturbAltOutlinedIcon />
      </IconButton>
      <VerticalDivider />
      <IconButton>
        <BookmarkBorderOutlinedIcon />
      </IconButton>
      <VerticalDivider />
      <IconButton>
        <FavoriteBorderOutlinedIcon />
      </IconButton>
    </Box>
  );
};

ActionPanel.propTypes = {};

export { ActionPanel };
