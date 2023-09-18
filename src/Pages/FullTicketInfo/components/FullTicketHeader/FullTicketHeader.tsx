import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";

import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import { FacultySelect } from "./components/FacultySelect";
import { QueueSelect } from "./components/QueueSelect";
import { StatusSelect } from "./components/StatusSelect";
import { AssigneeSelect } from "./components/AssigneeSelect";
import { VerticalDivider } from "../../../../components/VerticalDivider";

import IPalette from "../../../../theme/IPalette.interface";
import { checkIsAdmin, checkStatus } from "../../../../shared/functions";
import { getUserId } from "../../../../shared/functions/getLocalStorageData";
import { endpoints } from "../../../../constants";
import { useAdminRemoveTicketMutation } from "../../../../store/api/admin/admin.api";

import styles from "./FullTicketHeader.module.css";

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

  const [isCopyLink, setIsCopyLink] = useState<boolean>(false);
  const [queue, setQueue] = useState<number>(ticketQueue?.queue_id || -1);
  const [faculty, setFaculty] = useState<number>(ticketFaculty);
  const [status, setStatus] = useState<number>(ticketStatus.status_id);
  const [assignee, setAssignee] = useState<number>(
    ticketAssignee?.user_id || -1
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [adminDelete] = useAdminRemoveTicketMutation();

  const handleAcceptChanges = () => {
    const requestBody: UpdateTicketBody = {
      ticket_id: ticketId,
      assignee_id: assignee,
      faculty: faculty,
      queue: queue,
      status: status,
    };

    updateTicket({ body: JSON.stringify(requestBody) });
  };

  const handleCopyLink = () => {
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL);

    setIsCopyLink(true);
    setTimeout(() => {
      setIsCopyLink(false);
    }, 800);
  };

  const handleAdminDelete = () => {
    adminDelete({ body: JSON.stringify({ ticket_id: ticketId }) });
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
            maxWidth: "80%",
            "& > .MuiTypography-root": {
              fontSize: 36,
            },
          }}
        >
          <IconButton
            sx={{ borderRadius: 2, mr: 1, position: "relative" }}
            onClick={handleCopyLink}
          >
            <ContentCopyIcon
              sx={{
                width: 32,
                height: 32,
                color: palette.grey.active,
              }}
            />
            <Box
              className={isCopyLink ? styles.copyLink : ""}
              sx={{
                fontSize: 14,
                color: "transparent",
                letterSpacing: "1.5px",
                position: "absolute",
              }}
            >
              Copy link
            </Box>
          </IconButton>
          <Typography component={"span"} sx={{ fontWeight: 700, mr: 1 }}>
            {subject}
          </Typography>
          <Typography
            component={"span"}
            sx={{ color: palette.grey.active }}
          >{`#${ticketId}`}</Typography>
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
            <>
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
              <IconButton
                sx={{
                  borderRadius: 1.5,
                }}
                onClick={handleAdminDelete}
              >
                {<DeleteIcon />}
              </IconButton>
            </>
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
        {(isAdmin && !assigneeId) || (isAssignee && isEdit) ? (
          <AssigneeSelect
            assignee={assignee}
            setAssignee={setAssignee}
            ticketId={ticketId}
            updateTicket={updateTicket}
          />
        ) : (
          assigneeId && (
            <NavLink
              to={`${endpoints.profile}/${ticketAssignee.user_id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: `2px solid ${palette.grey.divider}`,
                borderRadius: 8,
                padding: "8px 12px 8px 8px",
              }}
            >
              <Avatar />
              <Typography>{`${ticketAssignee.firstname} ${ticketAssignee.lastname}`}</Typography>
            </NavLink>
          )
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
