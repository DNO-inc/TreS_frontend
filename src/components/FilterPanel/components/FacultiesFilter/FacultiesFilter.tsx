import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";

import IPalette from "../../../../theme/IPalette.interface";
import { useGetFacultiesQuery } from "../../../../store/api/meta.api";
import { useChangeURL } from "../../../../shared/hooks";
import { urlKeys } from "../../../../constants";

const FacultiesFilter: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [searchParams] = useSearchParams();
  const putFacultyInURL = useChangeURL();
  const faculty = searchParams.get(urlKeys.FACULTY) || "all";

  const { data, isSuccess } = useGetFacultiesQuery({});

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newFaculty = event.target.value;

    putFacultyInURL(urlKeys.FACULTY, newFaculty, true);
  };

  return (
    <>
      {isSuccess && (
        <FormControl size="small" sx={{ bgcolor: palette.grey.card }}>
          <Select
            id="faculty-select"
            value={faculty}
            onChange={handleChange}
            sx={{
              ".MuiInputBase-input": { pt: 1, pb: 1, width: 150 },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value="all">
              <ListItemText primary={t("generalTickets.facultyFilter")} />
            </MenuItem>
            {data.faculties_list.map((faculty: IFaculty) => {
              return (
                <MenuItem value={faculty.name} key={faculty.faculty_id}>
                  <ListItemText primary={faculty.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export { FacultiesFilter };
