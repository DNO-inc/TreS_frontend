import { FC, Dispatch, SetStateAction, DragEvent } from "react";

import { Card, Divider, useTheme, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";

import { QueueButtonsList } from "./components/QueueButtonsList";
import { ScopeTicketList } from "./components/ScopeTicketList";

import IPalette from "../../../../theme/IPalette.interface";
import { ScopeLabel } from "../../../../components/ScopeLabel";
import { IScope } from "../../Queue";

interface ScopeProps {
  scope: IScope;
  currentScope: IScope | null;
  setCurrentScope: Dispatch<SetStateAction<IScope | null>>;
  scopesList: IScope[];
  setScopesList: Dispatch<SetStateAction<IScope[]>>;
}

const Scope: FC<ScopeProps> = ({
  scope,
  currentScope,
  setCurrentScope,
  scopesList,
  setScopesList,
}) => {
  const { palette }: IPalette = useTheme();

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

  return (
    <Card
      onDragStart={handleDragStart}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      draggable={true}
      sx={{
        minWidth: "468px",
        flexBasis: "33.333%",
        height: "calc(100vh - 216px)",
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
        {!!scope.queues.length && <QueueButtonsList queues={scope.queues} />}
        <ScopeTicketList filter={scope.id + 1} />
      </Box>
    </Card>
  );
};

export { Scope };