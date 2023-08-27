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
import { useNavigate } from "react-router-dom";

import { getAccessToken } from "../shared/functions/getLocalStorageData";
import { useLoginMutation } from "../store/api/api";
import { useGetProfileMutation } from "../store/api/profile/profile.api";
import { decodeJwt } from "../shared/functions";

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  authToken: string | null;
  loginUser: ({ login, password }: loginProps) => Promise<void>;
  logoutUser: () => void;
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
    lastnam: string;
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
  };
  error?: FetchBaseQueryError | SerializedError;
}

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access-token"));
  // =============================================
  const [authToken, setAuthToken] = useState(getAccessToken());
  // const [user, setUser] = useState(getAccessToken());
  const [loading, setLoading] = useState(true);

  const [authorization] = useLoginMutation();
  const [getProfile] = useGetProfileMutation();

  const navigate = useNavigate();

  const loginUser = async ({ login, password }: loginProps) => {
    try {
      const { data: loginInfo }: LoginInfoProps = await authorization({
        body: JSON.stringify({ login, password }),
      });

      if (loginInfo?.refresh_token) {
        localStorage.setItem("refresh-token", loginInfo?.refresh_token);
      }

      if (loginInfo?.access_token) {
        decodeJwt(loginInfo.access_token);

        const { data: userInfo }: UserInfoProps = await getProfile({
          userId: loginInfo?.user_id,
        });

        if (userInfo?.faculty?.faculty_id) {
          localStorage.setItem(
            "faculty-id",
            userInfo.faculty.faculty_id.toString()
          );
        }

        if (userInfo?.login) {
          localStorage.setItem("login", userInfo.login);
        }

        if (loginInfo?.user_id) {
          localStorage.setItem("user-id", loginInfo.user_id.toString());
        }

        setIsAuth(true);
      }
    } catch {
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    // setUser(null)
    localStorage.removeItem("access-token");
    localStorage.removeItem("login");
    localStorage.removeItem("faculty-id");
    localStorage.removeItem("user-id");
    localStorage.removeItem("role");

    setIsAuth(false);

    navigate("/");
  };

  const contextData = {
    isAuth,
    setIsAuth,
    authToken,
    loginUser,
    logoutUser,
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
