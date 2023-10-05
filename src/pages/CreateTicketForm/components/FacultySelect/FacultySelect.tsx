import { useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import { useGetFacultiesQuery } from "../../../../store/api/api";
import IPalette from "../../../../theme/IPalette.interface";

interface FacultySelectProps {
  facultyId: number;
  faculty: number;
  register: UseFormRegister<ICreateTicketRequestBody>;
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
  setFaculty: (faculty: number) => void;
}

interface faculty {
  faculty_id: number;
  name: string;
}

const FacultySelect: FC<FacultySelectProps> = ({
  facultyId,
  register,
  setValue,
  faculty,
  setFaculty,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetFacultiesQuery({});

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedFaculty: number = parseInt(event.target.value);

    setFaculty(selectedFaculty);
    setValue("faculty", selectedFaculty);
  };

  useEffect(() => {
    setValue("faculty", facultyId);
  }, []);

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.faculty")}</Typography>
      <FormControl
        fullWidth
        sx={{ bgcolor: palette.grey.card }}
        {...register("queue")}
      >
        {isLoading && <Loader />}
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
              let isSelected = false;

              if (faculty.faculty_id === facultyId) {
                isSelected = true;
              }

              return (
                <MenuItem
                  value={faculty.faculty_id}
                  key={`menuItem-${faculty.faculty_id}`}
                  selected={isSelected}
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
