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
  role: number | null;
  setRole: Dispatch<SetStateAction<number | null>>;
  updateProfile: MutationTrigger<
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
  role,
  setRole,
  updateProfile,
  userId,
}) => {
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetRolesQuery({});

  const myRole = getUserRole();

  const userRole = "USER_ALL";
  const selectedRoleId =
    isSuccess &&
    data.roles.find((role: IRole) => role.name === myRole)?.role_id;

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedRole: number = parseInt(event.target.value);

    setRole(selectedRole);
    updateProfile({
      body: JSON.stringify({ user_id: Number(userId), role_id: selectedRole }),
    });
  };

  return (
    <Box>
      <FormControl
        variant="standard"
        size="small"
        fullWidth
        sx={{
          bgcolor: palette.grey.card,
          width: 170,
          ".MuiSelect-select": {
            p: "0px 24px 4px 8px",
          },
        }}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
          <Select
            id="roles-select"
            value={role || selectedRoleId?.toString()}
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

              if (role.name === userRole) {
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
