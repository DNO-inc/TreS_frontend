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
} from "../../shared/functions/getLocalStorageData";
import { clearLocalStorage } from "../../shared/functions";
import {
  useCabinetLoginMutation,
  useLoginMutation,
} from "../../store/api/auth.api";
import { useGetUser } from "./hooks/useGetUser";

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

export type ILoginInfo =
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
  const navigate = useNavigate();

  const cabinetKey = searchParams.get("key");
  const DEFAULT_CABINET_TOKEN = "q87nfWyQ"; // delete
  const cabinetToken = searchParams.get("token") || DEFAULT_CABINET_TOKEN;

  const IsTokensExpired = getIsTokensExpired();
  const [isAuth, setIsAuth] = useState(!IsTokensExpired);
  const [authToken, setAuthToken] = useState(getAccessToken());

  const [authorization] = useLoginMutation();
  const [cabinetAuth] = useCabinetLoginMutation();

  const getUser = useGetUser(setIsAuth);

  const handleCabinetAuth = async () => {
    if (cabinetKey && cabinetToken) {
      try {
        const response: ApiResponse = await cabinetAuth({
          body: JSON.stringify({
            key: cabinetKey,
            token: cabinetToken,
          }),
        });

        const loginInfo = response?.data;
        if (loginInfo) {
          getUser(loginInfo);
        }
      } catch (error) {
        console.error("Cabinet authentication error:", error);
      }
    }
  };

  useEffect(() => {
    handleCabinetAuth();
  }, []);

  const handleUserData = (loginInfo: ILoginInfo | undefined) => {
    if (loginInfo) {
      getUser(loginInfo);
      return true;
    }

    return false;
  };

  const loginUser = async ({ login, password }: loginProps) => {
    const { data: loginInfo }: LoginInfoProps = await authorization({
      body: JSON.stringify({ login, password }),
    });

    return handleUserData(loginInfo);
  };

  const registerUser = async (loginInfo: ILoginInfo) => {
    return handleUserData(loginInfo);
  };

  const logoutUser = () => {
    setAuthToken(null);
    clearLocalStorage();

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

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
