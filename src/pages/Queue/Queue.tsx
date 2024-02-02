import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Scope } from "./components/Scope";
import { FacultySelect } from "./components/FacultySelect";

import IPalette from "theme/IPalette.interface";
import { getUser } from "functions/manipulateLocalStorage";
import { urlKeys } from "constants";
import { useGetQueuesByFacultyMutation } from "api/meta.api";

export type ApiResponse = {
  data?: { queues_list: IQueue[] };
  error?: FetchBaseQueryError | SerializedError;
};
export interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}
export interface IScope {
  name: string;
  title: string;
  queues: IQueue[];
}

const scopeNames = ["Reports", "Q/A", "Suggestion"];

const Queue: FC = () => {
  const { t, i18n } = useTranslation();
  const { palette }: IPalette = useTheme();
  const [searchParams] = useSearchParams();

  const [scopesList, setScopesList] = useState<IScope[]>(
    scopeNames.map(name => ({
      name,
      title: t(`queue.scopes.${name.toLowerCase()}Title`),
      queues: [],
    }))
  );

  const { facultyId } = getUser();
  const urlFaculty = parseInt(searchParams.get(urlKeys.FACULTY) || "", 10);
  const faculty = urlFaculty || facultyId;

  const [getQueues] = useGetQueuesByFacultyMutation({});

  const updateScopesListTitle = useCallback(() => {
    setScopesList(prevScopesList =>
      prevScopesList.map(prevScope => ({
        ...prevScope,
        title: t(`queue.scopes.${prevScope.name.toLowerCase()}Title`),
      }))
    );
  }, [i18n.language]);

  useEffect(() => {
    updateScopesListTitle();
  }, [updateScopesListTitle]);

  useEffect(() => {
    getQueues({ body: JSON.stringify({ faculty: faculty }) }).then(
      (res: ApiResponse) => {
        const queuesData = res.data && res.data.queues_list;

        if (queuesData) {
          setScopesList(prevScopesList =>
            prevScopesList.map(scope => ({
              ...scope,
              queues: queuesData.filter(
                (queue: IQueue) => queue.scope === scope.name
              ),
            }))
          );
        }
      }
    );
  }, [faculty]);

  return (
    <Grid container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">{t("queue.heading")}</Typography>
        <FacultySelect facultyId={facultyId} faculty={faculty} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          pt: "80px !important",
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
          "&": {
            scrollbarWidth: "thin",
            scrollbarColor: "#555 #212125",
          },
          "&:hover": {
            scrollbarColor: "#555 #212125",
          },
        }}
      >
        {scopesList.map((scope: IScope) => {
          return <Scope scope={scope} facultyId={faculty} key={scope.name} />;
        })}
      </Box>
    </Grid>
  );
};

export { Queue };
