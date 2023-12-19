import { FC, useEffect, lazy, Suspense } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Loader } from "../components/Loader";

import { endpoints } from "../constants";
import { useAuth } from "../context/AuthContext";
import {
  getAccessToken,
  getPermissions,
} from "../shared/functions/getLocalStorageData";
import { checkIsAdmin } from "../shared/functions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import { useResetPasswordMutation } from "../store/api/auth/auth.api";

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

type ApiResponse = {
  data?: { access_token: string };
  error?: any;
};

const Router: FC = () => {
  const { isAuth, registerUser } = useAuth();
  const isAdmin = checkIsAdmin();

  const permissions = getPermissions();
  const isCanCreateTicket = permissions.includes("CREATE_TICKET");
  const isCanReadTicket = permissions.includes("READ_TICKET");

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const [searchParams] = useSearchParams();

  const [resetPassword] = useResetPasswordMutation({});

  useEffect(() => {
    const authToken = getAccessToken();

    if (pathname === "/") {
      navigate(endpoints.generalTickets);
    } else if (searchParams.has("reset_token")) {
      const resetToken = searchParams.get("reset_token");

      resetPassword(resetToken).then((res: ApiResponse) => {
        const accessToken = res?.data && res?.data?.access_token;

        registerUser(accessToken);
      });

      navigate(endpoints.generalTickets);
    } else if (
      !authToken &&
      pathname !== endpoints.generalTickets &&
      pathname !== endpoints.privacyPolicy
    ) {
      navigate(endpoints.generalTickets);
    }
  }, [pathname, search, isAuth]);

  return (
    <Routes>
      <Route
        path={endpoints.base}
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={endpoints.generalTickets} element={<GeneralTickets />} />
        {isAuth && (
          <>
            {isCanReadTicket ? (
              <Route
                path={`${endpoints.fullTicket}/:ticketId`}
                element={<FullTicketInfo />}
              />
            ) : (
              <Route
                path={endpoints.createTicket}
                element={<PermissionDenied />}
              />
            )}
            {isCanCreateTicket ? (
              <Route
                path={endpoints.createTicket}
                element={<CreateTicketForm />}
              />
            ) : (
              <Route
                path={endpoints.createTicket}
                element={<PermissionDenied />}
              />
            )}
            <Route path={endpoints.sent} element={<Sent />} />
            <Route path={endpoints.followed} element={<Followed />} />
            <Route path={endpoints.bookmarks} element={<Bookmarks />} />
            <Route path={endpoints.deleted} element={<Deleted />} />
            <Route path={endpoints.notifications} element={<Notifications />} />
            <Route path={endpoints.settings} element={<Settings />} />
            <Route
              path={`${endpoints.profile}/:userId`}
              element={<Profile />}
            />
            {isAdmin && (
              <>
                <Route path={endpoints.queue} element={<Queue />} />
                <Route path={endpoints.received} element={<Received />} />
              </>
            )}
          </>
        )}
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={endpoints.privacyPolicy} element={<PrivacyPolicy />} />
      <Route path={"*" || "/error"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
