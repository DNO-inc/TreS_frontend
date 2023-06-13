import { useState } from "react";
import { useTheme } from "@emotion/react";
import { FormControl, ListItemText, MenuItem, Select } from "@mui/material";
import { useGetFacultiesQuery } from "../../../../../../../store/api/api";
import { Loader } from "../../../../../../Loader";
import { useTranslation } from "react-i18next";

const FacultiesFilter = ({ setRequestBody }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [faculty, setFaculty] = useState("all");

  const { data, isLoading, isSuccess } = useGetFacultiesQuery();

  const handleChange = event => {
    const newFaculty = event.target.value;
    setFaculty(newFaculty);

    setRequestBody(prevBody => {
      const updatedBody = { ...prevBody };

      if (newFaculty === "all") {
        delete updatedBody.faculty;
      } else {
        updatedBody.faculty = newFaculty;
      }

      return updatedBody;
    });
  };

  return (
    <FormControl sx={{ bgcolor: palette.grey.card }}>
      <Select
        id="queue-select"
        value={faculty}
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-input": { pt: 1, pb: 1, width: 150 },
        }}
      >
        <MenuItem value="all">
          <ListItemText primary={t("generalTickets.facultyFilter")} />
        </MenuItem>
        {isLoading && <Loader />}
        {isSuccess &&
          data.faculties_list.map(item => {
            return (
              <MenuItem value={item.name} key={item.faculty_id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

FacultiesFilter.propTypes = {};

export { FacultiesFilter };
