import { Box, Grid } from "@mui/material";
import { FacultiesFilter } from "./componetns/FacultiesFilter";
import { StatusCheckboxGroup } from "./componetns/StatusCheckboxGroup";
import { ViewOptions } from "./componetns/ViewOptions";

const FilterPanel = ({ ticketsPerRow, setRequestBody, setTicketsPerRow }) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={3}
    >
      <StatusCheckboxGroup setRequestBody={setRequestBody} />
      <Grid
        item
        sx={{
          display: "flex",

          "& > .MuiGrid-root > .MuiButton-root": { minWidth: 20 },
          gap: 3,
        }}
      >
        <ViewOptions
          ticketsPerRow={ticketsPerRow}
          setTicketsPerRow={setTicketsPerRow}
        />
        <Box>
          <FacultiesFilter setRequestBody={setRequestBody} />
        </Box>
      </Grid>
    </Grid>
  );
};

FilterPanel.propTypes = {};

export { FilterPanel };
