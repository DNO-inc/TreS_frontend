import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  DragEvent,
  useEffect,
} from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import MenuIcon from "@mui/icons-material/Menu";

import { QueueButtonsList } from "./components/QueueButtonsList";
import { ScopeTicketList } from "./components/ScopeTicketList";

import IPalette from "../../../../theme/IPalette.interface";
import { ScopeLabel } from "../../../../components/ScopeLabel";
import { IScope } from "../../Queue";
import { dimensions, urlKeys } from "../../../../constants";
import { useChangeURL } from "../../../../shared/hooks";

interface ScopeProps {
  scope: IScope;
  currentScope: IScope | null;
  setCurrentScope: Dispatch<SetStateAction<IScope | null>>;
  scopesList: IScope[];
  setScopesList: Dispatch<SetStateAction<IScope[]>>;
  facultyId: number;
}

const Scope: FC<ScopeProps> = ({
  scope,
  currentScope,
  setCurrentScope,
  scopesList,
  setScopesList,
  facultyId,
}) => {
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.QUEUE}px)`
  );
  const { palette }: IPalette = useTheme();
  const [queues, setQueues] = useState<number[]>([]);

  const setOrderInURL = useChangeURL();

  const handleDragStart = () => {
    setCurrentScope(scope);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setScopesList(
      scopesList.map((scopeItem: IScope) => {
        if (currentScope) {
          if (scopeItem.id === scope.id) {
            return { ...scopeItem, order: currentScope.order };
          }
          if (scopeItem.id === currentScope.id) {
            return { ...scopeItem, order: scope.order };
          }
        }

        return scopeItem;
      })
    );
  };

  useEffect(() => {
    const newOrder = scopesList
      .sort((a, b) => a.id - b.id)
      .map(item => item.order)
      .join(",");

    setOrderInURL(urlKeys.ORDER, newOrder);
  }, [scopesList]);

  return (
    <Card
      onDragStart={handleDragStart}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      draggable={true}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "grab",
        }}
      >
        <Box sx={{ display: "flex", gap: 3, flexGrow: 1 }}>
          <ScopeLabel scope={scope.name} />
          <Typography variant="h2">{scope.title}</Typography>
        </Box>
        <MenuIcon
          sx={{ transform: "rotate(90deg)", color: palette.whiteAlpha.default }}
        />
      </Box>
      <Divider />
      <Box sx={{ pt: 3, pb: 3 }}>
        {!!scope.queues.length && scope.name !== "Not defined" && (
          <QueueButtonsList queues={scope.queues} setQueues={setQueues} />
        )}
        <ScopeTicketList
          scope={scope.name}
          queues={queues}
          facultyId={facultyId}
          isHaveQueues={!!scope.queues.length}
        />
      </Box>
    </Card>
  );
};

export { Scope };
