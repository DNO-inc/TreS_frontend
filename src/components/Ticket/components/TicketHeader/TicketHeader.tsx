import { ReactElement, FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";
import { endpoints } from "../../../../constants";

interface TicketHeaderProps {
  isAuth: boolean;
  icon: ReactElement;
  color: string;
  tooltipText: string;
  subject: string;
  status: string;
  assignee: {
    faculty: { faculty_id: number; name: string };
    firstname: string;
    group: { group_id: number; name: string };
    lastname: string;
    login: string;
    user_id: number;
  };
}

const TicketHeader: FC<TicketHeaderProps> = ({
  isAuth,
  icon,
  color,
  tooltipText,
  subject,
  status,
  assignee,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const assigneeId = assignee?.user_id;

  return (
    <Box maxHeight={80}>
      <Grid
        container
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
        gap={10}
      >
        <Typography noWrap={true}>{subject}</Typography>
        <Grid gap={1} display={"flex"}>
          <Box
            sx={{
              textAlign: "center",
              lineHeight: "24px",
              p: "0px 12px",
              bgcolor: color,
              borderRadius: 1,
              textTransform: "capitalize",
              fontSize: "14px",
            }}
          >
            {t(`ticketStatus.${status.toLowerCase()}`)}
          </Box>
          <Tooltip title={tooltipText} arrow placement="bottom-end">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                bgcolor: palette.grey.active,
                borderRadius: 1,
                "& > .MuiSvgIcon-root": {
                  fontSize: 16,
                },
              }}
            >
              {icon}
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
      <Typography color={palette.whiteAlpha.default}>
        {assignee ? (
          isAuth ? (
            <NavLink
              to={assigneeId ? `${endpoints.profile}/${assigneeId}` : ""}
              style={{ cursor: assigneeId ? "pointer" : "default" }}
            >
              <Typography color="text.secondary" className="evadeItem">
                {assignee?.firstname && assignee.lastname
                  ? `${assignee.firstname} ${assignee.lastname}`
                  : t("common.noAssignee")}
              </Typography>
            </NavLink>
          ) : (
            <Typography color="text.secondary" className="evadeItem">
              {assignee?.firstname && assignee.lastname
                ? `${assignee.firstname} ${assignee.lastname}`
                : t("common.noAssignee")}
            </Typography>
          )
        ) : (
          <Typography color="text.secondary" className="evadeItem">
            @anonymous
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export { TicketHeader };
