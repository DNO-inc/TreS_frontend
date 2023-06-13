import { useTheme } from "@emotion/react";
import { Button, Grid } from "@mui/material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import { VerticalDivider } from "../../../../../../VerticalDivider";

const ViewOptions = ({ ticketsPerRow, setTicketsPerRow, setRequestBody }) => {
  const { palette } = useTheme();

  const handleClick = countPerRow => {
    setTicketsPerRow(countPerRow);
    setRequestBody(prevBody => ({
      ...prevBody,
      tickets_count: 3 * countPerRow,
    }));
  };

  return (
    <Grid container sx={{ alignItems: "center", gap: 1 }}>
      <Button
        onClick={() => handleClick(2)}
        sx={{ transform: "rotate(90deg)" }}
      >
        {ticketsPerRow === 2 ? (
          <ViewAgendaIcon />
        ) : (
          <ViewAgendaOutlinedIcon sx={{ color: palette.grey.checkbox }} />
        )}
      </Button>
      <VerticalDivider />
      <Button onClick={() => handleClick(3)}>
        {ticketsPerRow === 3 ? (
          <ViewWeekIcon />
        ) : (
          <ViewWeekOutlinedIcon sx={{ color: palette.grey.checkbox }} />
        )}
      </Button>
    </Grid>
  );
};

ViewOptions.propTypes = {};

export { ViewOptions };
