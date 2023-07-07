import { FC } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../theme/IPalette.interface";
import { useChangeURL } from "../../shared/hooks";

interface CustomPaginationProps {
  total: number;
  current: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ total, current }) => {
  const { palette }: IPalette = useTheme();

  const handlePageChange = useChangeURL();

  return (
    <Grid container justifyContent={"center"} mt={3}>
      <Pagination
        count={total}
        page={current}
        size="large"
        color="primary"
        defaultPage={1}
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        onChange={(_event, page) => handlePageChange(page.toString())}
        sx={{
          "& > .MuiPagination-ul > li > .MuiPaginationItem-root": {
            border: `2px solid ${palette.grey.divider}`,
          },
        }}
      />
    </Grid>
  );
};

export { CustomPagination };
