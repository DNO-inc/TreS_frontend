import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, useTheme } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { EditQueuesPopup } from "./components/EditQueuesPopup";

import { Scope } from "./components/Scope";
import IPalette from "../../theme/IPalette.interface";
import { useGetQueueByFacultyMutation } from "../../store/api/api";

type ApiResponse = {
  data?: { queues_list: IQueue[] };
  error?: FetchBaseQueryError | SerializedError;
};
interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}
export interface IScope {
  id: number;
  order: number;
  name: string;
  title: string;
  queues: IQueue[];
}

const Queue: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [open, setOpen] = useState(false);
  const [currentScope, setCurrentScope] = useState<IScope | null>(null);
  const [scopesList, setScopesList] = useState<IScope[]>([
    {
      id: 1,
      order: 1,
      name: "Reports",
      title: t("queue.scopes.reportTitle"),
      queues: [],
    },
    {
      id: 2,
      order: 2,
      name: "Q/A",
      title: t("queue.scopes.questionTitle"),
      queues: [],
    },
    {
      id: 3,
      order: 3,
      name: "Suggestion",
      title: t("queue.scopes.suggestionTitle"),
      queues: [],
    },
  ]);

  const mapScopeToIndex: { [key: string]: number } = {
    Reports: 0,
    "Q/A": 1,
    Suggestion: 2,
  };

  const [getQueues] = useGetQueueByFacultyMutation({});

  useEffect(() => {
    getQueues({ body: JSON.stringify({ faculty: 1 }) }).then(
      (res: ApiResponse) => {
        const queuesData = res.data && res.data.queues_list;

        if (queuesData) {
          const newScopeList = [...scopesList];

          queuesData.forEach((queue: IQueue) => {
            const scopeIndex = mapScopeToIndex[queue.scope];
            if (typeof scopeIndex === "number") {
              newScopeList[scopeIndex].queues.push(queue);
            }
          });

          setScopesList(newScopeList);
        }
      }
    );
  }, []);

  const sortCards = (a: { order: number }, b: { order: number }) =>
    a.order - b.order;

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <Grid container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">{t("queue.heading")}</Typography>
        <Button
          color="inherit"
          variant="contained"
          onClick={handleOpenDialog}
          startIcon={<EditIcon sx={{ color: palette.common.black }} />}
          sx={{
            bgcolor: palette.common.white,
            color: palette.common.black,
            borderRadius: 4,
          }}
        >
          Queue management
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          pt: 12,
          overflowX: "scroll",
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: palette.grey.divider,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {scopesList.sort(sortCards).map(scope => (
          <Scope
            scope={scope}
            currentScope={currentScope}
            setCurrentScope={setCurrentScope}
            scopesList={scopesList}
            setScopesList={setScopesList}
            key={scope.name}
          />
        ))}
      </Box>
      <EditQueuesPopup open={open} setOpen={setOpen} />
    </Grid>
  );
};

export { Queue };
