import { useTheme } from "@emotion/react";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TicketHeader = ({
  icon,
  color,
  tooltipText,
  subject,
  status,
  assignee,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

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
              }}
            >
              {icon}
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
      <Typography color={palette.whiteAlpha[600]}>
        {assignee ? assignee : t("common.noAssignee")}
      </Typography>
    </Box>
  );
};

TicketHeader.propTypes = {};

export { TicketHeader };
