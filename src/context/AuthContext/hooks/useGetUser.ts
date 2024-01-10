import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { ILoginInfo } from "../AuthContext";
import { decodeJwt } from "../../../shared/functions";
import { getUserId } from "../../../shared/functions/getLocalStorageData";
import { useGetProfileMutation } from "../../../store/api/profile.api";
import { storage } from "../../../constants";
import { Dispatch, SetStateAction, useCallback } from "react";

interface UserInfoProps {
  data?: {
    firstname: string;
    lastname: string;
    login: string;
    faculty: {
      faculty_id: number;
      name: string;
    };
    group: {
      group_id: number;
      name: string;
    };
    phone: null;
    email: null;
    registration_date: string;
    role: {
      name: string;
      permission_list: string[];
      role_id: number;
    };
  };
  error?: FetchBaseQueryError | SerializedError;
}

const useGetUser = (setIsAuth: Dispatch<SetStateAction<boolean>>) => {
  const [getProfile] = useGetProfileMutation();

  const getUser = useCallback((loginInfo: ILoginInfo) => {
    try {
      const getUserData = async (accessToken: string) => {
        decodeJwt(accessToken);

        const userId = getUserId();

        const { data: userInfo }: UserInfoProps = await getProfile({
          userId: userId,
        });

        if (userInfo?.faculty?.faculty_id) {
          localStorage.setItem(
            storage.FACULTY_ID,
            userInfo.faculty.faculty_id.toString()
          );
        }

        if (userInfo?.firstname && userInfo?.lastname) {
          localStorage.setItem(
            storage.USER_NAME,
            `${userInfo.firstname} ${userInfo.lastname}`
          );
        }

        if (userInfo?.login) {
          localStorage.setItem(storage.LOGIN, `${userInfo.login}`);
        }

        if (userInfo?.role) {
          localStorage.setItem(
            storage.PERMISSIONS,
            `${userInfo.role.permission_list}`
          );
        }

        setIsAuth(true);
      };

      if (typeof loginInfo === "string") {
        getUserData(loginInfo);
      } else if (typeof loginInfo === "object") {
        if (loginInfo?.refresh_token) {
          localStorage.setItem(storage.REFRESH_TOKEN, loginInfo?.refresh_token);
        }

        if (loginInfo?.access_token) {
          getUserData(loginInfo?.access_token);
        }
      }
    } catch {
      alert("Something went wrong!");
    }
  }, []);

  return getUser;
};

export { useGetUser };
