import { FC } from "react";

import Skeleton from "@mui/material/Skeleton";

interface SkeletonTicketRowProps {
  matches: boolean;
  isHaveActions: boolean;
}

const SkeletonTicketRow: FC<SkeletonTicketRowProps> = ({
  matches,
  isHaveActions,
}) => {
  return (
    <>
      <Skeleton
        variant="rounded"
        width={isHaveActions ? "calc(100% - 40px)" : "100%"}
        height={matches ? 59 : 99}
      />
      {isHaveActions && (
        <Skeleton variant="rounded" width={32} height={matches ? 59 : 99} />
      )}
    </>
  );
};

export { SkeletonTicketRow };
