import { FC, memo } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { FacultiesFilter } from "./components/FacultiesFilter";
import { StatusCheckboxGroup } from "./components/StatusCheckboxGroup";

interface FilterPanelProps {
  isAllStatuses?: boolean;
}

const FilterPanel: FC<FilterPanelProps> = memo(({ isAllStatuses = false }) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
      }}
    >
      <StatusCheckboxGroup isAllStatuses={isAllStatuses} />
      <Grid
        item
        sx={{
          display: "flex",
          "& > .MuiGrid-root > .MuiButton-root": { minWidth: 20 },
          gap: 3,
        }}
      >
        <Box>
          <FacultiesFilter />
        </Box>
      </Grid>
    </Grid>
  );
});

export { FilterPanel };
