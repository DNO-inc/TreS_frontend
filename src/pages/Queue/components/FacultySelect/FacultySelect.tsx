import { FC } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import IPalette from "../../../../theme/IPalette.interface";
import { useGetFacultiesQuery } from "../../../../store/api/meta.api";
import { urlKeys } from "../../../../constants";
import { useChangeURL } from "../../../../shared/hooks";

interface FacultySelectProps {
  facultyId: number;
  faculty: number;
}

interface faculty {
  faculty_id: number;
  name: string;
}

const FacultySelect: FC<FacultySelectProps> = ({ facultyId, faculty }) => {
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetFacultiesQuery({});

  const putFacultyInURL = useChangeURL();
  const handleChange = (event: SelectChangeEvent): void => {
    const selectedFaculty = event.target.value;

    putFacultyInURL(urlKeys.FACULTY, selectedFaculty);
  };

  return (
    <Box>
      <FormControl
        fullWidth
        size="small"
        sx={{
          bgcolor: palette.grey.card,
          minWidth: "150px",
        }}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <Select
            id="faculty-select"
            value={faculty.toString()}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {data.faculties_list.map((faculty: faculty) => {
              return (
                <MenuItem
                  value={faculty.faculty_id}
                  key={`menuItem-${faculty.faculty_id}`}
                  selected={faculty.faculty_id === facultyId}
                >
                  <ListItemText primary={faculty.name} />
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export { FacultySelect };
