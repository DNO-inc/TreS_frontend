import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button, useTheme } from "@mui/material";

import { ProfileInput } from "./components/ProfileInput";

import {
  useGetProfileMutation,
  useUpdateProfileMutation,
} from "../../store/api/profile/profile.api";
import IPalette from "../../theme/IPalette.interface";
import { getUserId } from "../../shared/functions/getLocalStorageData";

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
  };
  error?: FetchBaseQueryError | SerializedError;
};

interface ProfileUpdateBody {
  firstname?: string;
  lastname?: string;
  login?: string;
  email?: string;
  phone?: string;
}

const Profile: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();

  const userId = pathname.split("/")[2];
  const myId = getUserId().toString();
  const isMyProfile = userId === myId;

  const [getProfile, { data, isSuccess }] = useGetProfileMutation();
  const [updateProfile, { isSuccess: isProfileUpdated }] =
    useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const setProfile = () => {
    getProfile({ userId: userId }).then((response: ApiResponse) => {
      if (response?.data) {
        const { firstname, lastname, login, email, phone } = response.data;

        setFirstname(firstname);
        setLastname(lastname);
        setLogin(login);
        setEmail(email);
        setPhone(phone);
      }
    });
  };

  useEffect(() => {
    setProfile();
  }, [userId]);

  useEffect(() => {
    isProfileUpdated && setProfile();
  }, [isProfileUpdated]);

  const onSubmit = (data: ProfileUpdateBody): void => {
    updateProfile({ body: JSON.stringify(data) });
    setIsEditMode(prevState => !prevState);
    localStorage.setItem("login", `${data.firstname} ${data.lastname}`);
    reset();
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
            gap: "40px",
            margin: "95px auto 0",
          }}
        >
          <Box sx={{ display: "flex", gap: 5 }}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: isEditMode ? 3 : 1,
              }}
            >
              {isEditMode ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <ProfileInput
                    register={register}
                    value={firstname}
                    inputType={"firstname"}
                  />
                  <ProfileInput
                    register={register}
                    value={lastname}
                    inputType={"lastname"}
                  />
                </Box>
              ) : (
                <Typography
                  component={"h2"}
                  sx={{
                    fontSize: 32,
                    fontWeight: 600,
                    color: palette.semantic.info,
                  }}
                >{`${data.firstname} ${lastname}`}</Typography>
              )}
              {isEditMode ? (
                <ProfileInput
                  register={register}
                  value={login}
                  inputType={"login"}
                />
              ) : (
                <Typography
                  sx={{ fontSize: 24, color: palette.whiteAlpha.default }}
                >
                  {login ?? t("common.notFound")}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: palette.grey.divider,
              p: 3,
              "& > .MuiBox-root:not(:first-of-type)": {
                mt: 3,
              },
              "& > .MuiBox-root": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& > .MuiTypography-root:first-of-type": {
                  fontWeight: 500,
                  mr: 2,
                },
              },
            }}
          >
            <Box>
              <Typography>{t("profile.email")}</Typography>
              {isEditMode ? (
                <ProfileInput
                  register={register}
                  value={email}
                  inputType={"email"}
                />
              ) : (
                <Typography>{email ?? t("common.notFound")}</Typography>
              )}
            </Box>
            <Box>
              <Typography>{t("profile.phone")}</Typography>
              {isEditMode ? (
                <ProfileInput
                  register={register}
                  value={phone}
                  inputType={"phone"}
                />
              ) : (
                <Typography>{phone ?? t("common.notFound")}</Typography>
              )}
            </Box>
            <Box>
              <Typography>{t("profile.faculty")}</Typography>
              <Typography>
                {data?.faculty?.name ?? t("common.notFound")}
              </Typography>
            </Box>
            <Box>
              <Typography>{t("profile.group")}</Typography>
              <Typography>
                {data?.group?.name ?? t("common.notFound")}
              </Typography>
            </Box>
          </Box>
          {isMyProfile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                sx={{ flexGrow: 1 }}
                variant="outlined"
                onClick={() => {
                  setIsEditMode(prevState => !prevState);
                  reset();
                }}
              >
                {isEditMode ? "Cancel" : "Edit"}
              </Button>
              {isEditMode && (
                <Button sx={{ flexGrow: 1 }} type="submit" variant="contained">
                  Submit
                </Button>
              )}
            </Box>
          )}
        </form>
      )}
    </Grid>
  );
};

export { Profile };
