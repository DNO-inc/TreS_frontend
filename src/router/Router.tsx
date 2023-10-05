import { FC, useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Loader } from "../components/Loader";

import { endpoints } from "../constants";
import { useAuth } from "../context/AuthContext";
import { getAccessToken } from "../shared/functions/getLocalStorageData";
import { checkIsAdmin } from "../shared/functions";

const Layout = lazy(() => import("../Pages/Layout"));
const GeneralTickets = lazy(() => import("../Pages/GeneralTickets"));
const Queue = lazy(() => import("../Pages/Queue"));
const Sent = lazy(() => import("../Pages/Sent"));
const Received = lazy(() => import("../Pages/Received"));
const Followed = lazy(() => import("../Pages/Followed"));
const Bookmarks = lazy(() => import("../Pages/Bookmarks"));
const Deleted = lazy(() => import("../Pages/Deleted"));
const Notifications = lazy(() => import("../Pages/Notifications"));
const Settings = lazy(() => import("../Pages/Settings"));
const Profile = lazy(() => import("../Pages/Profile"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));
const FullTicketInfo = lazy(() => import("../Pages/FullTicketInfo"));
const CreateTicketForm = lazy(() => import("../Pages/CreateTicketForm"));

const Router: FC = () => {
  const { isAuth } = useAuth();
  const isAdmin = checkIsAdmin();

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    pathname === endpoints.base && navigate(endpoints.generalTickets);
  }, [pathname]);

  useEffect(() => {
    if (!getAccessToken()) {
      localStorage.removeItem("access-token");

      if (pathname !== endpoints.generalTickets) {
        navigate(endpoints.generalTickets);
      }
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
            <Route
              path={`${endpoints.fullTicket}/:ticketId`}
              element={<FullTicketInfo />}
            />
            <Route
              path={endpoints.createTicket}
              element={<CreateTicketForm />}
            />
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
      <Route path={"*" || "/error"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
