import { FC, ChangeEvent } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../theme/IPalette.interface";
import { useChangeURL } from "../../shared/hooks";
import { urlKeys } from "../../constants";

interface CustomPaginationProps {
  total: number;
  current: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ total, current }) => {
  const { palette }: IPalette = useTheme();

  const setPageInURL = useChangeURL();

  const handleChangePage = (_event: ChangeEvent<unknown>, page: number) => {
    setPageInURL(urlKeys.CURRENT_PAGE, page.toString(), false);
  };

  return (
    <Grid container justifyContent="center" mt={3}>
      <Pagination
        count={total}
        page={current}
        size="large"
        color="primary"
        defaultPage={1}
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        onChange={handleChangePage}
        sx={{
          ".MuiPaginationItem-root": {
            border: `2px solid ${palette.grey.divider}`,
          },
        }}
      />
    </Grid>
  );
};

export { CustomPagination };
