import { FC } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { endpoints } from "../../../../constants";
import { Creator } from "../../ticket.interface";
import IPalette from "../../../../theme/IPalette.interface";

interface TicketBodyProps extends Creator {
  isMyTicket: boolean;
  isAuth: boolean;
  body: string;
  creator: {
    faculty: { faculty_id: number; name: string };
    firstname: string;
    group?: { group_id: number; name: string } | undefined;
    lastname: string;
    login: string;
    user_id: number | null;
  };
  faculty: string;
}

const ProfileTooltip: FC<Creator> = ({ creator }) => {
  const creatorFirstname = creator?.firstname;
  const creatorLastname = creator?.lastname;
  let creatorName = "Firstname Lastname";
  const creatorFaculty = creator?.faculty?.name || "Faculty ";
  const creatorGroup = creator?.group?.name || "Group";

  if (creator) {
    if (creatorFirstname && creatorLastname) {
      creatorName = `${creatorFirstname} ${creatorLastname}`;
    } else if (creatorFirstname) {
      creatorName = `${creatorFirstname} Lastname`;
    } else if (creatorLastname) {
      creatorName = `Firstname ${creatorLastname}`;
    } else {
      creatorName = "have a assignee";
    }
  }

  return (
    <Grid
      container
      sx={{ justifyContent: "space-between", gap: 1, padding: 0.5 }}
    >
      <Box>
        <Avatar sizes="10" />
      </Box>
      <Grid sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
        <Box>{creatorName}</Box>
        <Box>{`${creatorFaculty}, ${creatorGroup}`}</Box>
      </Grid>
    </Grid>
  );
};

const TicketBody: FC<TicketBodyProps> = ({
  isAuth,
  body,
  creator,
  faculty,
  isMyTicket,
}) => {
  const { palette }: IPalette = useTheme();

  const userId: number | null = creator?.user_id;
  const creatorLogin = creator?.login;
  let userLogin = "anonymous";

  if (creator) {
    if (creatorLogin) {
      userLogin = `@${creatorLogin}`;
    } else {
      userLogin = "@login";
    }
  }

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      sx={{ position: "relative", flexGrow: 1, maxHeight: "190px" }}
    >
      <Box
        sx={{
          overflow: "hidden",
          flexGrow: 1,
          "&::after": !isMyTicket
            ? {
                content: `""`,
                position: "absolute",
                bottom: 48,
                left: 0,
                width: "100%",
                height: "56px",
                background: `linear-gradient(transparent, ${palette.grey.card})`,
              }
            : {},
        }}
      >
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          whiteSpace="pre-line"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </Typography>
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {isAuth && creator ? (
          <NavLink
            to={!userId ? "" : `${endpoints.profile}/${userId}`}
            style={{ cursor: !userId ? "default" : "pointer" }}
          >
            <Tooltip
              title={<ProfileTooltip creator={creator} />}
              placement="top"
            >
              <Typography color="text.secondary" className="evadeItem">
                {userLogin}
              </Typography>
            </Tooltip>
          </NavLink>
        ) : (
          <Typography color="text.secondary" className="evadeItem">
            {userLogin}
          </Typography>
        )}
        <Typography color="text.secondary">{faculty}</Typography>
      </Grid>
    </Grid>
  );
};

export { TicketBody };
