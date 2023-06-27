import { FC } from "react";
import { NavLink } from "react-router-dom";

import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";

import { endpoints } from "../../../../constants";

interface TicketBodyProps extends Creator {
  userId: number | null;
  body: string;
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

const TicketBody: FC<TicketBodyProps> = ({
  body,
  userId,
  creator,
  faculty,
}) => {
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
        <NavLink
          to={!userId ? "" : `${endpoints.profile}/${userId}`}
          style={{ cursor: !userId ? "default" : "pointer" }}
        >
          <Tooltip title={<ProfileTooltip creator={creator} />} placement="top">
            <Typography color="text.secondary" className="evadeItem">
              {creator?.login ? `@${creator.login}` : "@anonymous"}
            </Typography>
          </Tooltip>
        </NavLink>
        <Typography color="text.secondary">{faculty}</Typography>
      </Grid>
    </Grid>
  );
};

export { TicketBody };
