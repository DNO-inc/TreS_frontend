import { FC } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import useTheme from "@mui/material/styles/useTheme";

import ChatIcon from "@mui/icons-material/Chat";

import { endpoints } from "../../../../constants";
import IPalette from "../../../../theme/IPalette.interface";

interface NotificationTileProps {
  ticketId: number;
  description: string;
  count: number | undefined;
  handleClick: (index: number) => void;
  index: number;
}

const NotificationTile: FC<NotificationTileProps> = ({
  ticketId,
  description,
  count,
  handleClick,
  index,
}) => {
  const { palette }: IPalette = useTheme();

  return (
    <Link to={`${endpoints.FULL_TICKET}/${ticketId}`}>
      <Box
        onClick={() => handleClick(index)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: palette.grey.card,
          border: `2px solid ${palette.grey.button}`,
          p: 2,
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <ChatIcon sx={{ mt: 0.3 }} />
          {description}
        </Box>
        {count && count > 0 && (
          <Badge
            badgeContent={count}
            sx={{
              mr: 1.3,
              "& > span": {
                color: "white",
                bgcolor: palette.grey.active,
              },
            }}
          ></Badge>
        )}
      </Box>
    </Link>
  );
};

export { NotificationTile };
