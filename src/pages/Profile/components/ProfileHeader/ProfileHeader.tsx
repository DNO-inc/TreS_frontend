import { FC } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { ProfileInput } from "../ProfileInput";

import { profileFormKeys } from "constants";
import IPalette from "theme/IPalette.interface";
import { ProfileUpdateBody } from "pages/Profile/Profile";

interface ProfileHeaderProps {
  avatar: string;
  isEditMode: boolean;
  data: any;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<ProfileUpdateBody>;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  avatar,
  isEditMode,
  data,
  register,
  watch,
}) => {
  const { palette }: IPalette = useTheme();

  const { firstname, lastname, login } = data;

  const renderFullName = () => (
    <Typography
      component="h2"
      variant="h2"
      sx={{
        fontSize: 32,
        fontWeight: 600,
        color: palette.semantic.info,
      }}
    >
      {`${firstname} ${lastname}`}
    </Typography>
  );

  const renderLogin = () => (
    <Typography sx={{ fontSize: 24, color: palette.whiteAlpha.default }}>
      {"@" + login}
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "normal" },
        gap: 5,
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: { xs: 180, sm: 140 }, height: { xs: 180, sm: 140 } }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "normal" },
          gap: isEditMode ? 3 : 1,
        }}
      >
        {isEditMode ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <ProfileInput
              register={register}
              defaultValue={firstname}
              watch={watch}
              inputType={profileFormKeys.FIRSTNAME}
            />
            <ProfileInput
              register={register}
              defaultValue={lastname}
              watch={watch}
              inputType={profileFormKeys.LASTNAME}
            />
          </Box>
        ) : (
          renderFullName()
        )}
        {isEditMode ? (
          <ProfileInput
            register={register}
            defaultValue={login}
            watch={watch}
            inputType={profileFormKeys.LOGIN}
          />
        ) : (
          renderLogin()
        )}
      </Box>
    </Box>
  );
};

export { ProfileHeader };
