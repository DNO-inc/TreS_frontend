import { FC } from "react";
import { NavLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { MarkdownWithStyles } from "../../../../utils/markdown";

import { endpoints } from "../../../../constants";
import { Creator } from "../../ticket.interface";
import IPalette from "../../../../theme/IPalette.interface";
import { useAuth } from "../../../../context/AuthContext";
import { CustomTooltip } from "../../../CustomTooltip";

interface TicketBodyProps extends Creator {
  isMyTicket: boolean;
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

const TicketBody: FC<TicketBodyProps> = ({ body, creator, faculty }) => {
  const { palette }: IPalette = useTheme();

  const { isAuth } = useAuth();

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
      sx={{ position: "relative", flexGrow: 1, maxHeight: "188px" }}
    >
      <Box
        sx={{
          overflow: "hidden",
          flexGrow: 1,
          "&::after": {
            content: `""`,
            position: "absolute",
            bottom: 48,
            left: 0,
            width: "100%",
            height: "56px",
            background: `linear-gradient(transparent, ${palette.grey.card})`,
          },
        }}
      >
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          <MarkdownWithStyles innerText={body} />
        </Typography>
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {isAuth && creator ? (
          <NavLink
            to={!userId ? "" : `${endpoints.profile}/${userId}`}
            style={{ cursor: !userId ? "default" : "pointer" }}
          >
            <CustomTooltip
              base={
                <Typography color="text.secondary" className="evadeItem">
                  {userLogin}
                </Typography>
              }
            >
              <ProfileTooltip creator={creator} />
            </CustomTooltip>
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
