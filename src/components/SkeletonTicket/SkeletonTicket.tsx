import { FC } from "react";

import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

interface SkeletonTicketProps {
  ticketsPerRow: number;
}

const SkeletonTicket: FC<SkeletonTicketProps> = ({ ticketsPerRow }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 332,
        width: `calc((100% - 16px * ${ticketsPerRow - 1}) / ${ticketsPerRow})`,
      }}
    >
      <Skeleton variant="rounded" width={"100%"} />
      <Skeleton variant="rounded" width={"70%"} />
      <Skeleton variant="rounded" width={"100%"} height={272} />
    </Box>
  );
};

export { SkeletonTicket };
