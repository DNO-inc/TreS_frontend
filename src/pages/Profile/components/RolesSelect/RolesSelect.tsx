import { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import IPalette from "../../../../theme/IPalette.interface";
import { useGetRolesQuery } from "../../../../store/api/meta.api";
import { profileFormKeys } from "../../../../constants";
import { useAdminUpdateProfileMutation } from "../../../../store/api/admin.api";
import { ProfileUpdateBody } from "../../Profile";

interface RolesSelectProps {
  userId: number;
  userRole: number | undefined;
  register: UseFormRegister<ProfileUpdateBody>;
  setValue: UseFormSetValue<ProfileUpdateBody>;
}

interface IRole {
  role_id: number;
  name: string;
}

const RolesSelect: FC<RolesSelectProps> = ({
  userId,
  userRole,
  register,
  setValue,
}) => {
  const { palette }: IPalette = useTheme();

  const { data, isLoading, isSuccess } = useGetRolesQuery({});
  const [adminUpdateProfile] = useAdminUpdateProfileMutation();

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedRole: number = parseInt(event.target.value);
    setValue(profileFormKeys.ROLE, selectedRole);

    const adminProfileUpdateBody = JSON.stringify({
      user_id: userId,
      role_id: selectedRole,
    });

    adminUpdateProfile({
      body: adminProfileUpdateBody,
    });
  };

  return (
    <Box>
      <FormControl
        size="small"
        fullWidth
        {...register(profileFormKeys.ROLE)}
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
              return (
                <MenuItem
                  value={role.role_id}
                  key={`menuItem-${role.role_id}`}
                  selected={role.role_id === userRole}
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
