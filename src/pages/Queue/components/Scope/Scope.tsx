import { FC, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { QueueButtonsList } from "./components/QueueButtonsList";
import { ScopeTicketList } from "./components/ScopeTicketList";
import { NotFound } from "components/NotFound";
import { ScopeLabel } from "components/ScopeLabel";

import IPalette from "theme/IPalette.interface";
import { dimensions } from "constants";
import { IScope } from "pages/Queue/Queue";

interface ScopeProps {
  scope: IScope;
  facultyId: number;
}

const Scope: FC<ScopeProps> = ({ scope, facultyId }) => {
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.QUEUE}px)`
  );
  const { palette }: IPalette = useTheme();
  const [queues, setQueues] = useState<number[]>(
    scope.queues.length ? scope.queues.map(queue => queue.queue_id) : []
  );

  return (
    <Card
      sx={{
        minWidth: matches ? "415px" : "100%",
        flexBasis: "33.333%",
        height: "calc(100vh - 190px)",
        bgcolor: palette.grey.card,
        border: `2px solid ${palette.grey.border}`,
        "& > .MuiBox-root": {
          p: "20px 16px",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
        <Typography variant="h2">{scope.title}</Typography>
        <ScopeLabel scope={scope.name} />
      </Box>
      <Divider />
      <Box sx={{ pt: 3, pb: 3 }}>
        {!!scope.queues.length ? (
          <>
            <QueueButtonsList
              queues={scope.queues}
              setQueues={setQueues}
              facultyId={facultyId}
            />
            {queues.length && (
              <ScopeTicketList
                scope={scope.name}
                queues={queues}
                facultyId={facultyId}
              />
            )}
          </>
        ) : (
          <Box sx={{ mt: !!scope.queues.length ? 0 : 14 }}>
            <NotFound size={250} />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export { Scope };
