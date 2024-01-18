import { FC } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { CustomTooltip } from "components/CustomTooltip";

import { Creator } from "../../../../ticket.interface";
import { useFormatName } from "components/Ticket/hooks/useFormatName";

type ProfileTooltipProps = Creator & { userLogin: string };

const ProfileTooltip: FC<ProfileTooltipProps> = ({ creator, userLogin }) => {
  let creatorName = useFormatName(creator);
  const creatorFaculty = creator?.faculty?.name || "Faculty";
  const creatorGroup = creator?.group?.name || "Group";

  return (
    <CustomTooltip
      base={
        <Typography color="text.secondary" className="evadeItem">
          {userLogin}
        </Typography>
      }
    >
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
    </CustomTooltip>
  );
};

export { ProfileTooltip };
