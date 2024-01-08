import { FC, Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import { useGetRolesQuery } from "../../../../store/api/api";
import IPalette from "../../../../theme/IPalette.interface";
import { getUserRole } from "../../../../shared/functions/getLocalStorageData";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/query";

interface RolesSelectProps {
  userId: string;
  userRole: number | null;
  setUserRole: Dispatch<SetStateAction<number | null>>;
  adminUpdateProfile: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
}

interface IRole {
  role_id: number;
  name: string;
}

const RolesSelect: FC<RolesSelectProps> = ({
  userRole,
  setUserRole,
  adminUpdateProfile,
  userId,
}) => {
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetRolesQuery({});

  const myRole = getUserRole();

  const selectedRoleId =
    isSuccess &&
    data.roles.find((role: IRole) => role.name === myRole)?.role_id;

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedRole: number = parseInt(event.target.value);

    setUserRole(selectedRole);
    adminUpdateProfile({
      body: JSON.stringify({ user_id: Number(userId), role_id: selectedRole }),
    });
  };

  return (
    <Box>
      <FormControl
        size="small"
        fullWidth
        sx={{
          bgcolor: palette.grey.card,
          width: 170,
          ".MuiTypography-root": {
            fontSize: 14,
          },
          ".MuiSelect-select": {
            p: "2px 24px 4px 16px",
          },
        }}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <Select
            id="roles-select"
            value={userRole?.toString()}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {data.roles.map((role: IRole) => {
              let isSelected = false;

              if (role.role_id === userRole) {
                isSelected = true;
              }

              if (role.role_id > selectedRoleId) {
                return;
              }

              return (
                <MenuItem
                  value={role.role_id}
                  key={`menuItem-${role.role_id}`}
                  selected={isSelected}
                >
                  <ListItemText primary={role.name} />
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export { RolesSelect };
