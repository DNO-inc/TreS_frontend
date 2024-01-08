import { FC, useEffect, lazy, Suspense } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Loader } from "../components/Loader";

import { endpoints, permissions } from "../constants";
import { useAuth } from "../context/AuthContext";
import {
  getAccessToken,
  getPermissions,
} from "../shared/functions/getLocalStorageData";
import { checkIsAdmin } from "../shared/functions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import { useAccessRenewMutation } from "../store/api/profile.api";

const Layout = lazy(() => import("../pages/Layout"));
const GeneralTickets = lazy(() => import("../pages/GeneralTickets"));
const Queue = lazy(() => import("../pages/Queue"));
const Sent = lazy(() => import("../pages/Sent"));
const Received = lazy(() => import("../pages/Received"));
const Followed = lazy(() => import("../pages/Followed"));
const Bookmarks = lazy(() => import("../pages/Bookmarks"));
const Deleted = lazy(() => import("../pages/Deleted"));
const Notifications = lazy(() => import("../pages/Notifications"));
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Profile"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const FullTicketInfo = lazy(() => import("../pages/FullTicketInfo"));
const CreateTicketForm = lazy(() => import("../pages/CreateTicketForm"));
const PermissionDenied = lazy(() => import("../pages/PermissionDenied"));
const Statistic = lazy(() => import("../pages/Statistic"));

type ApiResponse = {
  data?: { access_token: string };
  error?: any;
};

const Router: FC = () => {
  const { isAuth, registerUser } = useAuth();
  const isAdmin = checkIsAdmin();

  const userPermissions = getPermissions();
  const isCanCreateTicket = userPermissions.includes(permissions.CREATE_TICKET);
  const isCanReadTicket = userPermissions.includes(permissions.READ_TICKET);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const [searchParams] = useSearchParams();

  const [resetPassword] = useAccessRenewMutation({});

  useEffect(() => {
    const authToken = getAccessToken();

    if (pathname === "/") {
      navigate(endpoints.GENERAL_TICKETS);
    } else if (searchParams.has("reset_token")) {
      const resetToken = searchParams.get("reset_token");

      resetPassword(resetToken).then((res: ApiResponse) => {
        const accessToken = res?.data && res?.data?.access_token;

        registerUser(accessToken);
      });

      navigate(endpoints.GENERAL_TICKETS);
    } else if (
      !authToken &&
      pathname !== endpoints.GENERAL_TICKETS &&
      pathname !== endpoints.PRIVACY_POLICY
    ) {
      navigate(endpoints.GENERAL_TICKETS);
    }
  }, [pathname, search, isAuth]);

  return (
    <Routes>
      <Route
        path={endpoints.BASE}
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={endpoints.GENERAL_TICKETS} element={<GeneralTickets />} />
        {isAuth && (
          <>
            {isCanReadTicket ? (
              <Route
                path={`${endpoints.FULL_TICKET}/:ticketId`}
                element={<FullTicketInfo />}
              />
            ) : (
              <Route
                path={endpoints.CREATE_TICKET}
                element={<PermissionDenied />}
              />
            )}
            {isCanCreateTicket ? (
              <Route
                path={endpoints.CREATE_TICKET}
                element={<CreateTicketForm />}
              />
            ) : (
              <Route
                path={endpoints.CREATE_TICKET}
                element={<PermissionDenied />}
              />
            )}
            <Route path={endpoints.SENT} element={<Sent />} />
            <Route path={endpoints.FOLLOWED} element={<Followed />} />
            <Route path={endpoints.BOOKMARKS} element={<Bookmarks />} />
            <Route path={endpoints.DELETED} element={<Deleted />} />
            <Route path={endpoints.NOTIFICATIONS} element={<Notifications />} />
            <Route path={endpoints.SETTINGS} element={<Settings />} />
            <Route
              path={`${endpoints.PROFILE}/:userId`}
              element={<Profile />}
            />
            {isAdmin && (
              <>
                <Route path={endpoints.QUEUE} element={<Queue />} />
                <Route path={endpoints.RECEIVED} element={<Received />} />
                <Route path={endpoints.STATISTIC} element={<Statistic />} />
              </>
            )}
          </>
        )}
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={endpoints.PRIVACY_POLICY} element={<PrivacyPolicy />} />
      <Route path={"*" || "/error"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
