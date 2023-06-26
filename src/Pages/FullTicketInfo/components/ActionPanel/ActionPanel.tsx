import { FC } from "react";

import { Box, IconButton, useTheme } from "@mui/material";

import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteIcon from "@mui/icons-material/Favorite";

import { VerticalDivider } from "../../../../components/VerticalDivider";

import IPalette from "../../../../theme/IPalette.interface";

// interface ActionPanelProps{

// }

const ActionPanel: FC = () => {
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

export { ActionPanel };
