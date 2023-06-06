import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../../../constants";

const ProfileTooltip = ({ creator }) => {
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

const TicketBody = ({ body, userId, ticketId, creator, faculty }) => {
  const { t } = useTranslation();

  return (
    <Grid display={"flex"} flexDirection={"column"} sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          maxHeight: "120px",
          overflow: "hidden",
          flexGrow: 1,
          wordWrap: "break-word",
        }}
      >
        <NavLink to={`${endpoints.fullTicket}/${ticketId}`}>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </NavLink>
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <NavLink to={userId ? `${endpoints.profile}/${userId}` : "/"}>
          <Tooltip title={<ProfileTooltip creator={creator} />} placement="top">
            <Typography color="text.secondary">
              {creator?.login ? `@${creator.login}` : "@anonymous"}
            </Typography>
          </Tooltip>
        </NavLink>
        <Typography color="text.secondary">{faculty}</Typography>
      </Grid>
    </Grid>
  );
};

TicketBody.propTypes = {};

export { TicketBody };
