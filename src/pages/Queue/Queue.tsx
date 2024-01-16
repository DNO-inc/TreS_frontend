import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Scope } from "./components/Scope";
import IPalette from "../../theme/IPalette.interface";
import { getUser } from "../../shared/functions/manipulateLocalStorage";
import { FacultySelect } from "./components/FacultySelect";
import { useScopeList } from "./hooks/useScopeList";
import { useChangeURL } from "../../shared/hooks";
import { urlKeys } from "../../constants";
import { useSearchParams } from "react-router-dom";

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
  id: number;
  order: number;
  name: string;
  title: string;
  queues: IQueue[];
}

const Queue: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const [searchParams] = useSearchParams();

  const putFacultyInURL = useChangeURL();

  const { facultyId } = getUser();
  const urlFaculty = parseInt(searchParams.get(urlKeys.FACULTY) || "", 10);

  const [faculty, setFaculty] = useState(urlFaculty || facultyId);

  useEffect(() => {
    putFacultyInURL(urlKeys.FACULTY, faculty.toString());
  }, [faculty]);

  const [currentScope, setCurrentScope] = useState<IScope | null>(null);
  const { scopesList, setScopesList, sortedScopesList } = useScopeList({
    faculty,
  });

  return (
    <Grid container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">{t("queue.heading")}</Typography>
        <FacultySelect
          facultyId={facultyId}
          faculty={faculty}
          setFaculty={setFaculty}
        />
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
        {sortedScopesList.map((scope: IScope) => (
          <Scope
            scope={scope}
            currentScope={currentScope}
            setCurrentScope={setCurrentScope}
            scopesList={scopesList}
            setScopesList={setScopesList}
            facultyId={faculty}
            key={scope.name}
          />
        ))}
      </Box>
    </Grid>
  );
};

export { Queue };
