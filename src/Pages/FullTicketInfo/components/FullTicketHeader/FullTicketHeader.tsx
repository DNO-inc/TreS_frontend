import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";

import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";

import { MarkdownWithStyles } from "../../../../utils/markdown";
import { FacultySelect } from "./components/FacultySelect";
import { QueueSelect } from "./components/QueueSelect";
import { StatusSelect } from "./components/StatusSelect";
import { AssigneeSelect } from "./components/AssigneeSelect";
import { VerticalDivider } from "../../../../components/VerticalDivider";

import IPalette from "../../../../theme/IPalette.interface";
import { checkIsAdmin, checkStatus } from "../../../../shared/functions";
import { getUserId } from "../../../../shared/functions/getLocalStorageData";

interface FullTicketHeaderProps {
  assigneeId: number;
  ticketStatus: {
    status_id: number;
    name: string;
  };
  ticketQueue: {
    queue_id: number;
    name: string;
    faculty: number;
    scope: string;
  };
  ticketFaculty: number;
  ticketAssignee: {
    faculty: { faculty_id: number; name: string };
    firstname: string;
    group: { group_id: number; name: string };
    lastname: string;
    login: string;
    user_id: number;
  };
  ticketId: number;
  subject: string;
  updateTicket: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
}

interface UpdateTicketBody {
  ticket_id: number;
  assignee_id?: number;
  faculty?: number;
  queue?: number;
  status?: number;
}

const FullTicketHeader: FC<FullTicketHeaderProps> = ({
  assigneeId,
  ticketStatus,
  ticketQueue,
  ticketFaculty,
  ticketAssignee,
  ticketId,
  subject,
  updateTicket,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const userId = Number(getUserId());
  const isAssignee = userId == assigneeId;

  const isAdmin = checkIsAdmin();

  const [queue, setQueue] = useState<number>(ticketQueue?.queue_id || -1);
  const [faculty, setFaculty] = useState<number>(ticketFaculty);
  const [status, setStatus] = useState<number>(ticketStatus.status_id);
  const [assignee, setAssignee] = useState<number>(ticketAssignee?.user_id);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleAcceptChanges = () => {
    const requestBody: UpdateTicketBody = {
      ticket_id: ticketId,
      faculty: faculty,
      queue: queue,
      status: status,
    };

    updateTicket({ body: JSON.stringify(requestBody) });
  };

  return (
    <Grid container sx={{ flexDirection: "column" }}>
      <Grid
        container
        sx={{
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: 36,
            mb: "12px",
            maxWidth: "80%",
          }}
        >
          <MarkdownWithStyles innerText={subject} />
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isAdmin && isEdit ? (
            <StatusSelect status={status} setStatus={setStatus} />
          ) : (
            <Box
              sx={{
                textAlign: "center",
                p: "4px 12px",
                bgcolor: checkStatus(ticketStatus.name),
                color:
                  checkStatus(ticketStatus.name) === "#FFFFFF"
                    ? palette.common.black
                    : palette.common.white,
                borderRadius: 1,
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {t(`ticketStatus.${ticketStatus.name.toLowerCase()}`)}
            </Box>
          )}
          {isAdmin && isAssignee && (
            <IconButton
              sx={{
                borderRadius: 1.5,
              }}
              onClick={() => {
                setIsEdit(prevState => {
                  if (!prevState) {
                    setFaculty(ticketFaculty);
                    setQueue(ticketQueue?.queue_id || -1);
                    setStatus(ticketStatus.status_id);
                  }

                  return !prevState;
                });
              }}
            >
              {isEdit ? <RedoIcon /> : <EditIcon />}
            </IconButton>
          )}
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          {!isEdit ? (
            <>
              <Typography>{ticketQueue?.scope}</Typography>
              <VerticalDivider height={16} />
              <Typography sx={{ color: palette.whiteAlpha.default }}>
                {ticketQueue?.name}
              </Typography>
            </>
          ) : isAdmin ? (
            <>
              <FacultySelect
                facultyId={ticketFaculty}
                faculty={faculty}
                setFaculty={setFaculty}
              />
              <QueueSelect
                facultyId={faculty}
                queue={queue}
                setQueue={setQueue}
              />
            </>
          ) : null}
        </Box>
        {(!assigneeId || (isAssignee && isEdit)) && (
          <AssigneeSelect
            assignee={assignee}
            setAssignee={setAssignee}
            ticketId={ticketId}
            updateTicket={updateTicket}
          />
        )}
      </Box>
      {isEdit && (
        <Button variant="outlined" onClick={handleAcceptChanges} sx={{ mt: 2 }}>
          Accept changes
        </Button>
      )}
    </Grid>
  );
};

export { FullTicketHeader };
