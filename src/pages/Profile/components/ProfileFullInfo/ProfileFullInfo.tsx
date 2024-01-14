import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { ProfileInput } from "../ProfileInput";
import { RolesSelect } from "../RolesSelect";
import { ProfileInfoBox } from "./components/ProfileInfoBox";

import IPalette from "../../../../theme/IPalette.interface";
import { ProfileUpdateBody } from "../../Profile";

interface ProfileFullInfoProps {
  isEditMode: boolean;
  data: any;
  role: number | undefined;
  userId: number;
  isCanChangeRole: boolean;
  setValue: UseFormSetValue<ProfileUpdateBody>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<ProfileUpdateBody>;
}

const ProfileFullInfo: FC<ProfileFullInfoProps> = ({
  isEditMode,
  data,
  role,
  userId,
  isCanChangeRole,
  setValue,
  register,
  watch,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const { email, phone, faculty, group } = data;

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: { xs: "90vw", sm: 535 },
        bgcolor: palette.grey.divider,
        p: 3,
        ".MuiBox-root:not(:first-of-type)": {
          mt: 3,
        },
        ".MuiBox-root": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& > .MuiTypography-root:first-of-type": {
            fontWeight: 500,
            mr: 5,
          },
        },
      }}
    >
      {isCanChangeRole && (
        <Box>
          <Typography>{t("profile.role")}</Typography>
          <RolesSelect
            userRole={role}
            userId={userId}
            register={register}
            setValue={setValue}
          />
        </Box>
      )}
      {email && <ProfileInfoBox label={"email"} value={email} />}
      {isEditMode ? (
        <Box>
          <Typography>{t("profile.phone")}</Typography>
          <ProfileInput
            register={register}
            defaultValue={phone}
            watch={watch}
            inputType={"phone"}
          />
        </Box>
      ) : (
        phone && <ProfileInfoBox label={"phone"} value={phone} />
      )}
      {faculty?.name && (
        <ProfileInfoBox label={"faculty"} value={faculty.name} />
      )}
      {group?.name && <ProfileInfoBox label={"group"} value={group.name} />}
    </Box>
  );
};

export { ProfileFullInfo };
