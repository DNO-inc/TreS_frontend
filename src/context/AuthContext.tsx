import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  getAccessToken,
  getIsTokensExpired,
  getUserId,
} from "../shared/functions/getLocalStorageData";
import { useGetProfileMutation } from "../store/api/profile/profile.api";
import { decodeJwt } from "../shared/functions";
import {
  useCabinetLoginMutation,
  useLoginMutation,
} from "../store/api/auth/auth.api";

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  authToken: string | null;
  loginUser: ({ login, password }: loginProps) => Promise<boolean>;
  logoutUser: () => void;
  registerUser: (loginInfo: ILoginInfo) => Promise<boolean>;
}

interface loginProps {
  login: string;
  password: string;
}

interface LoginInfoProps {
  data?: {
    access_token: string;
    login: string;
    refresh_token: string;
    user_id: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

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

type ILoginInfo =
  | {
      access_token: string;
      login?: string;
      refresh_token: string;
      user_id: number;
    }
  | undefined
  | string;

type ApiResponse = {
  data?: ILoginInfo;
  error?: FetchBaseQueryError | SerializedError;
};

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const cabinetKey = searchParams.get("key");
  const cabinetToken = searchParams.get("token") || "q87nfWyQ"; // delete

  const IsTokensExpired = getIsTokensExpired();
  const [isAuth, setIsAuth] = useState(!IsTokensExpired);
  // =============================================
  const [authToken, setAuthToken] = useState(getAccessToken());
  // const [user, setUser] = useState(getAccessToken());
  const [loading, setLoading] = useState(true);

  const [authorization] = useLoginMutation();
  const [getProfile] = useGetProfileMutation();
  const [cabinetAuth] = useCabinetLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (cabinetKey && cabinetToken) {
      cabinetAuth({
        body: JSON.stringify({
          key: cabinetKey,
          token: cabinetToken,
        }),
      }).then((response: ApiResponse) => {
        const loginInfo = response?.data;
        if (loginInfo) {
          _getUser(loginInfo);
        }
      });
    }
  }, []);

  const _getUser = async (loginInfo: ILoginInfo) => {
    try {
      const getUserData = async (accessToken: string) => {
        decodeJwt(accessToken);

        const userId = getUserId();

        const { data: userInfo }: UserInfoProps = await getProfile({
          userId: userId,
        });

        if (userInfo?.faculty?.faculty_id) {
          localStorage.setItem(
            "faculty-id",
            userInfo.faculty.faculty_id.toString()
          );
        }

        if (userInfo?.firstname && userInfo?.lastname) {
          localStorage.setItem(
            "user-name",
            `${userInfo.firstname} ${userInfo.lastname}`
          );
        }

        if (userInfo?.login) {
          localStorage.setItem("login", `${userInfo.login}`);
        }

        if (userInfo?.role) {
          localStorage.setItem(
            "permissions",
            `${userInfo.role.permission_list}`
          );
        }

        setIsAuth(true);
      };

      if (typeof loginInfo === "string") {
        getUserData(loginInfo);
      } else if (typeof loginInfo === "object") {
        if (loginInfo?.refresh_token) {
          localStorage.setItem("refresh-token", loginInfo?.refresh_token);
        }

        if (loginInfo?.access_token) {
          getUserData(loginInfo?.access_token);
        }
      }
    } catch {
      alert("Something went wrong!");
    }
  };

  const loginUser = async ({ login, password }: loginProps) => {
    const { data: loginInfo }: LoginInfoProps = await authorization({
      body: JSON.stringify({ login, password }),
    });

    if (loginInfo) {
      _getUser(loginInfo);

      return true;
    }

    return false;
  };

  const registerUser = async (loginInfo: ILoginInfo) => {
    if (loginInfo) {
      _getUser(loginInfo);

      return true;
    }

    return false;
  };

  const logoutUser = () => {
    setAuthToken(null);
    // setUser(null)
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user-name");
    localStorage.removeItem("login");
    localStorage.removeItem("faculty-id");
    localStorage.removeItem("user-id");
    localStorage.removeItem("role");
    localStorage.removeItem("permissions");

    setIsAuth(false);

    navigate("/");
  };

  const contextData = {
    isAuth,
    setIsAuth,
    authToken,
    loginUser,
    logoutUser,
    registerUser,
  };

  useEffect(() => {
    if (authToken) {
      // setUser(jwtDecode(authToken));
    }

    setLoading(false);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
