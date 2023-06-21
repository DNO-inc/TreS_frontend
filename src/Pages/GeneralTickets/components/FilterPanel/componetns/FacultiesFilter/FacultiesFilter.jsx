import { useState } from "react";
import { useTheme } from "@emotion/react";
import { FormControl, ListItemText, MenuItem, Select } from "@mui/material";
import { useGetFacultiesQuery } from "../../../../../../store/api/api";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const FacultiesFilter = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const faculty = searchParams.get("faculty") || "all_faculties";

  const { data, isSuccess } = useGetFacultiesQuery();

  const handleChange = event => {
    const newFaculty = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("faculty")) {
      params.set("faculty", newFaculty);
    } else {
      params.append("faculty", newFaculty);
    }

    if (params.has("current_page")) {
      params.set("current_page", 1);
    } else {
      params.append("current_page", 1);
    }

    setSearchParams(params);
  };

  return (
    <>
      {isSuccess && (
        <FormControl sx={{ bgcolor: palette.grey.card }}>
          <Select
            id="faculty-select"
            value={faculty}
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-input": { pt: 1, pb: 1, width: 150 },
            }}
          >
            <MenuItem value="all_faculties">
              <ListItemText primary={t("generalTickets.facultyFilter")} />
            </MenuItem>

            {data.faculties_list.map(item => {
              return (
                <MenuItem value={item.name} key={item.faculty_id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

FacultiesFilter.propTypes = {};

export { FacultiesFilter };
