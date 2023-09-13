import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../../../components/Loader";

import IPalette from "../../../../../../theme/IPalette.interface";
import { useGetAdminsMutation } from "../../../../../../store/api/api";

interface AssigneeSelectProps {
  assignee: number;
  setAssignee: (assignee: number) => void;
  ticketId: number;
  updateTicket: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
}

interface assignee {
  faculty: { faculty_id: number; name: string };
  firstname: string;
  group: { group_id: number; name: string };
  lastname: string;
  login: string;
  user_id: number;
}

const AssigneeSelect: FC<AssigneeSelectProps> = ({
  assignee,
  setAssignee,
  ticketId,
  updateTicket,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [getAdmins, { data, isLoading, isSuccess }] = useGetAdminsMutation();

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedAssignee: number = parseInt(event.target.value);

    setAssignee(selectedAssignee);
    if (selectedAssignee !== -1) {
      updateTicket({
        body: JSON.stringify({
          ticket_id: ticketId,
          assignee_id: selectedAssignee,
        }),
      });
    }
  };

  useEffect(() => {
    getAdmins({});
  }, []);

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
            id="assignee-select"
            value={assignee ? assignee.toString() : "-1"}
            onChange={handleChange}
          >
            <MenuItem value={"-1"}>
              <ListItemText
                primary={t("fullTicket.admin.selectAssignee")}
                primaryTypographyProps={{
                  style: { color: palette.whiteAlpha.default },
                }}
              />
            </MenuItem>
            {data.admin_list.map((assignee: assignee, index: number) => {
              let isSelected = false;

              if (assignee.user_id === index + 1) {
                isSelected = true;
              }

              return (
                <MenuItem
                  value={assignee.user_id}
                  key={`menuItem-${assignee.user_id}`}
                  selected={isSelected}
                >
                  <ListItemText
                    primary={`${assignee.firstname} ${assignee.lastname}`}
                  />
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export { AssigneeSelect };
