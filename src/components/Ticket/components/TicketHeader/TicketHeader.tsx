import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";
import { endpoints, statuses } from "../../../../constants";
import { ScopeLabel } from "../../../ScopeLabel";
import { Badge } from "../../../Badge";
import { useAuth } from "../../../../context/AuthContext";
import { useFormatName } from "../../hooks/useFormatName";

export interface IAssignee {
  faculty: { faculty_id: number; name: string };
  firstname: string;
  group: { group_id: number; name: string };
  lastname: string;
  login: string;
  user_id: number;
}

interface TicketHeaderProps {
  scope: string;
  color: string;
  subject: string;
  status: string;
  assignee: IAssignee;
}

interface AssigneeLabelProps {
  assigneeName: string;
}

const AssigneeLabel: FC<AssigneeLabelProps> = ({ assigneeName }) => {
  const { palette }: IPalette = useTheme();

  return (
    <Typography
      className="evadeItem"
      sx={{ color: palette.whiteAlpha.default }}
    >
      {assigneeName}
    </Typography>
  );
};

const TicketHeader: FC<TicketHeaderProps> = ({
  color,
  scope,
  subject,
  status,
  assignee,
}) => {
  const { t } = useTranslation();

  const { isAuth } = useAuth();

  const assigneeId = assignee?.user_id;
  const assigneeName = useFormatName(assignee);

  return (
    <Box maxHeight={80}>
      <Grid container flexWrap={"nowrap"} justifyContent={"space-between"}>
        <Typography
          component="div"
          noWrap={true}
          sx={{ textOverflow: "ellipsis" }}
        >
          {subject}
        </Typography>
        <Grid gap={1} display={"flex"} sx={{ ml: 2 }}>
          <Badge
            customStyle={{
              backgroundColor: color,
              color: status === statuses.NEW.toUpperCase() ? "#000" : "#fff",
            }}
            text={t(`ticketStatus.${status.toLowerCase()}`)}
          />
          <ScopeLabel scope={scope} isShowTooltip={true} />
        </Grid>
      </Grid>
      {isAuth ? (
        <NavLink
          to={assigneeId ? `${endpoints.PROFILE}/${assigneeId}` : ""}
          style={{ cursor: assigneeId ? "pointer" : "default" }}
        >
          <AssigneeLabel assigneeName={assigneeName} />
        </NavLink>
      ) : (
        <AssigneeLabel assigneeName={assigneeName} />
      )}
    </Box>
  );
};

export { TicketHeader };
