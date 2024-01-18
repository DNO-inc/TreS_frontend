import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "components/Loader";

import IPalette from "theme/IPalette.interface";
import { getUser } from "functions/manipulateLocalStorage";
import { useGetAdminsMutation } from "api/meta.api";

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

interface IAssignee {
  faculty: { faculty_id: number; name: string };
  firstname: string;
  group: { group_id: number; name: string };
  lastname: string;
  login: string;
  user_id: number;
}

type ApiResponse = {
  data?: {
    admin_list: IAssignee[];
  };
  error?: FetchBaseQueryError | SerializedError;
};

const AssigneeSelect: FC<AssigneeSelectProps> = ({
  assignee,
  setAssignee,
  ticketId,
  updateTicket,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [admins, setAdmins] = useState<IAssignee[]>([]);
  const { userId } = getUser();

  const [getAdmins, { isLoading, isSuccess }] = useGetAdminsMutation();

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
    getAdmins({}).then((res: ApiResponse) => {
      const adminsData = res?.data?.admin_list;

      if (adminsData) {
        const myName = adminsData.find(admin => admin.user_id === userId);

        if (myName) {
          setAdmins([
            myName,
            ...adminsData.filter(admin => admin.user_id !== userId),
          ]);
        } else {
          setAdmins(adminsData);
        }
      }
    });
  }, []);

  return (
    <Box>
      <FormControl
        fullWidth
        size="small"
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
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value={"-1"}>
              <ListItemText
                primary={t("fullTicket.admin.selectAssignee")}
                primaryTypographyProps={{
                  style: { color: palette.whiteAlpha.default },
                }}
              />
            </MenuItem>
            {admins.map((assignee: IAssignee, index: number) => {
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
