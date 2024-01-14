import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
  useGetProfileMutation,
  useUpdateProfileMutation,
} from "../../store/api/profile.api";
import {
  getPermissions,
  getUserId,
} from "../../shared/functions/getLocalStorageData";
import { checkIsAdmin } from "../../shared/functions";
import admin from "../../assets/admin.png";
import { permissions, profileFormKeys, roles, storage } from "../../constants";
import { PasswordChangeSection } from "./components/PasswordChangeSection";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileFullInfo } from "./components/ProfileFullInfo";
import { ProfileActions } from "./components/ProfileActions";

type ApiResponse = {
  data?: {
    email: string;
    faculty: { faculty_id: number; name: string };
    firstname: string;
    group: { group_id: number; name: string };
    lastname: string;
    login: string;
    phone: string;
    registration_date: string;
    role: {
      name: string;
      permission_list: string[];
      role_id: number;
    };
  };
  error?: FetchBaseQueryError | SerializedError;
};

export interface ProfileUpdateBody {
  firstname?: string;
  lastname?: string;
  login?: string;
  phone?: string;
  password?: string;
  role?: number;
}

const Profile: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);

  const userPermissions = getPermissions();
  const isCanChangeProfile = userPermissions.includes(
    permissions.UPDATE_PROFILE
  );

  const isAdmin = checkIsAdmin(roles.CHIEF_ADMIN);
  const userId = parseInt(pathname.split("/")[2]);
  const myId = getUserId();
  const isMyProfile = userId === myId;

  const [getUserProfile, { data, isSuccess }] = useGetProfileMutation();
  const [updateProfile, { isSuccess: isProfileUpdated }] =
    useUpdateProfileMutation();

  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm<ProfileUpdateBody>();

  const role = watch(profileFormKeys.ROLE);
  const avatar =
    (isMyProfile && isAdmin) || data?.role?.role_id >= 9 ? admin : "";

  const getProfile = () => {
    getUserProfile({ userId: userId }).then((response: ApiResponse) => {
      if (response?.data) {
        const { firstname, lastname, login, phone, role } = response.data;

        setValue(profileFormKeys.FIRSTNAME, firstname);
        setValue(profileFormKeys.LASTNAME, lastname);
        setValue(profileFormKeys.LOGIN, login);
        setValue(profileFormKeys.PHONE, phone);
        setValue(profileFormKeys.ROLE, role.role_id);
      }
    });
  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  useEffect(() => {
    isProfileUpdated && getProfile();
  }, [isProfileUpdated]);

  const onSubmit = (data: ProfileUpdateBody): void => {
    updateProfile({ body: JSON.stringify(data) });

    handelReset();
    localStorage.setItem(
      storage.USER_NAME,
      `${data.firstname} ${data.lastname}`
    );
  };

  const handelReset = (): void => {
    setIsEditMode(false);
    reset();
  };

  const handelChangePassword = (): void => {
    const newPassword = getValues("password");

    updateProfile({ body: JSON.stringify({ password: newPassword }) });
    setValue("password", "");
  };

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("profile.heading")}</Typography>
      </Box>
      {isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            margin: "95px auto 0",
          }}
        >
          <ProfileHeader
            avatar={avatar}
            isEditMode={isEditMode}
            register={register}
            data={data}
            watch={watch}
          />
          <ProfileFullInfo
            isEditMode={isEditMode}
            data={data}
            role={role}
            userId={userId}
            register={register}
            setValue={setValue}
            watch={watch}
            isCanChangeRole={isAdmin && !isMyProfile}
          />
          {isMyProfile && isCanChangeProfile && (
            <>
              <ProfileActions
                isEditMode={isEditMode}
                handelReset={handelReset}
                setIsEditMode={setIsEditMode}
              />
              <PasswordChangeSection
                password={data?.password}
                setValue={setValue}
                handelChangePassword={handelChangePassword}
              />
            </>
          )}
        </form>
      )}
    </Grid>
  );
};

export { Profile };
