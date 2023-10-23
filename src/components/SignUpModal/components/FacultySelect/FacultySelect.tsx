import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";

import { Loader } from "../../../../components/Loader";

import { useGetFacultiesQuery } from "../../../../store/api/api";
import { useTheme } from "@mui/material";
import IPalette from "../../../../theme/IPalette.interface";

interface FacultySelectProps {
  faculty: number | null;
  setFaculty: Dispatch<SetStateAction<number | null>>;
  isError: boolean;
}

interface faculty {
  faculty_id: number;
  name: string;
}

const FacultySelect: FC<FacultySelectProps> = ({
  faculty,
  setFaculty,
  isError,
}) => {
  const { palette }: IPalette = useTheme();
  const { t } = useTranslation();
  const { data, isLoading, isSuccess } = useGetFacultiesQuery({});

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedFaculty: number = parseInt(event.target.value);

    setFaculty(selectedFaculty);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl required error={isError} fullWidth size="small">
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <>
            <Select
              labelId="faculty-select-label"
              id="faculty-select"
              value={faculty ? faculty.toString() : "-1"}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value={"-1"} disabled>
                <ListItemText
                  primary={t("signUp.facultySelect") + " *"}
                  primaryTypographyProps={{
                    style: { color: palette.whiteAlpha.default },
                  }}
                />
              </MenuItem>
              {[...data.faculties_list].slice(1).map((faculty: faculty) => (
                <MenuItem
                  value={faculty.faculty_id}
                  key={`menuItem-${faculty.faculty_id}`}
                >
                  <ListItemText primary={faculty.name} />
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </FormControl>
    </Box>
  );
};

export { FacultySelect };