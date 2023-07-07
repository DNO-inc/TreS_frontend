import { FC } from "react";
import { NavLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { endpoints } from "../../../../constants";
import { Creator } from "../../ticket.interface";

interface TicketBodyProps extends Creator {
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
  return (
    <Grid
      container
      sx={{ justifyContent: "space-between", gap: 1, padding: 0.5 }}
    >
      <Box>
        <Avatar sizes="10" />
      </Box>
      <Grid sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}>
        <Box>
          {`${creator.firstname || "Noname"} ${
            creator.lastname || "Nonamovich"
          }`}
        </Box>
        <Box>{`${creator.faculty ? creator.faculty.name : ""}${
          creator.group ? `,  ${creator.group.name}` : ""
        }`}</Box>
      </Grid>
    </Grid>
  );
};

const TicketBody: FC<TicketBodyProps> = ({ body, creator, faculty }) => {
  const userId: number | null = creator?.user_id;

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      sx={{ flexGrow: 1, maxHeight: "190px" }}
    >
      <Box
        sx={{
          overflow: "hidden",
          flexGrow: 1,
          wordWrap: "break-word",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace={"pre-line"}
        >
          {body}
        </Typography>
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {creator ? (
          <NavLink
            to={!userId ? "" : `${endpoints.profile}/${userId}`}
            style={{ cursor: !userId ? "default" : "pointer" }}
          >
            <Tooltip
              title={<ProfileTooltip creator={creator} />}
              placement="top"
            >
              <Typography color="text.secondary" className="evadeItem">
                {creator?.login ? `@${creator.login}` : "not found"}
              </Typography>
            </Tooltip>
          </NavLink>
        ) : (
          <Typography color="text.secondary" className="evadeItem">
            @anonymous
          </Typography>
        )}
        <Typography color="text.secondary">{faculty}</Typography>
      </Grid>
    </Grid>
  );
};

export { TicketBody };
