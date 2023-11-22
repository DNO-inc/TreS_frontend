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
import { TextField } from "@mui/material";

import { ProfileInput } from "./components/ProfileInput";

import {
  useGetProfileMutation,
  useUpdateProfileMutation,
} from "../../store/api/profile/profile.api";
import IPalette from "../../theme/IPalette.interface";
import {
  getPermissions,
  getUserId,
} from "../../shared/functions/getLocalStorageData";
import { checkIsAdmin } from "../../shared/functions";
import { RolesSelect } from "./components/RolesSelect";
import king from "../../assets/king.jpg";

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

  const permissions = getPermissions();

  const isCanChangeProfile = permissions.includes("UPDATE_PROFILE");

  const isAdmin = checkIsAdmin();

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
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const setProfile = () => {
    getProfile({ userId: userId }).then((response: ApiResponse) => {
      if (response?.data) {
        const { firstname, lastname, login, email, phone, role } =
          response.data;

        setFirstname(firstname);
        setLastname(lastname);
        setLogin(login);
        setEmail(email);
        setPhone(phone);
        setRole(role.role_id);
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
    localStorage.setItem("user-name", `${data.firstname} ${data.lastname}`);
    reset();
  };

  const handelChangePassword = (): void => {
    updateProfile({ body: JSON.stringify({ password: password }) });
    setPassword("");
  };

  const passwordPlaceholder = t("profile.editMode.password");

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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "normal" },
              gap: 5,
            }}
          >
            <Avatar
              src={(isMyProfile && isAdmin) || (role && role >= 9) ? king : ""}
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
                  {"@" + login ?? t("common.notFound.title")}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              width: { xs: "90vw", sm: 535 },
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
                  mr: 5,
                },
              },
            }}
          >
            {isAdmin && !isMyProfile && (
              <Box>
                <Typography>{t("profile.role")}</Typography>
                <RolesSelect
                  role={role}
                  setRole={setRole}
                  updateProfile={updateProfile}
                  userId={userId}
                />
              </Box>
            )}
            <Box>
              <Typography>{t("profile.email")}</Typography>
              
                <Typography>{email ?? t("common.notFound.title")}</Typography>
              
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
                <Typography>{phone ?? t("common.notFound.title")}</Typography>
              )}
            </Box>
            <Box>
              <Typography>{t("profile.faculty")}</Typography>
              <Typography>
                {data?.faculty?.name ?? t("common.notFound.title")}
              </Typography>
            </Box>
            <Box>
              <Typography>{t("profile.group")}</Typography>
              <Typography>
                {data?.group?.name ?? t("common.notFound.title")}
              </Typography>
            </Box>
          </Box>
          {isMyProfile && isCanChangeProfile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                sx={{ flexGrow: 1 }}
                variant="outlined"
                onClick={() => {
                  setIsEditMode(prevState => !prevState);
                  reset();
                }}
              >
                {isEditMode
                  ? t("profile.editMode.cancelButton")
                  : t("profile.editMode.editButton")}
              </Button>
              {isEditMode && (
                <Button sx={{ flexGrow: 1 }} type="submit" variant="contained">
                  {t("profile.editMode.submitButton")}
                </Button>
              )}
            </Box>
          )}
          {isMyProfile && isCanChangeProfile && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography fontSize={24}>
                {t("profile.passwordTitle")}
              </Typography>
              <TextField
                id="ticket-title"
                value={password}
                label={passwordPlaceholder}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                fullWidth
              />
              <Button
                sx={{ flexGrow: 1 }}
                variant="outlined"
                onClick={handelChangePassword}
              >
                {t("profile.changePasswordButton")}
              </Button>
            </Box>
          )}
        </form>
      )}
    </Grid>
  );
};

export { Profile };
