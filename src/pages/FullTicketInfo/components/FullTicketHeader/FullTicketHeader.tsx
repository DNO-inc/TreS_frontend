import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { NavLink, useNavigate } from "react-router-dom";

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
import { DialogPopup } from "./components/DialogPopup";

import IPalette from "../../../../theme/IPalette.interface";
import { checkIsAdmin } from "../../../../shared/functions";
import { getUser } from "../../../../shared/functions/manipulateLocalStorage";
import { endpoints, roles } from "../../../../constants";
import { useAdminRemoveTicketMutation } from "../../../../store/api/admin.api";

import styles from "./FullTicketHeader.module.css";
import { IAction } from "../FullTicketComments/components/Action/Action";
import { useGetStatusesQuery } from "../../../../store/api/meta.api";
import { useCheckStatus } from "../../../../shared/hooks";

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
  action: IAction | null;
}

interface UpdateTicketBody {
  ticket_id: number;
  assignee_id?: number;
  faculty?: number;
  queue?: number;
  status?: number;
}

interface IStatus {
  status_id: number;
  name: string;
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
  action,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();

  const { userId } = getUser();
  const isAssignee = userId == assigneeId;

  const isAdmin = checkIsAdmin();
  const isChiefAdmin = checkIsAdmin(roles.CHIEF_ADMIN);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isCopyLink, setIsCopyLink] = useState<boolean>(false);
  const [queue, setQueue] = useState<number>(ticketQueue?.queue_id || -1);
  const [faculty, setFaculty] = useState<number>(ticketFaculty);
  const [status, setStatus] = useState<IStatus>(ticketStatus);
  const [assignee, setAssignee] = useState<number>(
    ticketAssignee?.user_id || -1
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [adminDelete] = useAdminRemoveTicketMutation();
  const statusesQuery = useGetStatusesQuery({});

  const handleAcceptChanges = () => {
    const requestBody: UpdateTicketBody = {
      ticket_id: ticketId,
      assignee_id: assignee,
      faculty: faculty,
      queue: queue,
      status: status.status_id,
    };

    updateTicket({ body: JSON.stringify(requestBody) });

    setIsEdit(false);
  };

  const handleCopyLink = () => {
    const currentURL = window.location.href;

    navigator.clipboard.writeText(currentURL);

    setIsCopyLink(true);
    setTimeout(() => {
      setIsCopyLink(false);
    }, 800);
  };

  useEffect(() => {
    if (action?.field_name === "status") {
      const statuses = statusesQuery.data.statuses_list;

      if (statuses) {
        setStatus(() => {
          const newStatus = statuses.filter(
            status => status.name === action.new_value
          );

          return newStatus[0];
        });
      }
    }

    if (action?.field_name === "queue") {
    }

    if (action?.field_name === "faculty") {
    }

    if (action?.field_name === "assignee") {
    }
  }, [action]);

  const handleAccept = () => {
    setOpenDialog(false);

    adminDelete({ body: JSON.stringify({ ticket_id: ticketId }) });

    navigate(-1);
  };

  return (
    <Grid container sx={{ flexDirection: "column" }}>
      <Grid
        container
        sx={{
          alignItems: "start",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            "& > .MuiTypography-root": {
              fontSize: { xs: 24, md: 28 },
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
            <StatusSelect
              status={status}
              setStatus={setStatus}
              statusesQuery={statusesQuery}
            />
          ) : (
            <Box
              sx={{
                textAlign: "center",
                p: "4px 12px",
                bgcolor: useCheckStatus(status.name),
                color:
                  useCheckStatus(status.name) === palette.common.white
                    ? palette.common.black
                    : palette.common.white,
                borderRadius: 1,
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {t(`ticketStatus.${status.name.toLowerCase()}`)}
            </Box>
          )}
          {isAdmin && isAssignee && (
            <IconButton
              sx={{
                borderRadius: 1.5,
              }}
              onClick={() => {
                setIsEdit(prevState => {
                  setFaculty(ticketFaculty);
                  setQueue(ticketQueue?.queue_id || -1);
                  setStatus(() => {
                    const newStatus = statusesQuery.data.statuses_list.filter(
                      status => status.status_id === ticketStatus?.status_id
                    );

                    return newStatus[0];
                  });

                  return !prevState;
                });
              }}
            >
              {isEdit ? <RedoIcon /> : <EditIcon />}
            </IconButton>
          )}
          {isAdmin && (
            <IconButton
              sx={{
                borderRadius: 1.5,
              }}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              {<DeleteIcon />}
            </IconButton>
          )}
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
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
        {(isAdmin && !assigneeId) || (isAssignee && isEdit) || isChiefAdmin ? (
          <AssigneeSelect
            assignee={assignee}
            setAssignee={setAssignee}
            ticketId={ticketId}
            updateTicket={updateTicket}
          />
        ) : (
          assigneeId && (
            <NavLink
              to={`${endpoints.PROFILE}/${ticketAssignee.user_id}`}
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
      <DialogPopup
        open={openDialog}
        setOpen={setOpenDialog}
        handleAccept={handleAccept}
      />
    </Grid>
  );
};

export { FullTicketHeader };
