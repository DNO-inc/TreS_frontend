import { useTheme } from "@emotion/react";
import { Grid, Pagination } from "@mui/material";

const CustomPagination = ({ total, current, onChange }) => {
  const { palette } = useTheme();

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
        onChange={(e, value) => onChange(value)}
        sx={{
          "& > .MuiPagination-ul > li > .MuiPaginationItem-root": {
            border: `2px solid ${palette.grey.divider}`,
          },
        }}
      />
    </Grid>
  );
};

CustomPagination.propTypes = {};

export { CustomPagination };
