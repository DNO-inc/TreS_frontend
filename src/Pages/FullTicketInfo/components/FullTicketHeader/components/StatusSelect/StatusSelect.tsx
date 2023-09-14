import { FC } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../../../components/Loader";

import { useGetStatusesQuery } from "../../../../../../store/api/api";
import IPalette from "../../../../../../theme/IPalette.interface";

interface StatusSelectProps {
  status: number;
  setStatus: (faculty: number) => void;
}

interface status {
  status_id: number;
  name: string;
}

const StatusSelect: FC<StatusSelectProps> = ({ status, setStatus }) => {
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetStatusesQuery({});

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedStatus: number = parseInt(event.target.value);

    setStatus(selectedStatus);
  };

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{
          bgcolor: palette.grey.card,
          minWidth: "180px",
          "& > .MuiInputBase-root > .MuiSelect-select": {
            p: "8px 32px 8px 16px",
          },
        }}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <Select
            id="status-select"
            value={status.toString()}
            onChange={handleChange}
          >
            {data.statuses_list.map((status: status, index: number) => {
              let isSelected = false;

              if (status.status_id === index + 1) {
                isSelected = true;
              }

              return (
                <MenuItem
                  value={status.status_id}
                  key={`menuItem-${status.status_id}`}
                  selected={isSelected}
                >
                  <ListItemText primary={status.name} />
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export { StatusSelect };
